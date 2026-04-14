import { describe, expect, it } from "vitest";
import { registerPersonalityProvider, getPersonalityProvider, getAvailablePersonalityProviders } from "@/lib/providers/registry";
import { validatePersonalityAdapter } from "@/lib/providers/validate";
import type { PersonalityTestAdapter } from "@/lib/providers/adapter-types";
import { mapNormalizedToSBTI } from "@/lib/providers/rules-engine";

describe("personality providers", () => {
  it("registers built-in providers", () => {
    const list = getAvailablePersonalityProviders();
    expect(list.map((p) => p.id).sort()).toContain("letter-compass");
    expect(list.map((p) => p.id).sort()).toContain("ocean-five");
  });

  it("rejects invalid adapter shape", () => {
    const bad = { id: "" };
    const v = validatePersonalityAdapter(bad);
    expect(v.ok).toBe(false);
  });

  it("accepts a minimal valid adapter", () => {
    const a: PersonalityTestAdapter = {
      id: "test-adapter",
      displayName: "Test",
      description: "Test",
      supportedInput: "manual",
      normalizeResult: () => ({
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
      }),
      mapToSBTI: (p) => mapNormalizedToSBTI(p, "Test →"),
      getResultLabel: () => "X",
    };
    expect(validatePersonalityAdapter(a).ok).toBe(true);
    registerPersonalityProvider(a);
    expect(getPersonalityProvider("test-adapter")).toBeDefined();
  });
});
