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
    stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Sequelize", "REST API"],
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
    stack: ["React", "Vite", "JavaScript", "Node.js", "Express", "PostgreSQL", "REST API"],
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
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "REST API"],
    sourceUrl: "https://github.com/Devfreedom/Nairova",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="size-4"
    >
      <path
        d="M7 17L17 7M7 7h10v10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5eb2ff]">
          <span aria-hidden="true" className="h-px w-6 bg-[#1a8fff]" />
          Selected work
        </p>
        <h2
          id="projects-heading"
          className="font-[family-name:var(--font-syne)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          Selected Projects
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#93a1b8]">
          Real projects I&apos;ve been building to learn full-stack
          development. Each one connects a working frontend to an API and a
          PostgreSQL database.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0e1522] p-6 transition hover:border-[#1a8fff]/35 sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5eb2ff]">
                {project.kind}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-syne)] text-xl font-bold tracking-tight text-white">
                {project.name}
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-gray-300">
                {project.purpose}
              </p>

              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm leading-6 text-[#93a1b8]">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] size-1 shrink-0 rounded-full bg-[#1a8fff]"
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
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[0.07] pt-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} live preview (opens in a new tab)`}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-[#1a8fff] px-4 text-sm font-semibold text-white transition hover:bg-[#3aa0ff]"
                  >
                    Live preview
                    <ArrowIcon />
                  </a>
                )}
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} source code on GitHub (opens in a new tab)`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-white/15 px-4 text-sm font-semibold text-gray-200 transition hover:border-[#1a8fff]/60 hover:text-[#5eb2ff]"
                >
                  Source code
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-[#93a1b8]">
          More experiments and coursework live on{" "}
          <a
            href="https://github.com/Devfreedom"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded font-medium text-[#5eb2ff] underline-offset-4 hover:underline"
          >
            my GitHub profile
          </a>
          .
        </p>
      </div>
    </section>
  );
}
