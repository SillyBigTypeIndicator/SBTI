import { clampTrait, type NormalizedTraitProfile } from "@/lib/traits/schema";
import type { ExternalTestResult, PersonalityTestAdapter } from "../adapter-types";
import { mapNormalizedToSBTI } from "../rules-engine";

/** “Big Five”-style OCEAN sliders — educational parody mapping */
export type OceanInput = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
};

function scale(v: number): number {
  if (v <= 5 && v >= 1) return clampTrait(((v - 1) / 4) * 100);
  return clampTrait(v);
}

export function oceanToNormalized(o: OceanInput): NormalizedTraitProfile {
  const O = scale(o.openness);
  const C = scale(o.conscientiousness);
  const E = scale(o.extraversion);
  const A = scale(o.agreeableness);
  const N = scale(o.neuroticism);

  return {
    sociability: E,
    structure: C,
    emotionalIntensity: N,
    noveltySeeking: O,
    dominance: clampTrait(100 - A + 20),
    absurdity: clampTrait(O * 0.45 + (100 - C) * 0.35 + N * 0.2),
    sincerity: A,
    chaos: clampTrait(100 - C + N * 0.15),
    selfAwareness: clampTrait(55 + (N - 50) * 0.25 + (100 - O) * 0.05),
    groupOrientation: clampTrait((E + A) / 2),
  };
}

export const oceanFiveAdapter: PersonalityTestAdapter = {
  id: "ocean-five",
  displayName: "Ocean Five (style)",
  description:
    "OCEAN-style sliders (openness, conscientiousness, extraversion, agreeableness, neuroticism) normalized to the shared trait graph.",
  supportedInput: "hybrid",
  normalizeResult(input: unknown): NormalizedTraitProfile {
    const o = input as OceanInput;
    if (
      typeof o?.openness !== "number" ||
      typeof o?.conscientiousness !== "number" ||
      typeof o?.extraversion !== "number" ||
      typeof o?.agreeableness !== "number" ||
      typeof o?.neuroticism !== "number"
    ) {
      throw new Error("Expected { openness, conscientiousness, extraversion, agreeableness, neuroticism } as numbers (1–5 or 0–100)");
    }
    return oceanToNormalized(o);
  },
  scoreQuiz(answers: Record<string, string | number>): ExternalTestResult {
    const num = (k: string) => Number(answers[k] ?? 3);
    const profile = oceanToNormalized({
      openness: num("o1"),
      conscientiousness: num("o2"),
      extraversion: num("o3"),
      agreeableness: num("o4"),
      neuroticism: num("o5"),
    });
    return {
      providerId: "ocean-five",
      rawLabel: `O${Math.round(num("o1"))}C${Math.round(num("o2"))}E${Math.round(num("o3"))}A${Math.round(num("o4"))}N${Math.round(num("o5"))}`,
      normalized: profile,
    };
  },
  mapToSBTI(profile: NormalizedTraitProfile) {
    return mapNormalizedToSBTI(profile, "Ocean Five →");
  },
  getResultLabel(input: unknown): string {
    try {
      const p = oceanToNormalized(input as OceanInput);
      return `O${p.noveltySeeking.toFixed(0)} · C${p.structure.toFixed(0)} · E${p.sociability.toFixed(0)}`;
    } catch {
      return "OCEAN profile";
    }
  },
};
