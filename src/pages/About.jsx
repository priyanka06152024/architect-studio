// src/pages/About.jsx

import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects, services, testimonials } from "../data/content";

import aboutImg from "../assets/images/aboutimg.avif";

gsap.registerPlugin(ScrollTrigger);

const NAVY = "#002556";
const YELLOW = "#FEC73A";
const WHITE = "#FFFFFF";

function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] ${
        light ? "text-white/65" : "text-[#002556]/65"
      }`}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: YELLOW }}
      />
      {children}
    </span>
  );
}

function CircleLink({ to = "/contact", children = "Let's talk" }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-4">
      <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#002556]/25 transition-all duration-500 group-hover:border-[#002556] group-hover:bg-[#002556]">
        <ArrowUpRight
          size={17}
          className="relative z-10 text-[#002556] transition-all duration-500 group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:text-white"
        />

        <ArrowUpRight
          size={17}
          className="absolute -translate-x-8 translate-y-8 text-white transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>

      <span className="text-[11px] uppercase tracking-[0.16em] text-[#002556]">
        {children}
      </span>
    </Link>
  );
}

function RevealImage({ src, alt, className = "" }) {
  return (
    <div className={`group relative overflow-hidden bg-[#002556] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[#002556]/10 transition-colors duration-500 group-hover:bg-transparent" />
    </div>
  );
}

