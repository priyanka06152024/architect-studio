import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  
} from "lucide-react";

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
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[#f5f2eb]/95 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between gap-5">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center border border-[#252724] font-display text-lg font-semibold">
            N<span className="text-[#9b815b]">.</span>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[13px] font-extrabold tracking-[.09em]">
              SHRI NORRIS
            </span>
            <span className="mt-1 block text-[9px] tracking-[.24em] text-[#777970]">
              ARCHITECTS · ALIGARH
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex">
          {nav.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <a className="btn-primary !px-4 !py-3" href="tel:+910000000000">
            Let's talk <ArrowUpRight size={15} />
          </a>
        </div>
        <button
          className="grid h-10 w-10 place-items-center border border-[var(--line)] xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu container-shell grid grid-cols-2 gap-1 pb-5 xl:hidden">
          {nav.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border-b border-[var(--line)] py-3 text-sm ${isActive ? "font-bold" : "text-[#777970]"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="bg-[#252724] text-[#f5f2eb]">
      <div className="container-shell py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <p className="eyebrow !text-[#d8c8ae]">
              Thoughtfully designed since 2001
            </p>
            <h2 className="font-display mt-4 max-w-md text-4xl font-medium leading-tight tracking-[-.05em] md:text-5xl">
              Let's make room for something meaningful.
            </h2>
            <Link
              className="btn-outline mt-6 !border-white/30 !text-white hover:!bg-[#d8c8ae] hover:!text-[#252724]"
              to="/contact"
            >
              Start a conversation <ArrowUpRight size={15} />
            </Link>
          </div>
          <div>
            <p className="eyebrow !text-[#d8c8ae]">Explore</p>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/70">
              {nav.slice(1).map(([label, to]) => (
                <Link key={to} to={to} className="transition hover:text-white">
                  {label}
                </Link>
              ))}
              <Link to="/counters" className="transition hover:text-white">
                Website Counter
              </Link>
              <Link to="/counters" className="transition hover:text-white">
                Visitor Hit Counter
              </Link>
              <Link to="/language" className="transition hover:text-white">
                Language
              </Link>
            </div>
          </div>
          <div>
            <p className="eyebrow !text-[#d8c8ae]">Visit our studio</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">
              Shop No. 3, Ground Floor, Opposite Bharat Petroleum, Kishanpur
              Tiraha, Avantika Phase 2, Ramghat Road, Aligarh, Uttar Pradesh
              202001.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                aria-label="Call"
                className="grid h-10 w-10 place-items-center border border-white/25 hover:bg-white hover:text-[#252724]"
                href="tel:+910000000000"
              >
                <Phone size={16} />
              </a>
              <a
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center border border-white/25 hover:bg-white hover:text-[#252724]"
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} />
              </a>
              <a
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center border border-white/25 hover:bg-white hover:text-[#252724]"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                {/* <Instagram size={16} /> */}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 text-[11px] text-white/50 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Shri Norris Architects. All rights
            reserved.
          </span>
          <span>Architecture · Interiors · Planning</span>
        </div>
      </div>
    </footer>
  );
}
export function FloatingActions() {
  return (
    <div className="float-cta fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-7 sm:right-7">
      <a
        href="tel:+910000000000"
        aria-label="Call now"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#252724] text-white transition hover:-translate-y-1 hover:bg-[#9b815b]"
      >
        <Phone size={18} />
      </a>
      <a
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp now"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#d8c8ae] text-[#252724] transition hover:-translate-y-1 hover:bg-white"
      >
        <MessageCircle size={19} />
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
