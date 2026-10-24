import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, services, testimonials } from "../data/content";
import { CTASection, ProjectCard, SectionHeading } from "../components/Shared";

export default function Home() {
  return (
    <>
      <section className="container-shell pb-14 pt-8 md:pb-24 md:pt-12">
        <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="pb-3">
            <p className="eyebrow reveal">
              Shri Norris Architects · Aligarh · Est. 2001
            </p>
            <h1 className="section-title reveal reveal-delay-1 mt-7 max-w-3xl text-[clamp(3.5rem,8.5vw,7.6rem)]">
              Spaces that{" "}
              <span className="font-normal italic text-[#9b815b]">feel</span>
              <br />
              like they belong.
            </h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-lg text-sm leading-7 text-[#777970] md:text-base">
              Architecture shaped around people, place and purpose. We bring
              thoughtful design and practical planning together to create spaces
              that last.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Discuss your project <ArrowUpRight size={16} />
              </Link>
              <Link to="/gallery" className="btn-outline">
                Explore our work
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[.18em] text-[#777970]">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)]">
                <ArrowDown size={14} />
              </span>{" "}
              Scroll to discover
            </div>
          </div>
          <div className="image-zoom relative aspect-[4/4.7] min-h-[350px] md:min-h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=90"
              alt="Modern architecture with natural materials"
              fetchPriority="high"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between bg-[#f5f2eb]/90 p-4 backdrop-blur-md md:bottom-6 md:left-6 md:right-6 md:p-5">
              <div>
                <p className="eyebrow">Design with intention</p>
                <p className="mt-1 font-display text-lg font-semibold">
                  Form. Function. Feeling.
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#252724] text-white">
                <MoveUpRight size={17} />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-[var(--line)]">
        <div className="container-shell grid grid-cols-2 gap-6 py-7 md:grid-cols-4 md:py-9">
          <div>
            <p className="font-display text-3xl font-semibold">2001</p>
            <p className="mt-1 text-xs text-[#777970]">Established</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold">People</p>
            <p className="mt-1 text-xs text-[#777970]">
              At the centre of design
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold">End-to-end</p>
            <p className="mt-1 text-xs text-[#777970]">Design thinking</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold">Aligarh</p>
            <p className="mt-1 text-xs text-[#777970]">
              Rooted in our community
            </p>
          </div>
        </div>
      </section>
      <section className="container-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">A little about us</p>
            <h2 className="section-title mt-5">
              Design is how a place becomes{" "}
              <span className="italic text-[#9b815b]">yours.</span>
            </h2>
          </div>
          <div className="pt-1 md:pt-3">
            <p className="max-w-2xl text-base leading-8 text-[#666960]">
              Since 2001, Shri Norris Architects has been helping clients
              imagine and shape spaces that feel considered, useful and
              enduring. Our approach brings together aesthetics, functionality
              and an understanding of how people live and work.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#777970]">
              Led by Sudhir Kumar, we believe good architecture should look
              beyond the drawing board — responding to its surroundings and the
              people who will experience it every day.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-3 border-b border-[#252724] pb-2 text-sm font-semibold"
            >
              Get to know us <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#eae6dd] py-16 md:py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="What we do"
            title="A clear vision, from first sketch to final detail."
            description="Every project is different. Our services adapt to your site, ambitions and practical needs."
            link="View all services"
          />
          <div className="grid gap-x-10 md:grid-cols-2">
            {services.slice(0, 4).map(([n, title, desc]) => (
              <Link
                to="/services"
                key={n}
                className="group grid grid-cols-[40px_1fr_30px] gap-4 border-t border-[var(--line)] py-6"
              >
                <span className="pt-1 text-xs text-[#9b815b]">{n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[#777970]">
                    {desc}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 transition group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-shell section-space">
        <SectionHeading
          eyebrow="Selected work"
          title="Spaces made to be lived in."
          description="A glimpse into the range of spaces and ideas we work with."
          link="View gallery"
          to="/gallery"
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard project={p} index={i} key={p.title} />
          ))}
        </div>
      </section>
      <section className="bg-[#252724] py-16 text-[#f5f2eb] md:py-20">
        <div className="container-shell grid gap-10 md:grid-cols-[.7fr_1.3fr] md:items-start">
          <div>
            <p className="eyebrow !text-[#d8c8ae]">Kind words</p>
            <h2 className="section-title mt-5">Built on trust.</h2>
            <Link
              to="/testimonials"
              className="mt-7 inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"
            >
              Read testimonials <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 2).map((t) => (
              <div key={t.name} className="border-t border-white/20 pt-5">
                <p className="font-display text-xl leading-8">“{t.quote}”</p>
                <p className="mt-6 text-sm font-semibold">{t.name}</p>
                <p className="mt-1 text-xs text-white/50">{t.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
