"use client";
import { useEffect } from "react";
type SlideOverProps = { open: boolean; onClose: () => void; title: string; children: React.ReactNode };
export function SlideOver({ open, onClose, title, children }: SlideOverProps) {
  useEffect(() => { if (!open) return; function handleKey(event: KeyboardEvent) { if (event.key === "Escape") onClose(); } document.addEventListener("keydown", handleKey); document.body.style.overflow = "hidden"; return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; }; }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[90] flex justify-end"><div className="absolute inset-0 bg-[#121212]/30 backdrop-blur-sm transition-opacity duration-200" onClick={onClose} aria-hidden="true" /><aside role="dialog" aria-modal="true" aria-label={title} className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[#121212]/10 bg-[#F7F7F5] p-6 shadow-xl transition-transform duration-200"><div className="mb-5 flex items-center justify-between gap-4 border-b border-[#121212]/10 pb-4"><h3 className="text-xl font-medium tracking-tight">{title}</h3><button type="button" onClick={onClose} aria-label="Close panel" className="grid h-8 w-8 place-items-center rounded-lg text-lg font-semibold hover:bg-[#121212]/5">X</button></div>{children}<button type="button" onClick={onClose} className="mt-4 rounded-lg border border-[#121212]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#121212] hover:bg-[#121212]/5">Cancel</button></aside></div>;
}
