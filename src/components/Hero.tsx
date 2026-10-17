import Image from "next/image";
import portrait from "../../public/Freedom_Pic.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:pb-24 lg:pt-44"
    >
      <div
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 100% at 78% 0%, var(--accent-soft), transparent 70%)",
        }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="min-w-0">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Junior full-stack developer
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(1.85rem,6vw,4.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            I build useful digital experiences for the web.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            I&apos;m Freedom Chukwudi, a junior full-stack developer learning
            by building real projects with React, Node.js, Express, and
            PostgreSQL. I focus on writing better code, solving practical
            problems, and connecting responsive interfaces to functional APIs
            and databases.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-7 text-[15px] font-semibold text-[#04101f] transition hover:bg-accent-strong"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line-strong px-7 text-[15px] font-semibold text-foreground transition hover:border-accent/60 hover:text-accent-strong"
            >
              Explore projects
            </a>
          </div>

          <p className="mt-8 border-t border-line pt-6 text-sm leading-6 text-muted">
            Currently building full-stack apps with React, Express, and
            PostgreSQL. Open to feedback, collaboration, and junior
            opportunities.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[360px] lg:mx-0 lg:ml-auto">
          <figure className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={portrait}
                  alt="Portrait of Freedom Chukwudi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 360px"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <figcaption className="mt-4 text-center text-sm text-muted">
              Freedom Chukwudi — junior full stack developer
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
