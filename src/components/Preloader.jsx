
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });

    timeline
      .fromTo(
        ".loader-brand",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        ".loader-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          transformOrigin: "left",
        },
        "-=0.2"
      )
      .fromTo(
        ".loader-caption",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.5"
      )
      .to(".loader-content", {
        y: -25,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
        delay: 0.35,
      })
      .to(".preloader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => timeline.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="preloader fixed inset-0 z-[9999] flex items-center justify-center bg-[#191916] text-[#F5F1E8]">
      <div className="loader-content w-[min(80%,420px)]">
        <div className="loader-brand text-center">
          <p className="font-serif text-4xl tracking-[0.18em] sm:text-6xl">
            NORRIS<span className="text-[#BBA477]">.</span>
          </p>
          <p className="mt-3 text-[10px] tracking-[0.35em] text-white/60">
            ARCHITECTS · ALIGARH
          </p>
        </div>

        <div className="mt-12 h-px w-full bg-white/20">
          <div className="loader-line h-full w-full bg-[#BBA477]" />
        </div>

        <p className="loader-caption mt-4 text-center text-[10px] tracking-[0.25em] text-white/60">
          CRAFTING SPACES SINCE 2001
        </p>
      </div>
    </div>
  );
}
