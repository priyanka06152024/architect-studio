
import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTASection } from "../components/Shared";
import founderimg from "../assets/images/founderimg.avif";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
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
        .from(".team-hero-eyebrow", {
          y: 18,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".team-hero-line",
          {
            yPercent: 105,
            opacity: 0,
            duration: 1,
            stagger: 0.13,
          },
          "-=0.3"
        )
        .from(
          ".team-hero-bottom",
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.35"
        );

      // Founder portrait entrance
      gsap.from(".team-portrait", {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-founder",
          start: "top 78%",
          once: true,
        },
      });

      // Founder information reveal
      gsap.from(".team-founder-info", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-founder-info",
          start: "top 82%",
          once: true,
        },
      });

      // Philosophy section
      gsap.from(".team-philosophy-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-philosophy-grid",
          start: "top 84%",
          once: true,
        },
      });

      // Closing section
      gsap.from(".team-closing", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-closing",
          start: "top 88%",
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
      className="overflow-clip bg-[#FFFFFF] text-[#002556]"
    >
      {/* HERO */}
      <section className="flex min-h-[66svh] flex-col justify-between bg-[#002556] px-5 pb-8 pt-28 text-[#FFFFFF] sm:px-8 sm:pb-10 sm:pt-32 lg:min-h-[72svh] lg:px-14 lg:pb-12">
        <div className="team-hero-eyebrow flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#FEC73A] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="hidden text-[10px] uppercase tracking-[0.2em] text-white/65 sm:block">
            People / Practice / Purpose
          </p>
        </div>

        <div className="my-16 lg:my-20">
          <p className="team-hero-eyebrow mb-6 text-[10px] uppercase tracking-[0.22em] text-white/65 sm:mb-8">
            The people behind the practice
          </p>

          <h1 className="font-serif text-[clamp(3.5rem,9.5vw,8.7rem)] leading-[0.86] tracking-[-0.075em]">
            <span className="block overflow-hidden pb-2">
              <span className="team-hero-line block">
                Good spaces.
              </span>
            </span>

            <span className="block overflow-hidden pb-3">
              <span className="team-hero-line block pb-2 italic text-[#FEC73A]">
                Thoughtful people.
              </span>
            </span>
          </h1>
        </div>

        <div className="team-hero-bottom flex flex-col gap-6 border-t border-white/25 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-sm leading-7 text-white/75 sm:text-base">
            Behind every considered space is a process built on listening,
            collaboration and a shared respect for design.
          </p>

          <a
            href="#founder"
            className="group inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#FEC73A]"
          >
            Meet the founder

            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* FOUNDER */}
      <section
        id="founder"
        className="container-shell scroll-mt-8 py-20 sm:py-28 lg:py-36"
      >
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#002556]/65">
              The practice / 01
            </p>

            <h2 className="font-serif text-4xl leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Meet the
              <span className="italic text-[#002556]/65"> founder.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-7 text-[#002556]/65">
            A considered approach to design, shaped by experience and
            an understanding of the people who use each space.
          </p>
        </div>

        <div className="team-founder grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14 lg:gap-20">
          {/* PORTRAIT */}
          <div className="team-portrait">
            <div className="group relative overflow-hidden bg-[#002556]/10">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={founderimg}
                  alt="Portrait placeholder for Sudhir Kumar"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                />
              </div>

              <div className="absolute inset-0 bg-[#002556]/0 transition-colors duration-500 group-hover:bg-[#002556]/10" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-[#002556]/90 to-transparent px-5 pb-5 pt-16 text-white sm:px-7 sm:pb-7">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#FEC73A]">
                    Founder / Principal
                  </p>

                  <p className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">
                    Sudhir Kumar
                  </p>
                </div>

                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                  <MoveUpRight size={18} strokeWidth={1.3} />
                </span>
              </div>
            </div>

            <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-[#002556]/60">
              Portrait placeholder · Replace with approved photograph
            </p>
          </div>

          {/* FOUNDER INFORMATION */}
          <div className="flex flex-col justify-center md:py-5">
            <div className="team-founder-info">
              <p className="eyebrow text-[#002556]/65">
                Founder / Principal
              </p>

              <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Sudhir Kumar
              </h3>

              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-[#002556]/65">
                Architect · Shri Norris Architects, Aligarh
              </p>
            </div>

            <div className="team-founder-info mt-7 space-y-4 text-sm leading-7 text-[#002556]/70 sm:mt-9 sm:text-[15px]">
              <p>
                Sudhir Kumar guides the practice with a focus on creating
                spaces that bring together innovation, functionality and
                a clear design vision.
              </p>

              <p>
                Since the firm's beginnings in 2001, the aim has been to
                understand each client's needs and translate them into
                considered architectural solutions.
              </p>

              <p className="border-l-2 border-[#FEC73A] pl-4 text-xs leading-6 text-[#002556]/65">
                Before publishing, replace this placeholder portrait with
                an approved photograph and add verified qualifications,
                registration details and team members.
              </p>
            </div>

            {/* STATS */}
            <div className="team-founder-info mt-9 grid grid-cols-2 border-y border-[#002556]/20 py-6 sm:mt-12 sm:py-8">
              <div className="pr-4">
                <p className="font-serif text-3xl tracking-[-0.045em] sm:text-4xl">
                  Since 2001
                </p>

                <p className="mt-2 text-[10px] uppercase leading-5 tracking-[0.12em] text-[#002556]/65">
                  Practice experience
                </p>
              </div>

              <div className="border-l border-[#002556]/15 pl-5 sm:pl-8">
                <p className="font-serif text-3xl tracking-[-0.045em] sm:text-4xl">
                  Client-led
                </p>

                <p className="mt-2 text-[10px] uppercase leading-5 tracking-[0.12em] text-[#002556]/65">
                  Collaborative process
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-[#002556]/[0.045] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-32">
        <div className="team-philosophy-grid grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="team-philosophy-item">
            <p className="eyebrow mb-4 text-[#002556]/65">
              How we work
            </p>

            <h2 className="max-w-lg font-serif text-4xl leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              Architecture is
              <br />
              <span className="italic text-[#002556]/65">
                a conversation.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#002556]/70">
              Every project starts by understanding the people, the place
              and the purpose behind it. The best results come from a
              thoughtful and collaborative process.
            </p>
          </div>

          <div className="grid gap-0 sm:grid-cols-2 sm:gap-x-8">
            <article className="team-philosophy-item border-t border-[#002556]/25 py-6 sm:pb-8">
              <p className="font-serif text-3xl text-[#002556]/65">01</p>

              <h3 className="mt-5 font-serif text-2xl tracking-[-0.035em]">
                Listen first.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#002556]/70">
                Understand the client's needs, priorities and aspirations
                before shaping a design response.
              </p>
            </article>

            <article className="team-philosophy-item border-t border-[#002556]/25 py-6 sm:pb-8">
              <p className="font-serif text-3xl text-[#002556]/65">02</p>

              <h3 className="mt-5 font-serif text-2xl tracking-[-0.035em]">
                Design with purpose.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#002556]/70">
                Balance function, material, light and context to create
                spaces that feel considered.
              </p>
            </article>

            <article className="team-philosophy-item border-t border-[#002556]/25 py-6 sm:pb-8">
              <p className="font-serif text-3xl text-[#002556]/65">03</p>

              <h3 className="mt-5 font-serif text-2xl tracking-[-0.035em]">
                Work together.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#002556]/70">
                Keep communication open and make the design journey
                collaborative at every stage.
              </p>
            </article>

            <article className="team-philosophy-item border-t border-[#002556]/25 py-6 sm:pb-8">
              <p className="font-serif text-3xl text-[#002556]/65">04</p>

              <h3 className="mt-5 font-serif text-2xl tracking-[-0.035em]">
                Care about details.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#002556]/70">
                Give attention to the small decisions that influence how
                a space looks, works and feels.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="container-shell py-20 sm:py-28 lg:py-32">
        <div className="team-closing flex flex-col gap-7 border-t border-[#002556]/20 pt-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[#002556]/65">
              Have a project in mind?
            </p>

            <h2 className="max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              Let's make something
              <span className="italic text-[#002556]/65"> meaningful.</span>
            </h2>
          </div>

          <a
            href="/contact"
            className="group inline-flex w-fit items-center gap-4 border-b border-[#002556]/30 pb-3 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#002556] hover:text-[#002556]/65"
          >
            Start a conversation

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
