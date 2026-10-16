import { cacheLife } from "next/cache";

async function getCurrentYear() {
    'use cache'
    cacheLife('max')
    return new Date().getFullYear()
}

export default async function Footer() {
    const year = await getCurrentYear();
  return (
    <footer className="flex flex-col gap-2 border-t border-white/[0.07] px-5 py-7 text-sm text-[#8b99b0] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
      <p>© {year} Freedom Chukwudi. All rights reserved.</p>
      <p>An emerging website developer</p>
    </footer>
  );
}
