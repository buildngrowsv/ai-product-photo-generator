/**
 * layout.tsx — Root layout for PhotoForge AI (AI Product Photo Generator)
 *
 * PURPOSE: HTML skeleton with SEO-optimized meta tags for the product photography
 * AI tool. Part of the AI Tool Competitor Cloning Factory initiative.
 *
 * SEO (2026-03-24, Builder 2): Target keyword "ai product photo generator free".
 * JSON-LD SoftwareApplication schema for rich Google snippets.
 * OG + Twitter card tags for social sharing.
 *
 * BUSINESS: Free 3 images → Pro $9.90/mo unlimited. Stripe Payment Link checkout.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Product Photo Generator Free - Professional E-Commerce Photos | PhotoForge AI",
  description:
    "Transform your product photos with AI-generated professional backgrounds. Upload any product image and get stunning e-commerce photography in seconds. Free to start.",
  keywords: [
    "ai product photo generator",
    "product photography ai",
    "e-commerce product photos",
    "ai background generator",
    "product photo editor free",
  ],
  openGraph: {
    title: "AI Product Photo Generator - Professional E-Commerce Photos in Seconds",
    description:
      "Upload your product photo and get professional e-commerce photography with AI backgrounds. Free to start.",
    type: "website",
    siteName: "PhotoForge AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Photo Generator - Free Professional Product Photos",
    description:
      "Transform product photos with AI backgrounds. Professional e-commerce photography in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PhotoForge AI - Product Photo Generator",
              applicationCategory: "PhotographyApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free tier: 3 product photos. Pro: $9.90/month unlimited.",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
