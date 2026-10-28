import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Plus,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ArrowDownRight,
} from "lucide-react";

import { Lightbulb, Ruler, PencilRuler, HardHat } from "lucide-react";

import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import OwnerContact from "../data/OwnerContact";
import { projects, services, testimonials } from "../data/content";
import { teamMembers } from "../data/content";
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

    setTimeout(() => {
      setIsAnimating(false);
    }, 750);
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
        gsap.utils.toArray(".reveal", root).forEach((element) => {
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
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

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

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const visibleTestimonials = testimonials;
  const currentTestimonial =
    visibleTestimonials[activeTestimonial] ?? visibleTestimonials[0];
  const [activeMember, setActiveMember] = useState(null);

  const active = teamMembers[activeMember];


  return (
    <main
      ref={rootRef}
      className="overflow-clip bg-white text-[#002556] selection:bg-[#FEC73A] selection:text-[#002556]"
    >
      {/* HERO SLIDER */}
      <section
        ref={heroRef}
        className="group relative h-[calc(100svh-80px)] min-h-[600px] w-full overflow-hidden text-white"
      >
        {/* BACKGROUND SLIDER IMAGES */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeSlide ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={index !== activeSlide}
          >
            {/* ORIGINAL IMAGE */}
            <img
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
                index === activeSlide ? "scale-100" : "scale-110"
              }`}
            />

            {/* VERY LIGHT IMAGE DARKENING */}
            <div className="absolute inset-0 bg-black/5" />

            {/* SOFT BLUE ONLY AT THE CORNERS ON HOVER */}

            {/* SOFT NAVY BLUE CORNERS ON HOVER */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
              style={{
                background: `
      radial-gradient(ellipse at top left, rgba(0,37,86,0.42), transparent 58%),
      radial-gradient(ellipse at top right, rgba(0,37,86,0.32), transparent 55%),
      radial-gradient(ellipse at bottom left, rgba(0,37,86,0.42), transparent 60%),
      radial-gradient(ellipse at bottom right, rgba(0,37,86,0.35), transparent 58%)
    `,
              }}
            />

            {/* TEXT READABILITY — NO BLUE TINT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>
        ))}

        {/* TOP HEADER */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 pt-8 sm:px-12 sm:pt-10 lg:px-20">
          <div className="flex items-center gap-3 text-[9px] tracking-[0.25em] text-white/90 sm:text-[10px]">
            <span className="h-px w-8 bg-[#FEC73A]" />
            {heroSlides[activeSlide].eyebrow}
          </div>

          <span className="text-[9px] tracking-[0.2em] text-white/80 sm:text-[10px]">
            ALIGARH, INDIA
          </span>
        </div>

        {/* LEFT / RIGHT IMAGE NAVIGATION */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-2 sm:px-4 lg:px-6">
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Previous slide"
            disabled={isAnimating}
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] disabled:opacity-50 sm:h-14 sm:w-14"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Next slide"
            disabled={isAnimating}
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] disabled:opacity-50 sm:h-14 sm:w-14"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* MAIN SLIDE CONTENT */}
        <div
          key={activeSlide}
          className="absolute bottom-32 left-6 z-20 max-w-5xl animate-[heroEnter_0.8s_ease-out_both] sm:bottom-36 sm:left-12 lg:bottom-40 lg:left-20"
        >
          <p className="mb-5 text-[10px] tracking-[0.3em] text-[#FEC73A] sm:text-xs">
            {heroSlides[activeSlide].label}
          </p>

          <h1 className="max-w-5xl text-[clamp(3.2rem,9vw,8.5rem)] font-light leading-[0.88] tracking-[-0.075em]">
            {heroSlides[activeSlide].firstLine}
            <br />
            <span className="text-[#FEC73A]">
              {heroSlides[activeSlide].secondLine}
            </span>
          </h1>

          <div className="mt-6 max-w-2xl sm:mt-8">
            <p className="max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              {heroSlides[activeSlide].description}
            </p>

            <Link
              to="/gallery"
              className="group/explore mt-7 inline-flex items-center gap-5 rounded-full border border-white/40 bg-white/[0.08] py-2 pl-6 pr-2 text-[10px] font-semibold tracking-[0.16em] text-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-500 hover:border-[#FEC73A]/80 hover:bg-white/[0.16] hover:shadow-[0_12px_35px_rgba(0,0,0,0.2)] sm:mt-8"
            >
              <span className="transition-colors duration-300 group-hover/explore:text-[#FEC73A]">
                EXPLORE OUR WORK
              </span>

              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover/explore:rotate-45 group-hover/explore:border-[#FEC73A] group-hover/explore:bg-[#FEC73A] group-hover/explore:text-[#002556]">
                <ArrowUpRight size={19} />
              </span>
            </Link>
          </div>
        </div>

        {/* BOTTOM PROJECT DETAILS */}
        <div className="absolute bottom-5 left-6 right-6 z-20 pt-4 sm:bottom-7 sm:left-12 sm:right-12 lg:left-20 lg:right-20">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.22em] text-[#FEC73A] sm:text-[10px]">
                FEATURED PROJECT
              </p>

              <p className="mt-2 truncate text-sm font-light tracking-wide sm:text-lg">
                {heroSlides[activeSlide].featured}
              </p>

              <p className="mt-1 text-[9px] tracking-[0.15em] text-white/70 sm:text-[10px]">
                {heroSlides[activeSlide].location}
              </p>
            </div>

            {/* SLIDE COUNTER */}
          </div>
        </div>

        {/* BOTTOM SLIDE INDICATORS */}
        <div className="absolute bottom-0 left-0 z-30 flex h-1 w-full">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                if (index !== activeSlide && !isAnimating) {
                  setActiveSlide(index);
                }
              }}
              className={`h-full flex-1 transition-colors duration-500 ${
                index === activeSlide
                  ? "bg-[#FEC73A]"
                  : "bg-white/30 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* TEXT ANIMATION */}
        <style>{`
    @keyframes heroEnter {
      from {
        opacity: 0;
        transform: translateY(28px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
      </section>

      {/* STUDIO INTRO */}
      <section
        id="studio"
        className="relative overflow-hidden bg-[#F8F7F3] px-5 py-20 sm:px-8 sm:py-28 lg:px-[8vw] lg:py-[8vw]"
      >
        {/* TOP BAR */}
        <div className="mb-12 flex items-center justify-between border-b border-[#002556]/15 pb-5 sm:mb-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#002556]/70 sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="text-[10px] uppercase tracking-[0.18em] text-[#252724]/50 sm:text-xs">
            Aligarh · Est. 2001
          </p>
        </div>

        {/* HEADING + SIDE IMAGE */}
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <p className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#8C887F] sm:text-xs">
              <span className="h-px w-8 bg-[#C6A45B]" />
              Architecture · Interiors · Planning
            </p>

            <h2 className="max-w-4xl font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.88] tracking-[-0.075em] text-[#002556]">
              Spaces that
              <br />
              <span className="italic text-[#9B8B70]">feel like</span>
              <br />
              <span className="relative inline-block">
                they belong.
                <span className="absolute -bottom-2 left-1 h-[3px] w-[35%] bg-[#FEC73A] sm:-bottom-3" />
              </span>
            </h2>

            <div className="mt-9 flex flex-col items-start gap-6 sm:mt-12">
              <p className="max-w-xl text-sm leading-7 text-[#252724]/70 sm:text-base sm:leading-8">
                We shape thoughtful spaces through architecture, interiors and
                careful planning — bringing together functionality, natural
                materials and a timeless sense of design.
              </p>

              {/* DESIGNED AROUND YOU — GLASS BADGE */}
              <div className="group inline-flex items-center gap-4 rounded-full border border-[#002556]/15 bg-white/60 py-2 pl-2 pr-6 shadow-[0_8px_30px_rgba(0,37,86,0.04)] backdrop-blur-xl transition-all duration-500 hover:border-[#C6A45B]/60 hover:bg-white hover:shadow-[0_12px_35px_rgba(0,37,86,0.08)]">
                <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-[#002556] text-[#FEC73A] transition-transform duration-500 group-hover:rotate-[-12deg]">
                  <span className="absolute inset-1 rounded-full border border-white/20" />
                  <ArrowDownRight
                    size={21}
                    className="relative transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </span>

                <span>
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-[#252724]/45">
                    Our philosophy
                  </span>
                  <span className="mt-1 block text-xs font-medium tracking-[0.04em] text-[#002556] sm:text-sm">
                    Designed around you
                  </span>
                </span>

                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#FEC73A] transition-transform duration-300 group-hover:scale-150" />
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative lg:pt-8">
            <div className="group relative aspect-[4/4.5] overflow-hidden sm:aspect-[4/3.7] lg:aspect-[4/5.2]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90"
                alt="Contemporary architectural residence with natural materials"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#002556]/50 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-white/70 sm:text-[10px]">
                    Our design philosophy
                  </p>
                  <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
                    Less noise.
                    <br />
                    More meaning.
                  </h3>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-xl transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                  ↗
                </span>
              </div>
            </div>

            {/* FLOATING NUMBER */}
            <div className="absolute -left-4 top-12 hidden bg-[#FEC73A] px-5 py-4 sm:block lg:-left-7">
              <p className="font-serif text-3xl leading-none text-[#002556]">
                01
              </p>
              <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-[#002556]/70">
                Our studio
              </p>
            </div>

            {/* IMAGE CAPTION */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-[9px] uppercase tracking-[0.17em] text-[#252724]/50 sm:text-[10px]">
                Thoughtful by design
              </p>
              <p className="text-[9px] uppercase tracking-[0.17em] text-[#252724]/50 sm:text-[10px]">
                27°53′ N — Aligarh
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM PRINCIPLES */}
        <div className="mt-20 border-y border-[#002556]/15 sm:mt-28">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Purpose",
                description: "Every space begins with a reason.",
              },
              {
                number: "02",
                title: "Clarity",
                description: "Good design makes life simpler.",
              },
              {
                number: "03",
                title: "Character",
                description: "Materials and details with meaning.",
              },
              {
                number: "04",
                title: "Longevity",
                description: "Design that stands beyond trends.",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                className={`group border-[#002556]/15 px-4 py-7 transition-colors duration-300 hover:bg-white sm:px-6 sm:py-9 lg:px-7 ${
                  index < 2 ? "border-b" : ""
                } ${index % 2 === 0 ? "border-r" : ""} ${
                  index < 3 ? "lg:border-b-0" : ""
                } ${index < 3 ? "lg:border-r" : "lg:border-r-0"}`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.16em] text-[#8C887F]">
                    {item.number}
                  </span>
                  <span className="text-lg text-[#C6A45B] transition-transform duration-300 group-hover:rotate-45">
                    ↗
                  </span>
                </div>

                <h3 className="font-serif text-2xl tracking-tight text-[#002556] sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[220px] text-xs leading-6 text-[#252724]/60 sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CLOSING STATEMENT */}
        <div className="mt-16 flex flex-col gap-6 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-3xl font-serif text-2xl leading-snug tracking-tight text-[#002556] sm:text-3xl lg:text-4xl">
            Architecture is not simply about the spaces we build.
            <span className="italic text-[#9B8B70]">
              {" "}
              It is about how those spaces make us feel.
            </span>
          </p>

          <a
            href="/about"
            className="group inline-flex w-fit shrink-0 items-center gap-5 border-b border-[#002556]/30 pb-3 text-[10px] uppercase tracking-[0.17em] text-[#002556] transition-colors duration-300 hover:border-[#C6A45B] sm:text-xs"
          >
            Discover our studio
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-[8vw] lg:py-[10vw]">
        {/* Heading */}
        <div className="reveal mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 " />
              <Eyebrow>02 — What we do</Eyebrow>
            </div>

            <h2 className="font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.82] tracking-[-0.075em] text-[#002556]">
              Spaces with
              <br />
              <span className="italic text-[#002556]/45">a purpose.</span>
            </h2>
          </div>

          <div className="max-w-sm lg:pb-2">
            <p className="text-sm leading-7 text-[#002556]/65">
              Architecture is more than what you see. It's how a space makes you
              feel, how it works, and how it becomes part of your life.
            </p>

            <div className="mt-6">
              <CircleLink to="/services">EXPLORE ALL SERVICES</CircleLink>
            </div>
          </div>
        </div>

        {/* Architectural service gallery */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
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
                className="service-card group relative block min-w-0"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#002556]/10">
                  <img
                    src={service.image || media.work[index % media.work.length]}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00152f]/75 via-[#00152f]/5 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* Top metadata */}
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-6 sm:top-6">
                    <span className="border border-white/50 px-3 py-2 text-[9px] uppercase tracking-[0.17em] text-white backdrop-blur-sm">
                      Service / {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#002556] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#FEC73A]">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  {/* Image bottom content */}
                  <div className="absolute inset-x-5 bottom-6 text-white sm:inset-x-6 sm:bottom-7">
                    <div className="mb-4 h-px w-10 bg-[#FEC73A] transition-all duration-500 group-hover:w-20" />

                    <h3 className="max-w-[340px] font-serif text-3xl leading-[1.02] tracking-[-0.045em] sm:text-4xl xl:text-[2.7rem]">
                      {title}
                    </h3>

                    <p className="mt-3 max-w-[320px] text-xs leading-6 text-white/75 sm:text-sm">
                      {description}
                    </p>
                  </div>

                  {/* Gold hover frame */}
                  <div className="pointer-events-none absolute inset-3 border border-white/0 transition-all duration-500 group-hover:inset-4 group-hover:border-[#FEC73A]/70" />
                </div>

                {/* Editorial footer */}
                <div className="flex items-center justify-between border-b border-[#002556]/20 py-4 transition-colors duration-500 group-hover:border-[#FEC73A]">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#002556]/55">
                    Shri Norris Architects
                  </span>

                  <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#002556]">
                    Discover
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom signature */}
        <div className="mt-16 flex items-center gap-4 sm:mt-24">
          <span className="h-px flex-1 bg-[#002556]/20" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#002556]/50">
            Thoughtfully designed. Intentionally built.
          </span>
          <span className="h-px flex-1 bg-[#002556]/20" />
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="relative overflow-hidden bg-[#F8F7F3] px-5 py-24 sm:px-8 sm:py-32 lg:px-[8vw] lg:py-[10vw]">
        {/* Header */}
        <div className="reveal grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Eyebrow>04 — How we work</Eyebrow>

            <h2 className="mt-8 font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.82] tracking-[-0.075em] text-[#002556]">
              From vision
              <br />
              <span className="italic text-[#8C887F]">to reality.</span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end lg:pb-2">
            <p className="text-sm leading-7 text-[#252724]/70">
              Every meaningful space begins with an idea. We bring clarity to
              the process through thoughtful planning, considered design and
              attention to every detail.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C6A45B]" />
              <span className="text-[9px] uppercase tracking-[0.17em] text-[#002556]/65">
                A considered process, at every stage
              </span>
            </div>
          </div>
        </div>

        {/* Process image */}
        <div className="reveal relative mt-14 h-[300px] overflow-hidden sm:mt-20 sm:h-[420px] lg:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90"
            alt="Contemporary architecture with carefully considered materials and spaces"
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#00152f]/65 via-[#00152f]/15 to-transparent" />

          <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-end p-6 text-white sm:p-10 lg:p-14">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FEC73A]">
              Our approach
            </span>

            <h3 className="mt-4 max-w-md font-serif text-4xl leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Good design is a process.
              <span className="italic"> Not a shortcut.</span>
            </h3>
          </div>

          <div className="absolute right-5 top-5 hidden border border-white/50 px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:block lg:right-8 lg:top-8">
            Thoughtfully considered
          </div>
        </div>

        {/* Four process stages */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {[
            {
              icon: Lightbulb,
              title: "Discovery & Vision",
            },
            {
              icon: Ruler,
              title: "Planning & Design",
            },
            {
              icon: PencilRuler,
              title: "Design Development",
            },
            {
              icon: HardHat,
              title: "Execution & Delivery",
            },
          ].map((step, index) => (
            <article
              key={step.number}
              className="group relative border-t border-[#002556]/20 py-7 pr-5 transition-colors duration-500 hover:border-[#C6A45B] sm:px-5 sm:py-8 lg:min-h-[280px] lg:first:pl-0 lg:last:pr-0"
            >
              {/* Icon and arrow */}
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center text-[#C6A45B] transition-all duration-500 group-hover:scale-110 group-hover:text-[#002556]">
                  {(() => {
                    const icons = [Lightbulb, Ruler, PencilRuler, HardHat];
                    const Icon = icons[index % icons.length];

                    return <Icon size={27} strokeWidth={1.4} />;
                  })()}
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-[#002556]/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C6A45B]"
                />
              </div>

              {/* Number and arrow */}
              <div className="flex items-center justify-between">
                <span className="font-serif text-4xl tracking-[-0.06em] text-[#C6A45B] transition-colors duration-500 group-hover:text-[#002556]">
                  {step.number}
                </span>
              </div>

              <p className="mt-7 text-[9px] uppercase tracking-[0.13em] text-[#252724]/50">
                Phase {index + 1}
              </p>

              <h3 className="mt-3 font-serif text-3xl tracking-[-0.045em] text-[#002556] sm:text-4xl">
                {step.title}
              </h3>

              <p className="mt-2 text-xs font-medium text-[#002556]/75">
                {step.subtitle}
              </p>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#252724]/65">
                {step.description}
              </p>

              {/* Gold hover line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C6A45B] transition-all duration-700 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-[#002556]/15 pt-7 sm:flex-row sm:items-center lg:mt-16">
          <p className="max-w-md text-sm leading-7 text-[#252724]/65">
            Have a project in mind? Let’s start with a conversation about what
            you want to create.
          </p>

          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-4 border border-[#002556]/25 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#002556] transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A]"
          >
            Start a conversation
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
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

      {/* 04 — OWNER / CONTACT */}

      <section className="relative overflow-hidden bg-[#F7F5EF] px-5 py-16 text-[#002556] sm:px-8 sm:py-20 lg:px-[5vw] lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          {/* Section heading */}
          <div className="reveal flex flex-wrap items-center justify-between gap-4 border-b border-[#002556]/15 pb-5">
            <Eyebrow>04 — The person behind the practice</Eyebrow>

            <span className="text-[9px] uppercase tracking-[0.18em] text-[#002556]/50">
              Aligarh · Est. 2001
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Left: Owner portrait */}
            <div className="image-reveal group relative min-h-[430px] overflow-hidden bg-[#E7E2D8] sm:min-h-[540px] lg:min-h-[650px]">
              <img
                src="/images/owner.jpg"
                alt="Sudhir Kumar — Shri Norris Architects"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#002556]/85 via-[#002556]/5 to-transparent" />

              {/* Portrait label */}
              <div className="absolute left-5 top-5 flex items-center gap-3 bg-[#F7F5EF] px-4 py-3 sm:left-7 sm:top-7">
                <span className="h-2 w-2 rounded-full bg-[#FEC73A]" />
                <span className="text-[9px] uppercase tracking-[0.16em]">
                  Personal approach. Lasting spaces.
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-10">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#FEC73A]">
                  The person behind the vision
                </span>

                <h3 className="mt-3 font-serif text-4xl tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                  Sudhir Kumar
                </h3>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/30 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.17em] text-white/80">
                    Owner · Shri Norris Architects
                  </span>

                  <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-white">
                    Architecture & Interiors
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Contact details */}
            <div className="flex min-w-0 flex-col justify-center">
              <div className="reveal">
                <span className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[#8A6B2D]">
                  <span className="h-px w-7 bg-[#FEC73A]" />
                  Shri Norris Architects · Aligarh
                </span>

                <h2 className="mt-6 font-serif text-5xl font-normal leading-[0.92] tracking-[-0.065em] sm:text-6xl lg:text-[5.5rem]">
                  Your vision.
                  <br />
                  <span className="italic text-[#8A6B2D]">Our expertise.</span>
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-[#002556]/65 sm:text-base sm:leading-8">
                  Since 2001, Shri Norris Architects has been shaping thoughtful
                  architectural spaces. Tell us about your plans, ideas and
                  aspirations — let’s create something meaningful together.
                </p>
              </div>

              {/* Contact details */}
              <div className="reveal mt-8 border-t border-[#002556]/20">
                {/* Phone */}
                <a
                  href="tel:+918273646809"
                  className="group flex items-center justify-between gap-4 border-b border-[#002556]/15 py-5 transition-colors duration-300 hover:bg-white/70 sm:px-3"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                      <Phone size={17} strokeWidth={1.5} />
                    </span>

                    <span>
                      <span className="block text-[9px] uppercase tracking-[0.17em] text-[#002556]/50">
                        Call our studio
                      </span>
                      <span className="mt-1.5 block text-sm font-medium">
                        +91 82736 46809
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918273646809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-[#002556]/15 py-5 transition-colors duration-300 hover:bg-white/70 sm:px-3"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                      <MessageCircle size={18} strokeWidth={1.5} />
                    </span>

                    <span>
                      <span className="block text-[9px] uppercase tracking-[0.17em] text-[#002556]/50">
                        WhatsApp
                      </span>
                      <span className="mt-1.5 block text-sm font-medium">
                        Discuss your project with us
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>

                {/* Official Email */}
                <a
                  href="mailto:Info@shrinorrisarchitects.co.in"
                  className="group flex items-center justify-between gap-4 border-b border-[#002556]/15 py-5 transition-colors duration-300 hover:bg-white/70 sm:px-3"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                      <Mail size={18} strokeWidth={1.5} />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[9px] uppercase tracking-[0.17em] text-[#002556]/50">
                        Official Email
                      </span>
                      <span className="mt-1.5 block break-all text-sm font-medium">
                        Norrisarchitects0@gmail.com,
                        Info@shrinorrisarchitects.co.in
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>

                {/* Address */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Shop+No+3+Ground+Floor+Ramghat+Road+Kishanpur+Aligarh+Uttar+Pradesh+202001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-[#002556]/15 py-5 transition-colors duration-300 hover:bg-white/70 sm:px-3"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                      <MapPin size={18} strokeWidth={1.5} />
                    </span>

                    <span>
                      <span className="block text-[9px] uppercase tracking-[0.17em] text-[#002556]/50">
                        Visit our studio
                      </span>
                      <span className="mt-1.5 block max-w-sm text-sm font-medium leading-6">
                        Shop No. 3, Ground Floor, Ramghat Road, near Kishanpur
                        Tiraha, ADA Colony, Aligarh, Uttar Pradesh – 202001
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>

              {/* CTA */}
              <div className="reveal mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/918273646809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 bg-[#002556] px-6 py-4 text-[9px] font-medium uppercase tracking-[0.15em] !text-white transition-all duration-300 hover:bg-[#FEC73A] hover:!text-[#002556]"
                >
                  Start a conversation
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
                <span className="text-[9px] uppercase tracking-[0.14em] text-[#002556]/45">
                  Thoughtfully designed. Personally considered.
                </span>
              </div>
            </div>
          </div>

          {/* Footer signature */}
          <div className="reveal mt-12 flex flex-col gap-3 border-t border-[#002556]/15 pt-5 text-[9px] uppercase tracking-[0.16em] text-[#002556]/50 sm:flex-row sm:items-center sm:justify-between">
            <span>Shri Norris Architects · Aligarh</span>
            <span>Every space has a story. Let's tell yours.</span>
          </div>
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
      <section className="relative overflow-hidden bg-[#F8F7F3] px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[9vw]">
        {/* Heading */}
        <div className="reveal mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <Eyebrow>05 — Our testimonials</Eyebrow>

          <h2 className="mt-7 font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.075em] text-[#002556]">
            Our Testimonials
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#252724]/65">
            The most meaningful part of our work is the experience people carry
            with them long after a project is complete.
          </p>
        </div>

        {/* Testimonial slider */}
        {testimonials.length > 0 && (
          <div className="relative mx-auto max-w-6xl">
            <div className="relative flex items-center gap-3 sm:gap-6 lg:gap-10">
              {/* Previous arrow */}
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() =>
                  setActiveTestimonial((current) =>
                    current === 0 ? testimonials.length - 1 : current - 1,
                  )
                }
                className="z-20 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#002556]/20 bg-white text-[#002556] transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] sm:h-12 sm:w-12 lg:h-14 lg:w-14"
              >
                <ArrowLeft size={19} />
              </button>

              {/* Main card */}
              <article
                key={activeTestimonial}
                className="testimonial-slide relative min-w-0 flex-1 overflow-hidden border border-[#002556]/10 bg-white px-5 py-9 shadow-[0_15px_50px_rgba(37,39,36,0.035)] sm:px-10 sm:py-12 lg:px-16 lg:py-16"
              >
                {/* Subtle decorative detail */}
                <div className="absolute right-0 top-0 h-1 w-24 bg-[#FEC73A] sm:w-32" />

                <div className="flex flex-col items-center text-center">
                  <span className="font-serif text-7xl leading-[0.8] text-[#C6A45B] sm:text-8xl">
                    “
                  </span>

                  <p className="mt-7 max-w-3xl font-serif text-[clamp(1.35rem,3vw,2.5rem)] leading-[1.45] tracking-[-0.025em] text-[#252724]">
                    {testimonials[activeTestimonial]?.quote}
                  </p>

                  <div className="mt-9 h-px w-12 bg-[#C6A45B]" />

                  <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-[#002556] sm:text-sm">
                    {testimonials[activeTestimonial]?.name}
                  </h3>

                  <p className="mt-2 text-[10px] tracking-[0.08em] text-[#252724]/55 sm:text-xs">
                    {testimonials[activeTestimonial]?.meta}
                  </p>
                </div>

                {/* Slide counter */}
                <div className="mt-9 flex items-center justify-center gap-3 border-t border-[#002556]/10 pt-5">
                  <span className="text-[10px] tracking-[0.15em] text-[#002556]">
                    {String(activeTestimonial + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-[#C6A45B]" />
                  <span className="text-[10px] tracking-[0.15em] text-[#002556]/40">
                    {String(testimonials.length).padStart(2, "0")}
                  </span>
                </div>
              </article>

              {/* Next arrow */}
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() =>
                  setActiveTestimonial(
                    (current) => (current + 1) % testimonials.length,
                  )
                }
                className="z-20 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#002556]/20 bg-white text-[#002556] transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] sm:h-12 sm:w-12 lg:h-14 lg:w-14"
              >
                <ArrowRight size={19} />
              </button>
            </div>

            {/* Centered pagination dots */}
            <div className="mt-9 flex items-center justify-center gap-2.5">
              {testimonials.map((item, index) => (
                <button
                  key={`${item.name}-${index}`}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-pressed={activeTestimonial === index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`rounded-full transition-all duration-500 ${
                    activeTestimonial === index
                      ? "h-2.5 w-7 bg-[#C6A45B]"
                      : "h-2 w-2 bg-[#002556]/20 hover:bg-[#002556]/50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom signature */}
        <div className="mt-14 text-center sm:mt-20">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#252724]/45">
            Thoughtfully designed · Personally experienced
          </p>
        </div>

        <section className="overflow-hidden bg-[#F8F7F3] px-5 py-20 sm:px-8 sm:py-28 lg:px-[7vw] lg:py-36">
          <div className="mx-auto max-w-[1600px]">
            {/* Section heading */}
            <div className="mb-14 flex flex-col justify-between gap-6 sm:mb-20 md:flex-row md:items-end">
              <div>
                <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#002556]/60">
                  <span className="h-px w-8 bg-[#C6A45B]" />
                  The people behind the spaces
                </p>

                <h2 className="font-serif text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] tracking-[-0.07em] text-[#002556]">
                  Our <span className="italic text-[#8C887F]">team.</span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-[#252724]/65">
                Thoughtful spaces are shaped by thoughtful people. Meet the
                minds bringing every vision to life.
              </p>
            </div>

            {/* Team members */}
            <div className="w-full">
              {teamMembers.map((member, index) => {
                const isActive = activeMember === index;

                return (
                  <button
                    key={member.number}
                    type="button"
                    onMouseEnter={() => setActiveMember(index)}
                    onMouseLeave={() => setActiveMember(null)}
                    onFocus={() => setActiveMember(index)}
                    onBlur={() => setActiveMember(null)}
                    onClick={() => {
                      setActiveMember((current) =>
                        current === index ? null : index,
                      );
                    }}
                    aria-pressed={isActive}
                    className={`group relative flex w-full items-center justify-between gap-3 overflow-hidden border-t py-5 text-left transition-colors duration-500 sm:gap-5 sm:py-7 ${
                      isActive
                        ? "border-[#C6A45B]"
                        : "border-[#002556]/20 hover:border-[#C6A45B]"
                    }`}
                  >
                    {/* Name and role */}
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6">
                      <span
                        className={`shrink-0 text-[10px] tracking-widest transition-colors duration-300 ${
                          isActive ? "text-[#C6A45B]" : "text-[#002556]/35"
                        }`}
                      >
                        {member.number}
                      </span>

                      <div className="min-w-0">
                        <h3
                          className={`font-serif text-xl tracking-[-0.045em] transition-all duration-300 sm:text-3xl lg:text-5xl ${
                            isActive
                              ? "translate-x-1 text-[#002556]"
                              : "text-[#002556]/55 group-hover:text-[#002556]"
                          }`}
                        >
                          {member.name}
                        </h3>

                        <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-[#252724]/50 sm:text-[10px]">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Photo: visible only while active */}
                    <div
                      aria-hidden="true"
                      className={`relative h-[100px] w-[76px] shrink-0 overflow-hidden bg-[#E8E5DE] transition-all duration-300 ease-out sm:h-[145px] sm:w-[115px] lg:h-[170px] lg:w-[140px] ${
                        isActive
                          ? "translate-x-0 scale-100 opacity-100"
                          : "pointer-events-none translate-x-3 scale-[0.96] opacity-0"
                      }`}
                    >
                      <img
                        src={member.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.4}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "rotate-45 text-[#C6A45B]"
                          : "text-[#002556]/30 group-hover:-translate-y-1 group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}

              {/* Bottom caption */}
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C6A45B]" />

                <p className="text-[9px] uppercase tracking-[0.16em] text-[#002556]/55">
                  A team built around thoughtful design
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* EXISTING CTA */}
      <div className="home-final-cta">
        <CTASection />
      </div>
    </main>
  );
}
