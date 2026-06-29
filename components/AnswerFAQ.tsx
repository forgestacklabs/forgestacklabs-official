import type { AnswerItem } from "@/lib/aeo-content";

type AnswerFAQProps = {
  id: string;
  eyebrow: string;
  title: string;
  introduction: string;
  items: AnswerItem[];
};

export default function AnswerFAQ({ id, eyebrow, title, introduction, items }: AnswerFAQProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">{eyebrow}</p>
        <h2 id={headingId} className="max-w-4xl text-4xl font-medium tracking-tight text-[#121212] md:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#121212]/60 md:text-base">{introduction}</p>

        <div className="mt-12 border-y border-[#121212]/10">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-[#121212]/10 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left text-lg font-medium text-[#121212] marker:content-none md:text-xl">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-2xl font-light text-[#8BA888] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-7 pr-12 text-sm leading-relaxed text-[#121212]/60 md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
