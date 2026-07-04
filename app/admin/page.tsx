"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const inputClass =
  "w-full rounded-2xl border border-[#121212]/10 bg-white/65 px-5 py-4 text-sm text-[#121212] outline-none transition focus:border-[#8BA888]/70 focus:bg-white";
const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.32em] text-[#121212]/45";
const cardClass =
  "group rounded-[2rem] border border-white/70 bg-white/55 p-8 text-left shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl transition hover:-translate-y-1 hover:border-[#8BA888]/50 hover:bg-white/75";

export default function AdminPage() {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => setAuthenticated(response.ok))
      .catch(() => setAuthenticated(false))
      .finally(() => setCheckingSession(false));
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Checking credentials...");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid email or password.");

      setAuthenticated(true);
      setPassword("");
      setStatus("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setPassword("");
    setStatus("");
  }

  return (
    <main className="relative min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-28 text-[#121212]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-15%] h-[40rem] w-[40rem] rounded-full bg-[#8BA888]/14 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-[#D4A373]/14 blur-[120px]" />
      </div>

      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">Internal Admin</p>
        <h1 className="mb-5 text-5xl font-medium tracking-tight md:text-7xl">
          {authenticated ? "Admin Console" : "Admin Login"}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-[#121212]/60">
          {authenticated
            ? "Choose a workspace to manage employees or certification records."
            : "Login to access employee and certification administration."}
        </p>
      </section>

      {checkingSession ? (
        <section className="mx-auto mt-14 max-w-xl rounded-[2.5rem] border border-white/70 bg-white/55 p-8 text-sm text-[#121212]/60 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-12">
          Checking admin session...
        </section>
      ) : !authenticated ? (
        <section className="mx-auto mt-14 max-w-xl rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-12">
          <form onSubmit={handleLogin} className="grid gap-5">
            <div>
              <label htmlFor="admin-email" className={labelClass}>Admin Email</label>
              <input id="admin-email" type="email" required value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="admin-password" className={labelClass}>Admin Password</label>
              <input id="admin-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} />
            </div>
            <button className="rounded-full bg-[#121212] px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#121212]/85">
              Login
            </button>
            {status && <p className="text-sm text-[#121212]/60">{status}</p>}
          </form>
        </section>
      ) : (
        <section className="mx-auto mt-14 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/admin/employees" className={cardClass}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#8BA888]">Employees</p>
              <h2 className="text-3xl font-medium tracking-tight">Employees & Designations</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#121212]/55">Open employee records, designation details, and the add employee form.</p>
            </Link>
            <Link href="/admin/certification" className={cardClass}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#8BA888]">Certification</p>
              <h2 className="text-3xl font-medium tracking-tight">Certificate Records</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#121212]/55">Open saved certificate records and generate new verification links.</p>
            </Link>
          </div>
          <button onClick={handleLogout} className="mt-8 rounded-full border border-[#121212]/10 bg-white/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[#121212]/60 transition hover:bg-white">
            Logout
          </button>
        </section>
      )}
    </main>
  );
}