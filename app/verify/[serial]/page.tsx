import Link from "next/link";
import { findCertificate } from "@/lib/certificates";

function formatDate(value?: string) {
  if (!value) return "Not specified";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

export default async function VerifyCertificatePage({ params }: { params: { serial: string } }) {
  const record = await findCertificate(params.serial);

  return (
    <main className="relative min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-28 text-[#121212]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-15%] h-[40rem] w-[40rem] rounded-full bg-[#8BA888]/14 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-[#D4A373]/14 blur-[120px]" />
      </div>

      <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[2.5rem] border border-white/70 bg-white/60 p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-14">
          {record ? (
            <>
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#8BA888] text-2xl text-white">✓</div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">Verified Certificate</p>
              <h1 className="mb-3 text-4xl font-medium tracking-tight md:text-6xl">{record.name}</h1>
              <p className="mb-8 text-base leading-relaxed text-[#121212]/60">
                This {record.certificateType.toLowerCase()} record was issued by Forgestack Labs LLP.
              </p>

              <div className="mx-auto grid max-w-2xl gap-4 text-left md:grid-cols-2">
                <div className="rounded-2xl border border-[#121212]/10 bg-white/55 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#121212]/40">Serial</p>
                  <p className="mt-2 font-medium">{record.serial}</p>
                </div>
                <div className="rounded-2xl border border-[#121212]/10 bg-white/55 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#121212]/40">Role</p>
                  <p className="mt-2 font-medium">{record.role}</p>
                </div>
                <div className="rounded-2xl border border-[#121212]/10 bg-white/55 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#121212]/40">Issued On</p>
                  <p className="mt-2 font-medium">{formatDate(record.issuedOn)}</p>
                </div>
                <div className="rounded-2xl border border-[#121212]/10 bg-white/55 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#121212]/40">Duration</p>
                  <p className="mt-2 font-medium">{formatDate(record.startDate)} - {formatDate(record.endDate)}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A373] text-2xl text-white">!</div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">Not Verified</p>
              <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-6xl">Record not found.</h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-[#121212]/60">
                We could not find a Forgestack Labs certificate record for serial number {params.serial}.
              </p>
            </>
          )}

          <Link href="/" className="mt-10 inline-flex rounded-full bg-[#121212] px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#121212]/85">
            Back To Forgestack Labs
          </Link>
        </div>
      </section>
    </main>
  );
}
