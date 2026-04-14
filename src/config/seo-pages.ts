/**
 * Programmatic SEO Pages Configuration — PhotoForge AI
 *
 * WHY THIS FILE EXISTS:
 * Long-tail keywords like "best AI product photo generator for e-commerce" or
 * "PhotoForge AI vs Photoroom" capture high-intent search traffic from sellers
 * actively comparing or seeking product photography tools. Each entry here
 * generates a full static page at build time with unique content,
 * FAQ schema (rich snippets), and internal cross-links.
 *
 * MARKET CONTEXT:
 * AI product photography is a fast-growing category driven by e-commerce growth.
 * Sellers on Amazon, Etsy, and Shopify need professional product photos but
 * can't afford studio shoots for every SKU. Competitors like Photoroom ($9.99/mo),
 * PixelCut ($9.99/mo), Flair AI ($10/mo), and Mokker ($19/mo) charge similar
 * monthly rates. Our wedge: simpler UX, competitive pricing ($11.99/mo unlimited),
 * and no per-image fees.
 *
 * IMPORTED BY:
 * - src/app/for/[audience]/page.tsx (audience landing pages)
 * - src/app/best/[slug]/page.tsx (listicle-style pages)
 * - src/app/sitemap.ts (includes all generated URLs)
 * - src/components/SeoInternalLinks.tsx (internal link grid)
 */

import { PRODUCT_CONFIG } from "@/lib/config";

export interface SeoCompetitorConfig {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly pricing: string;
  readonly weaknesses: string[];
}

export interface SeoAudienceConfig {
  readonly slug: string;
  readonly name: string;
  readonly painPoints: string[];
  readonly howWeHelp: string;
}

export interface SeoUseCaseConfig {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly steps: string[];
}

export interface SeoBestConfig {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly features: string[];
}

export interface SeoPageConfig {
  readonly competitors: SeoCompetitorConfig[];
  readonly audiences: SeoAudienceConfig[];
  readonly useCases: SeoUseCaseConfig[];
  readonly bestPages: SeoBestConfig[];
}

/**
 * Product-photo-specific SEO configuration. Each entry is researched against
 * real competitor positioning and audience search behavior in the e-commerce
 * product photography space.
 */
