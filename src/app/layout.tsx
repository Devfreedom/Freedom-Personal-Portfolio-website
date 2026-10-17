import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freedom Chukwudi | Web Developer",
  description:
    "Freedom Chukwudi is a web developer learning through hands-on projects with React, Next.js, Node.js, Express, and PostgreSQL. Explore selected projects, skills, and contact details.",
  openGraph: {
    title: "Freedom Chukwudi | Web Developer",
    description:
      "Web developer learning through hands-on projects. Selected work with React, Next.js, Node.js, Express, and PostgreSQL.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freedom Chukwudi | Web Developer",
    description:
      "Web developer learning through hands-on projects. Selected work with React, Next.js, Node.js, Express, and PostgreSQL.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#1a8fff] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
