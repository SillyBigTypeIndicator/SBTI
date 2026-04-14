# Personality provider registry (`/src/tests/registry`)

Drop a new provider module here and register it from `src/lib/providers/register-extra.ts` (optional) or import your adapter in `src/lib/providers/registry.ts` during development.

## Under 10 minutes

1. Copy `example-provider.template.ts` to `my-pack.ts`.
2. Implement `PersonalityTestAdapter` — focus on `normalizeResult` + `mapToSBTI` (the rules engine handles SBTI mapping).
3. Call `registerPersonalityProvider(myAdapter)` once at startup (see template).
4. Add a page section or use **Integrations → Custom JSON** to validate shapes.

Bad adapters should fail `validatePersonalityAdapter` before touching user data.
