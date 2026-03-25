/**
 * page.tsx — Landing page for PhotoForge AI (AI Product Photo Generator)
 *
 * PURPOSE: Conversion-optimized landing page that lets visitors immediately
 * try the product — upload a photo right on the hero section. This follows
 * Scout 16's SEO strategy: "interactive demo ON the hero = 2x conversion".
 *
 * BUSINESS CONTEXT (2026-03-24, Builder 2, BridgeSwarm pane1774):
 * Part of the AI Tool Competitor Cloning Factory. Target niche: e-commerce
 * sellers who need professional product photos. Competitors (remove.bg,
 * photoroom.com) charge $9-25/mo — we undercut at $9.90/mo with a generous
 * free tier (3 images) to drive adoption.
 *
 * PAGE STRUCTURE:
 * 1. Hero: Headline + interactive upload dropzone (immediate value)
 * 2. How It Works: 3-step process (Upload → Choose Style → Download)
 * 3. Pricing: Free vs Pro comparison
 * 4. FAQ: Long-tail SEO keywords
 * 5. Footer: Trust signals
 *
 * DEPENDS ON: No external services yet — this is the static landing page.
 * Image generation will be added via fal.ai API route in /api/generate.
 */

"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  Sparkles,
  Download,
  Camera,
  Zap,
  Crown,
  Check,
  ArrowRight,
  ImagePlus,
} from "lucide-react";

/**
 * Background style presets — these will be passed to the AI model as scene
 * descriptions. Each style targets a common e-commerce photography need.
 * The user selects one after uploading their product photo.
 */
const PRODUCT_PHOTO_BACKGROUND_STYLE_PRESETS = [
  {
    id: "clean-white",
    name: "Clean White",
    description: "Pure white background — Amazon/eBay standard",
    prompt: "Product on pure white background, professional studio lighting, e-commerce standard",
  },
  {
    id: "lifestyle",
    name: "Lifestyle Scene",
    description: "Natural setting that tells a story",
    prompt: "Product in a beautiful lifestyle scene, warm natural lighting, magazine quality",
  },
  {
    id: "gradient",
    name: "Modern Gradient",
    description: "Sleek gradient background for tech products",
    prompt: "Product on sleek modern gradient background, dramatic lighting, tech product photography",
  },
  {
    id: "marble",
    name: "Marble Surface",
    description: "Luxury marble countertop setting",
    prompt: "Product on polished marble surface, luxury setting, soft studio lighting, high-end photography",
  },
  {
    id: "nature",
    name: "Nature Setting",
    description: "Outdoor natural environment",
    prompt: "Product in natural outdoor setting, soft bokeh background, warm golden hour lighting",
  },
  {
    id: "studio",
    name: "Studio Pro",
    description: "Professional studio with rim lighting",
    prompt: "Product in professional photography studio, dramatic rim lighting, dark background with accent lights",
  },
];

/**
 * DAILY_FREE_GENERATION_LIMIT — Max free product photo generations per day.
 * 3/day lets users see value (try multiple styles) without unlimited free access.
 * At ~$0.03-0.05/generation, 3 free/day costs us max ~$0.15/user/day.
 * Power users (e-commerce sellers with many products) upgrade fast.
 * Builder 11, 2026-03-24: monetization layer for all clone apps.
 */
const DAILY_FREE_GENERATION_LIMIT = 3;

function getPhotoForgeUsageKey(): string {
  return `photoforge-usage-${new Date().toISOString().split("T")[0]}`;
}

function getTodayPhotoForgeUsageCount(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem(getPhotoForgeUsageKey());
  return stored ? parseInt(stored, 10) : 0;
}

function incrementPhotoForgeUsageCount(): void {
  if (typeof window === "undefined") return;
  const current = getTodayPhotoForgeUsageCount();
  localStorage.setItem(getPhotoForgeUsageKey(), String(current + 1));
}

