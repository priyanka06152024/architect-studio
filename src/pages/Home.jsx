import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { projects, services, testimonials } from "../data/content";
import { CTASection } from "../components/Shared";

import img1 from "../assets/images/img1.avif";
import img2 from "../assets/images/img2.avif";
import img3 from "../assets/images/img3.avif";
import img4 from "../assets/images/img4.avif";
import img5 from "../assets/images/img5.avif";

gsap.registerPlugin(ScrollTrigger);

const media = {
  hero: img1,
  intro: img2,
  work: [img3, img4, img5],
};

const serviceDefaults = [
  {
    title: "Architecture",
    description: "Buildings shaped around people and place.",
  },
  {
    title: "Interior Design",
    description: "Material, light and a sense of belonging.",
  },
  {
    title: "Spatial Planning",
    description: "Intelligent spaces with room to breathe.",
  },
  {
    title: "Bespoke Design",
    description: "Considered details, made personal.",
  },
];

const heroSlides = [
  {
    eyebrow: "ARCHITECTURE / OBJECTS / ATMOSPHERE",
    firstLine: "A different",
    secondLine: "way to feel.",
    description:
      "We create architecture that goes beyond appearance — spaces shaped by emotion, material and the experience of being there.",
    featured: "Space. In its purest form.",
    label: "ARCHITECTURAL EXPERIENCE",
    location: "ALIGARH / INDIA",
    image: media.hero,
    alt: "Contemporary architecture with refined materials",
  },
  {
    eyebrow: "RESIDENTIAL / LIGHT / FORM",
    firstLine: "Beyond the",
    secondLine: "ordinary.",
    description:
      "Thoughtful residences where natural light, refined materials and considered proportions come together.",
    featured: "A quieter kind of luxury.",
    label: "RESIDENTIAL DESIGN",
    location: "SPACES / STORIES",
    image: media.intro,
    alt: "Contemporary interior with natural light",
  },
  {
    eyebrow: "INTERIORS / TEXTURE / DETAIL",
    firstLine: "Made to",
    secondLine: "belong.",
    description:
      "Interiors designed around people, balancing tactile materials, timeless details and everyday living.",
    featured: "Details make the difference.",
    label: "INTERIOR ARCHITECTURE",
    location: "MATERIAL / MEANING",
    image: media.work[0],
    alt: "Modern interior architecture",
  },
  {
    eyebrow: "VISION / CRAFT / TIMELESSNESS",
    firstLine: "Built around",
    secondLine: "you.",
    description:
      "From the first sketch to the final detail, we shape distinctive places with clarity, purpose and character.",
    featured: "Designed with intention.",
    label: "OUR DESIGN PHILOSOPHY",
    location: "CRAFT / CULTURE",
    image: media.work[1],
    alt: "Carefully considered contemporary living space",
  },
];

function Eyebrow({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] ${
        dark ? "text-white/60" : "text-[#002556]/60"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#FEC73A]" />
      {children}
    </span>
  );
}

