"use client";

import { FormEvent, useMemo, useState } from "react";

type CertificateRecord = {
  serial: string;
  name: string;
  email: string;
  certificateType: "Internship" | "Employment";
  role: string;
  issuedOn: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
};

type FormState = {
  name: string;
  email: string;
  certificateType: "Internship" | "Employment";
  role: string;
  issuedOn: string;
  startDate: string;
  endDate: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  certificateType: "Internship",
  role: "",
  issuedOn: new Date().toISOString().slice(0, 10),
  startDate: "",
  endDate: "",
  notes: "",
};

const inputClass =
  "w-full rounded-2xl border border-[#121212]/10 bg-white/65 px-5 py-4 text-sm text-[#121212] outline-none transition focus:border-[#8BA888]/70 focus:bg-white";
const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.32em] text-[#121212]/45";
const publicSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://forgestacklabs.com").replace(/\/$/, "");

function qrImageUrl(url: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(url)}`;
}

export default function AdminPage() {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [records, setRecords] = useState<CertificateRecord[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [created, setCreated] = useState<CertificateRecord | null>(null);
  const [status, setStatus] = useState("");

  const verificationUrl = useMemo(() => {
    if (!created) return "";
    return `${publicSiteUrl}/verify/${created.serial}`;
  }, [created]);

  async function loadRecords(nextEmail = adminEmail, nextPassword = password) {
    const response = await fetch("/api/certificates", {
      headers: { "x-admin-email": nextEmail, "x-admin-password": nextPassword },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to load records.");
    setRecords(data.records || []);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Checking credentials...");

    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: "login", adminEmail, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid email or password.");
      setAuthenticated(true);
      setStatus("");
      await loadRecords(adminEmail, password);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed.");
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Generating certificate record...");
    setCreated(null);

    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, adminEmail, password, intent: "create" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create record.");
      setCreated(data.record);
      setForm(initialForm);
      setStatus("Certificate record created.");
      await loadRecords();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to create record.");
    }
  }

  return (
    <main className="relative min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-28 text-[#121212]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-15%] h-[40rem] w-[40rem] rounded-full bg-[#8BA888]/14 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-[#D4A373]/14 blur-[120px]" />
      </div>

      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">Internal Admin</p>
        <h1 className="mb-5 text-5xl font-medium tracking-tight md:text-7xl">Certificate Verification</h1>
        <p className="max-w-3xl text-base leading-relaxed text-[#121212]/60">
          Generate serial numbers and QR verification links for internship and employment certificates.
        </p>
      </section>

      {!authenticated ? (
        <section className="mx-auto mt-14 max-w-xl rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-12">
          <form onSubmit={handleLogin} className="grid gap-5">
            <div>
              <label htmlFor="admin-email" className={labelClass}>Admin Email</label>
              <input
                id="admin-email"
                type="email"
                required
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className={labelClass}>Admin Password</label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
              />
            </div>
            <button className="rounded-full bg-[#121212] px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#121212]/85">
              Login
            </button>
            {status && <p className="text-sm text-[#121212]/60">{status}</p>}
          </form>
        </section>
      ) : (
        <section className="mx-auto mt-14 grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-12">
            <h2 className="mb-8 text-3xl font-medium tracking-tight">Generate Certificate Record</h2>
            <form onSubmit={handleCreate} className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name</label>
                  <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="type" className={labelClass}>Certificate Type</label>
                  <select id="type" value={form.certificateType} onChange={(e) => setForm({ ...form, certificateType: e.target.value as FormState["certificateType"] })} className={inputClass}>
                    <option>Internship</option>
                    <option>Employment</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="role" className={labelClass}>Role / Track</label>
                  <input id="role" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass} />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label htmlFor="issuedOn" className={labelClass}>Issued On</label>
                  <input id="issuedOn" type="date" required value={form.issuedOn} onChange={(e) => setForm({ ...form, issuedOn: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="startDate" className={labelClass}>Start Date</label>
                  <input id="startDate" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="endDate" className={labelClass}>End Date</label>
                  <input id="endDate" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className={labelClass}>Notes</label>
                <textarea id="notes" rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputClass} resize-none`} />
              </div>

              <button className="rounded-full bg-[#121212] px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#121212]/85">
                Generate Serial & QR
              </button>
              {status && <p className="text-sm text-[#121212]/60">{status}</p>}
            </form>
          </div>

          <div className="grid gap-8">
            {created && verificationUrl && (
              <div className="rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-10">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#8BA888]">Generated</p>
                <h2 className="mb-3 text-3xl font-medium tracking-tight">{created.serial}</h2>
                <p className="mb-6 text-sm text-[#121212]/60">QR redirects to the public verification page.</p>
                {/* eslint-disable-next-line @next/next/no-img-element -- QR is generated by an external service. */}
                <img src={qrImageUrl(verificationUrl)} alt={`QR code for ${created.serial}`} className="mb-6 h-64 w-64 rounded-2xl bg-white p-3" />
                <a href={verificationUrl} target="_blank" rel="noreferrer" className="break-all text-sm font-medium text-[#8BA888]">
                  {verificationUrl}
                </a>
              </div>
            )}

            <div className="rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-10">
              <h2 className="mb-6 text-2xl font-medium tracking-tight">Saved Records</h2>
              <div className="grid max-h-[28rem] gap-3 overflow-auto pr-2">
                {records.length === 0 ? (
                  <p className="text-sm text-[#121212]/55">No records yet.</p>
                ) : (
                  records.map((record) => (
                    <div key={record.serial} className="rounded-2xl border border-[#121212]/10 bg-white/50 p-4">
                      <p className="text-sm font-semibold text-[#121212]">{record.name}</p>
                      <p className="text-xs text-[#121212]/55">{record.role} · {record.certificateType}</p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8BA888]">{record.serial}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}







