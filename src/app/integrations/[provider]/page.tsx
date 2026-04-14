import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonalityProvider } from "@/lib/providers/registry";

type Props = { params: Promise<{ provider: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider } = await params;
  const p = getPersonalityProvider(provider);
  if (!p) return { title: "Provider" };
  return { title: p.displayName };
}

export default async function IntegrationDetailPage({ params }: Props) {
  const { provider } = await params;
  const p = getPersonalityProvider(provider);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <p className="text-sm text-muted-foreground">
        <Link href="/integrations" className="hover:text-foreground">
          ← Integrations
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{p.displayName}</h1>
      <p className="mt-2 font-mono text-xs text-muted-foreground">id: {p.id}</p>
      <p className="mt-4 text-muted-foreground">{p.description}</p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Input modes</CardTitle>
          <CardDescription>{p.supportedInput}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Use the Compare page to run side-by-side translation with your latest SBTI result.</p>
          <Link href="/compare" className={cn(buttonVariants())}>
            Open Compare
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
