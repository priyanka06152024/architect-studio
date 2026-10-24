import { useEffect, useState } from "react";
import { Languages, Eye, ArrowUpRight } from "lucide-react";
import { PageIntro, CTASection } from "../components/Shared";
export function Counters() {
  const [visits, setVisits] = useState(1);
  useEffect(() => {
    try {
      const n = Number(localStorage.getItem("norris-visits") || 0) + 1;
      localStorage.setItem("norris-visits", String(n));
      setVisits(n);
    } catch {}
  }, []);
  return (
    <>
      <PageIntro
        eyebrow="Website information"
        title={
          <>
            A small window into our online{" "}
            <span className="italic text-[#9b815b]">studio.</span>
          </>
        }
        description="Simple counters for demonstration. A browser-based visit count is local to this device, not a real all-visitor website hit counter."
      />
      <section className="container-shell pb-20">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="border border-[var(--line)] p-8 md:p-10">
            <Eye size={24} className="text-[#9b815b]" />
            <p className="eyebrow mt-7">Local page visits</p>
            <p className="font-display mt-3 text-6xl font-semibold tracking-tight">
              {String(visits).padStart(2, "0")}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#777970]">
              Counts page loads in this browser only. Clearing browser storage
              resets the number.
            </p>
          </div>
          <div className="border border-[var(--line)] p-8 md:p-10">
            <Languages size={24} className="text-[#9b815b]" />
            <p className="eyebrow mt-7">Language support</p>
            <h2 className="font-display mt-3 text-3xl font-semibold">
              English · हिन्दी
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#777970]">
              Use the language switcher to choose a language. Full translation
              requires translated page content or a translation service.
            </p>
            <a
              href="https://translate.google.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Open Google Translate <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <p className="mt-5 text-xs leading-6 text-[#777970]">
          For a real site-wide visitor hit counter, connect an analytics service
          or server-side database. Do not present the local counter as total
          website traffic.
        </p>
      </section>
      <CTASection />
    </>
  );
}
export function Language() {
  const [lang, setLang] = useState("English");
  return (
    <>
      <PageIntro
        eyebrow="Language preferences"
        title={
          <>
            A website that feels welcoming to{" "}
            <span className="italic text-[#9b815b]">everyone.</span>
          </>
        }
        description="Choose your preferred language. The current starter includes a language preference control; complete translated copy can be added when approved."
      />
      <section className="container-shell pb-20">
        <div className="max-w-2xl border border-[var(--line)] p-6 md:p-10">
          <Languages size={28} className="text-[#9b815b]" />
          <p className="eyebrow mt-7">Select language</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["English", "हिन्दी"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`border p-5 text-left transition ${lang === l ? "border-[#252724] bg-[#252724] text-white" : "border-[var(--line)] hover:border-[#252724]"}`}
              >
                <span className="block text-lg font-semibold">{l}</span>
                <span
                  className={`mt-2 block text-xs ${lang === l ? "text-white/60" : "text-[#777970]"}`}
                >
                  {lang === l ? "Currently selected" : "Choose language"}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-[#777970]">
            Selected: <strong className="text-[#252724]">{lang}</strong>. This
            preference changes the selection only. To translate all content,
            provide reviewed English and Hindi copy or integrate a translation
            provider.
          </p>
          <a
            href="https://translate.google.com/"
            target="_blank"
            rel="noreferrer"
            className="btn-outline mt-5 w-fit"
          >
            Open translation tool <ArrowUpRight size={15} />
          </a>
        </div>
      </section>
      <CTASection />
    </>
  );
}
