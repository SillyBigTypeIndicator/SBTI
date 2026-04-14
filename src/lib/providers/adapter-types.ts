import type { NormalizedTraitProfile } from "@/lib/traits/schema";

export type SupportedInputMode = "manual" | "quiz" | "json" | "hybrid";

export type ExternalTestResult = {
  providerId: string;
  rawLabel: string;
  /** Optional provider-native scores */
  nativeScores?: Record<string, number>;
  normalized: NormalizedTraitProfile;
};

export type SBTIMappingResult = {
  predictedTypeCode: string;
  confidence: number;
  rationale: string;
};

/**
 * Formal adapter interface — external tests map into NormalizedTraitProfile,
 * then into SBTI via the shared rules engine (no edits to core SBTI scoring).
 */
export interface PersonalityTestAdapter {
  id: string;
  displayName: string;
  description: string;
  supportedInput: SupportedInputMode;
  normalizeResult(input: unknown): NormalizedTraitProfile;
  scoreQuiz?(answers: Record<string, string | number>): ExternalTestResult;
  mapToSBTI(profile: NormalizedTraitProfile): SBTIMappingResult;
  getResultLabel(input: unknown): string;
}
