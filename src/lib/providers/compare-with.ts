import type { NormalizedTraitProfile } from "@/lib/traits/schema";
import { comparePersonalitySystems } from "@/lib/comparison/engine";
import { getPersonalityProvider } from "./registry";

export function compareWithProvider(
  providerId: string,
  userInput: unknown,
  sbtiNormalized: NormalizedTraitProfile,
) {
  const provider = getPersonalityProvider(providerId);
  if (!provider) {
    throw new Error(`Unknown provider: ${providerId}`);
  }
  const normalized = provider.normalizeResult(userInput);
  const mapping = provider.mapToSBTI(normalized);
  const comparison = comparePersonalitySystems(sbtiNormalized, normalized);
  return {
    providerId,
    label: provider.getResultLabel(userInput),
    normalized,
    mapping,
    comparison,
  };
}
