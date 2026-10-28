import { useLayoutEffect, useRef } from "react";
import { Play, ArrowUpRight, ArrowDown, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTASection } from "../components/Shared";
import videoimg from "../assets/images/videoimg.avif";

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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
          "-=0.3",
        )
        .from(
          ".video-hero-bottom",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4",
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
    <main ref={pageRef} className="overflow-clip bg-[#FFFFFF] text-[#002556]">
      {/* CINEMATIC HERO */}

      <section className="group relative isolate flex min-h-[66svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-28 text-[#FFFFFF] sm:px-8 sm:pb-10 sm:pt-32 lg:min-h-[72svh] lg:px-14 lg:pb-12">
        {/* BACKGROUND ARCHITECTURE IMAGE */}
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Modern architectural interior"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* NATURAL DARK OVERLAY */}
        <div className="absolute inset-0 -z-10 bg-black/40" />

        {/* SUBTLE BLUE CORNERS ON HOVER */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          style={{
            background: `
        radial-gradient(ellipse at top left, rgba(0,37,86,0.42), transparent 58%),
        radial-gradient(ellipse at top right, rgba(0,37,86,0.32), transparent 55%),
        radial-gradient(ellipse at bottom left, rgba(0,37,86,0.42), transparent 60%),
        radial-gradient(ellipse at bottom right, rgba(0,37,86,0.35), transparent 58%)
      `,
          }}
        />

        {/* TOP HEADER */}
        <div className="video-hero-eyebrow relative z-10 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#FEC73A] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="hidden text-[10px] uppercase tracking-[0.2em] text-white/80 sm:block">
            Film / Process / Perspective
          </p>
        </div>

        {/* MAIN HEADING */}
        <div className="relative z-10 my-16 lg:my-20">
          <p className="video-hero-eyebrow mb-6 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:mb-8">
            Watch &amp; explore
          </p>

          <h1 className="font-serif text-[clamp(3.6rem,10vw,9rem)] leading-[0.86] tracking-[-0.075em]">
            <span className="block overflow-hidden pb-2">
              <span className="video-hero-line block">Beyond the</span>
            </span>

            <span className="block overflow-hidden pb-3">
              <span className="video-hero-line block pb-2 italic text-[#FEC73A]">
                still frame.
              </span>
            </span>
          </h1>
        </div>

        {/* BOTTOM DESCRIPTION — NO BORDER LINE */}
        <div className="video-hero-bottom relative z-10 flex flex-col gap-6 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-sm leading-7 text-white/90 sm:text-base">
            Architecture experienced through movement, natural light and the
            details that make a space feel different.
          </p>

          <a
            href="#featured-film"
            className="group/link inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#FEC73A]"
          >
            Discover the films
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/60 transition-all duration-500 group-hover/link:-rotate-45 group-hover/link:border-[#FEC73A] group-hover/link:bg-[#FEC73A] group-hover/link:text-[#002556]">
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
            <p className="eyebrow mb-4 text-[#002556]/65">Featured film / 01</p>

            <h2 className="font-serif text-4xl leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Space in
              <span className="italic text-[#002556]/65"> motion.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-7 text-[#002556]/65">
            A different perspective on the spaces we create and the experience
            they offer.
          </p>
        </div>

        <div className="video-featured group relative overflow-hidden bg-[#002556]/10">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-video">
            <img
              src={videoimg}
              alt="Contemporary architecture with warm natural materials"
              loading="lazy"
              className="video-film-image absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
            />

            <div className="absolute inset-0 bg-[#002556]/15 transition-colors duration-500 group-hover:bg-[#002556]/35" />

            {/* Play button */}
            <div className="absolute inset-0 grid place-items-center">
              <button
                type="button"
                aria-label="Featured film coming soon"
                title="Featured film coming soon"
                className="group/play relative grid h-[76px] w-[76px] place-items-center rounded-full border border-white/75 bg-[#FFFFFF] text-[#002556] transition-all duration-500 hover:scale-110 hover:border-[#FEC73A] hover:bg-[#FEC73A] sm:h-24 sm:w-24"
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
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-5 bg-gradient-to-t from-[#002556]/95 via-[#002556]/45 to-transparent px-5 pb-5 pt-24 text-white sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
              <div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-[#FEC73A] sm:text-[10px]">
                  Featured film · Coming soon
                </p>

                <h3 className="max-w-2xl font-serif text-2xl leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                  A closer look at
                  <br className="hidden sm:block" /> considered spaces.
                </h3>
              </div>

              <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/75">
                Studio / 01
              </span>
            </div>
          </div>
        </div>

        <div className="video-reveal mt-5 flex flex-col justify-between gap-3 border-b border-[#002556]/20 pb-5 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-[#002556]/65">
            Our approach to architecture, material and atmosphere.
          </p>

          <span className="text-[9px] uppercase tracking-[0.18em] text-[#002556]/65">
            Film coming soon
          </span>
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-[#002556]/[0.045] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-32">
        <div className="video-reveal mb-12 flex flex-col gap-5 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#002556]/65">
              From concept to space
            </p>

            <h2 className="max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              The story behind
              <br />
              <span className="italic text-[#002556]/65">the design.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#002556]/65">
            Good architecture is shaped by more than a final photograph. It is
            the result of thoughtful questions, collaboration and attention to
            detail.
          </p>
        </div>

        <div className="video-notes-grid grid gap-0 md:grid-cols-2 md:gap-8">
          {filmNotes.map((note) => (
            <article
              key={note.number}
              className="video-note-card group border-t border-[#002556]/25 py-7 sm:py-9 md:pb-10"
            >
              <div className="mb-10 flex items-start justify-between sm:mb-16">
                <span className="font-serif text-4xl tracking-[-0.05em] text-[#002556]/65 transition-colors duration-300 group-hover:text-[#FEC73A] sm:text-5xl">
                  {note.number}
                </span>

                <span className="grid h-11 w-11 place-items-center rounded-full border border-[#002556]/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#002556] group-hover:bg-[#002556] group-hover:text-[#FEC73A]">
                  <MoveUpRight size={18} strokeWidth={1.3} />
                </span>
              </div>

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#002556]/65 sm:text-[10px]">
                {note.eyebrow}
              </p>

              <h3 className="mt-4 font-serif text-3xl tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl lg:text-5xl">
                {note.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#002556]/65">
                {note.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-[#002556]/15 pt-4">
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#002556]/65">
                  {note.label}
                </span>

                <span className="text-[9px] uppercase tracking-[0.18em] text-[#002556]/65">
                  Coming soon
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VIDEO CHANNEL CTA */}
      <section className="container-shell py-20 sm:py-24 lg:py-28">
        <div className="video-reveal flex flex-col gap-8 border-t border-[#002556]/20 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#002556]/65">Stay connected</p>

            <h2 className="max-w-xl font-serif text-4xl leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              More to see.
              <br />
              <span className="italic text-[#002556]/65">
                More to discover.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#002556]/65">
              Follow the studio for future project films, walkthroughs and
              insights into our design process.
            </p>
          </div>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center justify-between gap-8 border border-[#002556]/30 px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-[#002556] transition-all duration-300 hover:border-[#002556] hover:bg-[#002556] hover:!text-white sm:min-w-60"
          >
            <span className="transition-colors duration-300 group-hover:!text-white">
              Visit video channel
            </span>

            <ArrowUpRight
              size={17}
              className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:!text-white"
            />
          </a>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
