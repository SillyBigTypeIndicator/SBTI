import type { SBTIResultPayload } from "@/lib/sbti/scoring";
import { getSBTITypeDefinition } from "@/lib/sbti/types-catalog";
import { emptyTraitProfile } from "@/lib/traits/schema";

export type ShareCardPayload = {
  title: string;
  subtitle: string;
  typeCode: string;
  chaosLevel: number;
  postingStyle: string;
  summary: string;
  generatedAt: string;
};

/** When sharing a type by code without a fresh test submission */
export function sharePayloadFromTypeCode(code: string): ShareCardPayload {
  const t = getSBTITypeDefinition(code);
  const full: SBTIResultPayload = {
    typeCode: t.code,
    name: t.name,
    tagline: t.tagline,
    description: t.description,
    strengths: t.strengths,
    weaknesses: t.weaknesses,
    chaosLevel: t.chaosLevel,
    postingStyle: t.postingStyle,
    idealJob: t.idealJob,
    friendGroupRole: t.friendGroupRole,
    compatibleWith: t.compatibleWith,
    axes: { e: 50, o: 50, v: 50, a: 50 },
    normalized: emptyTraitProfile(),
  };
  return generateShareCardPayload(full);
}

export function generateShareCardPayload(result: SBTIResultPayload): ShareCardPayload {
  return {
    title: result.name,
    subtitle: result.tagline,
    typeCode: result.typeCode,
    chaosLevel: result.chaosLevel,
    postingStyle: result.postingStyle,
    summary: `${result.typeCode} — ${result.name}. ${result.tagline} ${result.description.slice(0, 160)}${result.description.length > 160 ? "…" : ""}`,
    generatedAt: new Date().toISOString(),
  };
}
