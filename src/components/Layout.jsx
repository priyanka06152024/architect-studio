import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  MoveUpRight,
  Plus,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/images/Shri Norris Architects Logo 1.webp"

gsap.registerPlugin(ScrollTrigger);

const nav = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Our Services", "/services"],
  ["Gallery", "/gallery"],
  ["Video", "/video"],
  ["Our Team", "/team"],
  ["Certificates", "/certificates"],
  ["Testimonials", "/testimonials"],
  ["Contact Us", "/contact"],
];

const studioAddress =
  "Shop No. 3, Ground Floor, Opposite Bharat Petroleum, Kishanpur Tiraha, Avantika Phase 2, Ramghat Road, Aligarh, Uttar Pradesh 202001.";

const gold = "#FEC73A";
const ink = "#002556";
const paper = "#FFFFFF";

export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-brand", {
        y: -18,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".desktop-nav-link", {
        y: -12,
        opacity: 0,
        duration: 0.55,
        stagger: 0.045,
        delay: 0.12,
        ease: "power3.out",
      });

      gsap.from(".header-action", {
        x: 18,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!open || !menuRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".mobile-nav-link",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.045,
          duration: 0.35,
          delay: 0.08,
          ease: "power2.out",
        },
      );
    }, menuRef);

    return () => ctx.revert();
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-[#002556]/10 bg-[#FFFFFF]"
    >
      <div className="container-shell flex min-h-[78px] items-center justify-between gap-4">
        <Link
  to="/"
  className="header-brand group flex shrink-0 items-center gap-3"
  onClick={() => setOpen(false)}
>
  <span className="relative grid h-17 w-20 shrink-0 place-items-center overflow-hidden">
    <img
      src={logo}
      alt="Shri Norris Architects Logo"
      className="h-full w-full scale-[2.2] object-contain transition-transform duration-500 group-hover:scale-[1.7]"
    />
  </span>
</Link>

        <nav className="hidden items-center gap-x-4 gap-y-2 xl:flex 2xl:gap-x-5">
          {nav.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `desktop-nav-link group relative whitespace-nowrap py-3 text-[10px] font-medium tracking-[.035em] transition-colors duration-300 2xl:text-[11px] ${
                  isActive
                    ? "text-[#002556]"
                    : "text-[#002556]/70 hover:text-[#002556]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute bottom-1 left-0 h-px bg-[#FEC73A] transition-all duration-400 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

    <div className="hidden xl:block">
  <a
    href="tel:+910000000000"
    style={{
      color: "#FFFFFF",
      backgroundColor: "#002556",
    }}
    className="header-action group inline-flex items-center gap-3 px-4 py-3 text-[10px] font-semibold uppercase tracking-[.12em] transition-colors duration-300 hover:!bg-[#FEC73A] hover:!text-[#002556] 2xl:px-5"
  >
    <span>Let's talk</span>

    <ArrowUpRight
      size={15}
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    />
  </a>
</div>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center border border-[#002556]/20 transition duration-300 hover:border-[#002556] hover:bg-[#002556] hover:text-[#FFFFFF] xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          <span className="transition-transform duration-300">
            {open ? <X size={20} /> : <Menu size={20} />}
          </span>
        </button>
      </div>

      {open && (
        <nav
          ref={menuRef}
          className="overflow-hidden border-t border-[#002556]/10 bg-[#FFFFFF] xl:hidden"
        >
          <div className="container-shell pb-6 pt-3">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[.22em] text-[#002556]">
                Navigation / Explore
              </span>
              <span className="font-display text-xs text-[#002556]/55">
                SN — 01
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-5">
              {nav.map(([label, to], index) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `mobile-nav-link group flex items-center justify-between gap-2 border-t border-[#002556]/10 py-4 text-sm transition-colors duration-300 ${
                      isActive
                        ? "font-semibold text-[#002556]"
                        : "text-[#002556]/75 hover:text-[#002556]"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-[#b38600]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </span>
                  <MoveUpRight
                    size={14}
                    className="shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </NavLink>
              ))}
            </div>

            <a
              href="tel:+910000000000"
              className="mt-5 flex items-center justify-between bg-[#002556] px-5 py-4 text-sm text-white transition-colors duration-300 hover:bg-[#FEC73A] hover:text-[#002556]"
            >
              <span>Let's discuss your project</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".footer-bottom", {
        opacity: 0,
        y: 12,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "bottom bottom",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative mt-0 overflow-hidden bg-[#002556] text-[#FFFFFF]"
    >
      {/* Decorative architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 80%, transparent)",
        }}
      />

      <div className="container-shell relative">
        {/* Large editorial CTA */}
        <div className="footer-reveal border-b border-white/15 py-16 sm:py-20 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="flex items-center gap-3 text-[10px] uppercase tracking-[.24em] text-[#FEC73A]">
                <span className="h-px w-8 bg-[#FEC73A]" />
                Thoughtfully designed since 2001
              </p>

              <h2 className="mt-7 max-w-4xl font-display text-[clamp(2.8rem,7.5vw,6.8rem)] font-medium leading-[.94] tracking-[-.065em]">
                Let's make room
                <br />
                for something{" "}
                <span className="font-normal italic text-[#FEC73A]">
                  meaningful.
                </span>
              </h2>
            </div>

            <Link
              to="/contact"
              className="group relative flex h-24 w-24 items-center justify-center self-start rounded-full border border-white/25 transition-all duration-500 hover:rotate-[-35deg] hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] sm:h-28 sm:w-28 lg:self-end"
              aria-label="Start a conversation"
            >
              <ArrowUpRight
                size={31}
                strokeWidth={1.2}
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute -bottom-7 whitespace-nowrap text-[9px] uppercase tracking-[.16em] text-white/55">
                Start a project
              </span>
            </Link>
          </div>

          <Link
            className="group mt-10 inline-flex items-center gap-3 border-b border-[#FEC73A]/50 pb-2 text-xs uppercase tracking-[.15em] text-[#FEC73A] transition-colors duration-300 hover:border-white hover:text-white"
            to="/contact"
          >
            Start a conversation
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Footer columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 md:gap-10 md:py-16 lg:grid-cols-[1.1fr_.8fr_1fr]">
          <div className="footer-reveal">
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center border border-white/40 font-display text-2xl transition-colors duration-300 group-hover:border-[#FEC73A] group-hover:bg-[#FEC73A] group-hover:text-[#002556]">
                N<span className="text-[#FEC73A]">.</span>
              </span>
              <span>
                <span className="block font-display text-sm font-bold tracking-[.12em]">
                  SHRI NORRIS
                </span>
                <span className="mt-1.5 block text-[9px] tracking-[.23em] text-white/50">
                  ARCHITECTS · ALIGARH
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/55">
              Thoughtful architecture, considered interiors and spaces shaped
              around the way people live.
            </p>

            <div className="mt-7 flex gap-2">
              <a
                aria-label="Call the studio"
                className="group grid h-11 w-11 place-items-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556]"
                href="tel:+910000000000"
              >
                <Phone size={16} />
              </a>
              <a
                aria-label="Contact on WhatsApp"
                className="group grid h-11 w-11 place-items-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556]"
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} />
              </a>
              <a
                aria-label="Instagram"
                className="group grid h-11 w-11 place-items-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556]"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div className="footer-reveal">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-[#FEC73A]">
              <span className="h-1 w-1 rounded-full bg-[#FEC73A]" />
              Explore
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-0">
              {nav.slice(1).map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="group flex items-center justify-between gap-1 border-b border-white/10 py-3 text-[12px] text-white/60 transition-colors duration-300 hover:text-[#FEC73A]"
                >
                  <span>{label}</span>
                  <Plus
                    size={12}
                    className="shrink-0 opacity-0 transition-all duration-300 group-hover:rotate-90 group-hover:opacity-100"
                  />
                </Link>
              ))}

              <Link
                to="/counters"
                className="border-b border-white/10 py-3 text-[12px] text-white/60 transition-colors hover:text-[#FEC73A]"
              >
                Website Counter
              </Link>
              <Link
                to="/counters"
                className="border-b border-white/10 py-3 text-[12px] text-white/60 transition-colors hover:text-[#FEC73A]"
              >
                Visitor Hit Counter
              </Link>
              <Link
                to="/language"
                className="border-b border-white/10 py-3 text-[12px] text-white/60 transition-colors hover:text-[#FEC73A]"
              >
                Language
              </Link>
            </div>
          </div>

          <div className="footer-reveal">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-[#FEC73A]">
              <span className="h-1 w-1 rounded-full bg-[#FEC73A]" />
              Visit our studio
            </p>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              {studioAddress}
            </p>

            <a
              href="https://maps.google.com/?q=Kishanpur+Tiraha+Ramghat+Road+Aligarh+Uttar+Pradesh+202001"
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-2 border-b border-white/20 pb-2 text-[11px] uppercase tracking-[.12em] text-[#FEC73A] transition-colors hover:border-[#FEC73A] hover:text-white"
            >
              Get directions
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="footer-bottom flex flex-col justify-between gap-4 border-t border-white/15 py-6 text-[10px] tracking-[.04em] text-white/45 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Shri Norris Architects. All rights
            reserved.
          </span>

          <span className="uppercase tracking-[.15em]">
            Architecture <span className="mx-1 text-[#FEC73A]">·</span>
            Interiors <span className="mx-1 text-[#FEC73A]">·</span>
            Planning
          </span>

          <Link
            to="/"
            className="group flex items-center gap-2 self-start transition-colors hover:text-[#FEC73A] sm:self-auto"
          >
            Back to beginning
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const actionsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".floating-action", {
        scale: 0.5,
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.12,
        delay: 1,
        ease: "back.out(1.7)",
      });
    }, actionsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={actionsRef}
      className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-7 sm:right-7"
    >
      <a
        href="tel:+910000000000"
        aria-label="Call now"
        className="floating-action group relative grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-[#002556] text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#FEC73A] hover:text-[#002556] sm:h-[50px] sm:w-[50px]"
      >
        <Phone
          size={18}
          className="transition-transform duration-300 group-hover:rotate-[-12deg]"
        />
        <span className="pointer-events-none absolute right-[calc(100%+10px)] translate-x-2 whitespace-nowrap bg-[#002556] px-3 py-2 text-[10px] uppercase tracking-[.12em] text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Call studio
        </span>
      </a>

      <a
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp now"
        className="floating-action group relative grid h-12 w-12 place-items-center rounded-full bg-[#FEC73A] text-[#002556] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white sm:h-[50px] sm:w-[50px]"
      >
        <MessageCircle
          size={19}
          className="transition-transform duration-300 group-hover:rotate-[-8deg]"
        />
        <span className="pointer-events-none absolute right-[calc(100%+10px)] translate-x-2 whitespace-nowrap bg-[#FEC73A] px-3 py-2 text-[10px] uppercase tracking-[.12em] text-[#002556] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          WhatsApp
        </span>
      </a>
    </div>
  );
}

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
