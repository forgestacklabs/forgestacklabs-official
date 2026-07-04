import type { Expense } from "@/lib/forgeosData";
import { money } from "@/components/forgeos/ui";
import { FinanceWidget } from "./FinanceWidget";

export function MonthlyExpensesWidget({ expenses }: { expenses: Expense[] }) {
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const total = expenses.filter((expense) => expense.expenseDate.startsWith(monthKey)).reduce((sum, expense) => sum + expense.amount, 0);
  return <FinanceWidget label="Monthly Expenses" value={money(total)} detail={now.toLocaleDateString("en-IN", { month: "long", year: "numeric" })} />;
}
