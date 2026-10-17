type Project = {
  name: string;
  kind: string;
  purpose: string;
  points: string[];
  stack: string[];
  liveUrl?: string;
  sourceUrl: string;
};

const projects: Project[] = [
  {
    name: "SwiftDrop",
    kind: "Full-stack delivery platform",
    purpose:
      "A delivery-management app with customer, rider, and admin roles.",
    points: [
      "Customer flow: register, create a delivery, and pay for it.",
      "Admin flow: confirm cash payments and assign riders to deliveries.",
      "Rider flow: pick up assigned parcels and move them to delivered.",
      "Public landing page reads aggregate delivery stats from an unauthenticated API endpoint.",
    ],
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "REST API",
    ],
    liveUrl: "https://swiftdrop-liart.vercel.app",
    sourceUrl: "https://github.com/Devfreedom/swiftdrop",
  },
  {
    name: "Northbridge Health",
    kind: "Full-stack healthcare platform",
    purpose:
      "A general healthcare platform with a React frontend and an Express + PostgreSQL API.",
    points: [
      "React + Vite frontend in medical-website/ talking to the API over HTTP.",
      "Express + PostgreSQL backend with JWT authentication.",
      "Session handling that keeps the user signed in through network errors and signs out on confirmed unauthorized responses.",
    ],
    stack: [
      "React",
      "Vite",
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST API",
    ],
    liveUrl: "https://medical-healthcare-platform-tan.vercel.app",
    sourceUrl: "https://github.com/Devfreedom/northbridge-health",
  },
  {
    name: "Nairova",
    kind: "Full-stack banking demo",
    purpose:
      "A classroom banking application using simulated funds only — not real money.",
    points: [
      "Customer register and login with authenticated account and balance views.",
      "Transaction PIN creation and transfer flow between registered accounts.",
      "Transaction records with ownership checks so customers only see their own history.",
      "Admin views for users and crediting accounts with simulated test funds.",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST API",
    ],
    sourceUrl: "https://github.com/Devfreedom/Nairova",
  },
];

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          Selected work
        </p>
        <h2
          id="projects-heading"
          className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
        >
          Selected Projects
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Real projects I&apos;ve been building to learn full-stack
          development. Each one connects a working frontend to an API and a
          PostgreSQL database.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/35 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition group-hover:opacity-100"
              />

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-strong">
                  {project.kind}
                </p>
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-bold text-muted/60"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
                {project.name}
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-muted">
                {project.purpose}
              </p>

              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm leading-6 text-muted">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] size-1 shrink-0 rounded-full bg-accent"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul
                aria-label={`Technologies used in ${project.name}`}
                className="mt-5 flex flex-wrap gap-2"
              >
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} live preview (opens in a new tab)`}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-semibold text-[#04101f] transition hover:bg-accent-strong"
                  >
                    Live preview
                    <ExternalIcon />
                  </a>
                )}
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} source code on GitHub (opens in a new tab)`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line-strong px-4 text-sm font-semibold text-foreground transition hover:border-accent/60 hover:text-accent-strong"
                >
                  Source code
                  <ExternalIcon />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-muted">
          More experiments and coursework live on{" "}
          <a
            href="https://github.com/Devfreedom"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded font-semibold text-accent underline-offset-4 hover:underline"
          >
            my GitHub profile
          </a>
          .
        </p>
      </div>
    </section>
  );
}
