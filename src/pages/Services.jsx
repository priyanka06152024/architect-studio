import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/content";
import { CTASection } from "../components/Shared";

gsap.registerPlugin(ScrollTrigger);

// Keep service slugs consistent with serviceDetails.js
const createServiceSlug = (title) => {
  const normalized = title.toLowerCase().trim();

  // Explicitly handle House Design & Planning title variations
  if (
    normalized.includes("house design") &&
    (normalized.includes("planning") || normalized.includes("architect"))
  ) {
    return "house-design-planning";
  }

  if (normalized.includes("residence") || normalized.includes("residential")) {
    return "residential-architecture";
  }

  if (normalized.includes("commercial") && normalized.includes("architect")) {
    return "commercial-architecture";
  }

  return normalized
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const audiences = [
  {
    number: "01",
    title: "Private residences",
    detail: "Homes shaped around the people who live in them.",
  },
  {
    number: "02",
    title: "Commercial spaces",
    detail: "Purposeful environments for work, business and connection.",
  },
  {
    number: "03",
    title: "House planning",
    detail: "Clear layouts, considered proportions and practical decisions.",
  },
  {
    number: "04",
    title: "Interior design",
    detail: "Material, light and detail brought together with intention.",
  },
];

export default function Services() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const heroItems = page.querySelectorAll(".services-hero-item");

      gsap.fromTo(
        heroItems,
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.13,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          delay: 0.1,
        },
      );

      gsap.utils.toArray(".services-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: element,
              start: "top 87%",
              once: true,
            },
          },
        );
      });

      const serviceList = page.querySelector(".services-list");

      if (serviceList) {
        const rows = serviceList.querySelectorAll(".service-card");

        gsap.fromTo(
          rows,
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: serviceList,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      const audienceSection = page.querySelector(".audience-section");

      if (audienceSection) {
        gsap.fromTo(
          audienceSection.querySelectorAll(".audience-card"),
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.13,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: audienceSection,
              start: "top 83%",
              once: true,
            },
          },
        );
      }

      const cta = page.querySelector(".services-cta");

      if (cta) {
        gsap.fromTo(
          cta,
          { y: 25, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: cta,
              start: "top 92%",
              once: true,
            },
          },
        );
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-clip bg-white text-[#002556]">
      {/* HERO */}
      <section className="group relative isolate overflow-hidden px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-[5vw]">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary architectural residence"
            className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[#002556]/0 transition-colors duration-700 ease-in-out group-hover:bg-[#002556]/25" />

        <div className="services-hero-item relative z-10 flex items-center justify-between gap-4">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/80">
            Shri Norris Architects
          </p>

          <span className="text-[9px] uppercase tracking-[0.15em] text-[#FEC73A]">
            OUR EXPERTISE / 2026
          </span>
        </div>

        <div className="relative z-10 grid gap-10 pt-20 sm:pt-28 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14 lg:pt-36">
          <div className="services-hero-item">
            <p className="mb-7 text-[10px] uppercase tracking-[0.2em] text-[#FEC73A]">
              What we offer
            </p>

            <h1 className="max-w-[1000px] font-serif text-[clamp(3.6rem,9.5vw,9.5rem)] leading-[0.84] tracking-[-0.08em]">
              Thoughtful
              <br />
              design.
              <br />
              <span className="pl-[7vw] italic text-[#FEC73A]">
                Every stage.
              </span>
            </h1>
          </div>

          <div className="services-hero-item max-w-[380px] lg:justify-self-end lg:pb-3">
            <p className="text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              From early conversations and concept development to planning
              support and design supervision, we help bring clarity to your next
              step.
            </p>

            <a
              href="#our-services"
              className="group/link mt-8 inline-flex items-center gap-4 text-[9px] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:text-[#FEC73A]"
            >
              Explore our services
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-all duration-300 group-hover/link:-rotate-45 group-hover/link:bg-[#FEC73A] group-hover/link:text-[#002556]">
                <ArrowDown size={15} strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>

        <div className="services-hero-item relative z-10 mt-20 grid grid-cols-3 gap-3 sm:mt-28">
          {[
            ["01", "UNDERSTAND"],
            ["02", "DESIGN"],
            ["03", "REALISE"],
          ].map(([number, label]) => (
            <div key={number}>
              <span className="font-serif text-3xl sm:text-5xl">{number}</span>
              <p className="mt-2 text-[8px] tracking-[0.14em] text-white/80 sm:text-[9px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES LIST */}

      {/* SERVICES LIST */}
      <section
        id="our-services"
        className="px-5 py-20 sm:px-8 sm:py-28 lg:px-[10vw] lg:py-[11vw]"
      >
        <div className="mb-12 grid gap-6 sm:mb-16 md:grid-cols-[1fr_0.65fr] md:items-end">
          <div className="services-reveal">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#002556]">
              01 — What we do
            </p>

            <h2 className="mt-7 font-serif text-[clamp(3.3rem,7.5vw,7.5rem)] leading-[0.88] tracking-[-0.075em]">
              Built around
              <br />
              <span className="italic text-[#002556]/55">your needs.</span>
            </h2>
          </div>

          <p className="services-reveal max-w-[360px] text-sm leading-7 text-[#002556]/65 md:justify-self-end">
            Each project is different. Our process starts with understanding
            what matters to you, then shaping a considered response to your
            site, brief and aspirations.
          </p>
        </div>

        <div className="services-list border-t border-[#002556]/25">
          {services.map((item, index) => {
            const number = item.number ?? String(index + 1).padStart(2, "0");
            const title = item.title ?? "Architectural Service";
            const description = item.description ?? "";
            const slug = title
              .toLowerCase()
              .trim()
              .replace(/&/g, " ")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");

            return (
              <Link
                key={`${number}-${title}`}
                to={`/services/${slug}`}
                aria-label={`View ${title} details`}
                className="service-card group grid gap-5 border-b border-[#002556]/25 py-8 transition-colors duration-500 hover:bg-[#002556]/[0.035] sm:grid-cols-[45px_0.9fr_1.1fr_42px] sm:items-center sm:gap-6 sm:px-4 sm:py-9"
              >
                <span className="text-[10px] tracking-[0.1em] text-[#002556]/65">
                  {number}
                </span>

                <div className="relative h-[220px] overflow-hidden bg-[#002556]/5 sm:h-[160px] lg:h-[190px]">
                  <img
                    src={item.image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#002556]/10 transition-colors duration-500 group-hover:bg-transparent" />
                </div>

                <div className="min-w-0">
                  <p className="mb-3 text-[8px] uppercase tracking-[0.16em] text-[#002556]/50">
                    Service / {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="font-serif text-2xl tracking-[-0.045em] transition-colors duration-300 group-hover:text-[#002556]/65 sm:text-3xl lg:text-4xl">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-[480px] text-sm leading-7 text-[#002556]/65">
                    {description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em]">
                    Explore service
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>

                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#002556]/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] sm:h-11 sm:w-11">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            );
          })}
          
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="audience-section bg-[#002556] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-[10vw] lg:py-[10vw]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="services-reveal text-[9px] uppercase tracking-[0.18em] text-[#FEC73A]">
              02 — Who we work with
            </p>

            <h2 className="services-reveal mt-7 font-serif text-[clamp(3.2rem,6.8vw,6.8rem)] leading-[0.88] tracking-[-0.075em]">
              Spaces for
              <br />
              <span className="italic text-[#FEC73A]">real life.</span>
            </h2>

            <p className="services-reveal mt-7 max-w-[350px] text-sm leading-7 text-white/70">
              From a family home to a commercial environment, every space
              deserves a clear idea and thoughtful execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {audiences.map((item) => (
              <article
                key={item.number}
                className="audience-card group border-t border-white/25 py-6 transition-colors duration-500 hover:bg-white/[0.04] sm:px-5 sm:py-8 sm:odd:pl-0 sm:even:border-l sm:even:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.15em] text-[#FEC73A]">
                    {item.number} / AREA
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FEC73A]"
                  />
                </div>

                <h3 className="mt-7 font-serif text-xl tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#FEC73A] sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-white/65">
                  {item.detail}
                </p>

                <div className="mt-6 h-px w-9 origin-left bg-[#FEC73A] transition-transform duration-500 group-hover:scale-x-[2]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="services-cta">
        <CTASection />
      </div>
    </main>
  );
}
