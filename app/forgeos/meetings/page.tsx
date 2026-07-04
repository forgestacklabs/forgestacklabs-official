"use client";
import { isDateBlocked } from "@/lib/blockedDates";
import { FormEvent, useState } from "react";
import type { EmployeeRecord } from "@/lib/employees";
import type { Meeting } from "@/lib/forgeosData";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import { ModuleListPage } from "@/components/forgeos/ModuleListPage";
import { CheckboxGroup, SelectField, SimpleForm, TextField, formatDateTime, readJson } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

const typeStyles: Record<string, string> = {
  Client: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Internal: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Review: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

function TypePill({ type }: { type: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        typeStyles[type] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
      }`}
    >
      {type}
    </span>
  );
}

function MeetingsTable({ meetings }: { meetings: Meeting[] }) {
  if (meetings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        No meetings scheduled.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[860px] table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[22%]" />
          <col className="w-[18%]" />
          <col className="w-[30%]" />
          <col className="w-[12%]" />
          <col className="w-[18%]" />
        </colgroup>
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">When</th>
            <th className="px-4 py-3 font-medium">Attendees</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Link</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {meetings.map((meeting) => (
            <tr key={meeting.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
              <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                {meeting.title}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                {formatDateTime(meeting.when)}
              </td>
              <td className="break-words px-4 py-3 text-neutral-600 dark:text-neutral-300">
                {meeting.attendees || "—"}
              </td>
              <td className="px-4 py-3">
                <TypePill type={meeting.type} />
              </td>
              <td className="px-4 py-3">
                {meeting.meetingLink ? (
                  
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Join
                  </a>
                ) : (
                  <span className="text-neutral-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MeetingsPage() {
  const { notify, blockedDates } = useForgeOS();
  const [dateError, setDateError] = useState("");
  const { data: meetings, setData, loading } = useApiData<Meeting[]>("/api/forgeos/meetings", []);
  const { data: employees, loading: employeesLoading } = useApiData<EmployeeRecord[]>("/api/employees", []);
  const attendeeOptions = employees
    .filter((employee) => employee.status === "Active")
    .map((employee) => ({
      value: employee.name,
      detail: `${employee.designation}${employee.department ? ` · ${employee.department}` : ""}`,
    }));

  async function submit(event: FormEvent<HTMLFormElement>, close: () => void) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);

    const blocked = isDateBlocked(String(form.get("when") || "").slice(0, 10), blockedDates);
    if (blocked) {
      const message = `This date falls in a blocked period: ${blocked.reason}`;
      setDateError(message);
      notify(message);
      return;
    }
    setDateError("");

    const response = await fetch("/api/forgeos/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: String(form.get("title") || ""),
        when: String(form.get("when") || ""),
        attendees: form.getAll("attendees").map(String).join(", "),
        type: String(form.get("type") || ""),
        meetingLink: String(form.get("meetingLink") || ""),
      }),
    });

    const body = await readJson(response);
    if (!response.ok) {
      notify(body.error || "Unable to schedule meeting.");
      return;
    }

    setData((current) => [body.meeting, ...current]);
    element.reset();
    close();
    notify("Meeting saved successfully.");
  }

  return (
    <ModuleListPage
      title="Meetings"
      description="Schedule meetings and link attendees to employee records."
      addLabel="Schedule Meeting"
      panelTitle="Schedule Meeting"
      loading={loading || employeesLoading}
      flush
      form={(close) => (
        <SimpleForm onSubmit={(event) => submit(event, close)} submitLabel="Schedule Meeting">
          <TextField name="title" label="Title" required />
          <TextField
            name="when"
            label="When"
            type="datetime-local"
            required
            onValueChange={(value) => {
              const blocked = isDateBlocked(value.slice(0, 10), blockedDates);
              setDateError(blocked ? `This date falls in a blocked period: ${blocked.reason}` : "");
            }}
            error={dateError}
          />
          <CheckboxGroup name="attendees" label="Attendees" options={attendeeOptions} />
          <SelectField name="type" label="Type" options={["Client", "Internal", "Review"]} required />
          <TextField name="meetingLink" label="Meeting Link" type="url" />
        </SimpleForm>
      )}
    >
      <MeetingsTable meetings={meetings} />
    </ModuleListPage>
  );
}