"use client";
import { isDateBlocked } from "@/lib/blockedDates";
import { FormEvent, useState } from "react";
import type { Lead } from "@/lib/forgeosData";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import { ModuleListPage } from "@/components/forgeos/ModuleListPage";
import { SelectField, SimpleForm, TextField, formatLongDate, money, readJson } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

const stageStyles: Record<string, string> = {
  New: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Contacted: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Qualified: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Won: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Lost: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

function StagePill({ stage }: { stage: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        stageStyles[stage] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
      }`}
    >
      {stage}
    </span>
  );
}

function formatFollowUp(value: string) {
  return formatLongDate(value, "Not set");
}

function CRMTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        No leads yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[960px] table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[16%]" />
          <col className="w-[12%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[10%]" />
        </colgroup>
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <tr>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Contact</th>
            <th className="px-4 py-3 font-medium">Owner</th>
            <th className="px-4 py-3 font-medium">Stage</th>
            <th className="px-4 py-3 font-medium">Source</th>
            <th className="px-4 py-3 font-medium">Follow Up</th>
            <th className="px-4 py-3 font-medium">Notes</th>
            <th className="px-4 py-3 text-right font-medium">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
              <td className="px-4 py-3">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">{lead.company}</div>
              </td>
              <td className="px-4 py-3">
                <div className="text-neutral-700 dark:text-neutral-300">{lead.contact}</div>
                {lead.email && (
                  <div className="text-xs text-neutral-400">{lead.email}</div>
                )}
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                {lead.owner || "Unassigned"}
              </td>
              <td className="px-4 py-3">
                <StagePill stage={lead.stage} />
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{lead.source || "—"}</td>
              <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                {formatFollowUp(lead.nextFollowUp)}
              </td>
              <td className="break-words px-4 py-3 text-neutral-500 dark:text-neutral-400">
                {lead.notes || "—"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                {money(lead.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CRMPage() {
  const { notify, blockedDates } = useForgeOS();
  const [dateError, setDateError] = useState("");
  const { data: leads, setData, loading } = useApiData<Lead[]>("/api/forgeos/crm", [], 10000);

  async function submit(event: FormEvent<HTMLFormElement>, close: () => void) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);

    const blocked = isDateBlocked(String(form.get("nextFollowUp") || ""), blockedDates);
    if (blocked) {
      const message = `This date falls in a blocked period: ${blocked.reason}`;
      setDateError(message);
      notify(message);
      return;
    }
    setDateError("");

    const payload = Object.fromEntries(form);
    const response = await fetch("/api/forgeos/crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, value: Number(form.get("value") || 0) }),
    });

    const body = await readJson(response);
    if (!response.ok) {
      notify(body.error || "Unable to add CRM lead.");
      return;
    }

    setData((current) => [body.lead, ...current]);
    element.reset();
    close();
    notify("CRM lead saved successfully.");
  }

  return (
    <ModuleListPage
      title="CRM"
      description="Manage leads, deal value, and follow-up activity."
      addLabel="Add Lead"
      panelTitle="Add Lead"
      loading={loading}
      flush
      form={(close) => (
        <SimpleForm onSubmit={(event) => submit(event, close)} submitLabel="Add Lead">
          <TextField name="company" label="Company" required />
          <TextField name="contact" label="Contact Name" required />
          <TextField name="email" label="Email" type="email" />
          <TextField name="phone" label="Phone" type="tel" />
          <SelectField name="source" label="Source" options={["Website", "Referral", "Outbound", "LinkedIn", "Other"]} />
          <TextField name="value" label="Estimated Deal Value (INR)" type="number" />
          <TextField
            name="nextFollowUp"
            label="Next Follow Up"
            type="date"
            onValueChange={(value) => {
              const blocked = isDateBlocked(value.slice(0, 10), blockedDates);
              setDateError(blocked ? `This date falls in a blocked period: ${blocked.reason}` : "");
            }}
            error={dateError}
          />
          <TextField name="notes" label="Notes" />
        </SimpleForm>
      )}
    >
      <CRMTable leads={leads} />
    </ModuleListPage>
  );
}