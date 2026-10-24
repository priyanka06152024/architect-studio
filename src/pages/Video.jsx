import { Play, ArrowUpRight } from "lucide-react";
import { PageIntro, CTASection } from "../components/Shared";
export default function Video() {
  return (
    <>
      <PageIntro
        eyebrow="Watch & explore"
        title={
          <>
            Spaces are best understood in{" "}
            <span className="italic text-[#9b815b]">motion.</span>
          </>
        }
        description="A place for project walkthroughs, design stories and behind-the-scenes moments from the studio."
      />
      <section className="container-shell pb-20">
        <div className="image-zoom relative aspect-video">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90"
            alt="Architectural video cover"
          />
          <div className="absolute inset-0 grid place-items-center bg-black/15">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#f5f2eb] text-[#252724] transition hover:scale-110">
              <Play size={22} fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex flex-col justify-between gap-2 text-white sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[.2em]">
                Featured film · Coming soon
              </p>
              <h2 className="font-display mt-2 text-2xl font-semibold">
                A closer look at considered spaces
              </h2>
            </div>
            <span className="text-xs">Studio / 01</span>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border-t border-[var(--line)] pt-5">
            <p className="eyebrow">01 / Project walkthrough</p>
            <h3 className="font-display mt-3 text-xl font-semibold">
              Explore the details
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#777970]">
              Add an embedded YouTube or Vimeo video here when the firm's
              official project film is ready.
            </p>
          </div>
          <div className="border-t border-[var(--line)] pt-5">
            <p className="eyebrow">02 / Behind the scenes</p>
            <h3 className="font-display mt-3 text-xl font-semibold">
              Ideas in progress
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#777970]">
              Share the process, material choices and thinking behind each
              project.
            </p>
          </div>
        </div>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className="btn-outline mt-8 w-fit"
        >
          Visit video channel <ArrowUpRight size={15} />
        </a>
      </section>
      <CTASection />
    </>
  );
}