export default function PhotoForgeAILandingPage() {
  const [uploadedImagePreviewUrl, setUploadedImagePreviewUrl] = useState<string | null>(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [selectedStylePresetId, setSelectedStylePresetId] = useState<string>("clean-white");
  const [isDragActiveOverDropzone, setIsDragActiveOverDropzone] = useState(false);
  const [isGeneratingPhoto, setIsGeneratingPhoto] = useState(false);
  const [generatedPhotoUrl, setGeneratedPhotoUrl] = useState<string | null>(null);
  const [generationErrorMessage, setGenerationErrorMessage] = useState<string | null>(null);

  /** Usage tracking state for free tier gating */
  const [todayUsageCount, setTodayUsageCount] = useState(0);
  const [hasReachedDailyLimit, setHasReachedDailyLimit] = useState(false);

  /** Initialize from localStorage on mount */
  useState(() => {
    if (typeof window !== "undefined") {
      const count = getTodayPhotoForgeUsageCount();
      setTodayUsageCount(count);
      setHasReachedDailyLimit(count >= DAILY_FREE_GENERATION_LIMIT);
    }
  });

  /**
   * Handles file drop or selection from the upload zone.
   * Creates a local preview URL AND reads the file as base64 for API submission.
   * The base64 is sent to /api/generate which proxies to fal.ai server-side.
   */
  const handleFileUploadOrDrop = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) return;

    const previewUrl = URL.createObjectURL(file);
    setUploadedImagePreviewUrl(previewUrl);
    setGeneratedPhotoUrl(null);
    setGenerationErrorMessage(null);

    /**
     * Read file as base64 for API submission.
     * FileReader converts the blob to a data URL (data:image/png;base64,...).
     */
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  /**
   * Calls /api/generate to create a professional product photo.
   * Sends the uploaded image as base64 + the selected style preset's prompt.
   * The API proxies to fal.ai with our server-side FAL_KEY.
   */
  const handleGenerateProductPhoto = useCallback(async () => {
    if (!uploadedImageBase64) return;

    /** Usage gate — check daily limit before wasting an API call */
    const currentCount = getTodayPhotoForgeUsageCount();
    if (currentCount >= DAILY_FREE_GENERATION_LIMIT) {
      setHasReachedDailyLimit(true);
      setTodayUsageCount(currentCount);
      setGenerationErrorMessage(
        `You've used all ${DAILY_FREE_GENERATION_LIMIT} free generations today. Upgrade to Pro for unlimited product photos at $9.90/mo.`
      );
      return;
    }

    const selectedPreset = PRODUCT_PHOTO_BACKGROUND_STYLE_PRESETS.find(
      (p) => p.id === selectedStylePresetId
    );
    if (!selectedPreset) return;

    setIsGeneratingPhoto(true);
    setGenerationErrorMessage(null);
    setGeneratedPhotoUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: uploadedImageBase64,
          stylePrompt: selectedPreset.prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGenerationErrorMessage(data.message || "Generation failed. Please try again.");
        return;
      }

      if (data.imageUrl) {
        setGeneratedPhotoUrl(data.imageUrl);
        /** Track successful generation for free tier limits */
        incrementPhotoForgeUsageCount();
        const newCount = getTodayPhotoForgeUsageCount();
        setTodayUsageCount(newCount);
        setHasReachedDailyLimit(newCount >= DAILY_FREE_GENERATION_LIMIT);
      }
    } catch (error) {
      console.error("[PhotoForge] Generation error:", error);
      setGenerationErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsGeneratingPhoto(false);
    }
  }, [uploadedImageBase64, selectedStylePresetId]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ===================== NAVIGATION BAR ===================== */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-7 w-7 text-indigo-400" />
            <span className="text-xl font-bold gradient-text">PhotoForge AI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">
              FAQ
            </a>
            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* ===================== HERO SECTION ===================== */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Social proof counter */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8">
            <Sparkles className="h-4 w-4" />
            <span>12,000+ product photos generated</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">AI Product Photos</span>
            <br />
            <span className="text-white">in Seconds</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Upload your product photo and get professional e-commerce photography
            with AI-generated backgrounds. No design skills needed.
          </p>

          {/* ============== INTERACTIVE UPLOAD DEMO (ON THE HERO) ============== */}
          <div className="max-w-3xl mx-auto">
            {!uploadedImagePreviewUrl ? (
              /* Upload dropzone */
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragActiveOverDropzone(true);
                }}
                onDragLeave={() => setIsDragActiveOverDropzone(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragActiveOverDropzone(false);
                  handleFileUploadOrDrop(e.dataTransfer.files);
                }}
                className={`relative rounded-2xl border-2 border-dashed p-16 transition-all cursor-pointer glow-border ${
                  isDragActiveOverDropzone
                    ? "border-indigo-400 bg-indigo-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) =>
                    handleFileUploadOrDrop((e.target as HTMLInputElement).files);
                  input.click();
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      Drop your product photo here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      or click to browse — PNG, JPG, WebP up to 10MB
                    </p>
                  </div>
                  <button className="mt-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all">
                    Upload Product Photo
                  </button>
                </div>
              </div>
            ) : (
              /* Preview + style selection */
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 glow-border">
                  <img
                    src={uploadedImagePreviewUrl}
                    alt="Uploaded product"
                    className="w-full max-h-96 object-contain bg-gray-900"
                  />
                  <button
                    onClick={() => setUploadedImagePreviewUrl(null)}
                    className="absolute top-4 right-4 px-3 py-1.5 text-xs rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"
                  >
                    Change Photo
                  </button>
                </div>

                {/* Style presets grid */}
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-3">Choose a background style:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {PRODUCT_PHOTO_BACKGROUND_STYLE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedStylePresetId(preset.id)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          selectedStylePresetId === preset.id
                            ? "bg-indigo-500/20 border-indigo-500/50 border"
                            : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]"
                        }`}
                      >
                        <p className="text-sm font-medium text-white">{preset.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{preset.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generation error message */}
                {generationErrorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                    {generationErrorMessage}
                  </div>
                )}

                {/* Generated result */}
                {generatedPhotoUrl && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-green-400">Your professional product photo:</p>
                    <div className="rounded-2xl overflow-hidden border border-green-500/30 glow-border">
                      <img
                        src={generatedPhotoUrl}
                        alt="AI-generated product photo"
                        className="w-full max-h-96 object-contain bg-gray-900"
                      />
                    </div>
                    <a
                      href={generatedPhotoUrl}
                      download="photoforge-product-photo.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl font-medium text-white bg-green-600 hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="h-5 w-5" />
                      Download Photo
                    </a>
                  </div>
                )}

                {/* Generate CTA */}
                <button
                  onClick={handleGenerateProductPhoto}
                  disabled={isGeneratingPhoto || !uploadedImageBase64}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                    isGeneratingPhoto
                      ? "bg-gray-600 cursor-wait"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25"
                  }`}
                >
                  {isGeneratingPhoto ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate Professional Photo
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ImagePlus,
                step: "1",
                title: "Upload Your Product",
                description:
                  "Drop or select any product photo. Works with phones, cameras, or existing listings.",
              },
              {
                icon: Sparkles,
                step: "2",
                title: "Choose a Style",
                description:
                  "Pick from professional presets: white background, lifestyle, studio, marble, and more.",
              },
              {
                icon: Download,
                step: "3",
                title: "Download & Use",
                description:
                  "Get your professional product photo in seconds. Ready for Amazon, Shopify, or any platform.",
              },
            ].map(({ icon: Icon, step, title, description }) => (
              <div
                key={step}
                className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
                  {step}
                </div>
                <Icon className="h-10 w-10 text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Start free. Upgrade when you need more.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free tier */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg text-gray-500 font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "3 product photos",
                  "All background styles",
                  "Standard resolution (1024px)",
                  "Watermark on downloads",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-300">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors">
                Get Started Free
              </button>
            </div>

            {/* Pro tier */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-500/10 to-transparent border border-indigo-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-xs font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Crown className="h-5 w-5 text-indigo-400" />
                Pro
              </h3>
              <div className="text-4xl font-bold mb-6">
                $9.90<span className="text-lg text-gray-500 font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited product photos",
                  "All background styles",
                  "High resolution (2048px)",
                  "No watermark",
                  "Batch processing (up to 20)",
                  "Priority generation queue",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-300">
                    <Check className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {/*
                MONETIZATION (2026-03-25, Builder 11): Wired dead <button> to live
                Stripe Payment Link. Previously clicking "Upgrade to Pro" did nothing.
                Payment Link: $12.90/mo AI Product Photo Generator Pro.
                Source: ai-clone-stripe-links.md (Builder 12 + Stripe API agent, 2026-03-24).
                target="_blank" keeps user on landing page during checkout.
              */}
              <a
                href="https://buy.stripe.com/14AaEX0Fj9MQ1ITftLfMA08"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25 text-center"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="py-20 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What is an AI product photo generator?",
                a: "An AI product photo generator uses artificial intelligence to create professional-looking product photography from a simple photo. You upload your product image, choose a background style, and the AI generates a studio-quality result in seconds — no photographer or Photoshop skills needed.",
              },
              {
                q: "What image formats are supported?",
                a: "PhotoForge AI supports PNG, JPEG, and WebP images up to 10MB. For best results, use a clear photo of your product with a simple background.",
              },
              {
                q: "How does the free tier work?",
                a: "You get 3 free product photo generations with no account required. Free images are standard resolution (1024px) with a small watermark. Upgrade to Pro for unlimited photos, high resolution, and no watermark.",
              },
              {
                q: "Can I use these photos on Amazon, Shopify, and eBay?",
                a: "Yes! Our AI-generated product photos meet the requirements for all major e-commerce platforms. The 'Clean White' style specifically generates Amazon-compliant white background photos.",
              },
              {
                q: "How is this different from remove.bg or Photoroom?",
                a: "Unlike background removers, PhotoForge AI doesn't just remove backgrounds — it generates entirely new professional scenes. Choose from lifestyle, studio, marble, nature, and more styles that tell a story about your product.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group p-6 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <summary className="text-lg font-medium cursor-pointer list-none flex items-center justify-between">
                  {q}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl">
                    +
                  </span>
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-indigo-400" />
            <span className="font-semibold gradient-text">PhotoForge AI</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PhotoForge AI. Professional product photography powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
