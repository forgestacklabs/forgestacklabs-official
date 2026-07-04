"use client";
import { useState } from "react";
import { panelClass } from "./ui";
import { SlideOver } from "./SlideOver";
type Props = { title: string; description?: string; addLabel: string; panelTitle: string; form: (close: () => void) => React.ReactNode; children: React.ReactNode; flush?: boolean; loading?: boolean };
export function ModuleListPage({ title, description, addLabel, panelTitle, form, children, flush = false, loading = false }: Props) {
  const [open, setOpen] = useState(false); const close = () => setOpen(false);
  return <><div className="mb-6 flex items-start justify-between gap-4"><div><h3 className="text-2xl font-semibold">{title}</h3>{description && <p className="mt-1 text-sm text-[#121212]/55">{description}</p>}</div><button type="button" onClick={() => setOpen(true)} className="shrink-0 rounded-lg bg-[#121212] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-opacity duration-150 hover:opacity-90">{addLabel}</button></div><div className={`${flush ? "" : panelClass} xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto`}><div className="grid gap-3.5">{loading ? <div className="flex min-h-40 items-center justify-center" role="status" aria-label="Loading data"><span className="h-8 w-8 animate-spin rounded-full border-2 border-[#121212]/15 border-t-[#121212]" /></div> : children}</div></div><SlideOver open={open} onClose={close} title={panelTitle}>{form(close)}</SlideOver></>;
}
