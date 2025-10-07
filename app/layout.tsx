import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { defaultLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Ronen & Tammy Izhaki",
  description: "Visual storytelling studio crafting immersive experiences.",
  metadataBase: new URL("https://ronen-tammy.com")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
