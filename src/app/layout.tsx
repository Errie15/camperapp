import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampSkills - Your Outdoor Survival Guide",
  description: "Master essential camping and bushcraft skills with our comprehensive guides and tutorials.",
  keywords: "camping, bushcraft, survival skills, outdoor skills, knot tying, tarp setup, campfire cooking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cabin.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
