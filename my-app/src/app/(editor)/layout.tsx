import "../globals.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Schema",
  description: "User editor for circuit design",
};

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable}`}>{children}</body>
    </html>
  );
}
