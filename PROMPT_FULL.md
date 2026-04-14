# Verbatim project specification (source prompt)

The following is the full specification as provided for scaffolding this repository (Silly Big Type Indicator).

---

Build a playful open-source web app and GitHub repo called “Silly Big Type Indicator” (SBTI).

Core idea:
SBTI is a humorous, internet-native personality test inspired by meme culture and viral archetypes. It should feel funny, clean, highly shareable, and polished enough to look like a real product. The tone is silly but the product quality should be serious.

Important:
Do not copy the branding, wording, visual identity, or content structure of any existing real-world organization or website with a similar acronym. This must be an original parody-style project with its own identity, design system, copywriting, and codebase.

Product goals:
1. Let users take a main SBTI test and receive a result type.
2. Let users compare their SBTI result with results from other personality systems.
3. Let developers plug in additional personality tests later.
4. Make result pages highly shareable for social media.
5. Make the repo look launch-ready on GitHub with excellent README, examples, and modular architecture.

Tech stack:
- Next.js latest with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Zustand or React Context for client state
- Zod for schema validation
- Prisma with SQLite for local dev, easy upgrade path to Postgres
- NextAuth or simple anonymous session support
- Optional: Plausible-style analytics abstraction
- Vitest or Jest for tests

Main features:
1. Landing page (hero, explanation, CTA, example cards, compatibility section)
2. Main SBTI test (20–40 questions, multi-axis scoring, animated flow, progress, mobile-first)
3. Result engine (4-letter type, 16+ types with rich fields)
4. Result page (title, description, badge, share, copy, retake, compare)
5. Other personality test integration system (modular providers, common interface, MBTI-style, Big Five-style, Enneagram-style, Custom JSON; manual entry, in-app quiz, compare)
6. Comparison engine (translation layer, overlap, contradiction, behavior summary, appearance vs reality, visual)
7. Developer extension system (/tests registry, template, validation)
8. GitHub-ready repo (README, screenshots placeholders, roadmap, contributing, license, issue/PR templates, .env example, seed, tests)

Design direction:
Clean, modern, colorful; internet-native; rounded cards; gradients; absurd but readable copy.

Data model:
Users/sessions, tests, questions, answers, submissions, results, external profiles, comparison reports, share cards.

Functions to implement:
takeSBTITest, scoreSBTIResult, generateSBTIType, saveSubmission, importExternalPersonalityResult, normalizeExternalTestResult, comparePersonalitySystems, registerPersonalityProvider, generateShareCardPayload, exportUserProfile

Adapter interface:
PersonalityTestAdapter { id, displayName, description, supportedInput, normalizeResult, scoreQuiz?, mapToSBTI, getResultLabel }

Plus registerPersonalityProvider, getAvailablePersonalityProviders, compareWithProvider.

UX pages: /, /test, /result/[type], /compare, /integrations, /integrations/[provider], /api/share, /api/compare

NormalizedTraitProfile dimensions (0–100):
sociability, structure, emotional intensity, novelty seeking, dominance, absurdity, sincerity, chaos, self-awareness, group orientation.

Repo name: Silly Big Type Indicator SBTI.

Bonus: OG image, downloadable share card, dark mode, compatibility section, admin dev mode for custom packs.

---

_End of specification._
