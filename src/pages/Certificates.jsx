import { useLayoutEffect, useRef } from "react";
import {
  FileCheck2,
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  Download,
  Maximize2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTASection } from "../components/Shared";
import cerImg from "../assets/images/Shri Norris Architects Print _ Udyam Registration Certificate.webp";

gsap.registerPlugin(ScrollTrigger);

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
        stagger: 0.1,
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

      gsap.from(".cert-document-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-document-heading",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".cert-document-visual", {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-document-visual",
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
    <main ref={pageRef} className="overflow-hidden bg-white text-[#002556]">
      {/* HERO */}

      <section className="group relative isolate flex min-h-[76svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-32 text-white sm:px-8 sm:pb-10 sm:pt-36 lg:min-h-[82svh] lg:px-14 lg:pb-12 lg:pt-40">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary architectural space"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Normal Dark Overlay */}
        <div className="absolute inset-0 -z-10 bg-black/40" />

        {/* Subtle Blue Tint on Hover */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[#002556]/0 transition-colors duration-700 ease-in-out group-hover:bg-[#002556]/25" />

        {/* Top Labels */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <p className="cert-hero-label text-[10px] uppercase tracking-[0.24em] text-[#FEC73A] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="cert-hero-label text-[10px] uppercase tracking-[0.18em] text-white/75 sm:text-xs">
            Official Documentation
          </p>
        </div>

        {/* Main Heading */}
        <div className="relative z-10 py-16 sm:py-20 lg:py-24">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/75 sm:mb-7">
            Registered with purpose
          </p>

          <h1 className="cert-hero-title max-w-5xl font-serif text-[clamp(3.8rem,10.5vw,9.5rem)] leading-[0.88] tracking-[-0.065em]">
            Built on
            <br />
            <span className="italic text-[#FEC73A]">trust.</span>
          </h1>
        </div>

        {/* Bottom Content */}
        <div className="cert-hero-bottom relative z-10 grid grid-cols-1 gap-6 border-t border-white/25 pt-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10 sm:pt-8">
          <p className="max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            Our Udyam Registration Certificate reflects our formal registration
            under India's MSME framework.
          </p>

          <a
            href="#certificate"
            className="group/link inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#FEC73A] sm:text-xs"
          >
            View certificate
            <span className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-all duration-500 group-hover/link:-rotate-45 group-hover/link:border-[#FEC73A] group-hover/link:bg-[#FEC73A] group-hover/link:text-[#002556]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* SINGLE UDYAM CERTIFICATE */}
      <section
        id="certificate"
        className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32"
      >
        <div className="cert-document-heading mb-10 flex flex-col justify-between gap-6 border-b border-[#002556]/20 pb-7 sm:mb-14 sm:flex-row sm:items-end lg:mb-16">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#002556]/65 sm:text-xs">
              01 — Official Registration
            </p>

            <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              Udyam
              <br className="sm:hidden" /> Registration.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#002556]/70 sm:text-right sm:text-base">
            Our official registration document, presented with clarity and
            transparency.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          {/* Certificate details */}
          <div className="cert-document-visual lg:sticky lg:top-28">
            <div className="flex size-14 items-center justify-center border border-[#002556]/15 bg-[#002556]/[0.04] text-[#002556] transition-all duration-500 hover:border-[#FEC73A] hover:bg-[#FEC73A]">
              <FileCheck2 size={25} strokeWidth={1.3} />
            </div>

            <p className="mt-7 text-[10px] uppercase tracking-[0.2em] text-[#002556]/55">
              Official Document
            </p>

            <h3 className="mt-3 max-w-md font-serif text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
              A record of our registration.
            </h3>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#002556]/70 sm:text-base sm:leading-8">
              This certificate documents the Udyam registration of Shri Norris
              Architects. The original document is available to view in full
              size.
            </p>

            <div className="mt-8 border-t border-[#002556]/15 pt-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-[#b28a17]"
                  strokeWidth={1.5}
                />

                <div>
                  <p className="text-sm font-medium">Official documentation</p>
                  <p className="mt-1 text-xs leading-6 text-[#002556]/60">
                    Refer to the original certificate for its official
                    registration details.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={cerImg}
              download
              className="group mt-8 inline-flex items-center gap-4 border-b border-[#002556]/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#b28a17] hover:text-[#8b6b0d] sm:text-xs"
            >
              Download certificate
              <Download
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
          </div>

          {/* Certificate image preview */}
          <div className="cert-document-visual group relative min-w-0">
            <div className="absolute -right-3 -top-3 h-full w-full border border-[#FEC73A] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:-right-5 sm:-top-5" />

            <div className="relative border border-[#002556]/10 bg-[#f7f8fa] p-3 shadow-[0_20px_60px_rgba(0,37,86,0.10)] transition-shadow duration-500 group-hover:shadow-[0_28px_80px_rgba(0,37,86,0.18)] sm:p-5">
              <div className="mb-4 flex items-center justify-between border-b border-[#002556]/10 pb-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#002556]/65 sm:text-[10px]">
                  Udyam Registration Certificate
                </span>

                <span className="size-2 rounded-full bg-[#FEC73A]" />
              </div>

              {/* Hover to zoom; click to open the original image */}
              <a
                href={cerImg}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the original Udyam Registration Certificate in a new tab"
                className="relative block cursor-zoom-in overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-[#FEC73A]"
              >
                <img
                  src={cerImg}
                  alt="Udyam Registration Certificate of Shri Norris Architects"
                  loading="lazy"
                  className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#002556]/0 transition-colors duration-500 group-hover:bg-[#002556]/15">
                  <span className="flex translate-y-3 items-center gap-2 rounded-full bg-[#FEC73A] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-[#002556] opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-[10px]">
                    <Maximize2 size={14} />
                    View Full Size
                  </span>
                </div>
              </a>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#002556]/10 pt-4">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#002556]/55 sm:text-[10px]">
                  Shri Norris Architects
                </span>

                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#002556]">
                  UDYAM <span className="text-[#b28a17]">↗</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Authenticity note */}
        <div className="cert-note mt-12 flex flex-col gap-4 border border-[#002556]/15 p-5 sm:mt-16 sm:flex-row sm:items-start sm:gap-5 sm:p-7 lg:p-8">
          <div className="flex size-11 shrink-0 items-center justify-center bg-[#002556] text-[#FEC73A]">
            <ShieldCheck size={21} strokeWidth={1.4} />
          </div>

          <div>
            <h3 className="text-sm font-medium sm:text-base">
              Transparency in practice
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#002556]/70">
              We believe in presenting official documentation clearly. Select
              the certificate preview to inspect the original image at full
              size.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative mx-5 mb-5 overflow-hidden bg-[#002556]/[0.055] px-6 py-14 sm:mx-8 sm:px-10 sm:py-16 lg:mx-14 lg:mb-14 lg:px-14 lg:py-20">
        <div className="relative flex flex-col justify-between gap-9 sm:flex-row sm:items-end">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#002556]/65 sm:text-xs">
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
            className="group inline-flex w-fit shrink-0 items-center gap-5 border-b border-[#002556]/35 pb-3 text-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#FEC73A] hover:text-[#002556]/65 sm:text-sm"
          >
            Get in touch
            <span className="flex size-10 items-center justify-center rounded-full border border-[#002556]/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
