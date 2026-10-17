const socials = [
  { label: "X / Twitter", href: "https://x.com/freedom_web2dev" },
  { label: "GitHub", href: "https://github.com/Devfreedom" },
  { label: "HackMD", href: "https://hackmd.io/@freedomchukwudi01" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(70% 120% at 50% 0%, var(--accent-soft), transparent 70%)",
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-64"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Contact
            </p>

            <h2
              id="contact-heading"
              className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            >
              Let&apos;s build something useful.
            </h2>

            <p className="mt-5 text-base leading-7 text-muted">
              Have a project or a role in mind? I&apos;m open to junior
              opportunities, collaboration, and honest feedback.
            </p>

            <a
              href="mailto:editorfreedom@gmail.com"
              className="group mt-8 inline-flex max-w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-foreground underline decoration-accent/50 decoration-1 underline-offset-8 transition-colors duration-200 hover:text-accent hover:decoration-accent focus-visible:text-accent sm:text-base"
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
                  aria-label={`${social.label} (opens in a new tab)`}
                  className="rounded-lg border border-line px-5 py-3 text-sm text-muted transition hover:border-line-strong hover:text-foreground"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
