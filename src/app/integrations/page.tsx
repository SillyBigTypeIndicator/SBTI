import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvailablePersonalityProviders } from "@/lib/providers/registry";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Modular personality providers that map into SBTI’s shared trait graph.",
};

export default function IntegrationsPage() {
  const providers = getAvailablePersonalityProviders();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Integrations</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Each adapter implements <code className="rounded bg-muted px-1 py-0.5 text-sm">PersonalityTestAdapter</code> and
        normalizes into the shared 0–100 trait graph before mapping to SBTI.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {providers.map((p) => (
          <Link key={p.id} href={`/integrations/${p.id}`}>
            <Card className="h-full transition hover:border-violet-500/40 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{p.displayName}</CardTitle>
                  <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
                    {p.supportedInput}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-3">{p.description}</CardDescription>
                <span className="mt-2 inline-flex items-center text-sm font-medium text-violet-600 dark:text-violet-400">
                  Open <ArrowRight className="ml-1 size-4" />
                </span>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
