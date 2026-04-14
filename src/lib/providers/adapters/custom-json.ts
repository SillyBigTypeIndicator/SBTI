import { z } from "zod";
import { normalizedTraitProfileSchema, type NormalizedTraitProfile } from "@/lib/traits/schema";
import type { ExternalTestResult, PersonalityTestAdapter } from "../adapter-types";
import { mapNormalizedToSBTI } from "../rules-engine";

const customPackSchema = z.object({
  label: z.string().optional(),
  traits: normalizedTraitProfileSchema,
});

export type CustomJsonPack = z.infer<typeof customPackSchema>;

export const customJsonAdapter: PersonalityTestAdapter = {
  id: "custom-json",
  displayName: "Custom JSON trait pack",
  description:
    "Import a JSON object with a full NormalizedTraitProfile—ideal for third-party packs dropped into /tests/registry.",
  supportedInput: "json",
  normalizeResult(input: unknown): NormalizedTraitProfile {
    const parsed = customPackSchema.safeParse(
      typeof input === "string" ? JSON.parse(input) : input,
    );
    if (!parsed.success) {
      throw new Error(`Invalid custom JSON: ${parsed.error.message}`);
    }
    return normalizedTraitProfileSchema.parse(parsed.data.traits);
  },
  mapToSBTI(profile: NormalizedTraitProfile) {
    return mapNormalizedToSBTI(profile, "Custom JSON →");
  },
  getResultLabel(input: unknown): string {
    try {
      const raw = typeof input === "string" ? JSON.parse(input) : input;
      const p = customPackSchema.parse(raw);
      return p.label ?? "Custom pack";
    } catch {
      return "Custom pack";
    }
  },
};

export function parseCustomJsonImport(raw: string): ExternalTestResult {
  const data = JSON.parse(raw);
  const p = customPackSchema.parse(data);
  return {
    providerId: "custom-json",
    rawLabel: p.label ?? "custom",
    normalized: p.traits,
  };
}
