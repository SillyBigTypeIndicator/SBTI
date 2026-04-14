import { clampTrait, type NormalizedTraitProfile } from "@/lib/traits/schema";
import type { ExternalTestResult, PersonalityTestAdapter } from "../adapter-types";
import { mapNormalizedToSBTI } from "../rules-engine";

/** Parody “four-letter compass” — not affiliated with any commercial instrument */
const LETTERS = /^[EI][SN][TF][JP]$/;

function letterScore(hi: boolean): number {
  return hi ? 72 : 28;
}

function normalizeFromCompass(compass: string): NormalizedTraitProfile {
  const c = compass.toUpperCase();
  if (!LETTERS.test(c)) {
    throw new Error("Expected four letters like ENTJ (E/I, S/N, T/F, J/P)");
  }
  const [e, sn, tf, jp] = c.split("") as [string, string, string, string];
  const sociability = letterScore(e === "E");
  const groupOrientation = clampTrait(sociability + (e === "E" ? 5 : -5));
  const noveltySeeking = letterScore(sn === "N");
  const structure = letterScore(jp === "J");
  const chaos = clampTrait(100 - structure + (sn === "N" ? 8 : -4));
  const dominance = letterScore(tf === "T");
  const sincerity = letterScore(tf === "F");
  const emotionalIntensity = clampTrait(50 + (sn === "N" ? 12 : -8) + (tf === "F" ? 10 : -4));
  const absurdity = clampTrait(55 + (sn === "N" ? 10 : -6) + (jp === "P" ? 8 : -6));
  const selfAwareness = clampTrait(52 + (tf === "F" ? 8 : 4));

  return {
    sociability,
    structure,
    emotionalIntensity,
    noveltySeeking,
    dominance,
    absurdity,
    sincerity,
    chaos,
    selfAwareness,
    groupOrientation,
  };
}

const quizQuestions = [
  { id: "lc1", prompt: "Weekend battery", options: [
    { id: "e", label: "People recharge me", axis: "E" as const },
    { id: "i", label: "Solo time recharges me", axis: "I" as const },
  ]},
  { id: "lc2", prompt: "You prefer ideas that are…", options: [
    { id: "n", label: "Abstract / what-if", axis: "N" as const },
    { id: "s", label: "Concrete / what-is", axis: "S" as const },
  ]},
  { id: "lc3", prompt: "Decisions lean on…", options: [
    { id: "t", label: "Logic first", axis: "T" as const },
    { id: "f", label: "Harmony first", axis: "F" as const },
  ]},
  { id: "lc4", prompt: "Life runs better with…", options: [
    { id: "j", label: "Plans + closure", axis: "J" as const },
    { id: "p", label: "Options + exploration", axis: "P" as const },
  ]},
];

function scoreLetterQuiz(answers: Record<string, string | number>): string {
  const get = (id: string) => String(answers[id] ?? "");
  const e = get("lc1") === "e" ? "E" : "I";
  const sn = get("lc2") === "n" ? "N" : "S";
  const tf = get("lc3") === "t" ? "T" : "F";
  const jp = get("lc4") === "j" ? "J" : "P";
  return `${e}${sn}${tf}${jp}`;
}

export const letterCompassAdapter: PersonalityTestAdapter = {
  id: "letter-compass",
  displayName: "Four-Letter Compass (style)",
  description:
    "A compact letter code (E/I, S/N, T/F, J/P) mapped into the shared trait graph—original parody, not a clinical tool.",
  supportedInput: "hybrid",
  normalizeResult(input: unknown): NormalizedTraitProfile {
    if (typeof input === "object" && input && "compass" in input && typeof (input as { compass: string }).compass === "string") {
      return normalizeFromCompass((input as { compass: string }).compass);
    }
    if (typeof input === "string") {
      return normalizeFromCompass(input);
    }
    throw new Error("Provide { compass: 'ENTJ' } or a four-letter string");
  },
  scoreQuiz(answers: Record<string, string | number>): ExternalTestResult {
    const code = scoreLetterQuiz(answers);
    const normalized = normalizeFromCompass(code);
    return {
      providerId: "letter-compass",
      rawLabel: code,
      nativeScores: { EI: code[0] === "E" ? 1 : 0, SN: code[1] === "N" ? 1 : 0 },
      normalized,
    };
  },
  mapToSBTI(profile: NormalizedTraitProfile) {
    return mapNormalizedToSBTI(profile, "Four-letter compass →");
  },
  getResultLabel(input: unknown): string {
    if (typeof input === "object" && input && "compass" in input) {
      return String((input as { compass: string }).compass).toUpperCase();
    }
    if (typeof input === "string") return input.toUpperCase();
    return "?";
  },
};

export { quizQuestions as letterCompassQuizQuestions };
