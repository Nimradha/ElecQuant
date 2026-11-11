import { ImageResponse } from "next/og";

export const alt = "ElecQuant | Tender-Ready Electrical Material Take-offs (AU & NZ)";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          backgroundColor: "#081325",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, #1e3a8a 0%, transparent 40%), radial-gradient(circle at 10% 90%, #991b1b 0%, transparent 35%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Header with Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  color: "#d9232a",
                  fontWeight: "900",
                }}
              >
                ⚡
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "36px",
                fontWeight: "900",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#ffffff" }}>Elec</span>
              <span style={{ color: "#ef4444" }}>Quant</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#93c5fd",
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "0.08em",
            }}
          >
            AUSTRALIA &amp; NEW ZEALAND
          </div>
        </div>

        {/* Main Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "58px",
              fontWeight: "900",
              lineHeight: "1.1",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Send the drawings.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "58px",
              fontWeight: "900",
              lineHeight: "1.1",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            <span>We&apos;ll send back the&nbsp;</span>
            <span style={{ color: "#ef4444" }}>quantities.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: "1.4",
              marginTop: "12px",
            }}
          >
            Accurate, tender-ready electrical material take-offs for contractors in AU &amp; NZ.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: "8px",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#fca5a5",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              AS/NZS 3000 Standards
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: "8px",
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                color: "#93c5fd",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              Fixed-Price Quotes
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#e2e8f0",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              Confidential &amp; NDA Ready
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "#cbd5e1",
              fontSize: "20px",
              fontWeight: "700",
              letterSpacing: "0.02em",
            }}
          >
            elec-quant.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
