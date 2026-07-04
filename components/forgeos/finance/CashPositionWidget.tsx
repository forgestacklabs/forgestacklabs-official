import { money } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";
import type { CashSnapshot } from "@/lib/forgeosData";
import { FinanceWidget } from "./FinanceWidget";

export function CashPositionWidget() {
  const { data: snapshots, error } = useApiData<CashSnapshot[]>("/api/forgeos/cash-position", [], 10000);

  if (error) {
    return <FinanceWidget label="Cash Position" value="Not connected" detail="Cash balance is not available from the current API." />;
  }

  const latest = snapshots[0];
  const detail = latest
    ? `${latest.account} - ${new Date(latest.snapshotDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
    : "No cash snapshots yet";

  return <FinanceWidget label="Cash Position" value={latest ? money(latest.balance) : money(0)} detail={detail} />;
}
