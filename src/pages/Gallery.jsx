
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ProjectCard, CTASection } from "../components/Shared";
import { projects } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "Residential", "Commercial", "Interior"];

export default function Gallery() {
  const pageRef = useRef(null);
  const [filter, setFilter] = useState("All");

  const list =
    filter === "All"
      ? projects
      : projects.filter((project) => project.type === filter);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      // Cinematic hero entrance
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from(".gallery-hero-eyebrow", {
          y: 18,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".gallery-hero-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.13,
          },
          "-=0.35"
        )
        .from(
          ".gallery-hero-description",
          {
            y: 22,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          ".gallery-hero-bottom",
          {
            y: 16,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.4"
        );

      // Section heading reveals
      gsap.utils.toArray(".gallery-reveal").forEach((element) => {
        gsap.from(element, {
          y: 38,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      // Project card stagger
      gsap.from(".gallery-project-card", {
        y: 48,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-project-grid",
          start: "top 82%",
          once: true,
        },
      });

      // Editorial divider animation
      gsap.utils.toArray(".gallery-divider").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            once: true,
          },
        });
      });

      // CTA entrance
      gsap.from(".gallery-cta", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-cta",
          start: "top 88%",
          once: true,
        },
      });
    }, page);

    const refresh = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="overflow-clip bg-[#f3f1e9] text-[#262720]"
    >
      {/* HERO */}
      <section className="relative flex min-h-[82svh] flex-col justify-between overflow-hidden bg-[#22231f] px-5 pb-8 pt-28 text-[#f3f1e9] sm:px-8 sm:pb-10 sm:pt-32 lg:min-h-[88svh] lg:px-14 lg:pb-12 lg:pt-36">
        {/* Background detail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/[0.07] sm:h-[26rem] sm:w-[26rem] lg:right-8 lg:top-12 lg:h-[38rem] lg:w-[38rem]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-36 h-52 w-52 rounded-full border border-[#c3d17a]/15 sm:h-80 sm:w-80 lg:right-28 lg:top-28 lg:h-[30rem] lg:w-[30rem]"
        />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <p className="gallery-hero-eyebrow text-[10px] uppercase tracking-[0.24em] text-[#c3d17a] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="gallery-hero-eyebrow hidden text-[10px] uppercase tracking-[0.2em] text-white/45 sm:block">
            Architecture · Interiors · Spaces
          </p>
        </div>

        <div className="relative z-10 my-20 lg:my-24">
          <p className="gallery-hero-eyebrow mb-6 text-[10px] uppercase tracking-[0.24em] text-white/50 sm:mb-8 sm:text-xs">
            Selected work / 01—{String(projects.length).padStart(2, "0")}
          </p>

          <h1 className="max-w-[1100px] font-serif text-[clamp(3.8rem,10.5vw,9.5rem)] leading-[0.83] tracking-[-0.075em]">
            <span className="block overflow-hidden pb-2">
              <span className="gallery-hero-line block">
                Spaces with
              </span>
            </span>

            <span className="block overflow-hidden pb-3">
              <span className="gallery-hero-line block italic text-[#c3d17a]">
                a point of
              </span>
            </span>

            <span className="block overflow-hidden pb-3">
              <span className="gallery-hero-line block">
                view.
              </span>
            </span>
          </h1>
        </div>

        <div className="gallery-hero-bottom relative z-10 flex flex-col gap-7 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between sm:pt-7">
          <p className="gallery-hero-description max-w-md text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            A considered collection of architectural ideas, material
            explorations and spaces designed around the way we live.
          </p>

          <a
            href="#selected-projects"
            className="group inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#f3f1e9] transition-colors duration-300 hover:text-[#c3d17a]"
          >
            Explore the work
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:border-[#c3d17a] group-hover:bg-[#c3d17a] group-hover:text-[#22231f] group-hover:rotate-[-45deg]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>

      </section>

      {/* SELECTED PROJECTS */}
      <section
        id="selected-projects"
        className="container-shell scroll-mt-20 pb-24 pt-20 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-32"
      >
        <div className="gallery-reveal mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#777d52]">
              A closer look
            </p>

            <h2 className="max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Designed with
              <br />
              <span className="italic text-[#777d52]">
                intention.
              </span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-7 text-[#77786e]">
            Every project begins with a different brief, a different
            context and the opportunity to create something meaningful.
          </p>
        </div>

        <div className="gallery-divider mb-7 h-px w-full origin-left bg-[#262720]/20" />

        {/* FILTER BAR */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap gap-2"
            aria-label="Filter projects by category"
          >
            {filters.map((item) => {
              const isActive = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={isActive}
                  className={`group relative overflow-hidden border px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 sm:text-[11px] ${
                    isActive
                      ? "border-[#262720] bg-[#262720] text-[#f3f1e9]"
                      : "border-[#262720]/20 bg-transparent text-[#626359] hover:border-[#777d52] hover:bg-[#e7e5d9] hover:text-[#262720]"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </div>

          <p
            className="text-[10px] uppercase tracking-[0.17em] text-[#77786e]"
            aria-live="polite"
          >
            <span className="mr-2 text-[#777d52]">
              {String(list.length).padStart(2, "0")}
            </span>
            {list.length === 1 ? "Project" : "Projects"}
          </p>
        </div>

        {/* PROJECT GRID */}
        {list.length > 0 ? (
          
<div
  key={filter}
  className="gallery-project-grid grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-16"
>
  {list.map((project, index) => (
    <article
      key={project.title}
      className="gallery-project-card group min-w-0"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block"
        aria-label={`View ${project.title} project`}
      >
        {/* IMAGE */}
        <div className="gallery-card-image relative aspect-[4/5] overflow-hidden bg-[#e3e0d5]">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="gallery-project-image h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />

          {/* Subtle image tint */}
          <div className="absolute inset-0 bg-[#22231f]/0 transition-colors duration-500 group-hover:bg-[#22231f]/20" />

          {/* Top label */}
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <span className="bg-[#f3f1e9] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#262720] transition-colors duration-300 group-hover:bg-[#c3d17a]">
              {project.type || "Architecture"}
            </span>

            <span className="flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#c3d17a] text-[#262720] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </div>

          {/* Bottom overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-[#171813]/75 via-[#171813]/20 to-transparent px-5 pb-5 pt-20 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#c3d17a]">
              Explore project
            </p>
          </div>
        </div>

        {/* PROJECT INFORMATION */}
        <div className="flex items-start justify-between gap-4 border-b border-[#262720]/20 py-5 transition-colors duration-300 group-hover:border-[#777d52]">
          <div>
            <h3 className="font-serif text-2xl tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.7rem]">
              {project.title}
            </h3>

            <p className="mt-2 text-xs text-[#77786e]">
              {project.type || "A considered space"}
            </p>
          </div>

          <span className="mt-1 text-[#777d52] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight size={20} strokeWidth={1.3} />
          </span>
        </div>
      </Link>
    </article>
  ))}
</div>

        ) : (
          <div className="border-y border-[#262720]/15 py-20 text-center sm:py-28">
            <p className="font-serif text-3xl italic text-[#777d52] sm:text-4xl">
              Nothing here just yet.
            </p>

            <p className="mt-4 text-sm text-[#77786e]">
              Try another category to explore more projects.
            </p>

            <button
              type="button"
              onClick={() => setFilter("All")}
              className="mt-7 border border-[#262720] px-5 py-3 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-[#262720] hover:text-white"
            >
              View all projects
            </button>
          </div>
        )}

        {/* BOTTOM EDITORIAL NOTE */}
        <div className="gallery-reveal mt-20 grid gap-5 border-t border-[#262720]/20 pt-7 sm:mt-28 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="eyebrow mb-3 text-[#777d52]">
              The thinking behind the spaces
            </p>

            <p className="max-w-xl font-serif text-2xl leading-snug tracking-[-0.035em] sm:text-3xl">
              Good architecture is not only what you see. It is what you
              feel, use and remember.
            </p>
          </div>

          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#262720]/30 pb-2 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#777d52] hover:text-[#777d52]"
          >
            Start a conversation
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div className="gallery-cta">
        <CTASection />
      </div>
    </main>
  );
}
