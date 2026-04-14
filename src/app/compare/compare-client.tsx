"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { compareWithProvider } from "@/lib/providers/compare-with";
import { getAvailablePersonalityProviders } from "@/lib/providers/registry";
import { normalizedTraitKeys } from "@/lib/traits/schema";
import { saveComparisonReport } from "@/lib/persist";
import { useTestStore } from "@/stores/test-store";

const providers = getAvailablePersonalityProviders();

export function CompareClient() {
  const result = useTestStore((s) => s.result);
  const [providerId, setProviderId] = useState(providers[0]?.id ?? "letter-compass");
  const [compass, setCompass] = useState("ENFP");
  const [ocean, setOcean] = useState({
    openness: 4,
    conscientiousness: 3,
    extraversion: 5,
    agreeableness: 4,
    neuroticism: 2,
  });
  const [ennea, setEnnea] = useState(7);
  const [json, setJson] = useState(
    JSON.stringify(
      {
        label: "demo-pack",
        traits: {
          sociability: 62,
          structure: 41,
          emotionalIntensity: 70,
          noveltySeeking: 77,
          dominance: 48,
          absurdity: 66,
          sincerity: 58,
          chaos: 55,
          selfAwareness: 72,
          groupOrientation: 54,
        },
      },
      null,
      2,
    ),
  );
  const [saved, setSaved] = useState(false);

  const { cmp, err } = useMemo(() => {
    if (!result) return { cmp: null as ReturnType<typeof compareWithProvider> | null, err: null as string | null };
    try {
      if (providerId === "letter-compass") {
        return { cmp: compareWithProvider("letter-compass", { compass }, result.normalized), err: null };
      }
      if (providerId === "ocean-five") {
        return { cmp: compareWithProvider("ocean-five", ocean, result.normalized), err: null };
      }
      if (providerId === "ennea-nine") {
        return { cmp: compareWithProvider("ennea-nine", { type: ennea }, result.normalized), err: null };
      }
      if (providerId === "custom-json") {
        return { cmp: compareWithProvider("custom-json", JSON.parse(json), result.normalized), err: null };
      }
      return { cmp: null, err: null };
    } catch (e) {
      return {
        cmp: null,
        err: e instanceof Error ? e.message : "Compare failed",
      };
    }
  }, [result, providerId, compass, ocean, ennea, json]);

  const radarData = useMemo(() => {
    if (!result || !cmp) return [];
    const sbti = result.normalized;
    const oth = cmp.normalized;
    return normalizedTraitKeys.map((k) => ({
      trait: k,
      sbti: sbti[k],
      other: oth[k],
    }));
  }, [result, cmp]);

  if (!result) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Take SBTI first</CardTitle>
          <CardDescription>We need your latest Silly Big Type trait graph to compare.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/test" className={buttonVariants()}>
            Start the test
          </Link>
        </CardContent>
      </Card>
    );
  }

  const persist = async () => {
    if (!cmp) return;
    try {
      await saveComparisonReport({
        sbtiTypeCode: result.typeCode,
        providerId,
        sbtiNormalized: result.normalized,
        externalInput:
          providerId === "letter-compass"
            ? { compass }
            : providerId === "ocean-five"
              ? ocean
              : providerId === "ennea-nine"
                ? { type: ennea }
                : JSON.parse(json),
      });
      setSaved(true);
    } catch {
      setSaved(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-5">
      <div className="space-y-4 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your SBTI anchor</CardTitle>
            <CardDescription>
              {result.typeCode} — {result.name}
            </CardDescription>
          </CardHeader>
        </Card>
        <Tabs value={providerId} onValueChange={setProviderId}>
          <TabsList className="flex flex-col gap-1">
            {providers.map((p) => (
              <TabsTrigger key={p.id} value={p.id}>
                {p.displayName}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="letter-compass" className="mt-4 space-y-3">
            <Label htmlFor="compass">Four letters</Label>
            <Input id="compass" value={compass} onChange={(e) => setCompass(e.target.value.toUpperCase())} maxLength={4} />
          </TabsContent>
          <TabsContent value="ocean-five" className="mt-4 space-y-3">
            {(Object.keys(ocean) as (keyof typeof ocean)[]).map((k) => (
              <div key={k} className="flex items-center gap-3">
                <Label className="w-36 capitalize">{k}</Label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={ocean[k]}
                  onChange={(e) => setOcean((prev) => ({ ...prev, [k]: Number(e.target.value) }))}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="ennea-nine" className="mt-4 space-y-3">
            <Label>Type 1–9</Label>
            <Input type="number" min={1} max={9} value={ennea} onChange={(e) => setEnnea(Number(e.target.value))} />
          </TabsContent>
          <TabsContent value="custom-json" className="mt-4 space-y-3">
            <textarea
              className="border-input bg-muted/40 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[220px] w-full rounded-xl border px-3 py-2 font-mono text-xs shadow-xs outline-none focus-visible:ring-[3px]"
              value={json}
              onChange={(e) => setJson(e.target.value)}
            />
          </TabsContent>
        </Tabs>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="button" variant="secondary" onClick={persist} disabled={!cmp}>
          Save comparison (server)
        </Button>
        {saved && <p className="text-xs text-muted-foreground">Saved to your anonymous profile.</p>}
      </div>

      <div className="space-y-6 lg:col-span-3">
        {cmp && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Overlap & tension</CardTitle>
                <CardDescription>{cmp.mapping.rationale}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Overlap</p>
                  <p className="text-3xl font-semibold">{cmp.comparison.overlapScore}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Contradiction</p>
                  <p className="text-3xl font-semibold">{cmp.comparison.contradictionScore}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Mapped SBTI guess</p>
                  <p className="font-mono text-lg">{cmp.mapping.predictedTypeCode}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Internet behavior</CardTitle>
                <CardDescription>{cmp.comparison.internetBehavior}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{cmp.comparison.appearanceVsReality.headline}</p>
                <p className="mt-2 text-sm text-muted-foreground">{cmp.comparison.appearanceVsReality.appearance}</p>
                <p className="mt-2 text-sm text-muted-foreground">{cmp.comparison.appearanceVsReality.reality}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Trait radar</CardTitle>
                <CardDescription>SBTI vs selected provider (normalized 0–100)</CardDescription>
              </CardHeader>
              <CardContent className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" tick={{ fontSize: 9 }} />
                    <Radar name="SBTI" dataKey="sbti" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.35} />
                    <Radar name="Other" dataKey="other" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
