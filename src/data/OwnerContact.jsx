
import { useLayoutEffect, useRef } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OwnerContact() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".owner-reveal",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".owner-photo",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const phone = "YOUR_PHONE_NUMBER";
  const email = "YOUR_EMAIL_ADDRESS";
  const address = "Aligarh, Uttar Pradesh, India";
  const phoneDigits = phone.replace(/\D/g, "");

  const contactRows = [
    {
      label: "Call our studio",
      value: phone,
      icon: Phone,
      href: `tel:${phone}`,
    },
    {
      label: "Email enquiries",
      value: email,
      icon: Mail,
      href: `mailto:${email}`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="Contact Shri Norris Architects"
      className="relative overflow-hidden bg-[#F7F5EF] px-5 py-16 text-[#002556] sm:px-8 sm:py-20 lg:px-[7vw] lg:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section heading */}
        <div className="owner-reveal mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#002556]/15 pb-5 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#FEC73A]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
              Personal connection · Est. 2001
            </span>
          </div>

          <span className="text-[9px] uppercase tracking-[0.16em] text-[#002556]/45">
            Aligarh, India
          </span>
        </div>

        {/* Main editorial layout */}
        <div className="grid items-center gap-10 md:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          {/* Portrait */}
          <div className="owner-reveal relative mx-auto w-full max-w-[390px] md:mx-0">
            <div className="owner-photo relative aspect-[4/4.5] overflow-hidden bg-[#E8E3D8]">
              <img
                src="/images/owner.jpg"
                alt="Sudhir Kumar, owner of Shri Norris Architects"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#002556]/75 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#FEC73A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FEC73A]" />
                  The founder's desk
                </span>

                <h3 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                  Sudhir Kumar
                </h3>

                <p className="mt-1 text-xs text-white/75">
                  Owner · Shri Norris Architects
                </p>
              </div>
            </div>

            {/* Small architectural accent */}
            <div className="pointer-events-none absolute -bottom-3 -right-3 -z-0 h-16 w-16 border-b-2 border-r-2 border-[#FEC73A] sm:-bottom-4 sm:-right-4 sm:h-20 sm:w-20" />

            <p className="mt-5 max-w-xs text-[10px] leading-5 tracking-wide text-[#002556]/55">
              Thoughtful spaces begin with listening, understanding and a
              shared vision.
            </p>
          </div>

          {/* Contact content */}
          <div className="min-w-0">
            <p className="owner-reveal text-[10px] font-medium uppercase tracking-[0.2em] text-[#8A6B2D]">
              Let's discuss your next project
            </p>

            <h2 className="owner-reveal mt-4 font-serif text-4xl font-normal leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              Great spaces
              <br />
              start with a{" "}
              <span className="italic text-[#8A6B2D]">conversation.</span>
            </h2>

            <p className="owner-reveal mt-5 max-w-xl text-sm leading-7 text-[#002556]/65 sm:text-base sm:leading-8">
              Planning a home, transforming a space or exploring a new
              architectural idea? Tell us what you have in mind. We would
              love to understand your vision.
            </p>

            {/* Contact rows */}
            <div className="owner-reveal mt-7 border-t border-[#002556]/15">
              {contactRows.map(({ label, value, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex min-w-0 items-center justify-between gap-3 border-b border-[#002556]/15 py-4 transition-colors duration-300 hover:bg-white/60 sm:gap-5 sm:px-3"
                >
                  <span className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                      <Icon size={17} strokeWidth={1.5} />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[9px] uppercase tracking-[0.16em] text-[#002556]/50">
                        {label}
                      </span>
                      <span className="mt-1 block break-words text-xs sm:text-sm">
                        {value}
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              ))}

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-[#002556]/15 py-4 transition-colors duration-300 hover:bg-white/60 sm:px-3"
              >
                <span className="flex items-center gap-3 sm:gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#002556]/15 transition-all duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A]">
                    <MapPin size={17} strokeWidth={1.5} />
                  </span>

                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.16em] text-[#002556]/50">
                      Find our studio
                    </span>
                    <span className="mt-1 block text-xs sm:text-sm">
                      {address}
                    </span>
                  </span>
                </span>

                <ArrowUpRight
                  size={18}
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* CTA buttons */}
            <div className="owner-reveal mt-6 flex flex-wrap items-center gap-3">
              <a
                href={
                  phoneDigits
                    ? `https://wa.me/${phoneDigits}`
                    : "#contact"
                }
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  if (!phoneDigits) event.preventDefault();
                }}
                className="group inline-flex items-center justify-center gap-3 bg-[#002556] px-5 py-4 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#FEC73A] hover:text-[#002556]"
              >
                <MessageCircle size={16} />
                Start a conversation
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <span className="text-[9px] uppercase tracking-[0.14em] text-[#002556]/45">
                Architecture · Interiors · Design
              </span>
            </div>
          </div>
        </div>

        {/* Compact footer */}
        <div className="owner-reveal mt-14 flex flex-col gap-2 border-t border-[#002556]/15 pt-4 text-[9px] uppercase tracking-[0.16em] text-[#002556]/50 sm:flex-row sm:items-center sm:justify-between">
          <span>Shri Norris Architects</span>
          <span>Designed with intention. Built for life.</span>
        </div>
      </div>
    </section>
  );
}
