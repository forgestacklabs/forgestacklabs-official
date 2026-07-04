import { NextResponse } from "next/server";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createRevenueEntry, readRevenueEntries, type RevenueInput } from "@/lib/forgeosFinance";

const unauthorized = () => NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });
const revenueUnavailable = () =>
  NextResponse.json({ error: "Unable to load revenue data from Notion." }, { status: 502 });

export async function GET(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return unauthorized();
  if (!["CEO", "CTO"].includes(session.role)) return NextResponse.json({ error: "Finance access is restricted." }, { status: 403 });

  try {
    return NextResponse.json({ revenue: await readRevenueEntries() });
  } catch {
    return revenueUnavailable();
  }
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return unauthorized();
  if (!["CEO", "CTO"].includes(session.role)) return NextResponse.json({ error: "Finance access is restricted." }, { status: 403 });

  const body = (await request.json()) as Partial<RevenueInput>;
  if (
    !body.title ||
    typeof body.amount !== "number" ||
    !body.client ||
    !body.source ||
    !body.status ||
    !body.revenueDate
  ) {
    return NextResponse.json({ error: "Missing required revenue details." }, { status: 400 });
  }

  try {
    const revenue = await createRevenueEntry({
      title: body.title,
      amount: body.amount,
      client: body.client,
      source: body.source,
      status: body.status,
      revenueDate: body.revenueDate,
      notes: body.notes || "",
    });

    return NextResponse.json({ revenue });
  } catch {
    return revenueUnavailable();
  }
}
