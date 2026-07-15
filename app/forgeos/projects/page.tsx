"use client";

import { isDateBlocked } from "@/lib/blockedDates";
import { FormEvent, useState } from "react";
import { Pencil } from "lucide-react";
import type { Project, ProjectType } from "@/lib/forgeosData";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import { ModuleListPage } from "@/components/forgeos/ModuleListPage";
import { SelectField, SimpleForm, TextField, formatLongDate, money, readJson } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  Medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Low: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
};

const statusStyles: Record<string, string> = {
  Planning: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "In Progress": "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "On Hold": "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
};

function Pill({ label, styles }: { label: string; styles: Record<string, string> }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[label] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"}`}>
      {label}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div className="h-full rounded-full bg-neutral-900 dark:bg-neutral-100" style={{ width: `${clamped}%` }} />
      </div>
      <span className="text-xs tabular-nums text-neutral-500 dark:text-neutral-400">{clamped}%</span>
    </div>
  );
}

function ProjectNameCell({ project }: { project: Project }) {
  return (
    <div>
      <div className="font-medium text-neutral-900 dark:text-neutral-100">{project.name}</div>
      <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-neutral-400">
        <span>{project.owner}</span>
        <span aria-hidden="true">·</span>
        <span>{project.projectType === "Client Project" ? "Client" : "Internal"}</span>
      </div>
    </div>
  );
}

function FinancialsCell({
  project,
  editing,
  receivedValue,
  onReceivedChange,
}: {
  project: Project;
  editing: boolean;
  receivedValue: string;
  onReceivedChange: (value: string) => void;
}) {
  if (project.projectType !== "Client Project") {
    return (
      <div>
        <div className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">{money(project.totalAmount)}</div>
      </div>
    );
  }

  if (editing) {
    const amount = Number(receivedValue || 0);
    const invalid = Number.isNaN(amount) || amount < 0 || amount > project.totalAmount;
    const pendingAmount = Math.max(project.totalAmount - amount, 0);

    return (
      <div className="max-w-[10.5rem]">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-neutral-400">Rec.</span>
          <input
            type="number"
            min={0}
            max={project.totalAmount}
            value={receivedValue}
            onChange={(event) => onReceivedChange(event.target.value)}
            autoFocus
            className="h-8 min-w-0 flex-1 rounded-md border border-neutral-200 bg-white px-2 text-right text-xs font-semibold tabular-nums text-neutral-900 outline-none transition focus:border-[#8BA888]"
            aria-label={`Amount received for ${project.name}`}
          />
        </div>
        <div className="mt-1 flex items-center justify-between gap-1.5 text-[10px]">
          <span className="text-neutral-400">Pending</span>
          <span className={`font-medium tabular-nums ${invalid ? "text-red-500" : "text-neutral-500"}`}>
            {invalid ? "Invalid" : money(pendingAmount)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">{money(project.totalAmount)}</div>
      <div className="text-xs tabular-nums text-neutral-400">{money(project.amountReceived)} received</div>
    </div>
  );
}

function ProgressCell({
  project,
  editing,
  progressValue,
  onProgressChange,
}: {
  project: Project;
  editing: boolean;
  progressValue: string;
  onProgressChange: (value: string) => void;
}) {
  if (!editing) return <ProgressBar value={project.progress} />;

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={100}
        value={progressValue}
        onChange={(event) => onProgressChange(event.target.value)}
        className="h-8 w-14 rounded-md border border-neutral-200 bg-white px-2 text-right text-xs font-semibold tabular-nums text-neutral-900 outline-none transition focus:border-[#8BA888]"
        aria-label={`Progress for ${project.name}`}
      />
      <span className="text-[11px] text-neutral-400">%</span>
    </div>
  );
}

function EditProjectCell({
  project,
  editing,
  saving,
  canSave,
  onEdit,
  onCancel,
  onSave,
}: {
  project: Project;
  editing: boolean;
  saving: boolean;
  canSave: boolean;
  onEdit: (project: Project) => void;
  onCancel: () => void;
  onSave: (project: Project) => Promise<void>;
}) {
  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onSave(project)}
          disabled={saving || !canSave}
          className="h-8 rounded-full bg-[#121212] px-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#121212]/85 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {saving ? "Saving" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="h-8 rounded-full border border-neutral-200 bg-white px-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onEdit(project)}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:border-[#121212]/30 hover:bg-neutral-50 hover:text-[#121212]"
      aria-label={
        project.projectType === "Client Project"
          ? `Edit received amount and progress for ${project.name}`
          : `Edit progress for ${project.name}`
      }
      title={project.projectType === "Client Project" ? "Edit received amount and progress" : "Edit progress"}
    >
      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}

