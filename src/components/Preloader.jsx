
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const callbackRef = useRef(onComplete);

  callbackRef.current = onComplete;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => callbackRef.current?.(),
      });

      gsap.set(".blueprint-line", {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      });

      gsap.set(".blueprint-shape", {
        opacity: 0,
        scale: 0.95,
        transformOrigin: "center center",
      });

      gsap.set(".intro-word", {
        y: 18,
        opacity: 0,
      });

      gsap.set(".loader-progress", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      tl.to(".blueprint-shape", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          ".blueprint-line",
          {
            strokeDashoffset: 0,
            duration: 0.65,
            stagger: 0.025,
            ease: "power1.inOut",
          },
          "-=0.1"
        )
        .to(
          ".intro-word",
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          ".loader-progress",
          {
            scaleX: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.05"
        )
        .to({}, { duration: 0.1 })
        .to(".loader-content", {
          opacity: 0,
          y: -15,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(root.current, {
          yPercent: -100,
          duration: 0.45,
          ease: "power3.inOut",
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#002556] text-white"
    >
      {/* Main Content */}
      <div className="loader-content relative flex w-full max-w-[650px] flex-col items-center px-6">

        {/* Architectural Drawing */}
        <div className="blueprint-shape mb-[-12px] h-[190px] w-[260px] sm:h-[250px] sm:w-[350px]">
          <svg
            viewBox="0 0 390 280"
            fill="none"
            className="h-full w-full"
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

            <path
              className="blueprint-line"
              d="M78 226V100L195 35L312 100V226"
              stroke="url(#blueprintStroke)"
              strokeWidth="1.3"
            />

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
              strokeWidth=".8"
            />

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

            <path
              className="blueprint-line"
              d="M38 100V226M32 100H44M32 226H44M352 100V226M346 100H358M346 226H358"
              stroke="#FFFFFF"
              strokeOpacity=".5"
              strokeWidth=".7"
            />

            <path
              className="blueprint-line"
              d="M25 245H365M195 12V3M188 12H202"
              stroke="#FEC73A"
              strokeWidth=".8"
            />

            <circle cx="78" cy="100" r="2" fill="#FEC73A" />
            <circle cx="312" cy="100" r="2" fill="#FEC73A" />
            <circle cx="195" cy="35" r="2.5" fill="#FEC73A" />
          </svg>
        </div>

        {/* Brand */}
        <div className="relative z-10 text-center">
          <h1 className="intro-word text-[clamp(27px,6vw,52px)] font-light tracking-[0.17em]">
            SHRI NORRIS<span className="text-[#FEC73A]">.</span>
          </h1>

          <p className="intro-word mt-3 text-[9px] uppercase tracking-[0.4em] text-white/55 sm:text-[10px]">
            Architecture & Interiors
          </p>
        </div>

        {/* Progress */}
        <div className="mt-9 h-px w-full max-w-[250px] overflow-hidden bg-white/20">
          <div className="loader-progress h-full w-full bg-[#FEC73A]" />
        </div>

      </div>
    </div>
  );
}
