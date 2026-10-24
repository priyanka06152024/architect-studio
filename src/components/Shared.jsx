import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
export function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="container-shell pb-14 pt-16 md:pb-20 md:pt-24">
      <p className="eyebrow reveal">{eyebrow}</p>
      <h1 className="section-title reveal reveal-delay-1 mt-5 max-w-5xl">
        {title}
      </h1>
      {description && (
        <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-sm leading-7 text-[#777970] md:text-base">
          {description}
        </p>
      )}
      <div className="line-grow mt-10" />
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  to = "/services",
}) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl">{title}</h2>
        {description && (
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#777970]">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link to={to} className="btn-outline w-fit shrink-0">
          {link}
          <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}

export function ProjectCard({ project, index = 0 }) {
  return (
    <Link
      to={`/gallery`}
      className="work-card group block"
      style={{ "--card-delay": `${index * 100}ms` }}
    >
      <div className="work-card-image">
        <img src={project.image} alt={project.title} loading="lazy" />

        <div className="work-card-overlay">
          <span className="work-card-number">
            PROJECT — {String(index + 1).padStart(2, "0")}
          </span>

          <span className="work-card-view">
            VIEW PROJECT
            <ArrowUpRight size={18} />
          </span>
        </div>

        <span className="work-card-corner">
          <ArrowUpRight size={20} />
        </span>
      </div>

      <div className="work-card-info">
        <div>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>

        <span className="work-card-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </Link>
  );
}

export function CTASection() {
  return (
    <section className="bg-[#d8c8ae] py-16 md:py-20">
      <div className="container-shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Have a project in mind?</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-.06em] md:text-6xl">
            Good spaces begin with a conversation.
          </h2>
        </div>
        <Link to="/contact" className="btn-primary w-fit">
          Tell us about it <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
