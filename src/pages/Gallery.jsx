
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CTASection } from "../components/Shared";
import { projects } from "../data/content";
import house1 from "../assets/images/design1.webp";
import house2 from "../assets/images/design2.webp";
import house3 from "../assets/images/design3.webp";
import house4 from "../assets/images/design4.webp";
import house5 from "../assets/images/design5.webp";
import house6 from "../assets/images/design6.webp";
import contruction1 from "../assets/images/consturction1.webp";
import contruction2 from "../assets/images/contruction2.webp";
import contruction3 from "../assets/images/contruction3.webp";
import contruction4 from "../assets/images/contruction4.webp";


gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "Residential", "Commercial", "Interior"];

/* -------------------------------------------------------
   GALLERY IMAGES
   Keep these images inside public/images/gallery/
------------------------------------------------------- */

const residentialImages = [
  {
    id: "house-01",
    image: house1,
    title: "Residential Architecture",
    layout: "portrait",
  },
  {
    id: "house-02",
    image: house2,
    title: "Contemporary Residence",
    layout: "portrait",
  },
  {
    id: "house-03",
    image: house3,
    title: "Architectural Exterior",
    layout: "wide",
  },
  {
    id: "house-04",
    image: house4,
    title: "Modern Residence",
    layout: "portrait",
  },
  {
    id: "house-05",
    image:house5,
    title: "Residential Design",
    layout: "portrait",
  },
  {
    id: "house-06",
    image: house6,
    title: "Exterior Perspective",
    layout: "wide",
  },
];

const constructionImages = [
  {
    id: "construction-01",
    image: contruction1,
    title: "Construction Site",
    layout: "wide",
  },
  {
    id: "construction-02",
    image: contruction2,
    title: "On-Site Development",
    layout: "portrait",
  },
  {
    id: "construction-03",
    image: contruction3,
    title: "Structural Work",
    layout: "portrait",
  },
  {
    id: "construction-04",
    image: contruction4,
    title: "Construction Details",
    layout: "wide",
  },
];

const allGalleryImages = [
  ...residentialImages,
  ...constructionImages,
];

