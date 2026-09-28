import type { Metadata } from "next";
import { Archivo_Black, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import PageEnterVeil from "@/components/ui/PageEnterVeil";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const serif = Fraunces({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rizki Maulana As Fullstack Developer & Software Engineer",
  description:
    "Portfolio Rizki Maulana As Fullstack Developer (Next.js, React Native, Three.js) berbasis di Bekasi. Karya untuk Doeun, Jual Emas Indonesia, LoveCoupleGames, Sohib Kerja, dan klien lainnya di bawah brand Ikicode.",
  icons: { icon: "data:," },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-cream text-ink">
        <PageEnterVeil />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
