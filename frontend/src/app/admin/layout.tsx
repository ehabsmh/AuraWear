import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../_ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Wear",
  description:
    "AuraWear is a modern e-commerce platform built with Next.js and Express.js, offering stylish, casual clothing for men and women of all ages. Our mission is to streamline the online shopping experience through an intuitive interface, responsive design, and powerful features like price, size, and color filtering, paired with seamless Google authentication. Designed for ease of use and accessibility, AuraWear delivers a visually appealing shopping experience across all devices, making fashion effortless and inclusive for everyone.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-main ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="grid md:grid-cols-[13rem_1fr] 2xl:grid-cols-[15rem_1fr]  h-screen">
          {/* <Header /> */}

          <Navbar />

          {children}
        </main>
      </body>
    </html>
  );
}