export default function About() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const introItems = gsap.utils.toArray(".about-reveal");

      gsap.fromTo(
        introItems,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-intro",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.utils.toArray(".about-fade").forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray(".about-image-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            clipPath: "inset(0 0 100% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray(".about-line").forEach((element) => {
        gsap.fromTo(
          element,
          {
            scaleX: 0,
            transformOrigin: "left",
          },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      if (window.matchMedia("(min-width: 768px)").matches) {
        gsap.to(".about-floating-image", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-floating-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    {
      number: "01",
      year: "2001",
      title: "The Beginning",
      description:
        "Our journey began with a clear vision: to create thoughtful spaces shaped around people, purpose, and place.",
    },
    {
      number: "02",
      year: "Growth",
      title: "Building Trust",
      description:
        "Through years of collaboration and careful execution, we built lasting relationships with our clients.",
    },
    {
      number: "03",
      year: "Today",
      title: "Looking Forward",
      description:
        "We continue to explore better ways of designing and building spaces that feel timeless and meaningful.",
    },
  ];

  const values = [
    {
      number: "01",
      title: "Purposeful Design",
      description:
        "Every space begins with understanding how people live, work, and connect.",
    },
    {
      number: "02",
      title: "Attention to Detail",
      description:
        "We believe the smallest decisions can make the biggest difference to the finished space.",
    },
    {
      number: "03",
      title: "Lasting Quality",
      description:
        "Our approach balances aesthetics, functionality, and long-term value.",
    },
    {
      number: "04",
      title: "Client Collaboration",
      description:
        "We listen, exchange ideas, and work closely with clients throughout the process.",
    },
  ];

  const featuredProjects = (projects || []).slice(0, 3);

  return (
    <main ref={rootRef} className="overflow-hidden bg-white text-[#002556]">
      {/* INTRO HERO */}
      <section className="about-intro relative overflow-hidden bg-[#002556] px-5 pb-20 pt-36 text-white sm:px-8 sm:pb-28 sm:pt-44 lg:px-14 lg:pb-32 lg:pt-48">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#FEC73A]/10 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="about-reveal mb-16 flex items-center justify-between gap-6 sm:mb-20">
            <Eyebrow light>About Shri Norris Architects</Eyebrow>

            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-white/45 sm:block">
              Aligarh, India
            </span>
          </div>

          <h1 className="max-w-[1200px] text-[clamp(3.5rem,10.5vw,10rem)] font-medium leading-[0.86] tracking-[-0.075em]">
            <span className="about-reveal block">Spaces that</span>

            <span className="about-reveal block">
              <span className="text-[#FEC73A]">feel</span> different.
            </span>
          </h1>

          <div className="mt-14 grid gap-10 sm:mt-20 sm:grid-cols-2 sm:items-end lg:grid-cols-12">
            <p className="about-reveal max-w-md text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:col-span-5">
              We design architecture and interiors with a focus on people,
              thoughtful details, and spaces that stand the test of time.
            </p>

            <div className="about-reveal flex items-center justify-start sm:justify-end lg:col-span-7">
              <a
                href="#our-story"
                className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:text-[#FEC73A]"
              >
                Discover our story
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                  <ArrowDown
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-y-1"
                  />
                </span>
              </a>
            </div>
          </div>

          <div className="about-line mt-16 h-px w-full bg-white/25 sm:mt-24" />

          <div className="about-reveal mt-6 flex flex-wrap items-center justify-between gap-4 text-[9px] uppercase tracking-[0.18em] text-white/50 sm:text-[10px]">
            <span>Architecture</span>
            <span>Interior Design</span>
            <span>Since 2001</span>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="about-floating-section px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Our Story</Eyebrow>

            <h2 className="about-fade mt-7 max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              A vision built on{" "}
              <span className="text-[#002556]/45">experience.</span>
            </h2>

            <div className="about-fade mt-9 max-w-md">
              <p className="text-sm leading-7 text-[#002556]/70 sm:text-base sm:leading-8">
                Shri Norris Architects has been shaping spaces since 2001. Our
                work brings together practical thinking, considered design, and
                an understanding of how a space should feel.
              </p>

              <p className="mt-5 text-sm leading-7 text-[#002556]/70 sm:text-base sm:leading-8">
                From the first conversation to the final details, we believe
                architecture should respond to its surroundings and the people
                who experience it every day.
              </p>
            </div>

            <div className="about-fade mt-9">
              <CircleLink to="/contact">Start a conversation</CircleLink>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="about-image-reveal relative h-[420px] overflow-hidden bg-[#002556] sm:h-[560px] lg:h-[680px]">
              <img
                src={aboutImg}
                alt="Architectural project by Shri Norris Architects"
                loading="lazy"
                className="about-floating-image h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#002556]/45 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/70">
                    Our approach
                  </p>

                  <p className="mt-2 text-xl tracking-[-0.04em] sm:text-3xl">
                    Design with purpose.
                  </p>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FEC73A] text-[#002556]">
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </div>

            <div className="about-fade mt-4 flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.16em] text-[#002556]/55">
              <span>Thoughtful by design</span>
              <span>Aligarh, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="bg-[#FEC73A] px-5 py-20 text-[#002556] sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Our Journey</Eyebrow>

              <h2 className="about-fade mt-7 max-w-lg text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                Built over time.{" "}
                <span className="text-[#002556]/50">Driven by ideas.</span>
              </h2>

              <p className="about-fade mt-7 max-w-md text-sm leading-7 text-[#002556]/75 sm:text-base sm:leading-8">
                Every project has taught us something new. Our journey is shaped
                by experience, collaboration, and the ambition to keep
                improving.
              </p>
            </div>

            <div className="lg:col-span-7">
              {milestones.map((item) => (
                <article
                  key={item.number}
                  className="about-fade border-t border-[#002556]/25 py-7 sm:py-9"
                >
                  <div className="grid gap-4 sm:grid-cols-[70px_1fr] sm:gap-7">
                    <span className="text-[10px] tracking-[0.15em] text-[#002556]/60">
                      {item.number}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="text-2xl font-medium tracking-[-0.05em] sm:text-4xl">
                          {item.title}
                        </h3>

                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#002556]/65">
                          {item.year}
                        </span>
                      </div>

                      <p className="mt-4 max-w-lg text-sm leading-7 text-[#002556]/75">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow>What We Believe</Eyebrow>

              <h2 className="about-fade mt-7 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                The principles behind{" "}
                <span className="text-[#002556]/45">every space.</span>
              </h2>
            </div>

            <p className="about-fade max-w-sm text-sm leading-7 text-[#002556]/65">
              Good architecture is not only about how something looks. It is
              about how it works, feels, and becomes part of everyday life.
            </p>
          </div>

          <div className="mt-14 grid border-l border-t border-[#002556]/20 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.number}
                className="about-fade group relative flex min-h-[250px] flex-col justify-between border-b border-r border-[#002556]/20 p-6 transition-colors duration-500 hover:bg-[#002556] sm:min-h-[300px] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] tracking-[0.18em] text-[#002556]/55 transition-colors duration-500 group-hover:text-white/60">
                    {value.number}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#002556]/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                    <Plus
                      size={15}
                      className="text-[#002556] transition-colors duration-500 group-hover:text-[#002556]"
                    />
                  </span>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-medium tracking-[-0.04em] transition-colors duration-500 group-hover:text-white sm:text-2xl">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#002556]/65 transition-colors duration-500 group-hover:text-white/70">
                    {value.description}
                  </p>
                </div>

                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#FEC73A] transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      {featuredProjects.length > 0 && (
        <section className="bg-[#002556] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <Eyebrow light>Selected Work</Eyebrow>

                <h2 className="about-fade mt-7 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  Ideas turned into{" "}
                  <span className="text-[#FEC73A]">spaces.</span>
                </h2>
              </div>

              <Link
                to="/projects"
                className="group inline-flex w-fit items-center gap-4 border-b border-white/30 pb-3 text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-[#FEC73A] hover:text-[#FEC73A]"
              >
                Explore all projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>

            <div className="mt-14 grid gap-8 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id || project.slug || project.title || index}
                  to={`/projects/${project.slug || ""}`}
                  className="about-fade group block"
                >
                  <div className="about-image-reveal relative aspect-[4/5] overflow-hidden bg-white/10">
                    <img
                      src={
                        project.image ||
                        project.thumbnail ||
                        project.cover ||
                        ""
                      }
                      alt={project.title || "Architecture project"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#002556]/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FEC73A] text-[#002556] transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </span>

                    <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/65">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-2 text-2xl tracking-[-0.05em] sm:text-3xl">
                        {project.title || "Selected Project"}
                      </h3>

                      {project.category && (
                        <p className="mt-2 text-xs text-white/70">
                          {project.category}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials?.length > 0 && (
        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1600px]">
            <Eyebrow>Client Perspectives</Eyebrow>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="about-fade text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-6xl">
                  Trust is built{" "}
                  <span className="text-[#002556]/45">together.</span>
                </h2>
              </div>

              <div className="lg:col-span-8">
                {testimonials.slice(0, 2).map((item, index) => (
                  <article
                    key={item.id || item.name || index}
                    className="about-fade border-t border-[#002556]/20 py-8 sm:py-10"
                  >
                    <span className="text-4xl leading-none text-[#FEC73A]">
                      “
                    </span>

                    <p className="mt-4 max-w-3xl text-xl leading-relaxed tracking-[-0.03em] sm:text-3xl">
                      {item.quote ||
                        item.text ||
                        item.content ||
                        "A thoughtful and collaborative experience from beginning to end."}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-medium">
                        {item.name || item.author || "Our Client"}
                      </span>

                      <span className="text-[9px] uppercase tracking-[0.16em] text-[#002556]/50">
                        {item.role || item.designation || "Client"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#FEC73A] px-5 py-20 text-[#002556] sm:px-8 sm:py-28 lg:px-14 lg:py-36">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#002556]/10 sm:h-96 sm:w-96" />

        <div className="relative mx-auto max-w-[1600px]">
          <Eyebrow>Have a Project in Mind?</Eyebrow>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="about-fade max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.07em] sm:text-7xl lg:text-[7.5rem]">
                Let’s create something{" "}
                <span className="text-[#002556]/50">meaningful.</span>
              </h2>
            </div>

            <div className="about-fade lg:col-span-4 lg:justify-self-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-5"
              >
                <span className="text-[10px] uppercase tracking-[0.18em]">
                  Discuss your project
                </span>

                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#002556] text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#002556] sm:h-16 sm:w-16">
                  <ArrowUpRight size={21} />
                </span>
              </Link>
            </div>
          </div>

          <div className="about-line mt-14 h-px w-full bg-[#002556]/25 sm:mt-20" />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[9px] uppercase tracking-[0.18em] text-[#002556]/60">
            <span>Shri Norris Architects</span>
            <span>Architecture · Interior Design</span>
            <span>Aligarh, India</span>
          </div>
        </div>
      </section>
    </main>
  );
}
