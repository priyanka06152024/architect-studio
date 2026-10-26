import { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Check,
  MessageCircle,
  MoveUpRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {handleWhatsAppEnquiry} from "../components/Shared.jsx";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Architectural consultation",
  "Architectural design",
  "Interior design",
  "Planning and zoning approval assistance",
  "Site master planning",
  "Supervision of design execution",
  "Residence architect",
  "Commercial architect",
  "House design architect",
  "Other",
];

export default function Contact() {
  const pageRef = useRef(null);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Architectural design",
    message: "",
  });

  const update = (e) => {
    setSent(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\nMessage: ${form.message}`;
    const url = `https://wa.me/910000000000?text=${encodeURIComponent(body)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      intro
        .from(".contact-topline > *", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
        })
        .from(
          ".contact-title-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .from(
          ".contact-hero-bottom > *",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.45",
        );

      gsap.from(".contact-info", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-layout",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".contact-form-panel", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-layout",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".contact-detail", {
        x: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-details",
          start: "top 85%",
          once: true,
        },
      });
    }, page);

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(frame);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#FFFFFF] text-[#002556]">
      {/* CINEMATIC HERO */}
      <section className="relative flex min-h-[78svh] flex-col justify-between overflow-hidden bg-[#002556] px-5 pb-8 pt-32 text-[#FFFFFF] sm:px-8 sm:pb-10 sm:pt-36 lg:min-h-[86svh] lg:px-14 lg:pb-12 lg:pt-40">
        <div className="pointer-events-none absolute -right-24 top-[18%] size-[300px] rounded-full border border-white/[0.07] sm:size-[460px] lg:size-[620px]" />
        <div className="pointer-events-none absolute -right-10 top-[25%] size-[200px] rounded-full border border-white/[0.07] sm:size-[340px] lg:size-[470px]" />

        <div className="contact-topline relative z-10 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.23em] text-[#FEC73A] sm:text-xs">
            Shri Norris Architects
          </p>

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 sm:text-xs">
            New project / Get in touch
          </p>
        </div>

        <div className="relative z-10 py-16 sm:py-20 lg:py-24">
          <p className="mb-6 text-[10px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
            Let's talk about your project
          </p>

          <h1 className="font-serif text-[clamp(3.7rem,11vw,10rem)] leading-[0.85] tracking-[-0.065em]">
            <span className="block overflow-hidden pb-2">
              <span className="contact-title-line block">Have a space</span>
            </span>

            <span className="block overflow-hidden pb-2">
              <span className="contact-title-line block">in mind?</span>
            </span>

            <span className="block overflow-hidden pb-2">
              <span className="contact-title-line block italic text-[#FEC73A] pb-3">
                Let's begin.
              </span>
            </span>
          </h1>
        </div>

        <div className="contact-hero-bottom relative z-10 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:pt-8">
          <p className="max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            Tell us a little about what you're planning. We'll use your brief to
            understand the project and the support you need.
          </p>

          <a
            href="#contact-details"
            className="group inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#FEC73A] sm:text-xs"
          >
            Start a conversation
            <span className="flex size-10 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
              <ArrowDown size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>

      {/* CONTACT DETAILS + ENQUIRY FORM */}
      <section
        id="contact-details"
        className="px-5 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-32"
      >
        <div className="contact-layout grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 xl:gap-24">
          {/* STUDIO INFORMATION */}
          <aside className="contact-info">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#002556]/65 sm:text-xs">
              01 — Visit or get in touch
            </p>

            <h2 className="max-w-lg font-serif text-4xl leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Let's make
              <br />
              something
              <br />
              <span className="italic text-[#002556]/65">meaningful.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#002556]/60 sm:text-base sm:leading-8">
              Shri Norris Architects
            </p>

            <div className="contact-details mt-10 border-t border-[#002556]/20">
              {/* ADDRESS */}
              <div className="contact-detail group flex gap-4 border-b border-[#002556]/15 py-6 sm:gap-5 sm:py-7">
                <div className="flex size-11 shrink-0 items-center justify-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                  <MapPin size={19} strokeWidth={1.3} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#002556]/55">
                    Studio address
                  </p>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#002556]/80">
                    Shop No. 3, Ground Floor, Opposite Bharat Petroleum
                    Corporation Limited, Kishanpur Tiraha, Avantika Phase 2,
                    Ramghat Road, Aligarh, Uttar Pradesh 202001.
                  </p>

                  <a
                    href="https://maps.google.com/?q=Kishanpur+Tiraha+Ramghat+Road+Aligarh+Uttar+Pradesh+202001"
                    target="_blank"
                    rel="noreferrer"
                    className="group/link mt-4 inline-flex items-center gap-2 text-xs font-medium transition-colors duration-300 hover:text-[#b38600]"
                  >
                    Open in Google Maps
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="contact-detail group flex gap-4 border-b border-[#002556]/15 py-6 sm:gap-5 sm:py-7">
                <div className="flex size-11 shrink-0 items-center justify-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                  <Phone size={18} strokeWidth={1.3} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#002556]/55">
                    Call the studio
                  </p>

                  <a
                    href="tel:+910000000000"
                    className="mt-3 inline-block text-sm transition-colors duration-300 hover:text-[#b38600]"
                  >
                    +918279646809,+918171646809 
                  </a>
                </div>
              </div>

              {/* EMAIL */}
              <div className="contact-detail group flex gap-4 border-b border-[#002556]/15 py-6 sm:gap-5 sm:py-7">
                <div className="flex size-11 shrink-0 items-center justify-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                  <Mail size={18} strokeWidth={1.3} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#002556]/55">
                    Email
                  </p>

                  <p className="mt-3 text-sm text-[#002556]/70">
                    Shop No. 3, Ground Floor, Ramghat Road, opposite BPCL
                    Housing Complex, near Kishanpur Tiraha, Kishanpur, Avantika
                    Phase 2, ADA Colony, Aligarh, Uttar Pradesh 202001
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="contact-detail group flex gap-4 border-b border-[#002556]/15 py-6 sm:gap-5 sm:py-7">
                <div className="flex size-11 shrink-0 items-center justify-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                  <Clock size={18} strokeWidth={1.3} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#002556]/55">
                    Office hours
                  </p>

                  <p className="mt-3 text-sm text-[#002556]/70">
                    Monday to Sunday, 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* SMALL STUDIO NOTE */}
            <div className="mt-8 flex items-center gap-3 text-xs text-[#002556]/60">
              <span className="size-2 rounded-full bg-[#FEC73A]" />
              We look forward to hearing about your project.
            </div>
          </aside>

          {/* ENQUIRY FORM */}
          <div className="contact-form-panel relative bg-[#002556]/[0.045] p-5 sm:p-8 md:p-10 lg:p-10 xl:p-12">
            <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#002556]/15 pb-7 sm:mb-10 sm:pb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#002556]/65 sm:text-xs">
                  02 — Project enquiry
                </p>

                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  Tell us what
                  <br />
                  you're planning.
                </h2>
              </div>

              <div className="flex size-11 shrink-0 items-center justify-center border border-[#002556]/15 sm:size-12">
                <MoveUpRight size={19} strokeWidth={1.2} />
              </div>
            </div>

            <form onSubmit={submit}>
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 sm:gap-y-7">
                <label className="block text-xs font-medium">
                  Your name <span className="text-[#b38600]">*</span>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={update}
                    className="mt-2 w-full border-0 border-b border-[#002556]/25 bg-transparent px-0 py-3 text-sm outline-none transition-all duration-300 placeholder:text-[#002556]/40 hover:border-[#FEC73A] focus:border-b-2 focus:border-[#FEC73A] focus:ring-0"
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </label>

                <label className="block text-xs font-medium">
                  Phone number <span className="text-[#b38600]">*</span>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    className="mt-2 w-full border-0 border-b border-[#002556]/25 bg-transparent px-0 py-3 text-sm outline-none transition-all duration-300 placeholder:text-[#002556]/40 hover:border-[#FEC73A] focus:border-b-2 focus:border-[#FEC73A] focus:ring-0"
                    placeholder="Your phone number"
                    type="tel"
                    autoComplete="tel"
                  />
                </label>

                <label className="block text-xs font-medium sm:col-span-2">
                  Email address
                  <input
                    name="email"
                    value={form.email}
                    onChange={update}
                    className="mt-2 w-full border-0 border-b border-[#002556]/25 bg-transparent px-0 py-3 text-sm outline-none transition-all duration-300 placeholder:text-[#002556]/40 hover:border-[#FEC73A] focus:border-b-2 focus:border-[#FEC73A] focus:ring-0"
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </label>

                <label className="block text-xs font-medium sm:col-span-2">
                  Service required
                  <select
                    name="service"
                    value={form.service}
                    onChange={update}
                    className="mt-2 w-full cursor-pointer border-0 border-b border-[#002556]/25 bg-transparent px-0 py-3 text-sm outline-none transition-all duration-300 hover:border-[#FEC73A] focus:border-[#FEC73A] focus:ring-0"
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-xs font-medium sm:col-span-2">
                  Tell us about your project{" "}
                  <span className="text-[#b38600]">*</span>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={update}
                    rows={4}
                    className="mt-2 w-full resize-y border-0 border-b border-[#002556]/25 bg-transparent px-0 py-3 text-sm leading-7 outline-none transition-all duration-300 placeholder:text-[#002556]/40 hover:border-[#FEC73A] focus:border-b-2 focus:border-[#FEC73A] focus:ring-0"
                    placeholder="Location, project type, timeline or anything helpful..."
                  />
                </label>
              </div>

              <button
                className="group mt-8 flex min-h-14 w-full items-center justify-between gap-4 bg-[#002556] px-5 py-4 text-left text-xs text-white transition-all duration-300 hover:bg-[#FEC73A] hover:text-[#002556] sm:px-6 sm:text-sm"
                type="submit"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle size={17} strokeWidth={1.4} />
                  Send enquiry via WhatsApp
                </span>

                <span className="flex size-8 shrink-0 items-center justify-center border border-current/25 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={1.4} />
                </span>
              </button>

              {sent && (
                <p
                  role="status"
                  className="mt-4 flex items-start gap-2 text-xs leading-6 text-[#002556]"
                >
                  <Check size={15} className="mt-1 shrink-0 text-[#b38600]" />
                  WhatsApp should open with your enquiry details. Send the
                  message there to complete your enquiry.
                </p>
              )}

              <p className="mt-5 text-[10px] leading-5 text-[#002556]/55">
                This form opens WhatsApp and does not store submissions. Replace
                the placeholder WhatsApp number before publishing.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}


