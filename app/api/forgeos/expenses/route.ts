import { NextResponse } from "next/server";
import { isDateBlocked } from "@/lib/blockedDates";
import { readBlockedDates } from "@/lib/forgeosBlockedDates";
import { createForgeNotification } from "@/lib/forgeosNotifications";
import { getAdminSession, hasAdminAuthConfig, missingAdminAuthConfigMessage } from "@/lib/adminAuth";
import { createForgeExpense, readForgeExpenses, type ExpenseInput } from "@/lib/forgeosExpenses";

const unauthorized = () => NextResponse.json({ error: "Please login from ForgeOS first." }, { status: 401 });

export async function GET(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return unauthorized();
  if (!["CEO", "CTO"].includes(session.role)) return NextResponse.json({ error: "Finance access is restricted." }, { status: 403 });
  try {
return NextResponse.json({ expenses: await readForgeExpenses() }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load expenses." }, { status: 500 }); }
}

export async function POST(request: Request) {
  if (!hasAdminAuthConfig()) return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
  const session = getAdminSession(request);
  if (!session) return unauthorized();
  const body = (await request.json()) as Partial<ExpenseInput>;
  if (!body.title || typeof body.amount !== "number") return NextResponse.json({ error: "Missing required expense details." }, { status: 400 });
  try {
    const expenseDate = body.expenseDate || new Date().toISOString().slice(0, 10);
    const blocked = isDateBlocked(expenseDate, await readBlockedDates());
    if (blocked) return NextResponse.json({ error: `This date falls in a blocked period: ${blocked.reason}` }, { status: 400 });
    const expense = await createForgeExpense({
      title: body.title,
      amount: body.amount,
      submittedRole: session.role,
      status: "Submitted",
      expenseDate,
      notes: body.notes || "",
    });
    await createForgeNotification({ title: "Expense submitted", body: `${expense.title} for ${expense.amount} is awaiting review.`, type: "Finance", recipientRole: session.role === "CEO" ? "CTO" : "CEO", recipientEmail: "", linkedModule: "finance", linkedRecordId: expense.id }).catch(() => undefined);
    return NextResponse.json({ expense });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create expense." }, { status: 500 }); }
}
