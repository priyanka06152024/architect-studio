import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/content";
import { PageIntro, CTASection } from "../components/Shared";
export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="What we offer"
        title={
          <>
            Design support for every stage of your{" "}
            <span className="italic text-[#9b815b]">project.</span>
          </>
        }
        description="From early conversations and concept development to planning support and design supervision, we help bring clarity to your next step."
      />
      <section className="container-shell pb-20">
        <div className="grid gap-0 md:grid-cols-2">
          {services.map(([n, title, desc], i) => (
            <div
              key={n}
              className={`grid grid-cols-[44px_1fr] gap-5 border-t border-[var(--line)] py-8 md:gap-7 md:py-10 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
            >
              <span className="font-display text-lg text-[#9b815b]">{n}</span>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-[#777970]">
                  {desc}
                </p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                >
                  Discuss this service <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="container-shell pb-20">
        <div className="grid gap-8 bg-[#eae6dd] p-6 md:grid-cols-[.8fr_1.2fr] md:gap-16 md:p-12">
          <div>
            <p className="eyebrow">Who we work with</p>
            <h2 className="section-title mt-4">
              From a family home to a commercial space.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border-t border-[var(--line)] pt-4">
              Residence architects
            </div>
            <div className="border-t border-[var(--line)] pt-4">
              Commercial architects
            </div>
            <div className="border-t border-[var(--line)] pt-4">
              House design architect
            </div>
            <div className="border-t border-[var(--line)] pt-4">
              Interior design
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
