/**
 * Template — copy to a new file and fill in.
 * Register with registerPersonalityProvider() from "@/lib/providers/registry".
 */
import type { NormalizedTraitProfile } from "@/lib/traits/schema";
import type { PersonalityTestAdapter } from "@/lib/providers/adapter-types";
import { mapNormalizedToSBTI } from "@/lib/providers/rules-engine";

export const exampleTemplateAdapter: PersonalityTestAdapter = {
  id: "example-template",
  displayName: "Example Template",
  description: "Replace this copy with your own system.",
  supportedInput: "manual",
  normalizeResult(input: unknown): NormalizedTraitProfile {
    void input;
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
  },
  mapToSBTI(profile: NormalizedTraitProfile) {
    return mapNormalizedToSBTI(profile, "Example →");
  },
  getResultLabel() {
    return "Example";
  },
};
