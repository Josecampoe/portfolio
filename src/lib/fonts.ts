import localFont from "next/font/local";

export const geist = localFont({
  src: "../fonts/Geist.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

export const geistMono = localFont({
  src: "../fonts/GeistMono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const bricolage = localFont({
  src: "../fonts/BricolageGrotesque.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});
