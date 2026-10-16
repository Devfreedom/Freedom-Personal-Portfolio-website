
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freedom Chukwudi | Web Developer",
  description:
    "Explore the portfolio of Freedom Chukwudi, showcasing website development services and digital projects.",
  openGraph: {
    title: "Freedom Chukwudi | Web Developer",
    description:
      "Website development services and selected digital projects by Freedom Chukwudi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