export default function Gallery() {
  const pageRef = useRef(null);

  const [filter, setFilter] = useState("All");
  const [activeImage, setActiveImage] = useState(null);

  const list =
    filter === "All"
      ? projects
      : projects.filter((project) => project.type === filter);

  /* -------------------------------------------------------
     LIGHTBOX
  ------------------------------------------------------- */

  const openLightbox = (image) => {
    const index = allGalleryImages.findIndex(
      (item) => item.id === image.id,
    );

    setActiveImage(index);
  };

  const closeLightbox = () => {
    setActiveImage(null);
  };

  const showNextImage = () => {
    setActiveImage((current) =>
      current === null
        ? 0
        : (current + 1) % allGalleryImages.length,
    );
  };

  const showPreviousImage = () => {
    setActiveImage((current) =>
      current === null
        ? 0
        : (current - 1 + allGalleryImages.length) %
          allGalleryImages.length,
    );
  };

  useEffect(() => {
    if (activeImage === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  /* -------------------------------------------------------
     GSAP ANIMATIONS
  ------------------------------------------------------- */

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from(".gallery-hero-eyebrow", {
          y: 18,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".gallery-hero-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            stagger: 0.13,
          },
          "-=0.35",
        )
        .from(
          ".gallery-hero-description",
          {
            y: 22,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55",
        )
        .from(
          ".gallery-hero-bottom",
          {
            y: 16,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.4",
        );

      gsap.utils.toArray(".gallery-reveal").forEach((element) => {
        gsap.from(element, {
          y: 38,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray(".gallery-photo-card").forEach((element) => {
        gsap.from(element, {
          y: 45,
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

      gsap.from(".gallery-project-card", {
        y: 48,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-project-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.utils.toArray(".gallery-divider").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            once: true,
          },
        });
      });

      gsap.from(".gallery-cta", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-cta",
          start: "top 88%",
          once: true,
        },
      });
    }, page);

    const refresh = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refresh);
      ctx.revert();
    };
  }, []);

  /* -------------------------------------------------------
     REUSABLE IMAGE GRID
  ------------------------------------------------------- */

  const renderImageGrid = (images) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
      {images.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => openLightbox(item)}
          aria-label={`View ${item.title}`}
          className={`gallery-photo-card group relative block w-full overflow-hidden bg-[#002556]/10 text-left ${
            item.layout === "wide"
              ? "sm:col-span-2"
              : "sm:col-span-1"
          }`}
        >
          <div
            className={`relative w-full overflow-hidden ${
              item.layout === "wide"
                ? "aspect-[16/8] sm:aspect-[16/7]"
                : "aspect-[4/5]"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#002556]/65 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Image number */}
            <span className="absolute left-5 top-5 text-[10px] tracking-[0.2em] text-white">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* View icon */}
            <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#FEC73A] text-[#002556] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
              <ArrowUpRight size={19} strokeWidth={1.5} />
            </span>

            {/* Bottom title */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#FEC73A]">
                  Shri Norris Architects
                </p>

                <h3 className="font-serif text-2xl text-white sm:text-3xl">
                  {item.title}
                </h3>
              </div>

              <span className="mb-1 shrink-0 text-[9px] uppercase tracking-[0.15em] text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                View image
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <main
      ref={pageRef}
      className="overflow-clip bg-white text-[#002556]"
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="group relative isolate flex min-h-[78svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-28 text-white sm:px-8 sm:pb-10 sm:pt-32 lg:min-h-[88svh] lg:px-14 lg:pb-12 lg:pt-36">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary architectural design"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(0,37,86,0.42), transparent 58%),
              radial-gradient(ellipse at top right, rgba(0,37,86,0.32), transparent 55%),
              radial-gradient(ellipse at bottom left, rgba(0,37,86,0.42), transparent 60%),
              radial-gradient(ellipse at bottom right, rgba(0,37,86,0.35), transparent 58%)
            `,
          }}
        />

        {/* Hero top */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <p className="gallery-hero-eyebrow text-[10px] uppercase tracking-[0.24em] text-[#FEC73A] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="gallery-hero-eyebrow hidden text-[10px] uppercase tracking-[0.2em] text-white/80 sm:block">
            Architecture · Interiors · Spaces
          </p>
        </div>

        {/* Hero heading */}
        <div className="relative z-10 my-20 lg:my-24">
          <p className="gallery-hero-eyebrow mb-6 text-[10px] uppercase tracking-[0.24em] text-white/75 sm:mb-8 sm:text-xs">
            A collection of our work / 01—03
          </p>

          <h1 className="max-w-[1100px] font-serif text-[clamp(4rem,11vw,10rem)] leading-[0.85] tracking-[-0.075em]">
            <span className="block overflow-hidden pb-3">
              <span className="gallery-hero-line block">
                Our
              </span>
            </span>

            <span className="block overflow-hidden pb-4">
              <span className="gallery-hero-line block italic text-[#FEC73A]">
                Projects.
              </span>
            </span>
          </h1>
        </div>

        {/* Hero bottom */}
        <div className="gallery-hero-bottom relative z-10 flex flex-col gap-7 pt-6 sm:flex-row sm:items-end sm:justify-between sm:pt-7">
          <p className="gallery-hero-description max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            A closer look at our architectural work, residential
            designs and the process that brings every space to life.
          </p>

          <a
            href="#residential"
            className="group/link inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[#FEC73A]"
          >
            Explore our work

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition-all duration-500 group-hover/link:-rotate-45 group-hover/link:border-[#FEC73A] group-hover/link:bg-[#FEC73A] group-hover/link:text-[#002556]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* =====================================================
          01 — RESIDENTIAL ARCHITECTURE
      ===================================================== */}

      <section
        id="residential"
        className="scroll-mt-20 bg-[#F8F9FB] px-5 py-24 sm:px-8 sm:py-28 lg:px-[7vw] lg:py-36"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="gallery-reveal mb-12 flex flex-col gap-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#002556]/60">
                <span className="mr-3 text-[#F0B91B]">01 /</span>
                Residential collection
              </p>

              <h2 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[6.5rem]">
                Residential
                <br />
                <span className="italic text-[#002556]/50">
                  Architecture.
                </span>
              </h2>
            </div>

            <div className="max-w-sm sm:pb-2">
              <p className="text-sm leading-7 text-[#002556]/65">
                A collection of residential exteriors, façade
                compositions and architectural perspectives.
                Each space reflects a thoughtful approach to
                form, proportion and detail.
              </p>

              <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#002556]">
                06 Images
              </p>
            </div>
          </div>

          <div className="gallery-divider mb-8 h-px w-full origin-left bg-[#002556]/20" />

          {renderImageGrid(residentialImages)}
        </div>
      </section>

      {/* =====================================================
          02 — CONSTRUCTION GALLERY
      ===================================================== */}

      <section
        id="construction"
        className="relative overflow-hidden bg-[#002556] px-5 py-24 text-white sm:px-8 sm:py-28 lg:px-[7vw] lg:py-36"
      >
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute -right-20 top-32 h-72 w-72 rounded-full border border-white/[0.06]" />

        <div className="relative z-10 mx-auto max-w-[1600px]">
          <div className="gallery-reveal mb-12 flex flex-col gap-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/55">
                <span className="mr-3 text-[#FEC73A]">02 /</span>
                Construction collection
              </p>

              <h2 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[6.5rem]">
                The Work
                <br />
                <span className="italic text-[#FEC73A]">
                  Behind the Form.
                </span>
              </h2>
            </div>

            <div className="max-w-sm sm:pb-2">
              <p className="text-sm leading-7 text-white/65">
                A closer look at construction environments,
                structural work and on-site details that form
                an important part of the building process.
              </p>

              <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#FEC73A]">
                04 Images
              </p>
            </div>
          </div>

          <div className="gallery-divider mb-8 h-px w-full origin-left bg-white/20" />

          {renderImageGrid(constructionImages)}
        </div>
      </section>

      {/* =====================================================
          03 — FEATURED PROJECTS
      ===================================================== */}

      <section
        id="featured-projects"
        className="scroll-mt-20 bg-white px-5 py-24 sm:px-8 sm:py-28 lg:px-[7vw] lg:py-36"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="gallery-reveal mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#002556]/60">
                <span className="mr-3 text-[#F0B91B]">03 /</span>
                Selected work
              </p>

              <h2 className="max-w-2xl font-serif text-5xl leading-[0.95] tracking-[-0.055em] sm:text-7xl">
                Featured
                <br />
                <span className="italic text-[#002556]/50">
                  Projects.
                </span>
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-7 text-[#002556]/65">
              Explore selected projects and discover the
              thinking, creativity and attention to detail
              behind each design.
            </p>
          </div>

          <div className="gallery-divider mb-7 h-px w-full origin-left bg-[#002556]/20" />

          {/* FILTER BAR */}
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex flex-wrap gap-2"
              aria-label="Filter projects by category"
            >
              {filters.map((item) => {
                const isActive = filter === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    aria-pressed={isActive}
                    className={`border px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 sm:text-[11px] ${
                      isActive
                        ? "border-[#002556] bg-[#002556] text-white"
                        : "border-[#002556]/20 bg-transparent text-[#002556]/70 hover:border-[#FEC73A] hover:bg-[#FEC73A]/20 hover:text-[#002556]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <p
              className="text-[10px] uppercase tracking-[0.17em] text-[#002556]/65"
              aria-live="polite"
            >
              <span className="mr-2 text-[#002556]">
                {String(list.length).padStart(2, "0")}
              </span>
              {list.length === 1 ? "Project" : "Projects"}
            </p>
          </div>

          {/* PROJECT GRID */}
          {list.length > 0 ? (
            <div
              key={filter}
              className="gallery-project-grid grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-16"
            >
              {list.map((project) => (
                <article
                  key={project.title}
                  className="gallery-project-card group min-w-0"
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block"
                    aria-label={`View ${project.title} project`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#002556]/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      />

                      <div className="absolute inset-0 bg-[#002556]/0 transition-colors duration-500 group-hover:bg-[#002556]/20" />

                      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                        <span className="bg-white px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#002556] transition-colors duration-300 group-hover:bg-[#FEC73A]">
                          {project.type || "Architecture"}
                        </span>

                        <span className="flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#FEC73A] text-[#002556] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpRight size={18} strokeWidth={1.5} />
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-[#002556]/90 via-[#002556]/30 to-transparent px-5 pb-5 pt-20 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#FEC73A]">
                          Explore project
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-4 border-b border-[#002556]/20 py-5 transition-colors duration-300 group-hover:border-[#FEC73A]">
                      <div>
                        <h3 className="font-serif text-2xl tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.7rem]">
                          {project.title}
                        </h3>

                        <p className="mt-2 text-xs text-[#002556]/60">
                          {project.type || "A considered space"}
                        </p>
                      </div>

                      <span className="mt-1 text-[#002556] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight size={20} strokeWidth={1.3} />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-y border-[#002556]/15 py-20 text-center sm:py-28">
              <p className="font-serif text-3xl italic text-[#002556]/60 sm:text-4xl">
                Nothing here just yet.
              </p>

              <p className="mt-4 text-sm text-[#002556]/65">
                Try another category to explore more projects.
              </p>

              <button
                type="button"
                onClick={() => setFilter("All")}
                className="mt-7 border border-[#002556] px-5 py-3 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-[#002556] hover:text-white"
              >
                View all projects
              </button>
            </div>
          )}

          {/* EDITORIAL NOTE */}
          <div className="gallery-reveal mt-20 grid gap-5 border-t border-[#002556]/20 pt-7 sm:mt-28 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#002556]/60">
                The thinking behind the spaces
              </p>

              <p className="max-w-xl font-serif text-2xl leading-snug tracking-[-0.035em] sm:text-3xl">
                Good architecture is not only what you see.
                It is what you feel, use and remember.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex w-fit items-center gap-3 border-b border-[#002556]/30 pb-2 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#FEC73A] hover:text-[#002556]/65"
            >
              Start a conversation

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00152F]/95 px-4 py-6 backdrop-blur-md sm:px-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:rotate-90 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] sm:right-8 sm:top-8"
          >
            <X size={20} />
          </button>

          {/* Image counter */}
          <div className="absolute left-5 top-8 z-20 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:left-8">
            <span className="text-[#FEC73A]">
              {String(activeImage + 1).padStart(2, "0")}
            </span>
            <span className="mx-2">/</span>
            {String(allGalleryImages.length).padStart(2, "0")}
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] sm:left-8 sm:h-14 sm:w-14"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Main image */}
          <div
            className="relative flex h-full w-full max-w-[1250px] flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={allGalleryImages[activeImage].id}
              src={allGalleryImages[activeImage].image}
              alt={allGalleryImages[activeImage].title}
              className="max-h-[78vh] max-w-full object-contain"
            />

            <div className="mt-5 text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#FEC73A]">
                Shri Norris Architects
              </p>

              <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                {allGalleryImages[activeImage].title}
              </h3>
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] sm:right-8 sm:h-14 sm:w-14"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="gallery-cta">
        <CTASection />
      </div>
    </main>
  );
}
