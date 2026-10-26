
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const loaderRef = useRef(null);
  const houseRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const house = houseRef.current;

    if (!loader || !house) return;

    const paths = house.querySelectorAll(".draw-path");
    const counter = { value: 0 };

    paths.forEach((path) => {
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          onComplete?.();
        },
      });

      tl.fromTo(
        ".loader-brand",
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 }
      )
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          "-=0.15"
        )
        .fromTo(
          ".loader-caption",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          "-=0.3"
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1.15,
            ease: "power1.inOut",
            onUpdate: () => {
              setProgress(Math.round(counter.value));
            },
          },
          "-=0.1"
        )
        .to(
          progressBarRef.current,
          {
            scaleX: 1,
            duration: 1.15,
            ease: "power1.inOut",
          },
          "<"
        )
        .to({}, { duration: 0.2 })
        .to(loader, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        });
    }, loader);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex min-h-screen flex-col justify-between overflow-hidden bg-[#002556] px-6 py-7 text-white sm:px-10 sm:py-9 lg:px-16 lg:py-10"
      aria-label="Loading Shri Norris Architects"
      role="status"
    >
      {/* Subtle background details */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-[#FEC73A]/[0.07] blur-[110px]" />

        <div className="absolute -bottom-40 -left-24 h-[350px] w-[350px] rounded-full bg-white/[0.04] blur-[100px]" />

        <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.06]" />
      </div>

      {/* Top branding */}
      <div className="loader-brand relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] sm:text-base">
            SHRI NORRIS
            <span className="text-[#FEC73A]">.</span>
          </p>

          <p className="mt-1 text-[9px] tracking-[0.32em] text-white/50">
            ARCHITECTS
          </p>
        </div>

        <span className="text-[9px] tracking-[0.2em] text-white/50 sm:text-[10px]">
          EST. 2001
        </span>
      </div>

      {/* Main animated emblem */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-10">
        <div className="relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64">
          <div className="absolute inset-0 rounded-full border border-white/10" />

          <div className="absolute inset-3 rounded-full border border-white/[0.06]" />

          <svg
            ref={houseRef}
            viewBox="0 0 160 160"
            fill="none"
            className="h-40 w-40 overflow-visible sm:h-48 sm:w-48"
            aria-hidden="true"
          >
            {/* Architectural roof */}
            <path
              className="draw-path"
              d="M27 76 L80 31 L133 76"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />

            {/* Main building */}
            <path
              className="draw-path"
              d="M39 70 V120 H121 V70"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="square"
            />

            {/* Architectural doorway */}
            <path
              className="draw-path"
              d="M66 120 V88 H94 V120"
              stroke="#FEC73A"
              strokeWidth="2.5"
              strokeLinecap="square"
            />

            {/* Horizontal foundation */}
            <path
              className="draw-path"
              d="M23 128 H137"
              stroke="#FEC73A"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Central roof detail */}
            <path
              className="draw-path"
              d="M80 31 V54"
              stroke="#FEC73A"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Window details */}
            <path
              className="draw-path"
              d="M49 84 H58 M102 84 H111"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Animated orbit dot */}
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FEC73A] shadow-[0_0_18px_#FEC73A]" />
          </div>
        </div>

        <div className="loader-caption mt-9 text-center">
          <p className="text-[10px] tracking-[0.38em] text-[#FEC73A] sm:text-xs">
            CREATING SPACES
          </p>

          <h1 className="mt-4 text-xl font-light tracking-[0.12em] sm:text-2xl">
            Architecture with intention.
          </h1>

          <p className="mt-3 text-[10px] tracking-[0.12em] text-white/45">
            Form · Function · Feeling
          </p>
        </div>
      </div>

      {/* Bottom progress */}
      <div className="relative z-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[9px] tracking-[0.22em] text-white/45">
              SHAPING WHAT COMES NEXT
            </p>

            <p className="mt-2 text-[10px] tracking-[0.16em] text-white/75">
              ALIGARH · INDIA
            </p>
          </div>

          <p className="font-light tabular-nums">
            <span className="text-2xl">{String(progress).padStart(2, "0")}</span>
            <span className="ml-1 text-xs text-[#FEC73A]">%</span>
          </p>
        </div>

        <div className="h-[2px] w-full overflow-hidden bg-white/15">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-[#FEC73A]"
          />
        </div>
      </div>
    </div>
  );
}
