import { NextResponse } from "next/server";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createCashSnapshot, readCashSnapshots, type CashSnapshotInput } from "@/lib/forgeosFinance";

const unauthorized = () => NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });
const cashUnavailable = () =>
  NextResponse.json({ error: "Unable to load cash position data from Notion." }, { status: 502 });

export async function GET(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return unauthorized();
  if (!["CEO", "CTO"].includes(session.role)) return NextResponse.json({ error: "Finance access is restricted." }, { status: 403 });

  try {
    return NextResponse.json({ cashPosition: await readCashSnapshots() });
  } catch {
    return cashUnavailable();
  }
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return unauthorized();
  if (!["CEO", "CTO"].includes(session.role)) return NextResponse.json({ error: "Finance access is restricted." }, { status: 403 });

  const body = (await request.json()) as Partial<CashSnapshotInput>;
  if (!body.title || typeof body.balance !== "number" || !body.account || !body.snapshotDate) {
    return NextResponse.json({ error: "Missing required cash position details." }, { status: 400 });
  }

  try {
    const cashPosition = await createCashSnapshot({
      title: body.title,
      balance: body.balance,
      account: body.account,
      snapshotDate: body.snapshotDate,
      notes: body.notes || "",
    });

    return NextResponse.json({ cashPosition });
  } catch {
    return cashUnavailable();
  }
}
