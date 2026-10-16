const groups = [
  {
    title: "Frontend",
    description: "Interfaces I build for current projects.",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend & Data",
    description: "APIs and databases behind those interfaces.",
    items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "JWT authentication", "Sequelize"],
  },
  {
    title: "Tools & Workflow",
    description: "How I build, check, and ship code.",
    items: ["Git", "GitHub", "Vercel", "npm", "ESLint", "Responsive design"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 border-t border-white/[0.07] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5eb2ff]">
          <span aria-hidden="true" className="h-px w-6 bg-[#1a8fff]" />
          Technical skills
        </p>
        <h2
          id="skills-heading"
          className="font-[family-name:var(--font-syne)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          What I work with
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#93a1b8]">
          Technologies I&apos;ve used in this portfolio and in my full-stack
          projects. I&apos;m still growing in all of them — this list reflects
          what I&apos;ve actually built with, not expert-level mastery.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-white/[0.08] bg-[#0e1522] p-6 sm:p-7"
            >
              <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-white">
                {group.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-[#93a1b8]">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
