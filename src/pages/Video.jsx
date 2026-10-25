
import { useLayoutEffect, useRef } from "react";
import {
  Play,
  ArrowUpRight,
  ArrowDown,
  MoveUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTASection } from "../components/Shared";
import videoimg from "../assets/images/videoimg.avif"

gsap.registerPlugin(ScrollTrigger);

const filmNotes = [
  {
    number: "01",
    eyebrow: "PROJECT WALKTHROUGH",
    title: "Explore the details.",
    description:
      "Discover the relationship between light, material and space through a closer look at architectural design.",
    label: "The architecture",
  },
  {
    number: "02",
    eyebrow: "BEHIND THE SCENES",
    title: "Ideas in progress.",
    description:
      "An insight into the creative process, considered details and the decisions that shape every project.",
    label: "The process",
  },
];

export default function Video() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Hero entrance
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".video-hero-eyebrow", {
          y: 18,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".video-hero-line",
          {
            yPercent: 105,
            opacity: 0,
            duration: 1,
            stagger: 0.13,
          },
          "-=0.3"
        )
        .from(
          ".video-hero-bottom",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        );

      // Featured film entrance
      gsap.from(".video-featured", {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-featured",
          start: "top 82%",
          once: true,
        },
      });

      // Reveal content blocks
      gsap.utils.toArray(".video-reveal").forEach((element) => {
        gsap.from(element, {
          y: 35,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      // Film-note cards
      gsap.from(".video-note-card", {
        y: 35,
        opacity: 0,
        stagger: 0.16,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-notes-grid",
          start: "top 85%",
          once: true,
        },
      });

      // Image reveal
      gsap.from(".video-film-image", {
        scale: 1.08,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video-featured",
          start: "top 85%",
          once: true,
        },
      });
    }, page);

    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="overflow-clip bg-[#f3f1e9] text-[#262720]"
    >
      {/* CINEMATIC HERO */}
      <section className="flex min-h-[66svh] flex-col justify-between bg-[#22231f] px-5 pb-8 pt-28 text-[#f3f1e9] sm:px-8 sm:pb-10 sm:pt-32 lg:min-h-[72svh] lg:px-14 lg:pb-12">
        <div className="video-hero-eyebrow flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#c3d17a] sm:text-xs">
            Shri Norris Architects
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.2em] text-white/45 sm:block">
            Film / Process / Perspective
          </p>
        </div>

        <div className="my-16 lg:my-20">
          <p className="video-hero-eyebrow mb-6 text-[10px] uppercase tracking-[0.22em] text-white/45 sm:mb-8">
            Watch & explore
          </p>

          <h1 className="font-serif text-[clamp(3.6rem,10vw,9rem)] leading-[0.86] tracking-[-0.075em]">
            <span className="block overflow-hidden pb-2">
              <span className="video-hero-line block">
                Beyond the
              </span>
            </span>
            <span className="block overflow-hidden pb-3">
              <span className="video-hero-line block italic text-[#c3d17a]">
                still frame.
              </span>
            </span>
          </h1>
        </div>

        <div className="video-hero-bottom flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-sm leading-7 text-white/60 sm:text-base">
            Architecture experienced through movement, natural light
            and the details that make a space feel different.
          </p>

          <a
            href="#featured-film"
            className="group inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#c3d17a]"
          >
            Discover the films
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#c3d17a] group-hover:bg-[#c3d17a] group-hover:text-[#22231f]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* FEATURED FILM */}
      <section
        id="featured-film"
        className="container-shell scroll-mt-8 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-32"
      >
        <div className="video-reveal mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#777d52]">
              Featured film / 01
            </p>
            <h2 className="font-serif text-4xl leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Space in
              <span className="italic text-[#777d52]"> motion.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-7 text-[#77786e]">
            A different perspective on the spaces we create and the
            experience they offer.
          </p>
        </div>

        <div className="video-featured group relative overflow-hidden bg-[#dcd9cf]">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-video">
            <img
              src={videoimg}
              alt="Contemporary architecture with warm natural materials"
              loading="lazy"
              className="video-film-image absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
            />

            <div className="absolute inset-0 bg-[#171813]/15 transition-colors duration-500 group-hover:bg-[#171813]/35" />

            {/* Play button */}
            <div className="absolute inset-0 grid place-items-center">
              <button
                type="button"
                aria-label="Featured film coming soon"
                title="Featured film coming soon"
                className="group/play relative grid h-[76px] w-[76px] place-items-center rounded-full border border-white/75 bg-[#f3f1e9] text-[#262720] transition-all duration-500 hover:scale-110 hover:border-[#c3d17a] hover:bg-[#c3d17a] sm:h-24 sm:w-24"
              >
                <span className="absolute inset-[-8px] rounded-full border border-white/0 transition-all duration-500 group-hover/play:inset-[-13px] group-hover/play:border-white/60" />
                <Play
                  size={23}
                  fill="currentColor"
                  className="ml-1 transition-transform duration-300 group-hover/play:scale-110 sm:h-7 sm:w-7"
                />
              </button>
            </div>

            {/* Film details */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-5 bg-gradient-to-t from-[#171813]/90 via-[#171813]/35 to-transparent px-5 pb-5 pt-24 text-white sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
              <div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-[#c3d17a] sm:text-[10px]">
                  Featured film · Coming soon
                </p>
                <h3 className="max-w-2xl font-serif text-2xl leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                  A closer look at
                  <br className="hidden sm:block" /> considered spaces.
                </h3>
              </div>

              <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/70">
                Studio / 01
              </span>
            </div>
          </div>
        </div>

        <div className="video-reveal mt-5 flex flex-col justify-between gap-3 border-b border-[#262720]/20 pb-5 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-[#77786e]">
            Our approach to architecture, material and atmosphere.
          </p>
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#777d52]">
            Film coming soon
          </span>
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-[#e7e5d9] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-32">
        <div className="video-reveal mb-12 flex flex-col gap-5 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#777d52]">
              From concept to space
            </p>
            <h2 className="max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              The story behind
              <br />
              <span className="italic text-[#777d52]">
                the design.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#77786e]">
            Good architecture is shaped by more than a final photograph.
            It is the result of thoughtful questions, collaboration and
            attention to detail.
          </p>
        </div>

        <div className="video-notes-grid grid gap-0 md:grid-cols-2 md:gap-8">
          {filmNotes.map((note) => (
            <article
              key={note.number}
              className="video-note-card group border-t border-[#262720]/25 py-7 sm:py-9 md:pb-10"
            >
              <div className="mb-10 flex items-start justify-between sm:mb-16">
                <span className="font-serif text-4xl tracking-[-0.05em] text-[#777d52] transition-colors duration-300 group-hover:text-[#262720] sm:text-5xl">
                  {note.number}
                </span>

                <span className="grid h-11 w-11 place-items-center rounded-full border border-[#262720]/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#262720] group-hover:bg-[#262720] group-hover:text-[#f3f1e9]">
                  <MoveUpRight size={18} strokeWidth={1.3} />
                </span>
              </div>

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#777d52] sm:text-[10px]">
                {note.eyebrow}
              </p>

              <h3 className="mt-4 font-serif text-3xl tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl lg:text-5xl">
                {note.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#77786e]">
                {note.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-[#262720]/15 pt-4">
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#77786e]">
                  {note.label}
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#777d52]">
                  Coming soon
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VIDEO CHANNEL CTA */}
      <section className="container-shell py-20 sm:py-24 lg:py-28">
        <div className="video-reveal flex flex-col gap-8 border-t border-[#262720]/20 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#777d52]">
              Stay connected
            </p>

            <h2 className="max-w-xl font-serif text-4xl leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              More to see.
              <br />
              <span className="italic text-[#777d52]">
                More to discover.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#77786e]">
              Follow the studio for future project films, walkthroughs
              and insights into our design process.
            </p>
          </div>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center justify-between gap-8 border border-[#262720]/30 px-5 py-4 text-[10px] uppercase tracking-[0.16em] transition-all duration-300 hover:border-[#262720] hover:bg-[#262720] hover:text-white sm:min-w-60"
          >
            Visit video channel
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
