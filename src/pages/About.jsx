import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageIntro, CTASection } from "../components/Shared";
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="Who we are · Est. 2001"
        title={
          <>
            Architecture with a sense of{" "}
            <span className="italic text-[#9b815b]">purpose.</span>
          </>
        }
        description="A locally rooted architecture practice creating thoughtful spaces for living, working and gathering in Aligarh and beyond."
      />
      <section className="container-shell pb-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="image-zoom aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
              alt="Carefully designed contemporary interior"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Our story</p>
            <h2 className="section-title mt-5">
              Good design begins with listening.
            </h2>
            <p className="mt-6 text-sm leading-7 text-[#777970]">
              Shri Norris Architects Aligarh has been working in architectural
              design since 2001. We believe every successful project begins by
              understanding the people, the site and the purpose behind the
              brief.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#777970]">
              From homes and commercial spaces to interiors and planning
              support, our aim is to create work that balances visual clarity
              with real-world functionality. We value collaboration, thoughtful
              decisions and attention to the details that make a space feel
              complete.
            </p>
            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <p className="eyebrow">Our approach</p>
              <div className="mt-5 grid grid-cols-2 gap-5">
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    01. Listen
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#777970]">
                    Understand your needs, aspirations and site.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    02. Shape
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#777970]">
                    Develop clear ideas into practical design.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    03. Refine
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#777970]">
                    Review details with care and consistency.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    04. Realise
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#777970]">
                    Support the journey from concept onwards.
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#252724] pb-2 text-sm font-semibold"
            >
              Meet us about your project <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#eae6dd] py-16 md:py-20">
        <div className="container-shell grid gap-8 md:grid-cols-3">
          <div>
            <p className="eyebrow">01 / Our belief</p>
            <h3 className="font-display mt-4 text-2xl font-semibold">
              People first.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#777970]">
              A place should respond to the routines, comfort and character of
              the people using it.
            </p>
          </div>
          <div>
            <p className="eyebrow">02 / Our practice</p>
            <h3 className="font-display mt-4 text-2xl font-semibold">
              Purposeful design.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#777970]">
              Beauty and function work best together, with the site and context
              guiding decisions.
            </p>
          </div>
          <div>
            <p className="eyebrow">03 / Our promise</p>
            <h3 className="font-display mt-4 text-2xl font-semibold">
              Care in the details.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#777970]">
              We aim to bring clarity, collaboration and considered attention to
              every brief.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
