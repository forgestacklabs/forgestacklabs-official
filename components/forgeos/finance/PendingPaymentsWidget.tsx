import type { Project } from "@/lib/forgeosData";
import { money } from "@/components/forgeos/ui";
import { FinanceWidget } from "./FinanceWidget";

export function PendingPaymentsWidget({ projects }: { projects: Project[] }) {
  const clientProjects = projects.filter((project) => project.projectType === "Client Project");
  const pendingProjects = clientProjects.filter((project) => Math.max(project.totalAmount - project.amountReceived, 0) > 0);
  const total = pendingProjects.reduce((sum, project) => sum + Math.max(project.totalAmount - project.amountReceived, 0), 0);

  return (
    <FinanceWidget
      label="Pending Payments"
      value={money(total)}
      detail={`${pendingProjects.length} pending ${pendingProjects.length === 1 ? "client project" : "client projects"}`}
    />
  );
}
