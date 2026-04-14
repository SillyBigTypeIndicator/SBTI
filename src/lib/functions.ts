/**
 * Public API surface for documentation and imports — core behaviors live in modules below.
 */
export { takeSBTITest, scoreSBTIResult, generateSBTIType, buildSBTIResultPayload, axesToNormalizedProfile } from "./sbti/scoring";
export { lettersFromAxes, type AxisScores } from "./sbti/axes";
export { saveSubmission, importExternalPersonalityResult, saveComparisonReport, saveShareCard, exportUserProfile } from "./persist";
export { normalizeExternalTestResult } from "./normalize-external";
export { comparePersonalitySystems, overlapScore, contradictionScore } from "./comparison/engine";
export { registerPersonalityProvider, getAvailablePersonalityProviders, getPersonalityProvider } from "./providers/registry";
export { compareWithProvider } from "./providers/compare-with";
export { generateShareCardPayload, type ShareCardPayload } from "./share";
export type { PersonalityTestAdapter, ExternalTestResult, SBTIMappingResult } from "./providers/adapter-types";
