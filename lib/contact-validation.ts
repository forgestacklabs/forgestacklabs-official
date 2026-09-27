export type ContactPayload = { name?: string; email?: string; phone?: string; organization?: string; message?: string; source?: string; industry?: string; country?: string; targetTimeline?: string; estimatedBudgetRange?: string; technicalBrief?: string; product?: string };
const allowedSources = ["Product Demo Request", "Custom Architecture Brief"] as const;
const allowedFields = new Set<keyof ContactPayload>(["name", "email", "phone", "organization", "message", "source", "industry", "country", "targetTimeline", "estimatedBudgetRange", "technicalBrief", "product"]);
const clean = (value: unknown, maxLength: number) => typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export function validateContactPayload(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return { error: "Invalid request payload." } as const;
  if (Object.keys(payload).some((key) => !allowedFields.has(key as keyof ContactPayload))) return { error: "Request contains unsupported fields." } as const;
  const raw = payload as ContactPayload;
  const data = { name: clean(raw.name, 120), email: clean(raw.email, 180).toLowerCase(), phone: clean(raw.phone, 40), organization: clean(raw.organization, 160), message: clean(raw.message, 3000), source: clean(raw.source, 80), industry: clean(raw.industry, 120), country: clean(raw.country, 120), targetTimeline: clean(raw.targetTimeline, 120), estimatedBudgetRange: clean(raw.estimatedBudgetRange, 120), technicalBrief: clean(raw.technicalBrief, 3000), product: clean(raw.product, 120) };
  if (!allowedSources.includes(data.source as (typeof allowedSources)[number])) return { error: "Invalid inquiry source." } as const;
  if (!data.name || !data.email || !data.organization || !data.message) return { error: "Missing required fields." } as const;
  if (!/\S+@\S+\.\S+/.test(data.email)) return { error: "Invalid email." } as const;
  return { data } as const;
}
