import type { Metadata } from "next";
import { Roboto, Montserrat, Pacifico } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
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
    <html lang="en" className={`${roboto.variable} ${montserrat.variable} ${pacifico.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
