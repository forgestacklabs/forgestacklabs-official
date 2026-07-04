import type { Expense } from "@/lib/forgeosData";
import { money } from "@/components/forgeos/ui";
import { FinanceWidget } from "./FinanceWidget";

export function PendingPaymentsWidget({ expenses }: { expenses: Expense[] }) {
  const pending = expenses.filter((expense) => ["Submitted", "In review"].includes(expense.status));
  const total = pending.reduce((sum, expense) => sum + expense.amount, 0);
  return <FinanceWidget label="Pending Payments" value={money(total)} detail={`${pending.length} pending ${pending.length === 1 ? "expense" : "expenses"}`} />;
}
