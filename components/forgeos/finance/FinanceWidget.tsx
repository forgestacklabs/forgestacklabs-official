import type { ReactNode } from "react";
import { panelClass } from "@/components/forgeos/ui";

export function FinanceWidget({ label, value, detail, children }: { label: string; value: string; detail: string; children?: ReactNode }) {
  return (
    <section className={panelClass}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#121212]/45">{label}</p>
      <p className="mt-3 text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-[#121212]/55">{detail}</p>
      {children}
    </section>
  );
}
