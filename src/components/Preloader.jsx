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
        defaults: { ease: "power2.out" },
        onComplete: () => onComplete?.(),
      });

      tl.fromTo(
        ".loader-brand",
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45 }
      )
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.inOut",
          },
          "-=0.1"
        )
        .fromTo(
          ".loader-caption",
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45 },
          "-=0.15"
        )
        .to(
          counter,
          {
            value: 100,
            duration: 0.9,
            ease: "power1.inOut",
            onUpdate: () => setProgress(Math.round(counter.value)),
          },
          "-=0.1"
        )
        .to(
          progressBarRef.current,
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power1.inOut",
          },
          "<"
        )
        .to({}, { duration: 0.15 })
        .to(loader, {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
        });
    }, loader);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex min-h-screen flex-col justify-between overflow-hidden bg-[#002556] px-6 py-7 text-white sm:px-10 sm:py-9 lg:px-16 lg:py-10"
      role="status"
      aria-label="Loading Shri Norris Architects"
    >
      {/* TOP BRANDING */}
      <div className="loader-brand flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-[0.18em] sm:text-base">
            SHRI NORRIS<span className="text-[#FEC73A]">.</span>
          </p>

          <p className="mt-1 text-[9px] tracking-[0.28em] text-white/55">
            ARCHITECTS
          </p>
        </div>

        <span className="text-[9px] tracking-[0.16em] text-white/55">
          EST. 2001
        </span>
      </div>

      {/* MINIMAL ARCHITECTURAL DRAWING */}
      <div className="flex flex-1 flex-col items-center justify-center py-10">
        <svg
          ref={houseRef}
          viewBox="0 0 160 160"
          fill="none"
          className="h-36 w-36 sm:h-44 sm:w-44"
          aria-hidden="true"
        >
          {/* Roof */}
          <path
            className="draw-path"
            d="M27 76 L80 31 L133 76"
            stroke="#FFFFFF"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Main building */}
          <path
            className="draw-path"
            d="M39 70 V120 H121 V70"
            stroke="#FFFFFF"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />

          {/* Door */}
          <path
            className="draw-path"
            d="M66 120 V88 H94 V120"
            stroke="#FEC73A"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Foundation */}
          <path
            className="draw-path"
            d="M23 128 H137"
            stroke="#FEC73A"
            strokeWidth="1.7"
            strokeLinecap="round"
          />

          {/* Windows */}
          <path
            className="draw-path"
            d="M49 84 H58 M102 84 H111"
            stroke="#FFFFFF"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        {/* LOADER TITLE */}
        <div className="loader-caption mt-8 text-center">
          <p className="text-[9px] tracking-[0.3em] text-[#FEC73A] sm:text-[10px]">
            SHRI NORRIS ARCHITECTS
          </p>

          <h1 className="mt-4 font-serif text-2xl font-light tracking-wide text-white sm:text-3xl">
            Architecture with intention.
          </h1>

          <p className="mt-3 text-[10px] tracking-[0.08em] text-white/55">
            Thoughtfully designed. Timelessly built.
          </p>
        </div>
      </div>

      {/* BOTTOM PROGRESS */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[9px] tracking-[0.18em] text-white/55">
            ALIGARH, INDIA
          </span>

          <span className="font-light tabular-nums text-white">
            <span className="text-lg">
              {String(progress).padStart(2, "0")}
            </span>
            <span className="ml-1 text-[10px] text-[#FEC73A]">%</span>
          </span>
        </div>

        <div className="h-px w-full overflow-hidden bg-white/20">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-[#FEC73A]"
          />
        </div>
      </div>
    </div>
  );
}