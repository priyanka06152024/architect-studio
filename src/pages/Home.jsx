
import { useLayoutEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import {
  projects,
  services,
  testimonials,
} from "../data/content";
import { CTASection } from "../components/Shared";
import img1 from "../assets/images/img1.avif";
import img2 from "../assets/images/img2.avif";
import img3 from "../assets/images/img3.avif";
import img4 from "../assets/images/img4.avif";
import img5 from "../assets/images/img5.avif";
gsap.registerPlugin(ScrollTrigger);

const media = {
  hero: img1,
  intro:
    img2,
  work: [
    img3,
    img4,
    img5,
  ],
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

function Eyebrow({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] ${
        dark ? "text-white/50" : "text-black/50"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#c3d17a]" />
      {children}
    </span>
  );
}

function CircleLink({ to, children, dark = false }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-4 text-[10px] tracking-[0.15em] ${
        dark ? "text-white" : "text-[#252620]"
      }`}
    >
      {children}
      <span className="grid h-10 w-10 place-items-center rounded-full border border-current/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#c3d17a] group-hover:bg-[#c3d17a] group-hover:text-[#252620]">
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
      <div className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
    </div>
  );
}

export default function Home() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const trackRef = useRef(null);


useLayoutEffect(() => {
  const root = rootRef.current;

  if (!root) return;

  // Smooth scrolling + GSAP synchronization
  const lenis = new Lenis({
    lerp: 0.075,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.1,
  });

  const updateLenis = (time) => {
    lenis.raf(time * 1000);
  };

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add(updateLenis);
  gsap.ticker.lagSmoothing(0);

  let galleryMM;

  const ctx = gsap.context(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    // -----------------------------------------
    // 1. HERO ENTRANCE
    // -----------------------------------------

    const heroTimeline = gsap.timeline({
      delay: 0.15,
      defaults: {
        ease: "power3.out",
      },
    });

    heroTimeline
      .from(".nav-enter", {
        y: 16,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        clearProps: "transform,opacity,visibility",
      })
      .from(
        ".hero-title-line",
        {
          yPercent: 110,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.14,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.45"
      )
      .from(
        ".hero-description",
        {
          y: 22,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.65"
      )
      .from(
        ".hero-photo",
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.35,
          ease: "power3.inOut",
          clearProps: "clipPath",
        },
        "-=0.8"
      )
      .from(
        ".hero-meta-bottom",
        {
          y: 14,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.6"
      );

    // -----------------------------------------
    // 2. HERO IMAGE PARALLAX
    // -----------------------------------------

    if (heroRef.current) {
      gsap.to(".hero-photo img", {
        yPercent: 8,
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

    // -----------------------------------------
    // 3. GENERAL SECTION REVEALS
    // -----------------------------------------

    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.fromTo(
        element,
        {
          y: 35,
          autoAlpha: 0,
        },
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
        }
      );
    });

    // -----------------------------------------
    // 4. IMAGE MASK REVEALS
    // -----------------------------------------

    gsap.utils.toArray(".image-reveal").forEach((element) => {
      gsap.fromTo(
        element,
        {
          clipPath: "inset(0 0 100% 0)",
        },
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
        }
      );
    });

    // -----------------------------------------
    // 5. SERVICES STAGGER
    // -----------------------------------------

    const serviceRows = gsap.utils.toArray(".service-row");

    if (serviceRows.length) {
      gsap.fromTo(
        serviceRows,
        {
          y: 24,
          autoAlpha: 0,
        },
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
        }
      );
    }

    // -----------------------------------------
    // 6. SELECTED WORK — HORIZONTAL PIN
    // -----------------------------------------

    const track = trackRef.current;
    const section = galleryRef.current;

    if (track && section) {
      galleryMM = gsap.matchMedia();

      galleryMM.add("(min-width: 901px)", () => {
        const getDistance = () => {
          return Math.max(
            0,
            track.scrollWidth - section.clientWidth
          );
        };

        // Refresh measurements after layout changes.
        const galleryTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          force3D: true,

          scrollTrigger: {
            trigger: section,
            start: "top top",

            // Longer pin duration = slower horizontal movement.
            end: () => {
              const distance = getDistance();

              return `+=${Math.max(
                distance * 2.4,
                window.innerHeight * 2.5
              )}`;
            },

            pin: true,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,

            onRefresh: () => {
              gsap.set(track, {
                x: 0,
              });
            },
          },
        });

        // Recalculate when the browser layout changes.
        const refreshGallery = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", refreshGallery);

        return () => {
          window.removeEventListener("resize", refreshGallery);
          galleryTween.scrollTrigger?.kill();
          galleryTween.kill();

          gsap.set(track, {
            clearProps: "transform",
          });
        };
      });
    }

    // -----------------------------------------
    // 7. REFRESH AFTER IMAGES / LAYOUT LOAD
    // -----------------------------------------

    ScrollTrigger.refresh();
  }, root);

  const refreshAfterLoad = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("load", refreshAfterLoad);

  return () => {
    window.removeEventListener("load", refreshAfterLoad);

    galleryMM?.revert();
    ctx.revert();

    // Clean up Lenis completely.
    gsap.ticker.remove(updateLenis);
    lenis.off("scroll", ScrollTrigger.update);
    lenis.destroy();

    // Prevent stale pin measurements after unmount.
    ScrollTrigger.refresh();
  };
}, []);

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

  const serviceItems = services?.length
    ? services
    : serviceDefaults;

  return (
    <main
      ref={rootRef}
      className="overflow-clip bg-[#f3f1e9] text-[#262720] selection:bg-[#c3d17a] selection:text-[#202119]"
    >
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-[#22231f] px-5 pb-5 text-[#f3f1e9] sm:px-8 lg:px-[5vw]"
      >

        <div className="grid gap-9 py-16 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-10 lg:pb-14 lg:pt-[9vh]">
          <div>
            <div className="nav-enter mb-7">
              <Eyebrow dark>Architecture / Objects / Atmosphere</Eyebrow>
            </div>

            <h1 className="font-serif text-[clamp(4rem,11.5vw,11rem)] leading-[0.79] tracking-[-0.085em]">
              <span className="block overflow-hidden pb-2">
                <span className="hero-title-line block">A different</span>
              </span>
              <span className="block overflow-hidden pb-3">
                <span className="hero-title-line block pl-[8vw] italic text-[#c3d17a]">
                  way to feel.
                </span>
              </span>
            </h1>
          </div>

          <div className="lg:pb-2 lg:pl-8">
            <p className="hero-description max-w-[330px] text-sm leading-7 text-white/60 sm:text-base">
              We create architecture that goes beyond appearance — spaces
              shaped by emotion, material and the experience of being there.
            </p>

            <div className="hero-description mt-8">
              <CircleLink to="/gallery" dark>
                DISCOVER OUR WORK
              </CircleLink>
            </div>
          </div>
        </div>

        <div className="hero-photo group relative h-[48vh] min-h-[330px] overflow-hidden sm:h-[58vh] lg:h-[63vh]">
          <img
            src={media.hero}
            alt="Contemporary residence with sculptural furniture, warm wood and natural light"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-[115%] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

          <div className="hero-meta-bottom absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-8 sm:bottom-8">
            <div>
              <span className="text-[9px] tracking-[0.18em] text-white/65">
                FEATURED APPROACH / 001
              </span>
              <p className="mt-2 font-serif text-2xl sm:text-4xl">
                Space. In its purest form.
              </p>
            </div>

            <a
              href="#studio"
              aria-label="Scroll to explore the studio"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/50 transition-all duration-300 hover:-translate-y-1 hover:bg-[#c3d17a] hover:text-black"
            >
              <ArrowDown size={18} />
            </a>
          </div>
        </div>

        <div className="hero-meta-bottom flex flex-wrap justify-between gap-3 py-5 text-[8px] tracking-[0.16em] text-white/45 sm:text-[9px]">
          <span>NEW DELHI / INDIA</span>
          <span>DESIGNED WITH INTENTION</span>
          <span>EST. 2014</span>
        </div>
      </section>

      {/* STUDIO INTRO */}
      <section
        id="studio"
        className="px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[12vw]"
      >
        <div className="mb-12 flex items-center justify-between gap-4">
          <Eyebrow>01 — The studio</Eyebrow>
          <span className="text-[9px] tracking-[0.12em] text-black/40">
            OUR POINT OF VIEW
          </span>
        </div>

        <h2 className="reveal max-w-[1150px] font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-[-0.07em]">
          We design for the
          <br />
          way life{" "}
          <span className="italic text-[#777d52]">unfolds.</span>
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-[1.15fr_0.65fr] md:items-end md:gap-16 lg:mt-20">
          <RevealImage
            src={media.intro}
            alt="Sculptural architectural interior with natural stone and daylight"
            className="image-reveal h-[350px] sm:h-[500px] lg:h-[600px]"
          />

          <div className="reveal pb-3 md:pb-8">
            <span className="text-[9px] tracking-[0.15em] text-[#777d52]">
              THOUGHTFUL BY DESIGN
            </span>

            <p className="mt-7 font-serif text-3xl leading-snug sm:text-4xl">
              The best spaces don't ask for attention. They earn it.
            </p>

            <p className="mt-6 text-sm leading-7 text-black/60">
              Every project begins with understanding the site, its people
              and the little rituals that make a place personal.
            </p>

            <p className="mt-4 text-sm leading-7 text-black/60">
              Honest materials, purposeful forms and considered details
              come together to create architecture that lasts.
            </p>

            <div className="mt-8">
              <CircleLink to="/about">MEET THE STUDIO</CircleLink>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-black/15 px-5 py-12 sm:px-8 sm:py-16 lg:px-[5vw]">
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
              className="reveal border-l border-black/15 px-4 py-5 sm:px-7 sm:py-7"
            >
              <strong className="font-serif text-5xl font-normal tracking-[-0.07em] sm:text-7xl">
                {number}
              </strong>
              <span className="mt-4 block text-[8px] tracking-[0.13em] text-black/50 sm:text-[9px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[12vw]">
        <div className="grid gap-9 lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <div className="reveal">
            <Eyebrow>02 — What we do</Eyebrow>
            <h2 className="mt-8 font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.83] tracking-[-0.075em]">
              Form meets
              <br />
              <span className="italic text-[#777d52]">feeling.</span>
            </h2>
          </div>

          <div className="reveal lg:pb-2">
            <p className="max-w-[340px] text-sm leading-7 text-black/60">
              From the first idea to the smallest finishing detail, every
              decision has a purpose.
            </p>

            <div className="mt-7">
              <CircleLink to="/services">EXPLORE EXPERTISE</CircleLink>
            </div>
          </div>
        </div>

        <div className="service-list mt-16 border-t border-black/20 sm:mt-24">
          {serviceItems.map((service, index) => {
            const number = Array.isArray(service)
              ? service[0]
              : service.number ?? String(index + 1).padStart(2, "0");

            const title = Array.isArray(service)
              ? service[1]
              : service.title;

            const description = Array.isArray(service)
              ? service[2]
              : service.description;

            return (
              <Link
                key={`${number}-${title}`}
                to="/services"
                className="service-row group grid grid-cols-[30px_1fr_40px] items-center gap-3 border-b border-black/20 py-7 transition-colors duration-500 hover:bg-[#e6e5d9] sm:grid-cols-[50px_1fr_0.8fr_45px] sm:gap-5 sm:px-4 sm:py-9"
              >
                <span className="self-start pt-2 text-[9px] text-[#777d52]">
                  {String(number).padStart(2, "0")}
                </span>

                <h3 className="font-serif text-2xl tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                  {title}
                </h3>

                <p className="hidden max-w-[280px] text-xs leading-6 text-black/55 sm:block">
                  {description}
                </p>

                <span className="grid h-9 w-9 place-items-center rounded-full border border-black/25 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#c3d17a] group-hover:bg-[#c3d17a] sm:h-11 sm:w-11">
                  <Plus size={18} />
                </span>

                <p className="col-start-2 text-xs leading-6 text-black/55 sm:hidden">
                  {description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CINEMATIC PROJECTS */}
     <section
  ref={trackRef}
  className="flex w-max gap-5 px-5 will-change-transform sm:gap-7 sm:px-8 lg:gap-8 lg:px-[5vw]"
>
        <div className="px-5 sm:px-8 lg:px-[5vw]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="reveal">
              <Eyebrow dark>03 — Selected projects / 2021—2026</Eyebrow>
              <h2 className="mt-7 font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-[-0.08em]">
                Made to
                <br />
                <span className="italic text-[#c3d17a]">belong.</span>
              </h2>
            </div>

            <div className="mb-2">
              <CircleLink to="/gallery" dark>
                ALL PROJECTS
              </CircleLink>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden lg:mt-8">
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
                <div className="relative h-[330px] overflow-hidden bg-[#3c3d36] sm:h-[430px] lg:h-[48vh]">
                  <img
                    src={project.image}
                    alt={`${project.title} — architecture and interior design`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 text-[9px] tracking-[0.15em] text-white/75">
                    0{index + 1} / 0{workItems.length}
                  </span>

                  <span className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#c3d17a] group-hover:bg-[#c3d17a] group-hover:text-black">
                    <ArrowUpRight size={22} />
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4 border-b border-white/20 py-5">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/50">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                      {project.title}
                    </h3>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mb-1 shrink-0 text-[#c3d17a] transition-transform duration-500 group-hover:translate-x-2"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-between gap-4 px-5 text-[8px] tracking-[0.14em] text-white/45 sm:px-8 lg:px-[5vw]">
          <span>THOUGHTFULLY CONSIDERED</span>
          <span className="hidden sm:block">SCROLL TO EXPLORE ↗</span>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="grid bg-[#dfe0d2] md:grid-cols-2">
        <RevealImage
          src={media.hero}
          alt="Contemporary architectural living space with warm textures"
          className="image-reveal h-[400px] sm:h-[570px] md:h-[700px]"
        />

        <div className="flex flex-col justify-center px-5 py-20 sm:px-10 sm:py-24 lg:px-[8vw]">
          <div className="reveal">
            <Eyebrow>04 — Our philosophy</Eyebrow>

            <h2 className="mt-8 font-serif text-[clamp(3.5rem,6.5vw,7rem)] leading-[0.85] tracking-[-0.075em]">
              Quietly
              <br />
              <span className="italic text-[#777d52]">remarkable.</span>
            </h2>
          </div>

          <div className="my-9 border-t border-black/20" />

          <p className="reveal max-w-[400px] text-sm leading-7 text-black/65">
            We believe architecture should be experienced, not just seen.
            In natural light, tactile materials, thoughtful proportions and
            the small moments that turn a building into a place.
          </p>

          <div className="reveal mt-8">
            <CircleLink to="/about">OUR APPROACH</CircleLink>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-[10vw] lg:py-[12vw]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <Eyebrow>05 — Client stories</Eyebrow>

            <h2 className="mt-8 font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.85] tracking-[-0.07em]">
              Spaces that
              <br />
              <span className="italic text-[#777d52]">stay with you.</span>
            </h2>

            <div className="mt-8">
              <CircleLink to="/testimonials">READ THEIR STORIES</CircleLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.slice(0, 3).map((item, index) => (
              <article
                key={item.name ?? index}
                className={`group flex min-h-[260px] flex-col justify-between border border-black/15 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#777d52] hover:bg-[#e8e7dc] sm:p-7 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div>
                  <span className="font-serif text-5xl text-[#777d52]">
                    “
                  </span>
                  <p className="mt-3 font-serif text-xl leading-relaxed sm:text-2xl">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-8 flex items-end justify-between border-t border-black/15 pt-5">
                  <div>
                    <strong className="block text-xs font-medium">
                      {item.name}
                    </strong>
                    <span className="mt-1 block text-[10px] text-black/50">
                      {item.meta}
                    </span>
                  </div>
                  <span className="text-[9px] tracking-[0.15em] text-[#777d52]">
                    0{index + 1}
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
