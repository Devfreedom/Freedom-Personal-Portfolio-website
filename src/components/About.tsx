export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            About
          </p>
          <h2
            id="about-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Learning by building. Improving with every project.
          </h2>
        </div>

        <div className="space-y-5 text-base leading-7 text-muted">
          <p>
            I&apos;m Freedom Chukwudi, a junior full stack dev building my
            skills by working on real, full-stack applications rather than
            tutorials
            alone. Each project — from delivery platforms to healthcare and
            banking demos — starts as a way to understand how the pieces
            connect: the interface, the API, and the database behind it.
          </p>
          <p>
            My approach is practical. I try to understand a problem before
            writing code, keep components small and readable, and improve a
            project by iterating on it and fixing what isn&apos;t clear. I work
            with React, Next.js, and Tailwind CSS on the front end, and
            Node.js, Express, and PostgreSQL on the back end, and I&apos;m
            always looking for feedback that makes the next build better.
          </p>
        </div>
      </div>
    </section>
  );
}
