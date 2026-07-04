"use client";
import { isDateBlocked } from "@/lib/blockedDates";
import { FormEvent, useState } from "react";
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
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        styles[label] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
      }`}
    >
      {label}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-neutral-900 dark:bg-neutral-100"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">{clamped}%</span>
    </div>
  );
}

function ProjectsTable({ projects, emptyLabel }: { projects: Project[]; emptyLabel?: string }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        {emptyLabel || "No projects yet."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[1100px] table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[20%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[8%]" />
          <col className="w-[8%]" />
        </colgroup>
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Owner</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Due Date</th>
            <th className="px-4 py-3 font-medium">Client Value</th>
            <th className="px-4 py-3 font-medium">Received</th>
            <th className="px-4 py-3 font-medium">Progress</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
              <td className="px-4 py-3">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">{project.name}</div>
                <div className="text-xs text-neutral-400">{project.id}</div>
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{project.owner}</td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{project.projectType}</td>
              <td className="px-4 py-3">
                <Pill label={project.status} styles={statusStyles} />
              </td>
              <td className="px-4 py-3">
                <Pill label={project.priority} styles={priorityStyles} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                {formatLongDate(project.dueDate, "No date")}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                {project.projectType === "Client Project" ? money(project.totalAmount) : "-"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                {project.projectType === "Client Project" ? money(project.amountReceived) : "-"}
              </td>
              <td className="px-4 py-3">
                <ProgressBar value={project.progress} />
              </td>
            </tr>
          ))}
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
  const filteredProjects =
    activeView === "All Projects" ? projects : projects.filter((project) => project.projectType === activeView);

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
                active
                  ? "bg-[#121212] text-white"
                  : "border border-[#121212]/10 bg-white text-[#121212]/65 hover:bg-[#121212]/5"
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
      <ProjectsTable projects={filteredProjects} emptyLabel={activeView === "All Projects" ? "No projects yet." : `No ${activeView.toLowerCase()} yet.`} />
    </ModuleListPage>
    </>
  );
}