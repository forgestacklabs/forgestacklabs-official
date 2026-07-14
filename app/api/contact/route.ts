import { NextResponse } from "next/server";
import { ensureNotionReady, notionClient, notionDatabaseId } from "@/lib/notion";
import { rateLimit, rejectOversizedRequest, validateSameOrigin } from "@/lib/requestGuards";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  message?: string;
  source?: string;
  industry?: string;
  country?: string;
  targetTimeline?: string;
  estimatedBudgetRange?: string;
  technicalBrief?: string;
};

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
const allowedSources = ["Product Demo Request", "Custom Architecture Brief"] as const;
const allowedFields = new Set<keyof ContactPayload>([
  "name",
  "email",
  "phone",
  "organization",
  "message",
  "source",
  "industry",
  "country",
  "targetTimeline",
  "estimatedBudgetRange",
  "technicalBrief",
]);

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function validateContactPayload(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { error: "Invalid request payload." };
  }

  const keys = Object.keys(payload);
  if (keys.some((key) => !allowedFields.has(key as keyof ContactPayload))) {
    return { error: "Request contains unsupported fields." };
  }

  const raw = payload as ContactPayload;
  const data = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 40),
    organization: clean(raw.organization, 160),
    message: clean(raw.message, 3000),
    source: clean(raw.source, 80),
    industry: clean(raw.industry, 120),
    country: clean(raw.country, 120),
    targetTimeline: clean(raw.targetTimeline, 120),
    estimatedBudgetRange: clean(raw.estimatedBudgetRange, 120),
    technicalBrief: clean(raw.technicalBrief, 3000),
  };

  if (!allowedSources.includes(data.source as (typeof allowedSources)[number])) {
    return { error: "Invalid inquiry source." };
  }

  if (!data.name || !data.email || !data.phone || !data.organization || !data.message) {
    return { error: "Missing required fields." };
  }

  if (!isValidEmail(data.email) || data.email.length > 180) {
    return { error: "Invalid email." };
  }

  if (data.source === "Custom Architecture Brief") {
    if (!data.industry || !data.country || !data.targetTimeline || !data.estimatedBudgetRange || !data.technicalBrief) {
      return { error: "Missing required project brief fields." };
    }
  }

  return { data };
}

export async function POST(request: Request) {
  try {
    const originError = validateSameOrigin(request);
    if (originError) return originError;

    const sizeError = rejectOversizedRequest(request, 16 * 1024);
    if (sizeError) return sizeError;

    const rateLimitError = rateLimit(request, "contact", { limit: 5, windowMs: 10 * 60 * 1000 });
    if (rateLimitError) return rateLimitError;

    const validation = validateContactPayload(await request.json());
    if ("error" in validation) return NextResponse.json({ error: validation.error }, { status: 400 });

    const data = validation.data;

    ensureNotionReady();

    await notionClient?.pages.create({
      parent: { database_id: notionDatabaseId as string },
      properties: {
        Name: {
          title: [{ text: { content: data.name } }]
        },
        Email: {
          email: data.email
        },
        Phone: {
          rich_text: [{ text: { content: data.phone || "" } }]
        },
        Organization: {
          rich_text: [{ text: { content: data.organization || "" } }]
        },
        Message: {
          rich_text: [{ text: { content: data.message } }]
        },
        Industry: {
          rich_text: [{ text: { content: data.industry || "" } }]
        },
        Country: {
          rich_text: [{ text: { content: data.country || "" } }]
        },
        "Target Timeline": {
          rich_text: [{ text: { content: data.targetTimeline || "" } }]
        },
        "Estimated Budget Range": {
          rich_text: [{ text: { content: data.estimatedBudgetRange || "" } }]
        },
        "Technical Brief / Project Scope": {
          rich_text: [{ text: { content: data.technicalBrief || data.message } }]
        },
        Source: {
          select: { name: data.source || "Website" }
        },
        Status: {
          select: { name: "New" }
        },
        Priority: {
          select: { name: "Normal" }
        },
        "Internal Notes": {
          rich_text: [{ text: { content: "" } }]
        },
        "Received At": {
          date: { start: new Date().toISOString() }
        }
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to submit." }, { status: 500 });
  }
}
