import Link from "next/link";
import { ArrowRight, Layers, Share2, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSBTITypeDefinition } from "@/lib/sbti/types-catalog";

const examples = ["EOVA", "ILMP", "ELVP"] as const;

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/15 via-transparent to-transparent" />
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1">
            Original parody · Not affiliated with similarly named orgs
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Silly Big{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
              Type Indicator
            </span>
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
            SBTI turns internet-native chaos into a compact four-letter type, a chaos score, and a posting-style
            roast—then lets you translate other personality systems into the same shared trait graph.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Official live experience:{" "}
            <a
              href="https://www.sbti.ai/en"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
            >
              sbti.ai/en
            </a>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/test"
              className={cn(
                buttonVariants({ size: "lg" }),
                "inline-flex rounded-full px-8 shadow-lg shadow-violet-500/20",
              )}
            >
              Start the main quest <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/integrations"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full")}
            >
              Browse integrations
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {examples.map((code) => {
            const t = getSBTITypeDefinition(code);
            return (
              <Card
                key={code}
                className="border-border/80 bg-card/80 shadow-md shadow-violet-500/5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <Badge variant="outline" className="font-mono text-xs">
                      {code}
                    </Badge>
                  </div>
                  <CardDescription>{t.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="line-clamp-4">{t.description}</p>
                  <p className="mt-3 text-xs">
                    Chaos: <span className="font-medium text-foreground">{t.chaosLevel}/10</span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-3">
          <div className="rounded-3xl border border-border/80 bg-muted/30 p-6">
            <Layers className="mb-3 size-8 text-violet-600 dark:text-violet-400" />
            <h2 className="text-lg font-semibold">Personality translation layer</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Other tests normalize into one trait graph (0–100), then map into SBTI with a deterministic rules
              engine—no edits to the core scorer when you add providers.
            </p>
          </div>
          <div className="rounded-3xl border border-border/80 bg-muted/30 p-6">
            <Share2 className="mb-3 size-8 text-fuchsia-600 dark:text-fuchsia-400" />
            <h2 className="text-lg font-semibold">Built to share</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Result pages, OG images, and copy-ready summaries—designed for timelines that appreciate absurdity
              with good spacing.
            </p>
          </div>
          <div className="rounded-3xl border border-border/80 bg-muted/30 p-6">
            <Sparkles className="mb-3 size-8 text-amber-500" />
            <h2 className="text-lg font-semibold">Developer-friendly</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Drop adapters into the registry, validate with Zod, and ship new “tests” without fork-lifting the
              main engine.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
