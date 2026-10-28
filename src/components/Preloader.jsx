
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const drawing = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      gsap.set(".blueprint-line", {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      });

      gsap.set(".intro-word", {
        y: 24,
        opacity: 0,
      });

      gsap.set(".intro-meta", {
        opacity: 0,
      });

      gsap.set(".blueprint-shape", {
        opacity: 0,
        scale: 0.92,
        transformOrigin: "center center",
      });

      tl.to(".blueprint-shape", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          ".blueprint-line",
          {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.055,
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        .to(
          ".intro-word",
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.75"
        )
        .to(
          ".intro-meta",
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .to(".loader-progress", {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to({}, { duration: 0.25 })
        .to(".loader-content", {
          y: -35,
          opacity: 0,
          duration: 0.45,
          ease: "power3.in",
        })
        .to(root.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        });
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#002556] text-white"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(40,112,196,0.18),transparent_55%)]" />

      {/* Fine blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top identity */}
      <div className="intro-meta absolute left-6 right-6 top-7 flex items-center justify-between sm:left-10 sm:right-10 sm:top-9">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-[#FEC73A]" />
          <span className="text-[9px] uppercase tracking-[0.25em] sm:text-[10px]">
            Shri Norris Architects
          </span>
        </div>

        <span className="text-[9px] tracking-[0.2em] text-white/50">
          EST. 2001
        </span>
      </div>

      {/* Main composition */}
      <div
        ref={drawing}
        className="loader-content relative flex w-full max-w-[900px] flex-col items-center px-6"
      >
        {/* Architectural line drawing */}
        <div className="blueprint-shape relative mb-[-20px] h-[210px] w-[280px] sm:h-[280px] sm:w-[390px]">
          <svg
            viewBox="0 0 390 280"
            fill="none"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="blueprintStroke"
                x1="30"
                y1="0"
                x2="350"
                y2="280"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8CCBFF" />
                <stop offset="1" stopColor="#FEC73A" />
              </linearGradient>
            </defs>

            {/* Main architectural facade */}
            <path
              className="blueprint-line"
              d="M78 226V100L195 35L312 100V226"
              stroke="url(#blueprintStroke)"
              strokeWidth="1.3"
            />

            {/* Roof and floor structure */}
            <path
              className="blueprint-line"
              d="M55 100L195 22L335 100"
              stroke="#FFFFFF"
              strokeOpacity=".65"
              strokeWidth=".8"
            />

            <path
              className="blueprint-line"
              d="M65 108H325M65 226H325M90 237H300"
              stroke="#8CCBFF"
              strokeOpacity=".75"
              strokeWidth=".8"
            />

            {/* Central entrance */}
            <path
              className="blueprint-line"
              d="M164 226V155Q164 125 195 125Q226 125 226 155V226"
              stroke="#FFFFFF"
              strokeWidth="1.2"
            />

            <path
              className="blueprint-line"
              d="M176 226V157Q176 139 195 139Q214 139 214 157V226"
              stroke="#8CCBFF"
              strokeWidth=".8"
            />

            {/* Windows */}
            <path
              className="blueprint-line"
              d="M97 125H143V164H97ZM247 125H293V164H247ZM97 177H143V211H97ZM247 177H293V211H247Z"
              stroke="#8CCBFF"
              strokeWidth="1"
            />

            <path
              className="blueprint-line"
              d="M120 125V164M97 145H143M270 125V164M247 145H293M120 177V211M97 194H143M270 177V211M247 194H293"
              stroke="#FFFFFF"
              strokeOpacity=".45"
              strokeWidth=".65"
            />

            {/* Construction dimensions */}
            <path
              className="blueprint-line"
              d="M38 100V226M32 100H44M32 226H44M352 100V226M346 100H358M346 226H358"
              stroke="#FFFFFF"
              strokeOpacity=".5"
              strokeWidth=".7"
            />

            {/* Ground / datum */}
            <path
              className="blueprint-line"
              d="M25 245H365M195 12V3M188 12H202"
              stroke="#FEC73A"
              strokeOpacity=".85"
              strokeWidth=".8"
            />

            {/* Blueprint registration points */}
            <circle cx="78" cy="100" r="2" fill="#FEC73A" />
            <circle cx="312" cy="100" r="2" fill="#FEC73A" />
            <circle cx="195" cy="35" r="2.5" fill="#FEC73A" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="relative z-10 text-center">
          <div className="overflow-hidden">
            <h1 className="intro-word text-[clamp(27px,6vw,54px)] font-light tracking-[0.17em]">
              SHRI NORRIS<span className="text-[#FEC73A]">.</span>
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="intro-word mt-3 text-[9px] uppercase tracking-[0.42em] text-white/55 sm:text-[10px]">
              Architecture & Interiors
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="intro-meta mt-10 w-full max-w-[330px]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-[0.23em] text-white/45">
              Designing the extraordinary
            </span>

            <span className="font-mono text-[9px] text-[#FEC73A]">
              01 — 04
            </span>
          </div>

          <div className="h-px w-full origin-left overflow-hidden bg-white/20">
            <div className="loader-progress h-full w-full origin-left scale-x-0 bg-[#FEC73A]" />
          </div>
        </div>
      </div>

      {/* Bottom details */}
      <div className="intro-meta absolute bottom-7 left-6 right-6 flex items-end justify-between sm:bottom-9 sm:left-10 sm:right-10">
        <div className="space-y-1">
          <p className="text-[8px] uppercase tracking-[0.25em] text-white/50">
            Architecture with purpose
          </p>
          <p className="text-[8px] uppercase tracking-[0.25em] text-white/50">
            Aligarh, India
          </p>
        </div>

        <span className="text-[8px] uppercase tracking-[0.25em] text-white/40">
          Crafting spaces since 2001
        </span>
      </div>
    </div>
  );
}