export const SEO_PAGES_CONFIG: SeoPageConfig = {
  competitors: [
    {
      slug: "photoroom",
      name: "Photoroom",
      description:
        "Photoroom is an AI-powered photo editor focused on e-commerce product photography. Popular for its instant background removal and batch processing capabilities.",
      pricing: "$9.99/month for Pro, $24.99/month for Business",
      weaknesses: [
        "Pro plan limits batch processing to 40 images — not enough for large catalogs",
        "Business tier at $24.99/month is expensive for small sellers just getting started",
        "Free tier adds a Photoroom watermark to all exported images",
        "Limited scene customization — preset backgrounds only, no custom prompt-based scenes",
      ],
    },
    {
      slug: "pixelcut",
      name: "PixelCut",
      description:
        "PixelCut offers AI-powered background removal and product photo enhancement tools. Targets Shopify and Amazon sellers needing quick product image cleanup.",
      pricing: "$9.99/month Pro, limited free tier",
      weaknesses: [
        "Free tier is extremely limited — only 3 images with watermarks",
        "Pro plan at $9.99/month has a cap on high-resolution exports",
        "Fewer scene templates compared to dedicated product photography tools",
        "No batch processing on the free tier — each image must be processed individually",
      ],
    },
    {
      slug: "flair-ai",
      name: "Flair AI",
      description:
        "Flair AI specializes in AI-generated product photography with customizable scenes and branded backdrops. Designed for D2C brands and marketing teams.",
      pricing: "$10/month for Pro, $25/month for Business",
      weaknesses: [
        "Learning curve for scene customization — not as plug-and-play as simpler tools",
        "Business tier required for team collaboration and API access",
        "Free trial limited to a handful of generations with watermarks",
        "Scene rendering can be slow during peak hours without priority queue",
      ],
    },
    {
      slug: "mokker",
      name: "Mokker",
      description:
        "Mokker is an AI product photo generator that creates lifestyle and studio product images. Known for realistic scene placement and shadow rendering.",
      pricing: "$19/month for Standard, $49/month for Pro",
      weaknesses: [
        "Most expensive in the category at $19-$49/month for comparable features",
        "Standard plan limits output to 50 images per month — constraining for large catalogs",
        "No free tier available — requires payment to even test the tool",
        "Limited integration with e-commerce platforms compared to Photoroom",
      ],
    },
  ],

  audiences: [
    {
      slug: "e-commerce-sellers",
      name: "E-Commerce Sellers",
      painPoints: [
        "Professional product photography costs $25-$100+ per image at studios — unsustainable for large catalogs",
        "Inconsistent lighting and backgrounds across product listings hurt conversion rates",
        "Seasonal inventory changes require frequent photo shoots that eat into margins",
        "Marketplace algorithms favor listings with high-quality, white-background product images",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} lets e-commerce sellers transform any product photo into studio-quality imagery in seconds. With ${PRODUCT_CONFIG.pricing.free.limit} free product photos per ${PRODUCT_CONFIG.pricing.free.period} and unlimited access at $${PRODUCT_CONFIG.pricing.pro.price}/mo, you can maintain professional listings across your entire catalog without expensive photo shoots.`,
    },
    {
      slug: "amazon-fba-sellers",
      name: "Amazon FBA Sellers",
      painPoints: [
        "Amazon requires pure white background images for main listing photos — manual editing is tedious",
        "FBA sellers often source products from manufacturers who provide low-quality images",
        "A+ Content and Brand Store pages need lifestyle shots that are expensive to produce in-studio",
        "New product launches need professional photos fast to capture early search ranking momentum",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} helps Amazon FBA sellers create compliant, high-converting product images instantly. Generate pure white backgrounds that meet Amazon's strict requirements, or create lifestyle scenes for A+ Content — all without hiring a photographer. Start free with ${PRODUCT_CONFIG.pricing.free.limit} images per ${PRODUCT_CONFIG.pricing.free.period}.`,
    },
    {
      slug: "etsy-sellers",
      name: "Etsy Sellers",
      painPoints: [
        "Handmade and vintage items need aesthetic lifestyle photography that reflects brand personality",
        "Home-based sellers lack professional lighting and backdrop equipment",
        "Etsy's search algorithm rewards listings with multiple high-quality photos",
        "Seasonal collections and custom orders require constant fresh photography on a tight budget",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} empowers Etsy sellers to create beautiful product photos without a professional studio setup. Transform kitchen-table snapshots into magazine-worthy lifestyle shots that match your brand aesthetic. With plans starting at $${PRODUCT_CONFIG.pricing.pro.price}/mo for unlimited photos, you can refresh your entire shop's imagery affordably.`,
    },
    {
      slug: "marketing-agencies",
      name: "Marketing Agencies",
      painPoints: [
        "Client product shoots require coordinating photographers, stylists, and studio time — expensive and slow",
        "Multiple clients each need consistent, on-brand product imagery across campaigns",
        "Social media content calendars demand high volumes of fresh product creative every week",
        "Budget-conscious clients expect agency-quality results without agency-level photography costs",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} gives marketing agencies a scalable way to produce client product photography. Generate on-brand product images for social campaigns, ads, and e-commerce listings in seconds instead of days. At $${PRODUCT_CONFIG.pricing.pro.price}/mo for unlimited generations, it's a fraction of a single studio session.`,
    },
    {
      slug: "product-photographers",
      name: "Product Photographers",
      painPoints: [
        "Post-production editing (background removal, retouching, color correction) eats hours per shoot",
        "Clients increasingly expect fast turnaround — same-day or next-day delivery of final images",
        "Lower-budget clients want professional results but can't afford full studio day rates",
        "Staying competitive means offering AI-enhanced services alongside traditional photography",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} accelerates the product photography workflow. Use AI to handle tedious post-production tasks — background removal, scene placement, lighting correction — so you can deliver more shoots per week. Offer AI-enhanced options to budget-conscious clients while preserving your premium tier. Unlimited processing at $${PRODUCT_CONFIG.pricing.pro.price}/mo.`,
    },
  ],

  useCases: [
    {
      slug: "product-listing-photos",
      name: "Product Listing Photos",
      description:
        "Create marketplace-ready product listing photos with clean white backgrounds and consistent lighting. Perfect for Amazon, Shopify, eBay, and Etsy listings that need to meet strict image guidelines.",
      steps: [
        "Upload your product photo — even a smartphone snapshot works",
        "Select 'White Background' or 'Studio Clean' to generate marketplace-compliant images",
        "Review the AI-generated result and adjust scene settings if needed",
        "Download in high resolution and upload directly to your marketplace listing",
      ],
    },
    {
      slug: "social-media-product-ads",
      name: "Social Media Product Ads",
      description:
        "Generate scroll-stopping product images for Instagram, Facebook, TikTok, and Pinterest ads. Place products in lifestyle scenes that drive engagement and conversions without expensive photo shoots.",
      steps: [
        "Upload your product image with any background",
        "Choose a lifestyle scene that matches your brand and target audience",
        "Generate multiple variations to A/B test in your ad campaigns",
        "Download and upload directly to your ad platform's creative library",
      ],
    },
    {
      slug: "catalog-photography",
      name: "Catalog Photography",
      description:
        "Produce consistent, professional product catalog imagery at scale. Batch process entire product lines with uniform lighting, backgrounds, and styling for print and digital catalogs.",
      steps: [
        "Upload product images in batch — up to 10 images at a time on Pro",
        "Select a consistent scene template to apply across all products",
        "Review and approve the AI-generated catalog images",
        "Export the full set in print-ready or web-optimized resolution",
      ],
    },
  ],

  bestPages: [
    {
      slug: "free-ai-product-photo-generator",
      title: "Best Free AI Product Photo Generator in 2026",
      description:
        "Compare the best free AI product photo generators available in 2026. Find tools that create professional e-commerce product images without upfront costs or photography skills.",
      features: [
        "Free daily generation credits with no watermarks",
        "Instant white background removal",
        "Multiple studio scene templates",
        "High-resolution downloads for marketplace listings",
        "Commercial usage rights included",
      ],
    },
    {
      slug: "ai-product-photo-tool-for-e-commerce",
      title: "Best AI Product Photo Tool for E-Commerce in 2026",
      description:
        "The best AI product photo tools for e-commerce sellers who need professional listing images on a budget. Optimized for Amazon, Shopify, Etsy, and eBay requirements.",
      features: [
        "Marketplace-compliant white background generation",
        "Lifestyle scene placement for A+ Content and social ads",
        "Batch processing for large product catalogs",
        "Consistent lighting and shadows across all images",
        "Under $12/month for unlimited product photos",
      ],
    },
    {
      slug: "product-photo-editor-for-small-businesses",
      title: "Best Product Photo Editor for Small Businesses in 2026",
      description:
        "The best AI-powered product photo editors for small businesses that need professional imagery without hiring a photographer. Simple, affordable, and studio-quality results.",
      features: [
        "No photography skills required",
        "Transform smartphone photos into studio shots",
        "One-click background removal and replacement",
        "Professional lighting and shadow rendering",
        "Affordable monthly pricing with free tier to start",
      ],
    },
  ],
};
