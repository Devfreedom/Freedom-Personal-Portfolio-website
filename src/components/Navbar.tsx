"use client";

import { useState } from "react";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "X", href: "https://x.com/freedom_web2dev" },
  { label: "GitHub", href: "https://github.com/Devfreedom" },
  { label: "HackMD", href: "https://hackmd.io/@freedomchukwudi01" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/80 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-2.5 rounded-lg text-[15px] font-bold tracking-tight text-foreground"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 font-display text-sm font-extrabold text-accent transition group-hover:border-accent/60"
          >
            F
          </span>
          Freedom Chukwudi
        </a>

        <div className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative rounded py-1 text-muted transition after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              className="rounded text-xs font-semibold uppercase tracking-wide text-muted transition hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-foreground transition hover:border-line-strong md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            className="size-5"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-background px-5 pb-6 pt-4 md:hidden"
        >
          <ul className="flex flex-col text-[15px]">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-muted transition hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                className="rounded-lg border border-line px-4 py-2 text-sm text-muted transition hover:border-line-strong hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
