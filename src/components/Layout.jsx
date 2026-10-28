import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import WebsiteCounter from "../components/WebsiteCounter";
import VisitorCounter from "../components/VisitorCounter";
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  MoveUpRight,
  Eye,
  Building2,
  Plus,
  ArrowRight,
  ArrowDownRight,
  Mail
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/images/Shri Norris Architects Logo 1.webp";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Our Team", path: "/team" },
  { label: "Video", path: "/video" },
  { label: "Our Testimonials", path: "/testimonials" },
  { label: "Our Certificates", path: "/certificates" },
  { label: "Contact Us", path: "/contact" },
];

const nav = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Our Services", "/services"],
  ["Gallery", "/gallery"],
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
      <div className="studio-ticker">
        <div className="studio-ticker__track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="studio-ticker__group"
              aria-hidden={copy === 1}
            >
              <a href="tel:+918279646809" className="studio-ticker__item">
                <Phone size={13} />
                +91 82796 46809
              </a>

              <span className="studio-ticker__dot" />

              <span className="studio-ticker__item">
                <MapPin size={13} />
                Aligarh, Uttar Pradesh
              </span>

              <span className="studio-ticker__dot" />

              <span className="studio-ticker__item">
                Architecture &amp; Planning
              </span>

              <span className="studio-ticker__dot" />

              <span className="studio-ticker__item">Interior Design</span>

              <span className="studio-ticker__dot" />

              <span className="studio-ticker__item">
                Residential &amp; Commercial Projects
              </span>

              <span className="studio-ticker__dot" />

              <span className="studio-ticker__item">
                Crafting Excellence Since 2001
              </span>

              <span className="studio-ticker__dot" />
            </div>
          ))}
        </div>
      </div>

      <div className="container-shell flex min-h-[78px] items-center justify-between gap-4">
        <Link
          to="/"
          className="header-brand group flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="relative grid h-20 w-22 shrink-0 place-items-center overflow-hidden">
            <img
              src={logo}
              alt="Shri Norris Architects Logo"
              className="h-full w-full scale-[1.8] object-contain transition-transform duration-500 group-hover:scale-[1.7]"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-x-8 gap-y-3 xl:flex 2xl:gap-x-5">
          {nav.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `desktop-nav-link group relative whitespace-nowrap py-3 text-[1.5vw] font-medium tracking-[.035em] transition-colors duration-300 2xl:text-[11px] ${
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
            href="tel:+918279646809"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#002556",
            }}
            className="header-action group inline-flex items-center gap-3 px-4 py-3 text-[10px] font-semibold uppercase tracking-[.12em] !text-white transition-colors duration-300 hover:!bg-[#FEC73A] hover:!text-[#002556] 2xl:px-5"
          >
            <span>Let's talk</span>

            <ArrowUpRight
              size={15}
              className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
              href="tel:+918279646809"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#002556",
              }}
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
  const phoneNumber = "919876543210";
  const whatsappNumber = "919876543210";

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#002556] text-white"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Top CTA */}
      <div className="relative border-b border-white/20 px-5 py-16 sm:px-8 sm:py-20 lg:px-[5vw] lg:py-28">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#FEC73A]">
              <span className="h-2 w-2 rounded-full bg-[#FEC73A]" />
              Let's build something meaningful
            </p>

            <h2 className="text-[clamp(2.8rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.065em]">
              Have a vision?
              <br />
              <span className="text-[#FEC73A]">Let's create it.</span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="group inline-flex w-fit shrink-0 items-center gap-5 rounded-full border border-[#FEC73A]/70 px-6 py-4 text-sm font-medium transition-all duration-300 hover:border-[#FEC73A] hover:bg-[#FEC73A] hover:text-[#002556] sm:px-8"
          >
            Start a conversation
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FEC73A] text-[#002556] transition-transform duration-300 group-hover:rotate-[-45deg]">
              <ArrowUpRight size={19} />
            </span>
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:px-[5vw] lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link
            to="/"
            aria-label="Shri Norris Architects home"
            className="group inline-flex items-center gap-9"
          >
            {/* Circular Logo */}
            <span className="relative grid h-12 w-12 shrink-0 place-items-center sm:h-14 sm:w-14">
              {/* Animated outer ring */}
              <span className="absolute inset-0 rounded-full border border-[#FEC73A]/40 transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-[#FEC73A] group-hover:shadow-[0_0_24px_rgba(254,199,58,0.28)]" />

              {/* Logo container */}
              <span className="relative h-[85px] w-[85px] shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-white/10 transition-all duration-500 ease-out group-hover:rotate-[-8deg] group-hover:scale-105 group-hover:ring-[#FEC73A] sm:h-[76px] sm:w-[76px]">
                <img
                  src="/src/assets/images/Shri Norris Architects Logo 1.webp"
                  alt="Shri Norris Architects"
                  className="h-full w-full scale-[1.5] rounded-full object-contain  transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </span>
            </span>

            {/* Brand Name */}
            <span className="text-xl font-semibold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[#FEC73A] sm:text-2xl">
              SHRI NORRIS
              <span className="block text-xs font-normal tracking-[0.3em] text-white/65 transition-colors duration-300 group-hover:text-[#FEC73A]/80">
                ARCHITECTS
              </span>
            </span>
          </Link>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/65">
            Crafting architectural excellence since 2001. Thoughtful spaces,
            meaningful design and enduring architecture.
          </p>

          <div className="mt-8">
            <VisitorCounter />
          </div>
        </div>

        {/* Pages */}
        <div className="lg:col-span-3">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#FEC73A]">
            Explore
          </p>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-5 gap-y-1"
          >
            {footerLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="group flex items-center justify-between gap-2 border-b border-white/10 py-3 text-sm text-white/75 transition-colors duration-300 hover:border-[#FEC73A]/60 hover:text-[#FEC73A]"
              >
                <span>{label}</span>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#FEC73A]">
            Get in touch
          </p>

          <div className="space-y-5">
            <a
              href={`tel:+${+918279646809}`}
              className="group flex items-start gap-3 text-sm text-white/75 transition-colors hover:text-[#FEC73A]"
            >
              <Phone size={17} className="mt-0.5 shrink-0 text-[#FEC73A]" />
              <span>
                Call our studio
                <span className="mt-1 block text-xs text-white/45">
                  +918279646809
                </span>
              </span>
              <ArrowUpRight
                size={15}
                className="ml-auto shrink-0 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 text-sm text-white/75 transition-colors hover:text-[#FEC73A]"
            >
              <Mail
                size={17}
                className="mt-0.5 shrink-0 text-[#FEC73A]"
              />
              <span>
                Mail
                <span className="mt-1 block text-xs text-white/45">
                  Norrisarchitects0@gmail.com,
                  Info@shrinorrisarchitects.co.in,
                  sudheerkumaraligarh@gamil.com

                </span>
              </span>
              <ArrowUpRight
                size={15}
                className="ml-auto shrink-0 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 text-sm leading-6 text-white/75 transition-colors hover:text-[#FEC73A]"
            >
              <MapPin size={17} className="mt-1 shrink-0 text-[#FEC73A]" />
              <span>{studioAddress}</span>
              <ArrowUpRight
                size={15}
                className="mt-1 shrink-0 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>
          </div>
        </div>

        {/* Availability / note */}
        <div className="lg:col-span-2">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#FEC73A]">
            Our approach
          </p>

          <p className="text-2xl font-medium leading-snug tracking-tight">
            Designed with purpose.
            <span className="text-white/40"> Built to last.</span>
          </p>

          <Link
            to="/contact"
            className="group mt-6 inline-flex items-center gap-3 text-sm text-[#FEC73A]"
          >
            Work with us
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/15 px-5 sm:px-8 lg:px-[5vw]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Shri Norris Architects. All rights
            reserved.
          </p>

          <Link
            to="/"
            className="group inline-flex w-fit items-center gap-2 transition-colors hover:text-[#FEC73A]"
          >
            Crafted with intention
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
        href="tel:+918279646809"
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
        href="https://wa.me/918279646809"
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
