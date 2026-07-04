import type { Expense } from "@/lib/forgeosData";
import { money } from "@/components/forgeos/ui";
import { FinanceWidget } from "./FinanceWidget";

function monthTotal(expenses: Expense[], date: Date) {
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  return expenses.filter((expense) => expense.expenseDate.startsWith(key)).reduce((sum, expense) => sum + expense.amount, 0);
}

export function BurnRateWidget({ expenses }: { expenses: Expense[] }) {
  const now = new Date();
  const current = monthTotal(expenses, now);
  const previous = monthTotal(expenses, new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const change = previous ? Math.round(((current - previous) / previous) * 100) : null;
  const detail = change === null ? "No previous-month comparison" : `${change > 0 ? "+" : ""}${change}% vs previous month`;
  return <FinanceWidget label="Burn Rate" value={money(current)} detail={detail} />;
}
