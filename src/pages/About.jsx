
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageIntro, CTASection } from "../components/Shared";
import aboutimg from "../assets/images/aboutimg.avif";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      // 1. Intro entrance
      const intro = page.querySelector(".about-intro");

      if (intro) {
        const introItems = intro.querySelectorAll(
          ".about-intro-item"
        );

        gsap.fromTo(
          introItems,
          {
            y: 28,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: intro,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Story image reveal + subtle image movement
      page.querySelectorAll(".about-image").forEach((wrapper) => {
        const image = wrapper.querySelector("img");

        gsap.fromTo(
          wrapper,
          {
            clipPath: "inset(0 0 100% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.35,
            ease: "power3.inOut",
            clearProps: "clipPath",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 82%",
              once: true,
            },
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            {
              scale: 1.16,
              yPercent: 4,
            },
            {
              scale: 1,
              yPercent: 0,
              duration: 1.6,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      });

      // 3. Story text reveal
      gsap.utils.toArray(".about-story-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 32,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: element,
              start: "top 87%",
              once: true,
            },
          }
        );
      });

      // 4. Approach steps — cascading reveal
      const approach = page.querySelector(".about-approach");

      if (approach) {
        gsap.fromTo(
          approach.querySelectorAll(".about-step"),
          {
            y: 24,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: approach,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      // 5. Belief cards — staggered entrance
      const beliefSection = page.querySelector(".about-beliefs");

      if (beliefSection) {
        gsap.fromTo(
          beliefSection.querySelectorAll(".about-belief-card"),
          {
            y: 38,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: beliefSection,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 6. Section eyebrow and divider details
      gsap.utils.toArray(".about-eyebrow").forEach((element) => {
        gsap.fromTo(
          element,
          {
            x: -14,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // 7. CTA entrance
      const cta = page.querySelector(".about-cta");

      if (cta) {
        gsap.fromTo(
          cta,
          {
            y: 35,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: cta,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // Refresh after images finish loading.
      const images = page.querySelectorAll("img");

      images.forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", ScrollTrigger.refresh, {
            once: true,
          });
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, page);

    return () => ctx.revert();
  }, []);

 
return (
  <main ref={pageRef} className="about-page overflow-clip bg-[#f3f1e9] text-[#262720]">
    {/* INTRO */}
    <section className="relative overflow-hidden bg-[#22231f] px-5 pb-14 pt-10 text-[#f3f1e9] sm:px-8 sm:pb-20 lg:px-[5vw]">
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/[0.07] sm:h-[450px] sm:w-[450px]" />
      <div className="pointer-events-none absolute -right-8 top-32 h-56 w-56 rounded-full border border-[#c3d17a]/15 sm:h-[350px] sm:w-[350px]" />

      <div className="about-intro relative z-10">
        <div className="about-intro-item flex items-center justify-between gap-4 border-b border-white/15 pb-5">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/55">
            Independent Architecture Practice
          </span>
          <span className="text-[9px] tracking-[0.18em] text-[#c3d17a]">
            ALIGARH · INDIA
          </span>
        </div>

        <div className="grid gap-10 pt-16 sm:pt-24 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16 lg:pt-[12vh]">
          <div>
            <p className="about-intro-item mb-7 text-[10px] uppercase tracking-[0.2em] text-[#c3d17a]">
              Who we are · Est. 2001
            </p>

            <h1 className="about-intro-item max-w-[1000px] font-serif text-[clamp(3.7rem,9.5vw,9.5rem)] leading-[0.84] tracking-[-0.075em]">
              Architecture
              <br />
              with a sense
              <br />
              <span className="pl-[8vw] italic text-[#c3d17a]">
                of purpose.
              </span>
            </h1>
          </div>

          <div className="about-intro-item max-w-[380px] lg:justify-self-end lg:pb-3">
            <span className="mb-6 block h-px w-14 bg-[#c3d17a]" />

            <p className="text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              A locally rooted architecture practice creating thoughtful
              spaces for living, working and gathering in Aligarh and beyond.
            </p>

            <div className="mt-8 flex items-center gap-4 text-[9px] uppercase tracking-[0.16em] text-white/45">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25">
                ↓
              </span>
              <span>Scroll to discover our philosophy</span>
            </div>
          </div>
        </div>

        <div className="about-intro-item mt-16 grid grid-cols-3 border-t border-white/15 pt-5 sm:mt-24">
          <div>
            <span className="block font-serif text-3xl sm:text-5xl">01</span>
            <span className="mt-2 block text-[8px] tracking-[0.15em] text-white/45 sm:text-[9px]">
              PEOPLE
            </span>
          </div>
          <div className="border-l border-white/15 pl-4 sm:pl-8">
            <span className="block font-serif text-3xl sm:text-5xl">02</span>
            <span className="mt-2 block text-[8px] tracking-[0.15em] text-white/45 sm:text-[9px]">
              PLACE
            </span>
          </div>
          <div className="border-l border-white/15 pl-4 sm:pl-8">
            <span className="block font-serif text-3xl sm:text-5xl">03</span>
            <span className="mt-2 block text-[8px] tracking-[0.15em] text-white/45 sm:text-[9px]">
              PURPOSE
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* STORY */}
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-[10vw] lg:py-[12vw]">
      <div className="mb-12 flex items-center justify-between gap-4 sm:mb-16">
        <p className="about-eyebrow text-[9px] uppercase tracking-[0.18em] text-[#777d52]">
          01 — The studio
        </p>
        <span className="text-right text-[9px] tracking-[0.12em] text-black/40">
          OUR STORY / OUR VALUES
        </span>
      </div>

      <h2 className="about-story-reveal max-w-[1050px] font-serif text-[clamp(2.8rem,7.4vw,7.5rem)] leading-[0.94] tracking-[-0.07em]">
        Good design begins
        <br className="hidden sm:block" /> with{" "}
        <span className="italic text-[#777d52]">listening.</span>
      </h2>

      <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-[1.15fr_0.85fr] md:gap-14 lg:mt-20 lg:gap-20">
        <div className="about-image image-zoom group relative aspect-[4/3] overflow-hidden bg-[#dedbd0] md:aspect-[4/4.5]">
          <img
            src={aboutimg}
            alt="Carefully designed contemporary interior"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          <span className="absolute bottom-5 left-5 text-[9px] uppercase tracking-[0.16em] text-white/85 sm:bottom-7 sm:left-7">
            Architecture / Material / Light
          </span>

          <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/60 text-white">
            ↗
          </span>
        </div>

        <div className="flex flex-col justify-center md:py-8">
          <p className="about-eyebrow text-[9px] uppercase tracking-[0.18em] text-[#777d52]">
            A considered practice
          </p>

          <p className="about-story-reveal mt-6 font-serif text-2xl leading-snug tracking-[-0.035em] sm:text-3xl lg:text-4xl">
            The best spaces don't ask for attention. They earn it.
          </p>

          <p className="about-story-reveal mt-6 text-sm leading-7 text-[#777970]">
            Shri Norris Architects Aligarh has been working in architectural
            design since 2001. We believe every successful project begins by
            understanding the people, the site and the purpose behind the brief.
          </p>

          <p className="about-story-reveal mt-4 text-sm leading-7 text-[#777970]">
            From homes and commercial spaces to interiors and planning
            support, our aim is to create work that balances visual clarity
            with real-world functionality. We value collaboration, thoughtful
            decisions and attention to the details that make a space feel complete.
          </p>

          <Link
            to="/contact"
            className="about-story-reveal group mt-8 inline-flex w-fit items-center gap-4 border-b border-black/25 pb-3 text-xs font-medium transition-colors duration-300 hover:border-[#777d52] hover:text-[#777d52]"
          >
            DISCUSS YOUR PROJECT
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>

    {/* APPROACH */}
    <section className="about-approach bg-[#e7e5d9] px-5 py-20 sm:px-8 sm:py-28 lg:px-[10vw] lg:py-[10vw]">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="about-eyebrow text-[9px] uppercase tracking-[0.18em] text-[#777d52]">
            02 — Our approach
          </p>

          <h2 className="about-story-reveal mt-7 font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.86] tracking-[-0.07em]">
            From first
            <br />
            thought to
            <br />
            <span className="italic text-[#777d52]">lasting form.</span>
          </h2>

          <p className="about-story-reveal mt-7 max-w-[340px] text-sm leading-7 text-[#777970]">
            Every stage is an opportunity to ask better questions, make
            considered decisions and create spaces that work beautifully.
          </p>
        </div>

        <div className="border-t border-black/20">
          {[
            {
              number: "01",
              title: "Listen",
              description: "Understand your needs, aspirations and site.",
            },
            {
              number: "02",
              title: "Shape",
              description: "Develop clear ideas into practical design.",
            },
            {
              number: "03",
              title: "Refine",
              description: "Review details with care and consistency.",
            },
            {
              number: "04",
              title: "Realise",
              description: "Support the journey from concept onwards.",
            },
          ].map((step) => (
            <article
              key={step.number}
              className="about-step group grid grid-cols-[38px_1fr_24px] items-start gap-3 border-b border-black/20 py-7 sm:grid-cols-[55px_1fr_30px] sm:gap-5 sm:py-9"
            >
              <span className="pt-2 text-[10px] text-[#777d52]">
                {step.number}
              </span>

              <div>
                <h3 className="font-serif text-3xl tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[350px] text-xs leading-6 text-[#777970] sm:text-sm">
                  {step.description}
                </p>
              </div>

              <ArrowUpRight
                size={19}
                className="mt-2 text-[#777d52] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* BELIEFS */}
    <section className="about-beliefs px-5 py-20 sm:px-8 sm:py-28 lg:px-[10vw] lg:py-[11vw]">
      <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
        <div>
          <p className="about-eyebrow text-[9px] uppercase tracking-[0.18em] text-[#777d52]">
            03 — What guides us
          </p>
          <h2 className="about-story-reveal mt-7 font-serif text-[clamp(3.3rem,7vw,7rem)] leading-[0.88] tracking-[-0.07em]">
            Principles over
            <br />
            <span className="italic text-[#777d52]">appearances.</span>
          </h2>
        </div>

        <p className="max-w-[300px] text-sm leading-7 text-[#777970]">
          The foundation of every project is a clear purpose, an open
          conversation and respect for its surroundings.
        </p>
      </div>

      <div className="grid border-t border-black/15 md:grid-cols-3">
        {[
          {
            number: "01",
            title: "People first.",
            description:
              "A place should respond to the routines, comfort and character of the people using it.",
          },
          {
            number: "02",
            title: "Purposeful design.",
            description:
              "Beauty and function work best together, with the site and context guiding decisions.",
          },
          {
            number: "03",
            title: "Care in the details.",
            description:
              "We aim to bring clarity, collaboration and considered attention to every brief.",
          },
        ].map((item) => (
          <article
            key={item.number}
            className="about-belief-card group border-b border-black/15 py-8 md:border-b-0 md:border-r md:px-7 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] tracking-[0.15em] text-[#777d52]">
                {item.number} / PRINCIPLE
              </span>
              <ArrowUpRight
                size={17}
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            <h3 className="mt-9 font-serif text-2xl tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#777d52] sm:text-3xl">
              {item.title}
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#777970]">
              {item.description}
            </p>

            <div className="mt-8 h-px w-10 origin-left bg-[#777d52] transition-transform duration-500 group-hover:scale-x-[2.5]" />
          </article>
        ))}
      </div>
    </section>

    {/* FINAL CTA */}
    <div className="about-cta">
      <CTASection />
    </div>
  </main>
);

}
