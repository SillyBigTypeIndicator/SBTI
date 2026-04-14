import type { NormalizedTraitProfile } from "@/lib/traits/schema";
import type { AxisScores } from "@/lib/sbti/axes";
import { lettersFromAxes } from "@/lib/sbti/axes";
import type { SBTIMappingResult } from "./adapter-types";

/** Deterministic mapping from normalized traits → SBTI axis scores */
export function normalizedProfileToAxes(p: NormalizedTraitProfile): AxisScores {
  return {
    e: (p.sociability + p.groupOrientation) / 2,
    o: p.structure,
    v: p.emotionalIntensity,
    a: p.dominance,
  };
}

export function confidenceFromAxes(scores: AxisScores): number {
  const d =
    (Math.abs(scores.e - 50) +
      Math.abs(scores.o - 50) +
      Math.abs(scores.v - 50) +
      Math.abs(scores.a - 50)) /
    200;
  return Math.round(Math.min(1, Math.max(0, d)) * 1000) / 1000;
}

export function mapNormalizedToSBTI(
  profile: NormalizedTraitProfile,
  rationalePrefix: string,
): SBTIMappingResult {
  const axes = normalizedProfileToAxes(profile);
  const code = lettersFromAxes(axes);
  const c = confidenceFromAxes(axes);
  return {
    predictedTypeCode: code,
    confidence: c,
    rationale: `${rationalePrefix} Trait graph → SBTI axes (E/I:${axes.e.toFixed(0)}, O/L:${axes.o.toFixed(0)}, V/M:${axes.v.toFixed(0)}, A/P:${axes.a.toFixed(0)}).`,
  };
}
