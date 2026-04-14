import type { NormalizedTraitProfile } from "@/lib/traits/schema";
import { clampTrait, normalizedTraitProfileSchema } from "@/lib/traits/schema";
import type { AxisScores } from "./axes";
import { lettersFromAxes } from "./axes";
import { SBTI_QUESTIONS, type SBTIQuestion } from "./questions-data";
import { getSBTITypeDefinition, typeCodeFromScores } from "./types-catalog";

export type SBTIResultPayload = {
  typeCode: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  chaosLevel: number;
  postingStyle: string;
  idealJob: string;
  friendGroupRole: string;
  compatibleWith: string[];
  axes: AxisScores;
  normalized: NormalizedTraitProfile;
};

const MAX_PER_AXIS = SBTI_QUESTIONS.length * 3;

function sumWeightsForAxis(
  answers: Record<string, string>,
  axis: "e" | "o" | "v" | "a",
): number {
  let sum = 0;
  for (const q of SBTI_QUESTIONS) {
    const optId = answers[q.id];
    if (!optId) continue;
    const opt = q.options.find((o) => o.id === optId);
    if (!opt) continue;
    sum += opt.weights[axis];
  }
  return sum;
}

/** Map raw axis sums (~[-3n,3n]) to 0–100 */
function rawSumToScore(raw: number): number {
  const clamped = Math.max(-MAX_PER_AXIS, Math.min(MAX_PER_AXIS, raw));
  const t = (clamped + MAX_PER_AXIS) / (2 * MAX_PER_AXIS);
  return clampTrait(t * 100);
}

export function scoreSBTIResult(answers: Record<string, string | number>): AxisScores {
  const strAnswers: Record<string, string> = {};
  for (const [k, v] of Object.entries(answers)) {
    strAnswers[k] = String(v);
  }
  return {
    e: rawSumToScore(sumWeightsForAxis(strAnswers, "e")),
    o: rawSumToScore(sumWeightsForAxis(strAnswers, "o")),
    v: rawSumToScore(sumWeightsForAxis(strAnswers, "v")),
    a: rawSumToScore(sumWeightsForAxis(strAnswers, "a")),
  };
}

export function generateSBTIType(scores: AxisScores): string {
  return lettersFromAxes(scores);
}

/** Map SBTI axes + type into the shared normalized trait graph */
export function axesToNormalizedProfile(scores: AxisScores): NormalizedTraitProfile {
  const e = scores.e;
  const o = scores.o;
  const v = scores.v;
  const a = scores.a;
  const profile = {
    sociability: e,
    structure: o,
    emotionalIntensity: v,
    noveltySeeking: clampTrait(100 - o + (v - 50) * 0.5),
    dominance: a,
    absurdity: clampTrait((100 - o) * 0.55 + v * 0.45),
    sincerity: clampTrait(100 - Math.abs(v - 50) * 0.4 + (50 - Math.abs(e - 50)) * 0.3),
    chaos: clampTrait(100 - o),
    selfAwareness: clampTrait(45 + (100 - Math.abs(e - v)) * 0.35),
    groupOrientation: clampTrait((e + (100 - a)) / 2),
  };
  return normalizedTraitProfileSchema.parse(profile);
}

export function buildSBTIResultPayload(scores: AxisScores): SBTIResultPayload {
  const typeCode = typeCodeFromScores(scores);
  const def = getSBTITypeDefinition(typeCode);
  return {
    typeCode: def.code,
    name: def.name,
    tagline: def.tagline,
    description: def.description,
    strengths: def.strengths,
    weaknesses: def.weaknesses,
    chaosLevel: def.chaosLevel,
    postingStyle: def.postingStyle,
    idealJob: def.idealJob,
    friendGroupRole: def.friendGroupRole,
    compatibleWith: def.compatibleWith,
    axes: scores,
    normalized: axesToNormalizedProfile(scores),
  };
}

/** Pure test runner: answers → full payload */
export function takeSBTITest(answers: Record<string, string | number>): SBTIResultPayload {
  const scores = scoreSBTIResult(answers);
  return buildSBTIResultPayload(scores);
}

export function getSBTIQuestionList(): SBTIQuestion[] {
  return SBTI_QUESTIONS;
}

export function validateSBTIAnswersComplete(answers: Record<string, string | number>): boolean {
  return SBTI_QUESTIONS.every((q) => answers[q.id] !== undefined && answers[q.id] !== "");
}