function ProjectsTable({
  projects,
  emptyLabel,
  onUpdateClientMetrics,
}: {
  projects: Project[];
  emptyLabel?: string;
  onUpdateClientMetrics: (project: Project, amountReceived: number, progress: number) => Promise<void>;
}) {
  const [editingProjectId, setEditingProjectId] = useState("");
  const [draftReceived, setDraftReceived] = useState("");
  const [draftProgress, setDraftProgress] = useState("");
  const [savingProjectId, setSavingProjectId] = useState("");

  function startEdit(project: Project) {
    setEditingProjectId(project.id);
    setDraftReceived(String(project.amountReceived));
    setDraftProgress(String(project.progress));
  }

  function cancelEdit() {
    setEditingProjectId("");
    setDraftReceived("");
    setDraftProgress("");
  }

  function canSave(project: Project) {
    const amount = Number(draftReceived || 0);
    const progress = Number(draftProgress || 0);
    if (project.projectType !== "Client Project") {
      return !Number.isNaN(progress) && progress >= 0 && progress <= 100;
    }

    return (
      !Number.isNaN(amount) &&
      !Number.isNaN(progress) &&
      amount >= 0 &&
      amount <= project.totalAmount &&
      progress >= 0 &&
      progress <= 100
    );
  }

  async function saveEdit(project: Project) {
    if (!canSave(project)) return;
    setSavingProjectId(project.id);
    try {
      await onUpdateClientMetrics(
        project,
        project.projectType === "Client Project" ? Number(draftReceived || 0) : project.amountReceived,
        Number(draftProgress || 0),
      );
      cancelEdit();
    } finally {
      setSavingProjectId("");
    }
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        {emptyLabel || "No projects yet."}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[25%]" />
          <col className="w-[11%]" />
          <col className="w-[9%]" />
          <col className="w-[11%]" />
          <col className="w-[19%]" />
          <col className="w-[11%]" />
          <col className="w-[14%]" />
        </colgroup>
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <tr>
            <th className="px-3 py-3 font-medium">Project</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Priority</th>
            <th className="px-3 py-3 font-medium">Due Date</th>
            <th className="px-3 py-3 font-medium">Financials</th>
            <th className="px-3 py-3 font-medium">Progress</th>
            <th className="px-3 py-3 font-medium">Edit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {projects.map((project) => {
            const editing = editingProjectId === project.id;
            return (
              <tr key={project.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                <td className="px-3 py-3">
                  <ProjectNameCell project={project} />
                </td>
                <td className="px-3 py-3">
                  <Pill label={project.status} styles={statusStyles} />
                </td>
                <td className="px-3 py-3">
                  <Pill label={project.priority} styles={priorityStyles} />
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-neutral-600 dark:text-neutral-300">
                  {formatLongDate(project.dueDate, "No date")}
                </td>
                <td className="px-3 py-3">
                  <FinancialsCell
                    project={project}
                    editing={editing}
                    receivedValue={draftReceived}
                    onReceivedChange={setDraftReceived}
                  />
                </td>
                <td className="px-3 py-3">
                  <ProgressCell
                    project={project}
                    editing={editing}
                    progressValue={draftProgress}
                    onProgressChange={setDraftProgress}
                  />
                </td>
                <td className="px-3 py-3">
                  <EditProjectCell
                    project={project}
                    editing={editing}
                    saving={savingProjectId === project.id}
                    canSave={canSave(project)}
                    onEdit={startEdit}
                    onCancel={cancelEdit}
                    onSave={saveEdit}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type ProjectView = "All Projects" | ProjectType;

const projectViews: ProjectView[] = ["All Projects", "Company Project", "Client Project"];

export default function ProjectsPage() {
  const { role, notify, blockedDates } = useForgeOS();
  const [dateError, setDateError] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("Company Project");
  const [activeView, setActiveView] = useState<ProjectView>("All Projects");
  const { data: projects, setData, loading } = useApiData<Project[]>("/api/forgeos/projects", []);
  const filteredProjects = activeView === "All Projects" ? projects : projects.filter((project) => project.projectType === activeView);

  async function updateClientMetrics(project: Project, amountReceived: number, progress: number) {
    const response = await fetch("/api/forgeos/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: project.id,
        progress,
        ...(project.projectType === "Client Project" ? { amountReceived } : {}),
      }),
    });

    const body = await readJson(response);
    if (!response.ok) {
      notify(body.error || "Unable to update project.");
      return;
    }

    setData((current) =>
      current.map((item) =>
        item.id === project.id
          ? {
              ...item,
              amountReceived: body.project?.amountReceived ?? amountReceived,
              progress: body.project?.progress ?? progress,
            }
          : item,
      ),
    );
    notify("Project metrics updated.");
  }

  async function submit(event: FormEvent<HTMLFormElement>, close: () => void) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);

    const blocked = isDateBlocked(String(form.get("dueDate") || ""), blockedDates);
    if (blocked) {
      const message = `This date falls in a blocked period: ${blocked.reason}`;
      setDateError(message);
      notify(message);
      return;
    }
    setDateError("");

    const response = await fetch("/api/forgeos/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(form.get("name") || ""),
        owner: String(form.get("owner") || role),
        status: "Planning",
        priority: String(form.get("priority") || ""),
        dueDate: String(form.get("dueDate") || ""),
        progress: 0,
        projectType: String(form.get("projectType") || "Company Project"),
        totalAmount: String(form.get("projectType") || "Company Project") === "Client Project" ? Number(form.get("totalAmount") || 0) : 0,
        amountReceived: String(form.get("projectType") || "Company Project") === "Client Project" ? Number(form.get("amountReceived") || 0) : 0,
      }),
    });

    const body = await readJson(response);
    if (!response.ok) {
      notify(body.error || "Unable to create project.");
      return;
    }

    setData((current) => [body.project, ...current]);
    element.reset();
    setProjectType("Company Project");
    close();
    notify("Project saved successfully.");
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        {projectViews.map((view) => {
          const count = view === "All Projects" ? projects.length : projects.filter((project) => project.projectType === view).length;
          const active = activeView === view;
          return (
            <button
              key={view}
              type="button"
              onClick={() => setActiveView(view)}
              className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                active ? "bg-[#121212] text-white" : "border border-[#121212]/10 bg-white text-[#121212]/65 hover:bg-[#121212]/5"
              }`}
            >
              {view} ({count})
            </button>
          );
        })}
      </div>
      <ModuleListPage
        title="Projects"
        description="Plan delivery, ownership, priorities, and deadlines."
        addLabel="Add Project"
        panelTitle="Add Project"
        loading={loading}
        flush
        form={(close) => (
          <SimpleForm onSubmit={(event) => submit(event, close)} submitLabel="Add Project">
            <TextField name="name" label="Name" required />
            <TextField name="owner" label="Owner" required />
            <SelectField name="projectType" label="Project Type" options={["Company Project", "Client Project"]} required onValueChange={(value) => setProjectType(value as ProjectType)} />
            {projectType === "Client Project" ? (
              <>
                <TextField name="totalAmount" label="Total Amount" type="number" required />
                <TextField name="amountReceived" label="Amount Received" type="number" required />
              </>
            ) : null}
            <SelectField name="priority" label="Priority" options={["Low", "Medium", "High"]} required />
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              required
              onValueChange={(value) => {
                const blocked = isDateBlocked(value.slice(0, 10), blockedDates);
                setDateError(blocked ? `This date falls in a blocked period: ${blocked.reason}` : "");
              }}
              error={dateError}
            />
          </SimpleForm>
        )}
      >
        <ProjectsTable
          projects={filteredProjects}
          emptyLabel={activeView === "All Projects" ? "No projects yet." : `No ${activeView.toLowerCase()} yet.`}
          onUpdateClientMetrics={updateClientMetrics}
        />
      </ModuleListPage>
    </>
  );
}
