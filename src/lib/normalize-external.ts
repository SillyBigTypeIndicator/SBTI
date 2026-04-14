import { getPersonalityProvider } from "./providers/registry";

export function normalizeExternalTestResult(providerId: string, input: unknown) {
  const p = getPersonalityProvider(providerId);
  if (!p) throw new Error(`Unknown provider: ${providerId}`);
  return p.normalizeResult(input);
}
