import { money } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";
import type { RevenueEntry } from "@/lib/forgeosData";
import { FinanceWidget } from "./FinanceWidget";

export function RevenueOverviewWidget() {
  const { data: revenue, error } = useApiData<RevenueEntry[]>("/api/forgeos/revenue", [], 10000);

  if (error) {
    return <FinanceWidget label="Revenue Overview" value="Not connected" detail="Revenue data is not available from the current API." />;
  }

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const currentMonthRevenue = revenue
    .filter((entry) => entry.revenueDate.startsWith(monthKey) && entry.status === "Received")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const pendingCount = revenue.filter((entry) => entry.status === "Pending").length;

  return (
    <FinanceWidget
      label="Revenue Overview"
      value={money(currentMonthRevenue)}
      detail={pendingCount ? `${pendingCount} pending ${pendingCount === 1 ? "payment" : "payments"}` : "No pending payments"}
    />
  );
}
