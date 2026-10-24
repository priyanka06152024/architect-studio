import { Quote } from "lucide-react";
import { testimonials } from "../data/content";
import { PageIntro, CTASection } from "../components/Shared";
export default function Testimonials() {
  return (
    <>
      <PageIntro
        eyebrow="Client experiences"
        title={
          <>
            Good work is remembered by how it{" "}
            <span className="italic text-[#9b815b]">feels.</span>
          </>
        }
        description="The most meaningful measure of a project is the experience of the people behind it. These sample testimonials should be replaced with approved client feedback."
      />
      <section className="container-shell pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="flex min-h-[320px] flex-col bg-[#eae6dd] p-6 md:p-8"
            >
              <Quote size={24} strokeWidth={1.4} className="text-[#9b815b]" />
              <p className="mt-8 flex-1 font-display text-xl leading-8">
                “{t.quote}”
              </p>
              <div className="mt-8 border-t border-[var(--line)] pt-5">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="mt-1 text-xs text-[#777970]">{t.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
