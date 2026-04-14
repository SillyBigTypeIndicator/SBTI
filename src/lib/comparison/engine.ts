import type { NormalizedTraitProfile } from "@/lib/traits/schema";
import { normalizedTraitKeys } from "@/lib/traits/schema";

export type PersonalityComparison = {
  overlapScore: number;
  contradictionScore: number;
  internetBehavior: string;
  appearanceVsReality: {
    headline: string;
    appearance: string;
    reality: string;
  };
  dimensionGaps: { key: string; sbti: number; other: number; delta: number }[];
};

function meanDiff(a: NormalizedTraitProfile, b: NormalizedTraitProfile): number {
  let s = 0;
  for (const k of normalizedTraitKeys) {
    s += Math.abs(a[k] - b[k]);
  }
  return s / normalizedTraitKeys.length;
}

/** Overlap: 100 − average absolute gap */
export function overlapScore(a: NormalizedTraitProfile, b: NormalizedTraitProfile): number {
  const m = meanDiff(a, b);
  return Math.round((100 - m) * 10) / 10;
}

/** Contradiction: tension when traits disagree strongly on paired dimensions */
export function contradictionScore(a: NormalizedTraitProfile, b: NormalizedTraitProfile): number {
  const pairs: [keyof NormalizedTraitProfile, keyof NormalizedTraitProfile][] = [
    ["structure", "chaos"],
    ["sincerity", "absurdity"],
    ["dominance", "groupOrientation"],
  ];
  let t = 0;
  for (const [x, y] of pairs) {
    const ax = a[x] - a[y];
    const bx = b[x] - b[y];
    t += Math.abs(ax - bx);
  }
  return Math.round((t / pairs.length / 200) * 1000) / 10;
}

function behaviorBlurb(overlap: number, contradiction: number): string {
  if (overlap > 75 && contradiction < 25) {
    return "You’re basically the same person in two fonts—consistent chaos, reliable vibes.";
  }
  if (overlap < 45) {
    return "You present like a remix: same human, different EQ settings depending on the test.";
  }
  if (contradiction > 40) {
    return "High tension profile: your systems disagree on how you move through the internet (dramatic, but interesting).";
  }
  return "Balanced overlap: close enough to share a group chat, different enough to argue about snacks.";
}

export function comparePersonalitySystems(
  sbtiProfile: NormalizedTraitProfile,
  otherProfile: NormalizedTraitProfile,
): PersonalityComparison {
  const overlap = overlapScore(sbtiProfile, otherProfile);
  const contradiction = contradictionScore(sbtiProfile, otherProfile);
  const dimensionGaps = normalizedTraitKeys.map((k) => ({
    key: k,
    sbti: sbtiProfile[k],
    other: otherProfile[k],
    delta: Math.round((otherProfile[k] - sbtiProfile[k]) * 10) / 10,
  }));
  const gapSort = [...dimensionGaps].sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta));
  const top = gapSort[0];
  const appearanceVsReality = {
    headline: "How you scan vs how you sit",
    appearance:
      top && Math.abs(top.delta) > 15
        ? `Other test pushes ${top.key} harder than SBTI implies—your “front” may look more ${top.delta > 0 ? "intense" : "muted"} there.`
        : "Both systems mostly agree on your public-facing traits.",
    reality:
      overlap > 60
        ? "Underneath, SBTI and the other profile tell a similar story: stable core, internet-native packaging."
        : "Underneath, you’re carrying a split aesthetic: what you optimize for depends on which mirror you’re using.",
  };
  return {
    overlapScore: overlap,
    contradictionScore: contradiction,
    internetBehavior: behaviorBlurb(overlap, contradiction),
    appearanceVsReality,
    dimensionGaps,
  };
}
