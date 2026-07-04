"use client";
import { FormEvent } from "react";
import type { DocumentRecord } from "@/lib/forgeosData";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import { ModuleListPage } from "@/components/forgeos/ModuleListPage";
import { SelectField, SimpleForm, TextField, readJson } from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

const visibilityStyles: Record<string, string> = {
  Leadership: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Engineering: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Operations: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Company: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

function VisibilityPill({ visibility }: { visibility: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        visibilityStyles[visibility] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
      }`}
    >
      {visibility}
    </span>
  );
}

function DocumentsTable({ documents }: { documents: DocumentRecord[] }) {
  if (documents.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        No documents yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[760px] table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[30%]" />
          <col className="w-[20%]" />
          <col className="w-[18%]" />
          <col className="w-[16%]" />
          <col className="w-[16%]" />
        </colgroup>
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Owner</th>
            <th className="px-4 py-3 font-medium">Visibility</th>
            <th className="px-4 py-3 font-medium">File</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {documents.map((document) => (
            <tr key={document.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
              <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                {document.title}
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{document.category}</td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">{document.owner}</td>
              <td className="px-4 py-3">
                <VisibilityPill visibility={document.visibility} />
              </td>
              <td className="px-4 py-3">
                {document.fileUrl ? (
                  
                  <a
                    href={document.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Open
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

export default function DocumentsPage() {
  const { notify } = useForgeOS();
  const { data: documents, setData, loading } = useApiData<DocumentRecord[]>("/api/forgeos/documents", []);

  async function submit(event: FormEvent<HTMLFormElement>, close: () => void) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);

    const response = await fetch("/api/forgeos/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });

    const body = await readJson(response);
    if (!response.ok) {
      notify(body.error || "Unable to add document.");
      return;
    }

    setData((current) => [body.document, ...current]);
    element.reset();
    close();
    notify("Document saved successfully.");
  }

  return (
    <ModuleListPage
      title="Documents"
      description="Centralize company documents and control visibility."
      addLabel="Add Document"
      panelTitle="Add Document"
      loading={loading}
      flush
      form={(close) => (
        <SimpleForm onSubmit={(event) => submit(event, close)} submitLabel="Add Document">
          <TextField name="title" label="Title" required />
          <TextField name="category" label="Category" required />
          <SelectField
            name="visibility"
            label="Visibility"
            options={["Leadership", "Engineering", "Operations", "Company"]}
            required
          />
          <TextField name="fileUrl" label="File URL" type="url" required />
        </SimpleForm>
      )}
    >
      <DocumentsTable documents={documents} />
    </ModuleListPage>
  );
}