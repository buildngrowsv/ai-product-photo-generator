"use client";

declare global {
  interface Window {
    dataLayer?: Object[];
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, params);
}

export function trackViewPricing(surface = "pricing_section") {
  trackEvent("view_pricing", { surface });
}

export function trackBeginCheckout(surface: string, priceId?: string) {
  trackEvent("begin_checkout", {
    surface,
    ...(priceId ? { price_id: priceId } : {}),
  });
}

export function trackProductPhotoRequested() {
  trackEvent("product_photo_generation_requested", { surface: "hero" });
}

export function trackProductPhotoCompleted() {
  trackEvent("product_photo_generation_completed", { surface: "hero" });
}

export function trackProductPhotoDownloaded() {
  trackEvent("product_photo_downloaded", { surface: "hero" });
}

export function trackEmailCaptureSubmitted() {
  trackEvent("email_capture_submitted", { surface: "email_gate" });
}
