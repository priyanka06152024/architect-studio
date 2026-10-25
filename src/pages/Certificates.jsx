
import { useLayoutEffect, useRef } from "react";
import {
  Award,
  FileCheck2,
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTASection } from "../components/Shared";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    number: "01",
    title: "Professional qualifications",
    description:
      "Professional registrations and qualifications relevant to the practice of architecture and design.",
    status: "Official document to be added",
    Icon: Award,
  },
  {
    number: "02",
    title: "Professional memberships",
    description:
      "Verified professional memberships and affiliations associated with the practice.",
    status: "Official document to be added",
    Icon: FileCheck2,
  },
];

export default function Certificates() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(".cert-hero-label", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".cert-hero-title", {
        y: 65,
        opacity: 0,
        duration: 1.1,
        delay: 0.12,
        ease: "power4.out",
      });

      gsap.from(".cert-hero-bottom > *", {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".cert-section-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-section-heading",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".cert-card", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".cert-note", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-note",
          start: "top 90%",
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
      className="overflow-hidden bg-[#f3f1e9] text-[#252620]"
    >
      {/* HERO */}
      <section className="relative flex min-h-[76svh] flex-col justify-between bg-[#252620] px-5 pb-8 pt-32 text-[#f3f1e9] sm:px-8 sm:pb-10 sm:pt-36 lg:min-h-[82svh] lg:px-14 lg:pb-12 lg:pt-40">
        <div className="flex items-center justify-between gap-4">
          <p className="cert-hero-label text-[10px] uppercase tracking-[0.24em] text-[#c3cd91] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="cert-hero-label text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-xs">
            Credentials & Recognition
          </p>
        </div>

        <div className="py-16 sm:py-20 lg:py-24">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/45 sm:mb-7">
            Professional standards
          </p>

          <h1 className="cert-hero-title max-w-5xl font-serif text-[clamp(3.8rem,10.5vw,9.5rem)] leading-[0.88] tracking-[-0.065em]">
            Built on
            <br />
            <span className="italic text-[#c3cd91]">trust.</span>
          </h1>
        </div>

        <div className="cert-hero-bottom grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10 sm:pt-8">
          <p className="max-w-md text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            Professional qualifications and affiliations that support a
            thoughtful, responsible approach to architecture.
          </p>

          <a
            href="#credentials"
            className="group inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-[#f3f1e9] transition-colors duration-300 hover:text-[#c3cd91] sm:text-xs"
          >
            Explore credentials
            <span className="flex size-10 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:border-[#c3cd91] group-hover:bg-[#c3cd91] group-hover:text-[#252620] group-hover:rotate-[-45deg]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* EXISTING CREDENTIALS */}
      <section
        id="credentials"
        className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32"
      >
        <div className="cert-section-heading mb-10 flex flex-col justify-between gap-6 border-b border-[#252620]/20 pb-7 sm:mb-14 sm:flex-row sm:items-end lg:mb-16">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#777d52] sm:text-xs">
              01 — Credentials
            </p>

            <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              Proof of
              <br className="sm:hidden" /> practice.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#252620]/65 sm:text-right sm:text-base">
            Qualifications and professional affiliations relevant to the
            practice of architecture.
          </p>
        </div>

        <div className="cert-grid grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {credentials.map(({ number, title, description, status, Icon }) => (
            <article
              key={number}
              className="cert-card group relative flex min-h-[340px] flex-col justify-between overflow-hidden border border-[#252620]/15 bg-[#e9e7dc] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#777d52]/70 hover:bg-[#e4e3d5] sm:min-h-[390px] sm:p-9 lg:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs tracking-[0.15em] text-[#252620]/50">
                  {number} / 02
                </span>

                <div className="flex size-12 items-center justify-center border border-[#252620]/15 transition-all duration-500 group-hover:border-[#777d52] group-hover:bg-[#777d52] group-hover:text-[#f3f1e9] sm:size-14">
                  <Icon
                    size={23}
                    strokeWidth={1.2}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="relative mt-12">
                <div className="mb-5 h-px w-10 bg-[#777d52] transition-all duration-500 group-hover:w-20" />

                <h3 className="max-w-lg font-serif text-3xl leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]">
                  {title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-[#252620]/65 sm:text-base sm:leading-8">
                  {description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#252620]/15 pt-5">
                <span className="text-[9px] uppercase tracking-[0.13em] text-[#252620]/50 sm:text-[10px] sm:tracking-[0.16em]">
                  {status}
                </span>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.4}
                  className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
            </article>
          ))}
        </div>

        {/* AUTHENTICITY NOTE */}
        <div className="cert-note mt-8 flex flex-col gap-4 border border-[#252620]/15 p-5 sm:mt-10 sm:flex-row sm:items-start sm:gap-5 sm:p-7 lg:p-8">
          <div className="flex size-11 shrink-0 items-center justify-center bg-[#252620] text-[#c3cd91]">
            <ShieldCheck size={21} strokeWidth={1.4} />
          </div>

          <div>
            <h3 className="text-sm font-medium sm:text-base">
              Authenticity matters
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#252620]/65">
              Only authentic, current certificates and verified professional
              memberships should be displayed here. Replace the placeholders
              above with the relevant official documents and confirmed details.
            </p>
          </div>
        </div>
      </section>

      {/* EXISTING CONTACT CTA */}
      <section className="relative mx-5 mb-5 overflow-hidden bg-[#dfe1d2] px-6 py-14 sm:mx-8 sm:px-10 sm:py-16 lg:mx-14 lg:mb-14 lg:px-14 lg:py-20">
        <div className="relative flex flex-col justify-between gap-9 sm:flex-row sm:items-end">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#777d52] sm:text-xs">
              Have a project in mind?
            </p>

            <h2 className="max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Let&apos;s build
              <br />
              something <span className="italic">meaningful.</span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="group inline-flex w-fit shrink-0 items-center gap-5 border-b border-[#252620]/35 pb-3 text-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#777d52] hover:text-[#777d52] sm:text-sm"
          >
            Get in touch
            <span className="flex size-10 items-center justify-center rounded-full border border-[#252620]/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#777d52] group-hover:bg-[#777d52] group-hover:text-white">
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
