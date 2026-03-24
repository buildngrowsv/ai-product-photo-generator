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

/**
 * JSON-LD STRUCTURED DATA — Helps Google show rich snippets in search results.
 *
 * SoftwareApplication schema tells Google this is a web app, its category,
 * pricing model, and feature list. FAQPage schema provides expandable
 * Q&A rich results that increase SERP click-through rate.
 *
 * WHY JSON-LD OVER MICRODATA:
 * Google recommends JSON-LD as the preferred structured data format.
 * It lives in a <script> tag in <head>, separate from the HTML structure,
 * so it does not interfere with component rendering or styling.
 *
 * Updated 2026-03-24 by Scout 15 as part of SEO meta tag rollout across all
 * clone apps. Part of the marketplace listing preparation for Toolify,
 * FutureTools, and other AI tool directories. Original SoftwareApplication
 * schema was added by Builder 2; this update adds featureList and FAQPage.
 */
const jsonLdStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PhotoForge AI - Product Photo Generator",
  "applicationCategory": "PhotographyApplication",
  "operatingSystem": "Web",
  "description": "Transform your product photos with AI-generated professional backgrounds. Upload any product image and get stunning e-commerce photography in seconds.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier: 3 product photos. Pro: $9.90/month unlimited."
  },
  "featureList": [
    "AI-powered product background generation",
    "Professional e-commerce photography in seconds",
    "Multiple background styles and scenes",
    "High-resolution output for marketplaces",
    "No photography skills required"
  ]
};

const jsonLdFaqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is PhotoForge AI free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! PhotoForge AI offers 3 free product photos to start. Pro plans at $9.90/month give you unlimited generations for your e-commerce store."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of product photos can I create?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can create professional e-commerce photos for any product. Upload your product image and AI generates stunning backgrounds — perfect for Amazon, Shopify, Etsy, and other marketplaces."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need photography equipment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No! Just upload a basic product photo taken with any camera or phone. Our AI handles the background, lighting, and composition to create professional-quality results."
      }
    }
  ]
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqData) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
