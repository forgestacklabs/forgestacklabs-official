"use client";
import { isDateBlocked } from "@/lib/blockedDates";
import { FormEvent, useState } from "react";
import type { EmployeeRecord } from "@/lib/employees";
import type { Project, Task } from "@/lib/forgeosData";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import { ModuleListPage } from "@/components/forgeos/ModuleListPage";
import { SelectField, SimpleForm, TextField, formatLongDate, readJson } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

function AssigneeBadge({ name }: { name: string }) {
  return (
    <span className="text-sm text-neutral-700 dark:text-neutral-200">{name}</span>
  );
}

const priorityStyles: Record<string, string> = {
  High: "bg-red-300 text-red-700 dark:bg-red-950 dark:text-red-300",
  Medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Low: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
};

function PriorityPill({ priority }: { priority: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        priorityStyles[priority] ?? priorityStyles.Low
      }`}
    >
      {priority}
    </span>
  );
}

function TasksTable({ tasks, loading }: { tasks: Task[]; loading: boolean }) {
  if (loading) return <div className="flex min-h-40 items-center justify-center" role="status" aria-label="Loading tasks"><span className="h-8 w-8 animate-spin rounded-full border-2 border-[#121212]/15 border-t-[#121212]" /></div>;
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        No tasks yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <tr>
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Project</th>
            <th className="px-4 py-3 font-medium">Assignee</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Due Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-4 py-3">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">{task.title}</div>
                <div className="text-xs text-neutral-400">{task.id}</div>
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{task.project}</td>
              <td className="px-4 py-3">
                <AssigneeBadge name={task.assignee} />
              </td>
              <td className="px-4 py-3">
                <PriorityPill priority={task.priority} />
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{task.status}</td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{formatLongDate(task.dueDate, "No date")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TasksPage() {
  const { role, user, notify, blockedDates } = useForgeOS();
  const [dateError, setDateError] = useState("");
  const { data: tasks, setData, loading } = useApiData<Task[]>("/api/forgeos/tasks", []);
  const { data: projects, loading: projectsLoading } = useApiData<Project[]>("/api/forgeos/projects", []);
  const { data: employees, loading: employeesLoading } = useApiData<EmployeeRecord[]>("/api/employees", []);

  const visible = role === "Employee" ? tasks.filter((task) => task.assignee === user.name) : tasks;
  const projectOptions = projects.map((project) => project.name);
  const assignees = employees.filter((employee) => employee.status === "Active").map((employee) => employee.name);

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

    const response = await fetch("/api/forgeos/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: String(form.get("title") || ""),
        project: String(form.get("project") || ""),
        assignee: String(form.get("assignee") || ""),
        status: "Todo",
        priority: String(form.get("priority") || ""),
        dueDate: String(form.get("dueDate") || ""),
      }),
    });

    const body = await readJson(response);
    if (!response.ok) {
      notify(body.error || "Unable to create task.");
      return;
    }

    setData((current) => [body.task, ...current]);
    element.reset();
    close();
    notify("Task saved successfully.");
  }

  return (
    <ModuleListPage
      title="Tasks"
      description="Assign work to employees and track delivery."
      addLabel="Add Task"
      panelTitle="Add Task"
      loading={loading || projectsLoading || employeesLoading}
      flush
      form={(close) => (
        <SimpleForm onSubmit={(event) => submit(event, close)} submitLabel="Add Task">
          <TextField name="title" label="Title" required />
          <SelectField name="project" label="Project" options={projectOptions} required />
          <SelectField name="assignee" label="Assignee" options={assignees} required />
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
      <TasksTable tasks={visible} loading={loading} />
    </ModuleListPage>
  );
}