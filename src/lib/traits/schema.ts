import { z } from "zod";

/** Shared 0–100 trait space for all personality systems */
export const normalizedTraitKeys = [
  "sociability",
  "structure",
  "emotionalIntensity",
  "noveltySeeking",
  "dominance",
  "absurdity",
  "sincerity",
  "chaos",
  "selfAwareness",
  "groupOrientation",
] as const;

export type NormalizedTraitKey = (typeof normalizedTraitKeys)[number];

export const normalizedTraitProfileSchema = z.object({
  sociability: z.number().min(0).max(100),
  structure: z.number().min(0).max(100),
  emotionalIntensity: z.number().min(0).max(100),
  noveltySeeking: z.number().min(0).max(100),
  dominance: z.number().min(0).max(100),
  absurdity: z.number().min(0).max(100),
  sincerity: z.number().min(0).max(100),
  chaos: z.number().min(0).max(100),
  selfAwareness: z.number().min(0).max(100),
  groupOrientation: z.number().min(0).max(100),
});

export type NormalizedTraitProfile = z.infer<typeof normalizedTraitProfileSchema>;

export function emptyTraitProfile(): NormalizedTraitProfile {
  return {
    sociability: 50,
    structure: 50,
    emotionalIntensity: 50,
    noveltySeeking: 50,
    dominance: 50,
    absurdity: 50,
    sincerity: 50,
    chaos: 50,
    selfAwareness: 50,
    groupOrientation: 50,
  };
}

export function clampTrait(n: number): number {
  return Math.round(Math.min(100, Math.max(0, n)) * 10) / 10;
}
