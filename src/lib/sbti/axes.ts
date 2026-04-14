/** SBTI four-letter axes (each dimension is 0–100; letter = first code if ≥ 50 else second) */
export const SBTI_AXIS_CODES = [
  { hi: "E", lo: "I", labelHi: "Extro-feed", labelLo: "Inbox Hermit" },
  { hi: "O", lo: "L", labelHi: "Outline Brain", labelLo: "Loopcore" },
  { hi: "V", lo: "M", labelHi: "Volume Poster", labelLo: "Muted Lore" },
  { hi: "A", lo: "P", labelHi: "Attack-forward", labelLo: "Peace Treaty" },
] as const;

export type SBTIAxisLetter = "E" | "I" | "O" | "L" | "V" | "M" | "A" | "P";

export type AxisScores = {
  /** Extro-feed vs Inbox Hermit */
  e: number;
  /** Outline vs Loopcore */
  o: number;
  /** Volume vs Muted */
  v: number;
  /** Attack vs Peace */
  a: number;
};

export function lettersFromAxes(scores: AxisScores): string {
  const s = scores;
  return [
    s.e >= 50 ? "E" : "I",
    s.o >= 50 ? "O" : "L",
    s.v >= 50 ? "V" : "M",
    s.a >= 50 ? "A" : "P",
  ].join("");
}
