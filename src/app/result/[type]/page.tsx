import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Share2, Wand2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getSBTITypeDefinition, allTypeCodes } from "@/lib/sbti/types-catalog";
import { sharePayloadFromTypeCode } from "@/lib/share";
import { ResultActions } from "./result-actions";

type Props = { params: Promise<{ type: string }> };

export async function generateStaticParams() {
  return allTypeCodes().map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const t = getSBTITypeDefinition(type.toUpperCase());
  return {
    title: `${t.name} (${type.toUpperCase()})`,
    description: t.tagline,
    openGraph: { title: `${t.name} · SBTI` },
  };
}

export default async function ResultPage({ params }: Props) {
  const { type } = await params;
  const code = type.toUpperCase();
  if (!/^[EI][OL][VM][AP]$/.test(code)) {
    notFound();
  }
  const t = getSBTITypeDefinition(code);
  const share = sharePayloadFromTypeCode(code);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="text-center">
        <Badge className="mb-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 text-white">
          Your Silly Big Type
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.name}</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">{t.code}</p>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{t.tagline}</p>
      </div>

      <Card className="mt-10 overflow-hidden border-border/80 shadow-xl shadow-violet-500/10">
        <div className="h-2 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" />
        <CardHeader>
          <CardTitle className="text-2xl">Field report</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Chaos level</p>
              <p className="text-2xl font-semibold">{t.chaosLevel} / 10</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Posting style</p>
              <p>{t.postingStyle}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Strengths</p>
            <ul className="mt-2 list-inside list-disc text-sm">
              {t.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Weaknesses</p>
            <ul className="mt-2 list-inside list-disc text-sm">
              {t.weaknesses.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Ideal fake internet job</p>
              <p className="text-sm">{t.idealJob}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Friend group role</p>
              <p className="text-sm">{t.friendGroupRole}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wand2 className="size-5" /> Which type should build with you?
          </CardTitle>
          <CardDescription>Low-stakes compatibility based on the catalog—not a compatibility test.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {t.compatibleWith.map((c) => (
            <Link
              key={c}
              href={`/result/${c}`}
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
            >
              {c}
            </Link>
          ))}
        </CardContent>
      </Card>

      <ResultActions share={share} typeCode={t.code} />

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/test"
          className={cn(buttonVariants({ size: "lg" }), "inline-flex rounded-full")}
        >
          <Share2 className="mr-2 size-4" /> Retake test
        </Link>
        <Link
          href="/compare"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full")}
        >
          Compare with other tests
        </Link>
      </div>
    </div>
  );
}
