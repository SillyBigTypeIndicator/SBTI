# Exact build prompt (canonical brief)

This repository was generated from the following project brief. Use this file if you need to re-run or extend the product in another environment.

---

Build a playful open-source web app and GitHub repo called **“Silly Big Type Indicator” (SBTI)**.

**Core idea:**  
SBTI is a humorous, internet-native personality test inspired by meme culture and viral archetypes. It should feel funny, clean, highly shareable, and polished enough to look like a real product. The tone is silly but the product quality should be serious.

**Important:**  
Do not copy the branding, wording, visual identity, or content structure of any existing real-world organization or website with a similar acronym. This must be an original parody-style project with its own identity, design system, copywriting, and codebase.

**(Full specification continues with: product goals, tech stack, main features 1–8, design direction, data model, required functions 1–10, `PersonalityTestAdapter` interface, UX pages, seed content, README requirements, bonus items, normalized trait dimensions, provider registry, and repo naming.)**

For a structured recap of the full brief, see **[PROMPT_FULL.md](./PROMPT_FULL.md)**.

**Repository name:** Silly Big Type Indicator (SBTI) · package name `silly-big-type-indicator`.

---

## Personality integration (first-class)

- Provider-based system: new tests **without** editing the main SBTI scorer.  
- Shared **`NormalizedTraitProfile`** on a 0–100 scale for: sociability, structure, emotional intensity, novelty seeking, dominance, absurdity, sincerity, chaos, self-awareness, group orientation.  
- External adapters implement **`PersonalityTestAdapter`**, register via **`registerPersonalityProvider`**, validate malformed adapters safely.  
- Deterministic mapping from normalized traits → SBTI output via **`mapNormalizedToSBTI`** / rules engine.
