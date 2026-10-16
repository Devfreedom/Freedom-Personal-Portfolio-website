
const socials = [
  { label: "X", href: "https://x.com/freedom_web2dev" },
  { label: "GitHub", href: "https://github.com/Devfreedom" },
  { label: "HMD", href: "https://hackmd.io/@freedomchukwudi01" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#080b10]/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
      >
        <a
          href="#home"
          className="shrink-0 text-sm font-bold tracking-tight text-white sm:text-base"
        >
          Freedom Chukwudi
        </a>

        <div className="flex items-center gap-4 text-sm sm:gap-8">
          <a className="text-gray-300 transition hover:text-white" href="#home">
            Home
          </a>
          <a
            className="hidden text-gray-300 transition hover:text-white sm:inline"
            href="#brand-work"
          >
            Brand Work
          </a>
          <a
            className="text-gray-300 transition hover:text-white"
            href="#contact"
          >
            Contact
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-xs font-medium tracking-wide text-gray-400 transition hover:text-[#1a8fff]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
