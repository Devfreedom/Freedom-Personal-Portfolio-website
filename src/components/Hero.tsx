
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate grid min-h-screen scroll-mt-20 items-center gap-12 overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:pt-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[520px] rounded-full bg-[#1a8fff]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-10 -z-10 size-96 rounded-full bg-[#1a8fff]/5 blur-[100px]" />

      <div className="relative z-10">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1a8fff]/25 bg-[#1a8fff]/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#1a8fff]">
          <span className="size-1.5 rounded-full bg-[#1a8fff]" />
          Web development
        </p>

        <h1 className="font-[family-name:var(--font-syne)] text-[clamp(2.7rem,6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.045em]">
          I craft websites that make your{" "}
          <span className="text-[#1a8fff]">brand stand out online.</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-7 text-[#8b99b0] sm:text-lg sm:leading-8">
          I&apos;m an emerging website developer focused on crafting modern,
          user-friendly websites tailored to your needs.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#brand-work"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1a8fff] px-7 font-medium text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(26,143,255,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a8fff]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1a8fff]/40 px-7 font-medium text-[#1a8fff] transition hover:-translate-y-0.5 hover:bg-[#1a8fff]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a8fff]"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[380px] lg:ml-auto lg:mr-0 lg:translate-x-4">
        <div className="relative aspect-[19/24] overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#111827] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(26,143,255,0.08)]">
          <Image
            src="/images/Freedom_Pic.jpg"
            alt="Portrait of Freedom Chukwudi"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 380px"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 size-5 border-l-2 border-t-2 border-[#1a8fff]/60" />
          <span className="absolute right-4 top-4 size-5 border-r-2 border-t-2 border-[#1a8fff]/60" />
          <span className="absolute bottom-4 left-4 size-5 border-b-2 border-l-2 border-[#1a8fff]/60" />
          <span className="absolute bottom-4 right-4 size-5 border-b-2 border-r-2 border-[#1a8fff]/60" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 border-t border-white/[0.07] pt-8 sm:grid-cols-3 lg:col-span-2 lg:mt-2 lg:gap-16 lg:pt-10">
        <div>
          <p className="font-[family-name:var(--font-syne)] text-3xl font-extrabold">
            2<span className="text-[#1a8fff]">+</span>
          </p>
          <p className="mt-2 text-sm text-[#8b99b0]">Months experience</p>
        </div>
        <div>
          <p className="font-[family-name:var(--font-syne)] text-3xl font-extrabold">
            2
          </p>
          <p className="mt-2 text-sm text-[#8b99b0]">
            Programming languages
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="font-[family-name:var(--font-syne)] text-3xl font-extrabold">
            Web<span className="text-[#1a8fff]">.</span>
          </p>
          <p className="mt-2 text-sm text-[#8b99b0]">Building for the web</p>
        </div>
      </div>
    </section>
  );
}