function CircleLink({ to, children, dark = false }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-4 text-[10px] tracking-[0.15em] ${
        dark ? "text-white" : "text-[#002556]"
      }`}
    >
      {children}
      <span className="grid h-10 w-10 place-items-center rounded-full border border-current/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
        <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}

function RevealImage({ src, alt, className = "" }) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.055]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#002556]/10 transition-colors duration-500 group-hover:bg-transparent" />
    </div>
  );
}

export default function Home() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const trackRef = useRef(null);

  // Slider state and refs: declared only once.
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroProgressRef = useRef(null);
  const slideTimerRef = useRef(null);

  const changeSlide = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setActiveSlide((current) => {
      return (current + direction + heroSlides.length) % heroSlides.length;
    });
  };

  const workItems = media.work.map((image, index) => {
    const project = projects?.[index];

    return {
      id: project?.id ?? project?.slug ?? index,
      title:
        project?.title ??
        ["The Still House", "A Quiet Residence", "Courtyard Living"][index],
      category:
        project?.category ??
        ["Residential", "Interior Design", "Architecture"][index],
      image,
    };
  });

  const serviceItems = services?.length ? services : serviceDefaults;


  // Animate the active slide and restart its progress indicator.
  useLayoutEffect(() => {
    const image = heroImageRef.current;
    const content = heroContentRef.current;
    const progress = heroProgressRef.current;

    if (!image || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      tl.to(image, {
        scale: 1.12,
        opacity: 0,
        clipPath: "inset(0 0 0 100%)",
        duration: 0.45,
        ease: "power2.in",
      });

      tl.set(image, {
        clipPath: "inset(0 0 0 0)",
        scale: 1.12,
        opacity: 0,
      });

      tl.to(image, {
        scale: 1,
        opacity: 1,
        duration: 1.15,
        ease: "power3.out",
      });

      tl.fromTo(
        content.querySelectorAll(".slider-reveal"),
        {
          y: 35,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      if (progress) {
        gsap.set(progress, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        gsap.to(progress, {
          scaleX: 1,
          duration: 5.5,
          ease: "none",
        });
      }
    });

    return () => ctx.revert();
  }, [activeSlide]);

  useEffect(() => {
    slideTimerRef.current = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => {
      window.clearInterval(slideTimerRef.current);
    };
  }, []);
  // Main page animations and smooth scrolling.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });

    const updateLenis = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let loopTween;
    let resizeObserver;
    let originalItems = [];
    let track;
    let enterHandler;
    let leaveHandler;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reducedMotion) {
        // Hero entrance.

        // Hero entrance — animate only elements that actually exist.
        const heroPhoto = root.querySelector(".hero-photo");

        if (heroPhoto) {
          gsap.fromTo(
            heroPhoto,
            {
              clipPath: "inset(0 0 100% 0)",
            },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.2,
              delay: 0.15,
              ease: "power3.inOut",
              clearProps: "clipPath",
            },
          );
        }

        // Hero image parallax.
        if (heroRef.current) {
          gsap.to(".hero-photo img", {
            yPercent: 6,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.3,
              invalidateOnRefresh: true,
            },
          });
        }

        // General section reveals.
        gsap.utils.toArray(".reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 35, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.1,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true,
              },
            },
          );
        });

        // Image mask reveals.
        gsap.utils.toArray(".image-reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.4,
              ease: "power3.inOut",
              clearProps: "clipPath",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        // Services stagger.
        const serviceRows = gsap.utils.toArray(".service-row");

        if (serviceRows.length) {
          gsap.fromTo(
            serviceRows,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.14,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: ".service-list",
                start: "top 84%",
                once: true,
              },
            },
          );
        }
      }

      // Infinite selected-projects marquee.
      // Clones are removed during cleanup to prevent duplicates.
      track = trackRef.current;

      if (track && track.children.length && !reducedMotion) {
        originalItems = Array.from(track.children);

        originalItems.forEach((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          clone.setAttribute("tabindex", "-1");
          track.appendChild(clone);
        });

        const createLoop = () => {
          if (loopTween) loopTween.kill();

          const halfWidth = track.scrollWidth / 2;
          if (!halfWidth) return;

          gsap.set(track, { x: 0, force3D: true });

          loopTween = gsap.to(track, {
            x: -halfWidth,
            duration: Math.max(25, halfWidth / 35),
            ease: "none",
            repeat: -1,
            force3D: true,
          });
        };

        createLoop();

        resizeObserver = new ResizeObserver(createLoop);
        resizeObserver.observe(track);

        enterHandler = () => loopTween?.pause();
        leaveHandler = () => loopTween?.resume();

        track.addEventListener("mouseenter", enterHandler);
        track.addEventListener("mouseleave", leaveHandler);
        track.addEventListener("focusin", enterHandler);
        track.addEventListener("focusout", leaveHandler);
      }
    }, root);

    const refreshAfterLoad = () => ScrollTrigger.refresh();

    window.addEventListener("load", refreshAfterLoad);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("load", refreshAfterLoad);

      ctx.revert();

      resizeObserver?.disconnect();
      loopTween?.kill();

      if (track) {
        track.removeEventListener("mouseenter", enterHandler);
        track.removeEventListener("mouseleave", leaveHandler);
        track.removeEventListener("focusin", enterHandler);
        track.removeEventListener("focusout", leaveHandler);

        // Remove cloned project cards.
        Array.from(track.children).forEach((item) => {
          if (item.getAttribute("aria-hidden") === "true") {
            item.remove();
          }
        });
      }

      gsap.ticker.remove(updateLenis);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="overflow-clip bg-white text-[#002556] selection:bg-[#FEC73A] selection:text-[#002556]"
    >
      {/* HERO SLIDER */}

      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[#002556] text-white"
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#FEC73A]/10 blur-[130px]" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-white/[0.04] blur-[100px]" />
        </div>

        {/* Slider content */}
        <div
          ref={heroContentRef}
          className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-[1600px] items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-16 lg:py-16"
        >
          {/* Left side */}
          <div className="relative z-10">
            <div className="slider-reveal mb-8 flex items-center gap-3 text-[10px] tracking-[0.25em] text-white/60 sm:text-xs">
              <span className="h-px w-8 bg-[#FEC73A]" />
              {heroSlides[activeSlide].eyebrow}
            </div>

            <div className="overflow-hidden">
              <h1
                key={`title-${activeSlide}`}
                className="slider-reveal text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.88] tracking-[-0.075em] pb-3"
              >
                {heroSlides[activeSlide].firstLine}
                <br />
                <span className="font-normal text-[#FEC73A]">
                  {heroSlides[activeSlide].secondLine}
                </span>
              </h1>
            </div>

            <p
              key={`description-${activeSlide}`}
              className="slider-reveal mt-8 max-w-md text-sm leading-7 text-white/65 sm:text-base sm:leading-8"
            >
              {heroSlides[activeSlide].description}
            </p>

            <div className="slider-reveal mt-9">
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-5 border border-white/25 px-5 py-4 text-[10px] tracking-[0.18em] transition-colors duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] sm:px-6"
              >
                EXPLORE OUR WORK
                <span className="grid h-8 w-8 place-items-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </div>

            {/* Slide navigation */}
            <div className="slider-reveal mt-12 flex items-center gap-5">
              <button
                type="button"
                onClick={() => changeSlide(-1)}
                aria-label="Previous slide"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] disabled:opacity-50"
                disabled={isAnimating}
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => changeSlide(1)}
                aria-label="Next slide"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] disabled:opacity-50"
                disabled={isAnimating}
              >
                <ArrowRight size={18} />
              </button>

              <div className="ml-2 flex items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.label}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => {
                      if (index === activeSlide || isAnimating) return;
                      setActiveSlide(index);
                    }}
                    className={`h-1 transition-all duration-500 ${
                      index === activeSlide
                        ? "w-10 bg-[#FEC73A]"
                        : "w-4 bg-white/30 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side — cinematic image */}
          <div className="relative">
            <div className="absolute -inset-3 border border-white/10 sm:-inset-5" />

            <div className="hero-photo group relative h-[46vh] min-h-[340px] overflow-hidden sm:h-[58vh] lg:h-[70vh]">
              <img
                ref={heroImageRef}
                key={heroSlides[activeSlide].image}
                src={heroSlides[activeSlide].image}
                alt={heroSlides[activeSlide].alt}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#00142e]/80 via-transparent to-[#002556]/10" />

              {/* Image frame detail */}
              <div className="absolute inset-4 border border-white/20 sm:inset-6" />

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-4 sm:bottom-10 sm:left-10 sm:right-10">
                <div className="min-w-0">
                  <p className="text-[9px] tracking-[0.25em] text-[#FEC73A] sm:text-[10px]">
                    {heroSlides[activeSlide].label}
                  </p>

                  <p className="mt-3 max-w-sm text-xl font-light tracking-tight sm:text-3xl">
                    {heroSlides[activeSlide].featured}
                  </p>
                </div>

                <span className="shrink-0 text-[9px] tracking-[0.18em] text-white/70 sm:text-[10px]">
                  {heroSlides[activeSlide].location}
                </span>
              </div>

              {/* Vertical index */}
              <div className="absolute right-7 top-8 hidden [writing-mode:vertical-rl] text-[9px] tracking-[0.3em] text-white/75 sm:block">
                SHAPING SPACES SINCE 2001
              </div>
            </div>

            {/* Bottom progress bar */}
            <div className="mt-5 h-px w-full overflow-hidden bg-white/20">
              <div
                ref={heroProgressRef}
                className="h-full w-full origin-left scale-x-0 bg-[#FEC73A]"
              />
            </div>

            <div className="mt-3 flex justify-between text-[9px] tracking-[0.2em] text-white/45">
              <span>SHRI NORRIS ARCHITECTS</span>
              <span>ALIGARH · INDIA</span>
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <a
          href="#studio"
          className="absolute bottom-5 left-6 z-10 hidden items-center gap-3 text-[9px] tracking-[0.2em] text-white/55 transition-colors hover:text-[#FEC73A] lg:flex lg:left-16"
        >
          <ArrowDown size={14} />
          SCROLL TO DISCOVER
        </a>
      </section>
      {/* STUDIO INTRO */}

      <section
        id="studio"
        className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[12vw]"
      >
        <div className="mb-12 flex items-center justify-between gap-4">
          <Eyebrow>01 — The studio</Eyebrow>
          <span className="text-[9px] tracking-[0.12em] text-[#002556]/50">
            OUR POINT OF VIEW
          </span>
        </div>

        <h2 className="reveal max-w-[1150px] font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-[-0.07em]">
          We design for the
          <br />
          way life <span className="italic">unfolds.</span>
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-[1.15fr_0.65fr] md:items-end md:gap-16 lg:mt-20">
          <RevealImage
            src={media.intro}
            alt="Architectural interior with natural materials and daylight"
            className="image-reveal h-[350px] sm:h-[500px] lg:h-[600px]"
          />

          <div className="reveal pb-3 md:pb-8">
            <span className="text-[9px] tracking-[0.15em]">
              THOUGHTFUL BY DESIGN
            </span>

            <p className="mt-7 font-serif text-3xl leading-snug sm:text-4xl">
              The best spaces don't ask for attention. They earn it.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#002556]/70">
              Every project begins with understanding the site, its people and
              the little rituals that make a place personal.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#002556]/70">
              Honest materials, purposeful forms and considered details come
              together to create architecture that lasts.
            </p>

            <div className="mt-8">
              <CircleLink to="/about">MEET THE STUDIO</CircleLink>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="border-y border-[#002556]/20 bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-[5vw]">
        <div className="mb-9 reveal">
          <Eyebrow>Our practice</Eyebrow>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            ["12+", "YEARS OF PRACTICE"],
            ["48", "SPACES REALISED"],
            ["06", "DESIGN AWARDS"],
            ["01", "CONSIDERED APPROACH"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="reveal border-l border-[#002556]/20 px-4 py-5 sm:px-7 sm:py-7"
            >
              <strong className="font-serif text-5xl font-normal tracking-[-0.07em] sm:text-7xl">
                {number}
              </strong>
              <span className="mt-4 block text-[8px] tracking-[0.13em] text-[#002556]/60 sm:text-[9px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[12vw]">
        <div className="grid gap-9 lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <div className="reveal">
            <Eyebrow>02 — What we do</Eyebrow>
            <h2 className="mt-8 font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.83] tracking-[-0.075em]">
              Form meets
              <br />
              <span className="italic">feeling.</span>
            </h2>
          </div>

          <div className="reveal lg:pb-2">
            <p className="max-w-[340px] text-sm leading-7 text-[#002556]/70">
              From the first idea to the smallest finishing detail, every
              decision has a purpose.
            </p>
            <div className="mt-7">
              <CircleLink to="/services">EXPLORE EXPERTISE</CircleLink>
            </div>
          </div>
        </div>

        <div className="service-list mt-16 border-t border-[#002556]/25 sm:mt-24">
          {serviceItems.map((service, index) => {
            const number = Array.isArray(service)
              ? service[0]
              : (service.number ?? String(index + 1).padStart(2, "0"));

            const title = Array.isArray(service) ? service[1] : service.title;
            const description = Array.isArray(service)
              ? service[2]
              : service.description;

            return (
              <Link
                key={`${number}-${title}`}
                to="/services"
                className="service-row group grid grid-cols-[30px_1fr_40px] items-center gap-3 border-b border-[#002556]/20 py-7 transition-colors duration-500 hover:bg-[#FEC73A]/20 sm:grid-cols-[50px_1fr_0.8fr_45px] sm:gap-5 sm:px-4 sm:py-9"
              >
                <span className="self-start pt-2 text-[9px] text-[#002556]/70">
                  {String(number).padStart(2, "0")}
                </span>

                <h3 className="font-serif text-2xl tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                  {title}
                </h3>

                <p className="hidden max-w-[280px] text-xs leading-6 text-[#002556]/65 sm:block">
                  {description}
                </p>

                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#002556]/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] sm:h-11 sm:w-11">
                  <Plus size={18} />
                </span>

                <p className="col-start-2 text-xs leading-6 text-[#002556]/65 sm:hidden">
                  {description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SELECTED PROJECTS */}

      <section
        ref={galleryRef}
        className="overflow-hidden bg-[#002556] py-20 text-white sm:py-24"
      >
        <div className="px-5 sm:px-8 lg:px-[5vw]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="reveal">
              <Eyebrow dark>03 — Selected projects / 2021—2026</Eyebrow>
              <h2 className="mt-7 font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-[-0.08em]">
                Made to
                <br />
                <span className="italic text-[#FEC73A]">belong.</span>
              </h2>
            </div>

            <div className="mb-2">
              <CircleLink to="/gallery" dark>
                ALL PROJECTS
              </CircleLink>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden lg:mt-16">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-5 sm:gap-7 sm:px-8 lg:gap-8 lg:px-[5vw]"
          >
            {workItems.map((project, index) => (
              <Link
                to="/gallery"
                key={project.id}
                className="group block w-[82vw] max-w-[650px] shrink-0 sm:w-[65vw] lg:w-[42vw] lg:max-w-none"
              >
                <div className="relative h-[330px] overflow-hidden bg-[#002556] sm:h-[430px] lg:h-[48vh]">
                  <img
                    src={project.image}
                    alt={`${project.title} — architecture and interior design`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#002556]/80 via-transparent to-[#002556]/5" />

                  <span className="absolute left-5 top-5 text-[9px] tracking-[0.15em] text-white/80">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(workItems.length).padStart(2, "0")}
                  </span>

                  <span className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-white/70 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                    <ArrowUpRight size={22} />
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4 border-b border-white/25 py-5">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/60">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                      {project.title}
                    </h3>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mb-1 shrink-0 text-[#FEC73A] transition-transform duration-500 group-hover:translate-x-2"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-between gap-4 px-5 text-[8px] tracking-[0.14em] text-white/60 sm:px-8 lg:px-[5vw]">
          <span>THOUGHTFULLY CONSIDERED</span>
          <span className="hidden sm:block">SCROLL TO EXPLORE ↗</span>
        </div>
      </section>

      {/* PHILOSOPHY */}

      <section className="grid bg-[#FEC73A] md:grid-cols-2">
        <RevealImage
          src={media.hero}
          alt="Contemporary architectural living space"
          className="image-reveal h-[400px] sm:h-[570px] md:h-[700px]"
        />

        <div className="flex flex-col justify-center px-5 py-20 sm:px-10 sm:py-24 lg:px-[8vw]">
          <div className="reveal">
            <Eyebrow>04 — Our philosophy</Eyebrow>
            <h2 className="mt-8 font-serif text-[clamp(3.5rem,6.5vw,7rem)] leading-[0.85] tracking-[-0.075em]">
              Quietly
              <br />
              <span className="italic text-[#002556]">remarkable.</span>
            </h2>
          </div>

          <div className="my-9 border-t border-[#002556]/25" />

          <p className="reveal max-w-[400px] text-sm leading-7 text-[#002556]/80">
            We believe architecture should be experienced, not just seen. In
            natural light, tactile materials, thoughtful proportions and the
            small moments that turn a building into a place.
          </p>

          <div className="reveal mt-8">
            <CircleLink to="/about">OUR APPROACH</CircleLink>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[12vw]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <Eyebrow>05 — Client stories</Eyebrow>
            <h2 className="mt-8 font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.85] tracking-[-0.07em]">
              Spaces that
              <br />
              <span className="italic">stay with you.</span>
            </h2>

            <div className="mt-8">
              <CircleLink to="/testimonials">READ THEIR STORIES</CircleLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.slice(0, 3).map((item, index) => (
              <article
                key={item.name ?? index}
                className={`group flex min-h-[260px] flex-col justify-between border border-[#002556]/20 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#FEC73A] hover:bg-[#FEC73A]/15 sm:p-7 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div>
                  <span className="font-serif text-5xl text-[#002556]">“</span>
                  <p className="mt-3 font-serif text-xl leading-relaxed sm:text-2xl">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-8 flex items-end justify-between border-t border-[#002556]/20 pt-5">
                  <div>
                    <strong className="block text-xs font-medium">
                      {item.name}
                    </strong>
                    <span className="mt-1 block text-[10px] text-[#002556]/60">
                      {item.meta}
                    </span>
                  </div>
                  <span className="text-[9px] tracking-[0.15em] text-[#002556]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXISTING CTA */}

      <div className="home-final-cta">
        <CTASection />
      </div>
    </main>
  );
}
