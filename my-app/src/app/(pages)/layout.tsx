import type { Metadata } from "next";
import { Open_Sans, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "300",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advanced Current",
  description: "Create your own circuit schema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
