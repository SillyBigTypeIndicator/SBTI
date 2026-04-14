import { z } from "zod";
import type { PersonalityTestAdapter, SupportedInputMode } from "./adapter-types";

const supportedInputSchema = z.enum(["manual", "quiz", "json", "hybrid"]);

const adapterShape = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  description: z.string(),
  supportedInput: supportedInputSchema,
  normalizeResult: z.function(),
  mapToSBTI: z.function(),
  getResultLabel: z.function(),
});

export type AdapterValidationResult =
  | { ok: true; adapter: PersonalityTestAdapter }
  | { ok: false; errors: string[] };

/** Structural validation only — adapters must still handle bad input at runtime */
export function validatePersonalityAdapter(candidate: unknown): AdapterValidationResult {
  const parsed = adapterShape.safeParse(candidate);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
    };
  }
  return { ok: true, adapter: candidate as PersonalityTestAdapter };
}

export function assertSupportedInput(x: string): SupportedInputMode {
  return supportedInputSchema.parse(x);
}
