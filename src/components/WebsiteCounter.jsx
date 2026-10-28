
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 120, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Design Commitment" },
];

export default function WebsiteCounter() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#002556] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-[7vw]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#FEC73A]">
              Our journey in numbers
            </p>
            <h2 className="max-w-xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Built on trust.
              <br />
              <span className="text-[#FEC73A]">Defined by design.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/65">
            Every project reflects our commitment to thoughtful planning,
            functional spaces and architectural excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 border-l border-t border-white/20 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group border-b border-r border-white/20 p-5 transition-colors duration-500 hover:bg-white/[0.06] sm:p-8 lg:p-10"
            >
              <span className="mb-8 block text-xs text-white/40">
                0{index + 1}
              </span>

              <div className="mb-3 text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                <span>
                  {started ? stat.value : 0}
                </span>
                <span className="text-[#FEC73A]">{stat.suffix}</span>
              </div>

              <p className="text-xs uppercase tracking-[0.12em] text-white/65 sm:text-sm">
                {stat.label}
              </p>

              <div className="mt-7 h-px w-8 bg-[#FEC73A] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
