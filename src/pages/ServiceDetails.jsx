
import { useLayoutEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDown,
  Check,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "../data/content";
import { serviceDetails } from "../data/serviceDetails";

gsap.registerPlugin(ScrollTrigger);

const createServiceSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function ServiceDetails() {
  const { slug } = useParams();
  const pageRef = useRef(null);

  const baseService = services.find(
    (item) => createServiceSlug(item.title) === slug
  );

  const details = serviceDetails[slug];

  useLayoutEffect(() => {
    if (!details || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".detail-hero-content", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.utils.toArray(".detail-reveal").forEach((element) => {
        gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [slug, details]);

  if (!baseService || !details) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-white px-5 text-[#002556]">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#002556]/50">
            Shri Norris Architects
          </p>

          <h1 className="mt-5 font-serif text-4xl sm:text-6xl">
            Service not found.
          </h1>

          <p className="mt-4 text-sm text-[#002556]/60">
            Please choose a service from our services page.
          </p>

          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#FEC73A] px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#002556] hover:text-white"
          >
            <ArrowLeft size={15} />
            All services
          </Link>
        </div>
      </main>
    );
  }

  const currentIndex = services.findIndex(
    (item) => createServiceSlug(item.title) === slug
  );

  const nextService = services[(currentIndex + 1) % services.length];

  const nextSlug = createServiceSlug(nextService?.title);

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-white text-[#002556]"
    >
      {/* HERO — clean image with a very subtle blue hover tint */}
      <section
        className="group/hero relative isolate flex min-h-[88svh] flex-col justify-between overflow-hidden bg-[#002556] px-5 pb-8 pt-28 text-white sm:min-h-screen sm:px-8 sm:pb-10 sm:pt-32 lg:px-[5vw]"
      >
        <img
          key={slug}
          src={details.image || baseService.image}
          alt={details.subtitle}
          className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        />

        {/* Light baseline overlay for legible white text */}
        <div className="absolute inset-0 -z-20 bg-[#002556]/20" />

        {/* Hover only adds a very light navy-blue tint */}
        <div className="absolute inset-0 -z-10 bg-[#002556]/0 transition-colors duration-700 group-hover/hero:bg-[#002556]/15" />

        {/* Subtle gradient only near text areas */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#002556]/35 via-transparent to-[#002556]/65" />

        {/* Top navigation */}
        <div className="detail-hero-content relative z-10 flex items-center justify-between gap-4">
          <Link
            to="/services"
            className="group/back inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-white/90 transition-colors hover:text-[#FEC73A]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/50 transition-all duration-300 group-hover/back:border-[#FEC73A] group-hover/back:bg-[#FEC73A] group-hover/back:text-[#002556]">
              <ArrowLeft size={15} />
            </span>
            All services
          </Link>

          <span className="text-right text-[9px] uppercase tracking-[0.16em] text-white sm:text-[10px]">
            Shri Norris Architects
            <span className="mt-1 block text-[#FEC73A]">
              Design / Detail / Delivery
            </span>
          </span>
        </div>

        {/* Dynamic hero content for each service */}
        <div className="relative z-10 mt-20 grid items-end gap-10 lg:mt-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="max-w-5xl">
            <p className="detail-hero-content flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#FEC73A]">
              <span className="h-2 w-2 rounded-full bg-[#FEC73A]" />
              {details.subtitle}
            </p>

            <h1 className="detail-hero-content mt-6 max-w-5xl font-serif text-[clamp(3rem,7.5vw,7.8rem)] leading-[0.91] tracking-[-0.065em]">
              {details.heading}
            </h1>

            <p className="detail-hero-content mt-7 max-w-2xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              {details.overview}
            </p>

            <Link
              to="/contact"
              className="detail-hero-content group/cta mt-8 inline-flex items-center gap-5 rounded-full bg-[#FEC73A] px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#002556] transition-all duration-300 hover:gap-7 hover:bg-white"
            >
              Discuss your project
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
              />
            </Link>
          </div>

          {/* Service number and scroll link */}
          <div className="detail-hero-content flex items-end justify-between gap-5 border-t border-white/40 pt-5 lg:block lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-white/75">
                Our expertise
              </p>

              <p className="mt-2 font-serif text-3xl text-[#FEC73A] sm:text-4xl">
                {String(currentIndex + 1).padStart(2, "0")}
                <span className="ml-2 text-lg text-white/70">
                  / {String(services.length).padStart(2, "0")}
                </span>
              </p>
            </div>

            <a
              href="#service-overview"
              className="group/scroll inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.15em] text-white/90 transition-colors hover:text-[#FEC73A] lg:mt-8"
            >
              Discover more

              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/50 transition-all duration-300 group-hover/scroll:border-[#FEC73A] group-hover/scroll:bg-[#FEC73A] group-hover/scroll:text-[#002556]">
                <ArrowDown size={14} />
              </span>
            </a>
          </div>
        </div>

        {/* Bottom caption */}
        <div className="relative z-10 mt-12 flex items-center justify-between gap-4 border-t border-white/35 pt-5 text-[9px] uppercase tracking-[0.15em] text-white/80">
          <span>Shri Norris Architects</span>
          <span>Thoughtfully designed spaces</span>
        </div>
      </section>

      {/* OVERVIEW */}
      <section
        id="service-overview"
        className="px-5 py-20 sm:px-8 sm:py-28 lg:px-[5vw] lg:py-36"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="detail-reveal">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#002556]/55">
              01 — The service
            </p>

            <h2 className="mt-6 max-w-md font-serif text-4xl leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Thoughtful design. Practical solutions.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#002556]/60">
              Every project is different. Our approach adapts to the space,
              the people using it and the practical needs behind the design.
            </p>
          </div>

          <div className="detail-reveal flex flex-col justify-end">
            <p className="text-base leading-8 text-[#002556]/75 sm:text-lg sm:leading-9">
              {details.overview}
            </p>

            <div className="mt-8 h-px w-full bg-[#002556]/15" />

            <div className="mt-5 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.15em] text-[#002556]/55">
              <span>{details.subtitle}</span>
              <span>Designed with purpose</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE FEATURES */}
      <section className="bg-[#F5F7FA] px-5 py-20 sm:px-8 sm:py-28 lg:px-[5vw] lg:py-32">
        <div className="detail-reveal mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#002556]/55">
              02 — What's included
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-[-0.05em] sm:text-6xl">
              Our expertise
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#002556]/65">
            A considered approach tailored to your brief, site conditions
            and project requirements.
          </p>
        </div>

        <div className="grid gap-px bg-[#002556]/15 sm:grid-cols-2">
          {details.features.map((feature, index) => (
            <div
              key={feature}
              className="detail-reveal group flex min-h-36 items-start gap-5 bg-[#F5F7FA] p-6 transition-colors duration-300 hover:bg-white sm:p-8"
            >
              <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#002556]/20 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                <Check size={15} />
              </span>

              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#002556]/40">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-3 font-serif text-xl leading-snug sm:text-2xl">
                  {feature}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-[5vw] lg:py-36">
        <div className="detail-reveal">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#002556]/55">
            03 — Our process
          </p>

          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            From the first conversation to the finer details.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#002556]/65 sm:text-base sm:leading-8">
            Clear communication and a considered sequence of decisions help
            each stage move forward with a shared understanding of the goal.
          </p>
        </div>

        <div className="mt-14 border-t border-[#002556]/20">
          {details.process.map((step, index) => (
            <div
              key={step.title}
              className="detail-reveal grid grid-cols-[38px_1fr] gap-4 border-b border-[#002556]/20 py-7 sm:grid-cols-[70px_0.8fr_1.2fr] sm:gap-8 sm:py-10"
            >
              <span className="pt-1 text-[10px] tracking-[0.15em] text-[#002556]/50">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">
                {step.title}
              </h3>

              <p className="col-start-2 max-w-xl text-sm leading-7 text-[#002556]/65 sm:col-start-auto sm:text-base sm:leading-8">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* NEXT SERVICE */}
      {nextService && (
        <Link
          to={`/services/${nextSlug}`}
          className="group block border-t border-[#002556]/10 bg-white px-5 py-10 transition-colors duration-500 hover:bg-[#F5F7FA] sm:px-8 sm:py-14 lg:px-[5vw]"
        >
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#002556]/50">
                Next service
              </p>

              <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl">
                {nextService.title}
              </h2>
            </div>

            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#002556]/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] sm:h-14 sm:w-14">
              <ArrowUpRight size={20} />
            </span>
          </div>
        </Link>
      )}
    </main>
  );
}

export default ServiceDetails;
