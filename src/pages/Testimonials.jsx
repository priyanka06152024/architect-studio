
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

  const total = testimonials?.length ?? 0;
  const active = testimonials?.[activeIndex];

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
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
          "-=0.3"
        )
        .from(
          ".testi-hero-bottom > *",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.5"
        );

      gsap.from(".testi-stage", {
        y: 55,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testi-stage",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".testi-bottom-copy > *", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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
          const currentElement = contentRef.current;

          if (!currentElement) {
            setIsAnimating(false);
            return;
          }

          gsap.fromTo(
            currentElement,
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
            }
          );
        });
      },
    });
  };

  if (!total) {
    return (
      <main
        ref={pageRef}
        className="overflow-hidden bg-white text-[#002556]"
      >
        <section className="group relative isolate flex min-h-[82svh] flex-col justify-between overflow-hidden px-5 pb-7 pt-32 text-white sm:px-8 sm:pb-10 sm:pt-36 lg:min-h-[92svh] lg:px-14 lg:pb-12 lg:pt-40">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary architectural interior"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/40" />

          <p className="text-xs uppercase tracking-[0.23em] text-[#FEC73A]">
            Shri Norris Architects
          </p>

          <div className="py-16">
            <p className="mb-6 text-xs uppercase tracking-[0.23em] text-white/75">
              Architecture is personal.
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.83] tracking-[-0.065em]">
              Made with
              <br />
              <span className="italic text-[#FEC73A]">intention.</span>
              <br />
              Remembered.
            </h1>
          </div>

          <p className="border-t border-white/25 pt-6 text-sm text-white/80">
            Client perspectives and experiences.
          </p>
        </section>

        <section
          id="client-stories"
          className="bg-[#F8F7F3] px-5 py-24 sm:px-8 lg:px-14"
        >
          <h2 className="font-serif text-4xl tracking-tight sm:text-6xl">
            Client perspectives.
          </h2>
          <p className="mt-5 text-sm text-[#252724]/65">
            Client testimonials will appear here.
          </p>
        </section>

        <CTASection />
      </main>
    );
  }

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-white text-[#002556]"
    >
      {/* CINEMATIC HERO — DESIGN UNCHANGED */}
      <section className="group relative isolate flex min-h-[82svh] flex-col justify-between overflow-hidden px-5 pb-7 pt-32 text-white sm:px-8 sm:pb-10 sm:pt-36 lg:min-h-[92svh] lg:px-14 lg:pb-12 lg:pt-40">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary architectural interior"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-black/40" />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[#002556]/0 transition-colors duration-700 ease-in-out group-hover:bg-[#002556]/25" />

        <div className="testi-topline relative z-10 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.23em] text-[#FEC73A] sm:text-xs">
            Shri Norris Architects
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/70 sm:text-xs">
            Perspectives / 001
          </p>
        </div>

        <div className="relative z-10 py-16 sm:py-20 lg:py-24">
          <p className="mb-6 text-[10px] uppercase tracking-[0.23em] text-white/75 sm:text-xs">
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

        <div className="testi-hero-bottom relative z-10 flex flex-col justify-between gap-6 border-t border-white/25 pt-6 sm:flex-row sm:items-end sm:pt-8">
          <p className="max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            The best measure of a space is not just how it looks, but how it
            becomes part of someone&apos;s life.
          </p>

          <a
            href="#client-stories"
            className="group/link inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#FEC73A] sm:text-xs"
          >
            Explore client stories
            <span className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-all duration-500 group-hover/link:-rotate-45 group-hover/link:border-[#FEC73A] group-hover/link:bg-[#FEC73A] group-hover/link:text-[#002556]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* ORIGINAL TESTIMONIAL CARD DESIGN */}
      <section
        id="client-stories"
        className="relative overflow-hidden bg-[#F8F7F3] px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[9vw]"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <p className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#002556]/60">
            <span className="h-px w-8 bg-[#C6A45B]" />
            05 — Our testimonials
            <span className="h-px w-8 bg-[#C6A45B]" />
          </p>

          <h2 className="mt-7 font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.075em] text-[#002556]">
            Our Testimonials
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#252724]/65">
            The most meaningful part of our work is the experience people carry
            with them long after a project is complete.
          </p>
        </div>

        <div className="testi-stage relative mx-auto max-w-6xl">
          <div className="relative flex items-center gap-3 sm:gap-6 lg:gap-10">
            <button
              type="button"
              aria-label="Previous testimonial"
              disabled={isAnimating}
              onClick={() =>
                goTo(activeIndex === 0 ? total - 1 : activeIndex - 1)
              }
              className="z-20 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#002556]/20 bg-white text-[#002556] transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] disabled:opacity-40 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            >
              <ArrowLeft size={19} />
            </button>

            <article className="relative min-w-0 flex-1 overflow-hidden border border-[#002556]/10 bg-white px-5 py-9 shadow-[0_15px_50px_rgba(37,39,36,0.035)] sm:px-10 sm:py-12 lg:px-16 lg:py-16">
              <div className="absolute right-0 top-0 h-1 w-24 bg-[#FEC73A] sm:w-32" />

              <div
                ref={contentRef}
                aria-live="polite"
                className="flex flex-col items-center text-center"
              >
                <span className="font-serif text-7xl leading-[0.8] text-[#C6A45B] sm:text-8xl">
                  “
                </span>

                <p className="mt-7 max-w-3xl font-serif text-[clamp(1.35rem,3vw,2.5rem)] leading-[1.45] tracking-[-0.025em] text-[#252724]">
                  {active?.quote}
                </p>

                <div className="mt-9 h-px w-12 bg-[#C6A45B]" />

                <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-[#002556] sm:text-sm">
                  {active?.name}
                </h3>

                <p className="mt-2 text-[10px] tracking-[0.08em] text-[#252724]/55 sm:text-xs">
                  {active?.meta}
                </p>
              </div>

              <div className="mt-9 flex items-center justify-center gap-3 border-t border-[#002556]/10 pt-5">
                <span className="text-[10px] tracking-[0.15em] text-[#002556]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-[#C6A45B]" />
                <span className="text-[10px] tracking-[0.15em] text-[#002556]/40">
                  {String(total).padStart(2, "0")}
                </span>
              </div>
            </article>

            <button
              type="button"
              aria-label="Next testimonial"
              disabled={isAnimating}
              onClick={() =>
                goTo(activeIndex === total - 1 ? 0 : activeIndex + 1)
              }
              className="z-20 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#002556]/20 bg-white text-[#002556] transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] disabled:opacity-40 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            >
              <ArrowRight size={19} />
            </button>
          </div>

          <div className="mt-9 flex items-center justify-center gap-2.5">
            {testimonials.map((item, index) => (
              <button
                key={`${item.name}-${index}`}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                aria-pressed={activeIndex === index}
                disabled={isAnimating}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "h-2.5 w-7 bg-[#C6A45B]"
                    : "h-2 w-2 bg-[#002556]/20 hover:bg-[#002556]/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="testi-bottom-copy mt-14 text-center sm:mt-20">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#252724]/45">
            Thoughtfully designed · Personally experienced
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#002556] transition-colors hover:text-[#9B7620]"
          >
            Discuss your project
            <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
