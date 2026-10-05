import { ImageResponse } from "next/og";

export const alt = "Depris Beauty — Glass-skin, backed by science.";
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
          background: "linear-gradient(135deg, #F7D9D4 0%, #FBF5ED 45%, #E6EEE2 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, color: "#8A6A3E", textTransform: "uppercase" }}>
          Advanced Korean Skincare
        </div>
        <div style={{ fontSize: 88, color: "#2E2822", marginTop: 16, lineHeight: 1.05 }}>
          Glass-skin, backed
        </div>
        <div style={{ fontSize: 88, color: "#C9736B", fontStyle: "italic", lineHeight: 1.05 }}>by science.</div>
        <div style={{ fontSize: 34, color: "#2E2822", marginTop: 40 }}>Depris Beauty</div>
      </div>
    ),
    size,
  );
}
