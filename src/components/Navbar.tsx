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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#080b10]/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[72px] w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8"
      >
        <a
          href="#home"
          className="shrink-0 rounded text-[15px] font-bold tracking-tight text-white"
        >
          Freedom Chukwudi
        </a>

        <div className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded text-gray-300 transition hover:text-white"
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
              className="rounded text-xs font-medium tracking-wide text-gray-400 transition hover:text-[#1a8fff]"
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
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 px-3 text-sm text-gray-200 transition hover:border-white/25 hover:text-white md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/[0.07] bg-[#080b10] px-5 pb-6 pt-4 md:hidden"
        >
          <ul className="flex flex-col gap-1 text-[15px]">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-gray-200 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
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
