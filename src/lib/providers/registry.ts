import type { PersonalityTestAdapter } from "./adapter-types";
import { validatePersonalityAdapter } from "./validate";
import { customJsonAdapter } from "./adapters/custom-json";
import { enneaNineAdapter } from "./adapters/ennea-nine";
import { letterCompassAdapter } from "./adapters/letter-compass";
import { oceanFiveAdapter } from "./adapters/ocean-five";

const registry = new Map<string, PersonalityTestAdapter>();

export function registerPersonalityProvider(adapter: PersonalityTestAdapter): void {
  const v = validatePersonalityAdapter(adapter);
  if (!v.ok) {
    throw new Error(`Invalid adapter ${String((adapter as { id?: string })?.id)}: ${v.errors.join("; ")}`);
  }
  registry.set(adapter.id, adapter);
}

export function getAvailablePersonalityProviders(): PersonalityTestAdapter[] {
  return Array.from(registry.values()).sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function getPersonalityProvider(id: string): PersonalityTestAdapter | undefined {
  return registry.get(id);
}

function registerBuiltins(): void {
  registerPersonalityProvider(letterCompassAdapter);
  registerPersonalityProvider(oceanFiveAdapter);
  registerPersonalityProvider(enneaNineAdapter);
  registerPersonalityProvider(customJsonAdapter);
}

registerBuiltins();
