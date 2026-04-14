import { describe, expect, it } from "vitest";
import { takeSBTITest, scoreSBTIResult, generateSBTIType, validateSBTIAnswersComplete } from "@/lib/sbti/scoring";
import { SBTI_QUESTIONS } from "@/lib/sbti/questions-data";
import { allTypeCodes } from "@/lib/sbti/types-catalog";

describe("SBTI scoring", () => {
  it("scores a neutral-ish answer set", () => {
    const answers: Record<string, string> = {};
    for (const q of SBTI_QUESTIONS) {
      answers[q.id] = q.options[0]!.id;
    }
    const axes = scoreSBTIResult(answers);
    expect(axes.e).toBeGreaterThanOrEqual(0);
    expect(axes.e).toBeLessThanOrEqual(100);
    const code = generateSBTIType(axes);
    expect(code).toHaveLength(4);
  });

  it("completes full test path", () => {
    const answers: Record<string, string> = {};
    for (const q of SBTI_QUESTIONS) {
      answers[q.id] = q.options[1]?.id ?? q.options[0]!.id;
    }
    expect(validateSBTIAnswersComplete(answers)).toBe(true);
    const result = takeSBTITest(answers);
    expect(result.typeCode).toMatch(/^[EI][OL][VM][AP]$/);
    expect(result.normalized.sociability).toBeGreaterThanOrEqual(0);
  });

  it("has 16 catalogued types", () => {
    expect(allTypeCodes().length).toBe(16);
  });
});
