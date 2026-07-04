"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, Dispatch, FormEvent, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { moduleLabels, roleAccess, roleProfiles, type BlockedDateRange, type ForgeModule, type ForgeRole } from "@/lib/forgeosData";
import { inputClass, labelClass } from "@/components/forgeos/ui";

type SessionUser = { name: string; email: string };
type ForgeOSContextValue = { role: ForgeRole; user: SessionUser; notify: (message: string) => void; blockedDates: BlockedDateRange[]; setBlockedDates: Dispatch<SetStateAction<BlockedDateRange[]>> };
const ForgeOSContext = createContext<ForgeOSContextValue | null>(null);

export function useForgeOS() {
  const value = useContext(ForgeOSContext);
  if (!value) throw new Error("useForgeOS must be used inside ForgeOSShell.");
  return value;
}

const paths: Record<ForgeModule, string> = {
  dashboard: "/forgeos", projects: "/forgeos/projects", tasks: "/forgeos/tasks", crm: "/forgeos/crm",
  finance: "/forgeos/finance", documents: "/forgeos/documents", calendar: "/forgeos/calendar",
  meetings: "/forgeos/meetings", notifications: "/forgeos/notifications",
};

function moduleFromPath(pathname: string): ForgeModule {
  const match = (Object.entries(paths) as Array<[ForgeModule, string]>).find(([, path]) => path === pathname);
  return match?.[0] || "dashboard";
}

function LoginGate({ onLogin }: { onLogin: (role: ForgeRole, user: SessionUser) => void }) {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("Checking credentials...");
    try {
      const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminEmail, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed.");
      setPassword(""); setStatus("");
      onLogin(data.role || "Employee", { name: data.name || data.email || "ForgeOS User", email: data.email || adminEmail });
    } catch (error) { setStatus(error instanceof Error ? error.message : "Login failed."); }
  }
  return <main className="min-h-screen bg-[#F7F7F5] px-5 pb-24 pt-28 text-[#121212]"><section className="mx-auto max-w-md rounded-xl border border-[#121212]/10 bg-white p-8 shadow-md"><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#8BA888]">ForgeOS</p><h1 className="mb-8 text-3xl font-medium">Secure Access</h1><form onSubmit={submit} className="grid gap-5"><div><label htmlFor="forgeos-email" className={labelClass}>Email</label><input id="forgeos-email" type="email" required value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} className={inputClass} /></div><div><label htmlFor="forgeos-password" className={labelClass}>Password</label><input id="forgeos-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} /></div><button className="mt-1 rounded-lg bg-[#121212] px-4 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white">Login</button>{status && <p className="text-sm text-[#121212]/60">{status}</p>}</form></section></main>;
}

export default function ForgeOSShell({ children }: { children: ReactNode }) {
  const pathname = usePathname(); const router = useRouter();
  const [checking, setChecking] = useState(true); const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<ForgeRole>("Employee"); const [user, setUser] = useState<SessionUser>({ name: "ForgeOS User", email: "" });
  const [message, setMessage] = useState(""); const [blockedDates, setBlockedDates] = useState<BlockedDateRange[]>([]);
  useEffect(() => { fetch("/api/admin/session").then(async (response) => { if (!response.ok) return; const data = await response.json(); setAuthenticated(true); setRole(data.role || "Employee"); setUser({ name: data.name || data.email || "ForgeOS User", email: data.email || "" }); }).finally(() => setChecking(false)); }, []);
  useEffect(() => { if (!authenticated) return; fetch("/api/forgeos/blocked-dates").then(async (response) => { if (!response.ok) return; const data = await response.json(); setBlockedDates(data.blockedDates || []); }).catch(() => undefined); }, [authenticated]);
  useEffect(() => { if (!message) return; const timeout = window.setTimeout(() => setMessage(""), 6000); return () => window.clearTimeout(timeout); }, [message]);
  const activeModule = moduleFromPath(pathname);
  const routeAllowed = roleAccess[role].includes(activeModule);
  useEffect(() => { if (authenticated && !roleAccess[role].includes(activeModule)) router.replace("/forgeos"); }, [activeModule, authenticated, role, router]);
  const context = useMemo(() => ({ role, user, notify: setMessage, blockedDates, setBlockedDates }), [role, user, blockedDates]);
  async function logout() { await fetch("/api/admin/session", { method: "DELETE" }); setAuthenticated(false); router.replace("/forgeos"); }
  if (checking) return <main className="flex min-h-screen items-center justify-center bg-[#F7F7F5] pt-28"><p className="text-sm text-[#121212]/60">Checking ForgeOS session...</p></main>;
  if (!authenticated) return <LoginGate onLogin={(nextRole, nextUser) => { setRole(nextRole); setUser(nextUser); setAuthenticated(true); }} />;
  const profile = roleProfiles[role];
  return <ForgeOSContext.Provider value={context}><main className="min-h-screen bg-[#F7F7F5] px-4 pb-16 pt-6 text-[#121212] sm:px-6 sm:pt-8 lg:px-8">{message && <div role="alert" className={`fixed left-1/2 top-6 z-[100] flex w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-lg border px-5 py-4 text-sm font-semibold shadow-xl ${message.endsWith("successfully.") ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-900"}`}><span>{message}</span><button type="button" onClick={() => setMessage("")} aria-label="Dismiss notification" className="grid h-7 w-7 place-items-center rounded-md hover:bg-black/5">X</button></div>}<section className="mx-auto grid max-w-[96rem] gap-7 lg:grid-cols-[17.5rem_minmax(0,1fr)]"><aside className="h-fit rounded-xl border border-[#121212]/10 bg-white p-5 shadow-sm lg:sticky lg:top-6"><div className="mb-6 flex items-start justify-between gap-3 border-b border-[#121212]/10 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8BA888]">ForgeOS</p><h1 className="text-2xl font-medium">V1</h1></div><button onClick={logout} className="rounded-lg border border-[#121212]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#121212]/60">Logout</button></div><div className="mb-6 rounded-lg border border-[#121212]/10 bg-[#F7F7F5] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#121212]/45">Signed in as</p><p className="mt-1 text-sm font-semibold">{user.name}</p><p className="text-xs text-[#121212]/50">{user.email}</p><span className="mt-3 inline-flex rounded-full bg-[#8BA888]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5F7F5C]">{role}</span></div><nav className="grid gap-1">{roleAccess[role].map((module) => <Link key={module} href={paths[module]} className={`rounded-lg px-3.5 py-3 text-sm transition-colors ${activeModule === module ? "bg-[#8BA888]/15 font-semibold text-[#121212]" : "text-[#121212]/60 hover:bg-[#121212]/5"}`}>{moduleLabels[module]}</Link>)}</nav></aside><section className="min-w-0"><header className="mb-7 rounded-xl border border-[#121212]/10 bg-white p-7 shadow-sm"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: profile.accent }}>{role} Workspace</p><h2 className="text-3xl font-medium md:text-5xl">{profile.title}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#121212]/60">{profile.purpose}</p></header>{routeAllowed ? children : null}</section></section></main></ForgeOSContext.Provider>;
}
