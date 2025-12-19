import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shrinkly",
  description: "Shorten and track your URLs easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <link rel="icon" href="/logo.png" type="image/png" sizes="20x20" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50 min-h-screen`}
        >
          <Header />
          <div className="min-h-screen flex items-center justify-center px-4">
            <Toaster />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
