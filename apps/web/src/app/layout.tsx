import type { Metadata } from "next";

import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Superteam Malaysia",
    template: "%s | Superteam Malaysia",
  },
  description:
    "The home for Solana builders in Malaysia. Connect, collaborate, and grow with the Superteam Malaysia community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
