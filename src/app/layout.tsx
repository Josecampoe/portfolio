import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bricolage, geist, geistMono } from "@/lib/fonts";
import { uiText } from "@/data/ui";

export const metadata: Metadata = {
  title: uiText.siteTitle,
  description: uiText.siteDescription,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0d" },
  ],
};

// Runs before the first paint: applies the saved theme (light by default) and
// decides whether the intro plays (once per session, never with reduced motion).
const bootScript = `(function(){var c=document.documentElement.classList;c.add("js");try{if(localStorage.getItem("theme")==="dark")c.add("dark")}catch(e){}var s=false;try{s=sessionStorage.getItem("introSeen")==="1"}catch(e){}var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!s&&!r){c.add("has-intro","intro-lock")}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-screen">
        {/* Without JavaScript the entrance animations never run: show everything as is */}
        <noscript>
          <style>{".app-frame, .app-frame * { opacity: 1 !important; transform: none !important; }"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
