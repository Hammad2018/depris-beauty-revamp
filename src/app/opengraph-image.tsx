import { ImageResponse } from "next/og";

export const alt = "Depris Beauty, Glass-skin, backed by science.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #212B74 0%, #2E3C9E 45%, #2FA39A 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, color: "#AFC3F2", textTransform: "uppercase" }}>
          Advanced Korean Skincare
        </div>
        <div style={{ fontSize: 86, color: "#FFFFFF", marginTop: 16, lineHeight: 1.05 }}>
          Turn back the clock,
        </div>
        <div style={{ fontSize: 86, color: "#E6EEF2", fontStyle: "italic", lineHeight: 1.05 }}>one drop at a time.</div>
        <div style={{ fontSize: 34, color: "#FFFFFF", marginTop: 40 }}>Depris Beauty</div>
      </div>
    ),
    size,
  );
}
