"use client";
import { isDateBlocked } from "@/lib/blockedDates";
import { FormEvent, useState } from "react";
import type { Expense, Project } from "@/lib/forgeosData";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import { ModuleListPage } from "@/components/forgeos/ModuleListPage";
import {
  BurnRateWidget,
  CashPositionWidget,
  MonthlyExpensesWidget,
  PendingPaymentsWidget,
  RevenueOverviewWidget,
} from "@/components/forgeos/finance";
import { PageHeading, SectionLoading, SimpleForm, TextField, money, readJson } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

const statusStyles: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Rejected: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  Pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        statusStyles[status] ?? statusStyles.Pending
      }`}
    >
      {status}
    </span>
  );
}

function formatExpenseDate(value: string) {
  if (!value) return "No date";
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ExpensesTable({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        No expenses yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[860px] table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[22%]" />
          <col className="w-[14%]" />
          <col className="w-[14%]" />
          <col className="w-[14%]" />
          <col className="w-[16%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 text-right font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Submitted By</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-4 py-3 font-medium text-neutral-900">{expense.title}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-neutral-900">
                {money(expense.amount)}
              </td>
              <td className="px-4 py-3 text-neutral-600">{expense.submittedRole || "No role"}</td>
              <td className="px-4 py-3">
                <StatusPill status={expense.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                {formatExpenseDate(expense.expenseDate)}
              </td>
              <td className="break-words px-4 py-3 text-neutral-500">{expense.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinanceOverview({ expenses, projects }: { expenses: Expense[]; projects: Project[] }) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Overview
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RevenueOverviewWidget  />
        <CashPositionWidget  />
        <BurnRateWidget expenses={expenses} />
        <MonthlyExpensesWidget expenses={expenses} />
        <PendingPaymentsWidget projects={projects} />
      </div>
    </section>
  );
}

export default function FinancePage() {
  const { notify, blockedDates } = useForgeOS();
  const [dateError, setDateError] = useState("");
  const { data: expenses, setData, loading } = useApiData<Expense[]>("/api/forgeos/expenses", [], 10000);
  const { data: projects, loading: projectsLoading } = useApiData<Project[]>("/api/forgeos/projects", []);

  if (loading || projectsLoading) {
    return (
      <>
        <PageHeading title="Finance" description="Company spending, burn rate, and payment visibility." />
        <SectionLoading label="Loading finance" />
      </>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>, close: () => void) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);

    const blocked = isDateBlocked(String(form.get("expenseDate") || ""), blockedDates);
    if (blocked) {
      const message = `This date falls in a blocked period: ${blocked.reason}`;
      setDateError(message);
      notify(message);
      return;
    }
    setDateError("");

    const response = await fetch("/api/forgeos/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: String(form.get("title") || ""),
        amount: Number(form.get("amount") || 0),
        expenseDate: String(form.get("expenseDate") || ""),
        notes: String(form.get("notes") || ""),
      }),
    });

    const body = await readJson(response);
    if (!response.ok) {
      notify(body.error || "Unable to submit expense.");
      return;
    }

    setData((current) => [body.expense, ...current]);
    element.reset();
    close();
    notify("Expense saved successfully.");
  }

  return (
    <>
      <PageHeading title="Finance" description="Company spending, burn rate, and payment visibility." />
      <FinanceOverview expenses={expenses} projects={projects} />
      <ModuleListPage
        title="Expense Tracker"
        description="Submit company expenses and monitor approval status."
        addLabel="Submit Expense"
        panelTitle="Submit Expense"
        loading={loading}
        flush
        form={(close) => (
          <SimpleForm onSubmit={(event) => submit(event, close)} submitLabel="Submit Expense">
            <TextField name="title" label="Title" required />
            <TextField name="amount" label="Amount" type="number" required />
            <TextField
              name="expenseDate"
              label="Expense Date"
              type="date"
              required
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
        <ExpensesTable expenses={expenses} />
      </ModuleListPage>
    </>
  );
}
