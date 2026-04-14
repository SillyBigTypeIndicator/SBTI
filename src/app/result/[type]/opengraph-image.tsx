import { ImageResponse } from "next/og";
import { getSBTITypeDefinition } from "@/lib/sbti/types-catalog";

export const runtime = "edge";

type Props = { params: Promise<{ type: string }> };

export default async function Image({ params }: Props) {
  const { type } = await params;
  const code = type.toUpperCase();
  const t = getSBTITypeDefinition(code);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 48,
          background: "linear-gradient(135deg, #4c1d95 0%, #a21caf 45%, #f59e0b 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9 }}>Silly Big Type Indicator</div>
        <div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{t.name}</div>
          <div style={{ marginTop: 12, fontSize: 28, opacity: 0.95 }}>{t.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: 24 }}>
          <span style={{ fontWeight: 600 }}>{t.code}</span>
          <span style={{ opacity: 0.9 }}>Chaos {t.chaosLevel}/10</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
