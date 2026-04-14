# Contributing

Thanks for helping make SBTI sillier and sturdier.

## Principles

- Keep changes focused—avoid drive-by refactors unrelated to your fix or feature.
- Match existing patterns (imports, naming, Tailwind + shadcn usage).
- New personality systems should ship as **adapters** implementing `PersonalityTestAdapter` and register through `registerPersonalityProvider`.
- Add or update **Vitest** coverage for scoring and mapping logic when behavior changes.

## Local setup

See the main [README.md](./README.md) for install, database, and test commands.

## Pull requests

- Describe what changed and why in plain language.
- Note any user-visible copy or UX changes.
- If you add a provider, include a short note in the README integrations section or in `src/tests/registry/README.md`.
