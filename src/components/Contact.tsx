
const socials = [
  { label: "X / Twitter", href: "https://x.com/freedom_web2dev" },
  { label: "GitHub", href: "https://github.com/Devfreedom" },
  { label: "HackMD", href: "https://hackmd.io/@freedomchukwudi01" },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-28">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111827] px-5 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-[#1a8fff]/15 blur-[100px]" />

        <div className="relative">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#1a8fff]">
            Contact
          </p>

          <h2 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Get In Touch
          </h2>

          <p className="mt-5 text-base text-[#8b99b0]">
            Have a project in mind? Let&apos;s work together.
          </p>

          <a
            href="mailto:editorfreedom@gmail.com"
            className="mt-9 inline-flex max-w-full items-center justify-center rounded-full border border-[#1a8fff]/30 px-5 py-4 text-sm font-medium text-[#1a8fff] transition hover:border-[#1a8fff] hover:bg-[#1a8fff] hover:text-white sm:px-8 sm:text-base"
          >
            <span className="break-all">editorfreedom@gmail.com</span>
          </a>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/[0.07] px-5 py-3 text-sm text-[#8b99b0] transition hover:border-white/20 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}