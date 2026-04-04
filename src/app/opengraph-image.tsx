/**
 * Dynamic OG image for PhotoForge AI (ai-product-photo-generator).
 *
 * T167, Builder 2, 2026-04-04: Social shares show a branded preview card.
 * 1200x630 standard OG format.
 * ACCENT: Emerald/teal matching the product photo/ecommerce brand.
 */
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.12) 0%, transparent 60%), " +
            "radial-gradient(circle at 70% 80%, rgba(20,184,166,0.10) 0%, transparent 60%)",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div style={{ fontSize: 72, marginBottom: 24, lineHeight: 1 }}>📸</div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #10b981 100%)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          PhotoForge AI
        </div>

        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            fontWeight: 400,
            maxWidth: 800,
            marginBottom: 40,
          }}
        >
          Studio-quality AI product photos for ecommerce
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["White Background", "Lifestyle Scenes", "Amazon Ready", "Batch Generate"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  background: "rgba(16,185,129,0.10)",
                  border: "1px solid rgba(16,185,129,0.28)",
                  borderRadius: 9999,
                  padding: "8px 20px",
                  fontSize: 17,
                  color: "#10b981",
                  fontWeight: 500,
                }}
              >
                {badge}
              </div>
            )
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "rgba(255,255,255,0.30)",
            letterSpacing: "0.5px",
          }}
        >
          aiproductphotomaker.com
        </div>
      </div>
    ),
    { ...size }
  );
}
