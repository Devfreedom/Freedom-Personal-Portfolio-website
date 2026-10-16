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
        className="pointer-events-none absolute -top-32 right-0 -z-10 h-72 w-72 rounded-full bg-[#1a8fff]/10 blur-[100px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1a8fff]/25 bg-[#1a8fff]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#5eb2ff]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#1a8fff]" />
            Freedom Chukwudi — Web Developer
          </p>

          <h1
            id="hero-heading"
            className="font-[family-name:var(--font-syne)] text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
          >
            I build useful digital experiences for the web.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#93a1b8] sm:text-lg sm:leading-8">
            I&apos;m a web developer learning through hands-on projects. I work
            across the stack — from responsive interfaces in React and Next.js
            to APIs and databases with Node.js, Express, and PostgreSQL — and
            I&apos;m focused on writing clear, maintainable code.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1a8fff] px-7 text-[15px] font-semibold text-white transition hover:bg-[#3aa0ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a8fff]"
            >
              Explore projects
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-7 text-[15px] font-semibold text-white transition hover:border-[#1a8fff]/60 hover:text-[#5eb2ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a8fff]"
            >
              Contact me
            </a>
          </div>

          <p className="mt-8 border-t border-white/[0.07] pt-6 text-sm leading-6 text-[#93a1b8]">
            Currently building: full-stack apps with React, Express, and
            PostgreSQL. Open to feedback, collaboration, and junior
            opportunities.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[360px] lg:mx-0 lg:ml-auto">
          <figure className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[24px] border border-[#1a8fff]/20"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-white/10 bg-[#0e1522]">
              <Image
                src={portrait}
                alt="Portrait of Freedom Chukwudi"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 360px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-[#93a1b8]">
              Freedom Chukwudi — web developer
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
