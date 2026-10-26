
import { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import { testimonials } from "../data/content";
import { CTASection } from "../components/Shared";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const active = testimonials[activeIndex];
  const total = testimonials.length;

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      intro
        .from(".testi-topline > *", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
        })
        .from(
          ".testi-heading-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .from(
          ".testi-hero-bottom > *",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.5",
        );

      gsap.from(".testi-stage", {
        y: 65,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testi-stage",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".testi-bottom-copy", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".testi-bottom-copy",
          start: "top 90%",
          once: true,
        },
      });
    }, page);

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(frame);
      ctx.revert();
    };
  }, []);

  const goTo = (index) => {
    if (
      isAnimating ||
      index < 0 ||
      index >= total ||
      index === activeIndex
    ) {
      return;
    }

    const element = contentRef.current;

    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setActiveIndex(index);
      return;
    }

    setIsAnimating(true);

    gsap.to(element, {
      opacity: 0,
      y: 18,
      filter: "blur(5px)",
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(index);

        requestAnimationFrame(() => {
          if (!contentRef.current) {
            setIsAnimating(false);
            return;
          }

          gsap.fromTo(
            contentRef.current,
            {
              opacity: 0,
              y: 25,
              filter: "blur(5px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.55,
              ease: "power3.out",
              onComplete: () => setIsAnimating(false),
            },
          );
        });
      },
    });
  };

  if (!total) {
    return (
      <main className="bg-[#002556] px-5 py-32 text-[#FFFFFF] sm:px-8 lg:px-14">
        <h1 className="font-serif text-5xl">Client perspectives.</h1>
        <p className="mt-5 text-sm text-white/60">
          Client testimonials will appear here.
        </p>
      </main>
    );
  }

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#FFFFFF] text-[#002556]"
    >
      {/* CINEMATIC HERO */}
      <section className="relative flex min-h-[82svh] flex-col justify-between overflow-hidden bg-[#002556] px-5 pb-7 pt-32 text-[#FFFFFF] sm:px-8 sm:pb-10 sm:pt-36 lg:min-h-[92svh] lg:px-14 lg:pb-12 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-[20%] size-[340px] rounded-full border border-white/[0.07] sm:size-[500px] lg:size-[680px]" />
          <div className="absolute -right-16 top-[27%] size-[220px] rounded-full border border-white/[0.07] sm:size-[370px] lg:size-[520px]" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[#FEC73A]/70 via-white/10 to-transparent" />
        </div>

        <div className="testi-topline relative z-10 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.23em] text-[#FEC73A] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 sm:text-xs">
            Perspectives / 001
          </p>
        </div>

        <div className="relative z-10 py-16 sm:py-20 lg:py-24">
          <p className="mb-6 text-[10px] uppercase tracking-[0.23em] text-white/45 sm:text-xs">
            Architecture is personal.
          </p>

          <h1 className="font-serif text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.83] tracking-[-0.065em]">
            <span className="block overflow-hidden pb-2">
              <span className="testi-heading-line block">
                Made with
              </span>
            </span>

            <span className="block overflow-hidden pb-2">
              <span className="testi-heading-line block italic text-[#FEC73A]">
                intention.
              </span>
            </span>

            <span className="block overflow-hidden pb-2">
              <span className="testi-heading-line block">
                Remembered.
              </span>
            </span>
          </h1>
        </div>

        <div className="testi-hero-bottom relative z-10 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:pt-8">
          <p className="max-w-md text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            The best measure of a space is not just how it looks, but how it
            becomes part of someone&apos;s life.
          </p>

          <a
            href="#client-stories"
            className="group inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#FEC73A] sm:text-xs"
          >
            Explore client stories
            <span className="flex size-10 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* IMMERSIVE TESTIMONIAL SLIDER */}
      <section
        id="client-stories"
        className="bg-[#FEC73A]/[0.10] px-5 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-28"
      >
        <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#002556]/70 sm:text-xs">
              The voices behind the work
            </p>

            <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              A space can
              <br />
              say a lot.
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-7 text-[#002556]/60 sm:text-right sm:text-base">
            Different people. Different perspectives. One shared experience
            of creating something meaningful.
          </p>
        </div>

        <div className="testi-stage relative overflow-hidden bg-[#002556] text-[#FFFFFF]">
          {/* TOP BAR */}
          <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#FEC73A]" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/55 sm:text-[10px]">
                Client testimonial
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.15em] text-white/45 sm:text-xs">
              {String(activeIndex + 1).padStart(2, "0")}{" "}
              <span className="text-white/25">/</span>{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* QUOTE DISPLAY */}
          <div className="relative flex min-h-[400px] flex-col justify-between p-6 sm:min-h-[470px] sm:p-10 lg:min-h-[540px] lg:p-14 xl:p-16">
            <span className="pointer-events-none absolute right-4 top-4 font-serif text-[180px] leading-none text-white/[0.035] sm:right-10 sm:top-8 sm:text-[260px]">
              ”
            </span>

            <div
              ref={contentRef}
              aria-live="polite"
              className="relative z-10 flex flex-1 flex-col"
            >
              <Quote
                size={31}
                strokeWidth={1.2}
                className="mb-8 text-[#FEC73A] sm:mb-10 sm:size-10"
              />

              <blockquote className="max-w-5xl flex-1">
                <p className="font-serif text-[clamp(1.8rem,4.3vw,4.4rem)] leading-[1.2] tracking-[-0.045em]">
                  “{active.quote}”
                </p>
              </blockquote>

              <div className="mt-12 flex flex-col justify-between gap-5 border-t border-white/15 pt-6 sm:mt-16 sm:flex-row sm:items-end">
                <div>
                  <p className="font-serif text-2xl tracking-[-0.025em] sm:text-3xl">
                    {active.name}
                  </p>

                  <p className="mt-2 text-xs text-white/50 sm:text-sm">
                    {active.meta}
                  </p>
                </div>

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#FEC73A] sm:text-[10px]">
                  Shri Norris / Client voices
                </p>
              </div>
            </div>
          </div>

          {/* SLIDER CONTROLS */}
          <div className="border-t border-white/15 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
            <div className="mb-5 h-px w-full bg-white/10">
              <div
                className="h-full bg-[#FEC73A] transition-[width] duration-500 ease-out"
                style={{
                  width: `${((activeIndex + 1) / total) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {testimonials.map((t, index) => (
                  <button
                    type="button"
                    key={`${t.name}-${index}`}
                    onClick={() => goTo(index)}
                    disabled={isAnimating}
                    aria-label={`Show testimonial ${index + 1} from ${t.name}`}
                    aria-pressed={activeIndex === index}
                    className={`h-8 min-w-8 px-2 text-[10px] transition-all duration-300 sm:h-9 sm:min-w-9 ${
                      activeIndex === index
                        ? "bg-[#FEC73A] text-[#002556]"
                        : "border border-white/15 text-white/55 hover:border-[#FEC73A] hover:text-[#FEC73A]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  disabled={activeIndex === 0 || isAnimating}
                  aria-label="Previous testimonial"
                  className="flex size-10 items-center justify-center border border-white/20 transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent disabled:hover:text-white sm:size-12"
                >
                  <ArrowLeft size={17} strokeWidth={1.4} />
                </button>

                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  disabled={activeIndex === total - 1 || isAnimating}
                  aria-label="Next testimonial"
                  className="flex size-10 items-center justify-center border border-white/20 transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent disabled:hover:text-white sm:size-12"
                >
                  <ArrowRight size={17} strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM EDITORIAL STRIP */}
        <div className="testi-bottom-copy mt-8 flex flex-col justify-between gap-4 border-t border-[#002556]/20 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-[#002556]/55">
            Thoughtful spaces. Honest experiences.
          </p>

          <a
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.17em] text-[#002556] transition-colors duration-300 hover:text-[#b38600] sm:text-xs"
          >
            Start a conversation
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
