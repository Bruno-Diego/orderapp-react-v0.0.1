import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Turkish Pizza & Kebap",
  description: "Experience the Authentic Flavors of Turkey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Script
            id="cookieyes"
            type="text/javascript"
            async
            src="https://cdn-cookieyes.com/client_data/3c11a35db5e7e097d7ea4762/script.js"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
