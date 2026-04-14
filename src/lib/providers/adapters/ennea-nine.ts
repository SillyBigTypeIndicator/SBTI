import type { NormalizedTraitProfile } from "@/lib/traits/schema";
import type { ExternalTestResult, PersonalityTestAdapter } from "../adapter-types";
import { mapNormalizedToSBTI } from "../rules-engine";

/** Nine-archetype map — original flavor text, not clinical typing */
const TYPE_CURVES: Record<number, NormalizedTraitProfile> = {
  1: {
    sociability: 42,
    structure: 88,
    emotionalIntensity: 48,
    noveltySeeking: 35,
    dominance: 55,
    absurdity: 22,
    sincerity: 72,
    chaos: 18,
    selfAwareness: 70,
    groupOrientation: 50,
  },
  2: {
    sociability: 78,
    structure: 55,
    emotionalIntensity: 62,
    noveltySeeking: 48,
    dominance: 35,
    absurdity: 40,
    sincerity: 85,
    chaos: 38,
    selfAwareness: 58,
    groupOrientation: 82,
  },
  3: {
    sociability: 80,
    structure: 72,
    emotionalIntensity: 58,
    noveltySeeking: 65,
    dominance: 68,
    absurdity: 45,
    sincerity: 48,
    chaos: 42,
    selfAwareness: 75,
    groupOrientation: 70,
  },
  4: {
    sociability: 52,
    structure: 38,
    emotionalIntensity: 82,
    noveltySeeking: 72,
    dominance: 42,
    absurdity: 68,
    sincerity: 78,
    chaos: 62,
    selfAwareness: 88,
    groupOrientation: 48,
  },
  5: {
    sociability: 28,
    structure: 62,
    emotionalIntensity: 40,
    noveltySeeking: 78,
    dominance: 38,
    absurdity: 55,
    sincerity: 60,
    chaos: 48,
    selfAwareness: 82,
    groupOrientation: 32,
  },
  6: {
    sociability: 58,
    structure: 62,
    emotionalIntensity: 72,
    noveltySeeking: 42,
    dominance: 40,
    absurdity: 35,
    sincerity: 68,
    chaos: 45,
    selfAwareness: 62,
    groupOrientation: 72,
  },
  7: {
    sociability: 75,
    structure: 35,
    emotionalIntensity: 70,
    noveltySeeking: 92,
    dominance: 48,
    absurdity: 85,
    sincerity: 55,
    chaos: 78,
    selfAwareness: 58,
    groupOrientation: 65,
  },
  8: {
    sociability: 62,
    structure: 58,
    emotionalIntensity: 68,
    noveltySeeking: 55,
    dominance: 92,
    absurdity: 48,
    sincerity: 45,
    chaos: 62,
    selfAwareness: 60,
    groupOrientation: 55,
  },
  9: {
    sociability: 48,
    structure: 42,
    emotionalIntensity: 38,
    noveltySeeking: 45,
    dominance: 32,
    absurdity: 40,
    sincerity: 70,
    chaos: 35,
    selfAwareness: 62,
    groupOrientation: 60,
  },
};

export function enneaTypeToNormalized(t: number): NormalizedTraitProfile {
  const base = TYPE_CURVES[Math.round(t)];
  if (!base) throw new Error("Type must be 1–9");
  return { ...base };
}

export const enneaNineAdapter: PersonalityTestAdapter = {
  id: "ennea-nine",
  displayName: "Nine Archetype Map (style)",
  description:
    "Pick an archetype number (1–9) for a playful mapping into normalized traits—entertainment only.",
  supportedInput: "hybrid",
  normalizeResult(input: unknown): NormalizedTraitProfile {
    const n = typeof input === "object" && input && "type" in input ? Number((input as { type: number }).type) : Number(input);
    if (Number.isNaN(n)) throw new Error("Expected { type: 1-9 } or a number");
    return enneaTypeToNormalized(n);
  },
  scoreQuiz(answers: Record<string, string | number>): ExternalTestResult {
    const t = Number(answers["en1"] ?? 5);
    const normalized = enneaTypeToNormalized(t);
    return {
      providerId: "ennea-nine",
      rawLabel: `Type ${Math.round(t)}`,
      normalized,
    };
  },
  mapToSBTI(profile: NormalizedTraitProfile) {
    return mapNormalizedToSBTI(profile, "Nine-map →");
  },
  getResultLabel(input: unknown): string {
    const n = typeof input === "object" && input && "type" in input ? Number((input as { type: number }).type) : Number(input);
    return `Type ${n}`;
  },
};
