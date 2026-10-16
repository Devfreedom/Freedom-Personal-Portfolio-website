
const services = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "Building clean, modern websites that reflect your brand and connect with your audience.",
  },
  {
    number: "02",
    title: "Website Content & Structure",
    description:
      "Organizing your website content in a clear, logical way that guides visitors and keeps them engaged.",
  },
  {
    number: "03",
    title: "Custom Website Builds",
    description:
      "Developing websites from scratch that help businesses establish a strong and consistent online presence.",
  },
];

export default function Services() {
  return (
    <section
      id="brand-work"
      className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-[#1a8fff]">
          <span className="h-px w-6 bg-[#1a8fff]" />
          Services
        </p>

        <h2 className="mb-12 font-[family-name:var(--font-syne)] text-4xl font-extrabold tracking-tight sm:mb-16 sm:text-5xl">
          Brand Work
        </h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111827] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#1a8fff]/30 hover:bg-[#161f2e] hover:shadow-[0_24px_48px_rgba(0,0,0,0.3)] sm:p-9"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-[#1a8fff] opacity-0 transition group-hover:opacity-100" />

              <p className="mb-8 font-[family-name:var(--font-syne)] text-sm font-bold tracking-widest text-[#1a8fff]">
                {service.number}
              </p>

              <h3 className="mb-3 font-[family-name:var(--font-syne)] text-xl font-bold tracking-tight transition group-hover:text-[#1a8fff]">
                {service.title}
              </h3>

              <p className="text-sm leading-7 text-[#8b99b0]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
