
// src/pages/Services.jsx

import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/content";
import { CTASection } from "../components/Shared";

gsap.registerPlugin(ScrollTrigger);

const NAVY = "#002556";
const YELLOW = "#FEC73A";
const WHITE = "#FFFFFF";

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
        "(prefers-reduced-motion: reduce)"
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
        }
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
          }
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
          }
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
          }
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
          }
        );
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="overflow-clip bg-white text-[#002556]"
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#002556] px-5 pb-14 pt-10 text-white sm:px-8 sm:pb-20 lg:px-[5vw]">
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/[0.12] sm:h-[430px] sm:w-[430px]" />
        <div className="pointer-events-none absolute -right-8 top-32 h-56 w-56 rounded-full border border-[#FEC73A]/25 sm:h-[330px] sm:w-[330px]" />

        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/20 pb-5">
          <p className="services-hero-item text-[9px] uppercase tracking-[0.18em] text-white/65">
            Shri Norris Architects
          </p>

          <span className="services-hero-item text-[9px] tracking-[0.15em] text-[#FEC73A]">
            OUR EXPERTISE / 2026
          </span>
        </div>

        <div className="relative z-10 grid gap-10 pt-16 sm:pt-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14 lg:pt-[12vh]">
          <div>
            <p className="services-hero-item mb-7 text-[10px] uppercase tracking-[0.2em] text-[#FEC73A]">
              What we offer
            </p>

            <h1 className="services-hero-item max-w-[1000px] font-serif text-[clamp(3.6rem,9.5vw,9.5rem)] leading-[0.84] tracking-[-0.08em]">
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
            <span className="mb-6 block h-px w-14 bg-[#FEC73A]" />

            <p className="text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              From early conversations and concept development to planning
              support and design supervision, we help bring clarity to your
              next step.
            </p>

            <a
              href="#our-services"
              className="group mt-8 inline-flex items-center gap-4 text-[9px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-[#FEC73A]"
            >
              Explore our services
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                <ArrowDown size={15} />
              </span>
            </a>
          </div>
        </div>

        <div className="services-hero-item relative z-10 mt-16 grid grid-cols-3 border-t border-white/20 pt-5 sm:mt-24">
          <div>
            <span className="font-serif text-3xl sm:text-5xl">01</span>
            <span className="mt-2 block text-[8px] tracking-[0.14em] text-white/55 sm:text-[9px]">
              UNDERSTAND
            </span>
          </div>

          <div className="border-l border-white/20 pl-4 sm:pl-8">
            <span className="font-serif text-3xl sm:text-5xl">02</span>
            <span className="mt-2 block text-[8px] tracking-[0.14em] text-white/55 sm:text-[9px]">
              DESIGN
            </span>
          </div>

          <div className="border-l border-white/20 pl-4 sm:pl-8">
            <span className="font-serif text-3xl sm:text-5xl">03</span>
            <span className="mt-2 block text-[8px] tracking-[0.14em] text-white/55 sm:text-[9px]">
              REALISE
            </span>
          </div>
        </div>
      </section>

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
          {services.map(([number, title, description], index) => (
            <article
              key={number}
              className="service-card group relative grid grid-cols-[34px_1fr] gap-4 overflow-hidden border-b border-[#002556]/25 py-7 transition-colors duration-500 hover:bg-[#002556]/[0.045] sm:grid-cols-[55px_1fr_42px] sm:gap-6 sm:px-4 sm:py-10"
            >
              <span className="relative z-10 pt-2 text-[10px] tracking-[0.1em] text-[#002556]/65">
                {String(number).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                <p className="mb-3 text-[8px] uppercase tracking-[0.16em] text-[#002556]/50">
                  Service / {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="font-serif text-2xl tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl lg:text-4xl">
                  {title}
                </h3>

                <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#002556]/65">
                  {description}
                </p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 hover:text-[#002556]/60"
                >
                  Discuss this service
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <Link
                to="/contact"
                aria-label={`Discuss ${title}`}
                className="relative z-10 col-start-2 mt-1 grid h-10 w-10 place-items-center rounded-full border border-[#002556]/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556] sm:col-start-3 sm:row-start-1 sm:mt-8 sm:h-11 sm:w-11"
              >
                <ArrowUpRight size={18} />
              </Link>

              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-[#FEC73A] transition-all duration-700 ease-out group-hover:w-full" />
            </article>
          ))}
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
