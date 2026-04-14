"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { customJsonAdapter } from "@/lib/providers/adapters/custom-json";
import { mapNormalizedToSBTI } from "@/lib/providers/rules-engine";

export default function DevPackPage() {
  const [raw, setRaw] = useState(
    JSON.stringify(
      {
        label: "my-pack",
        traits: {
          sociability: 55,
          structure: 44,
          emotionalIntensity: 66,
          noveltySeeking: 70,
          dominance: 50,
          absurdity: 60,
          sincerity: 58,
          chaos: 52,
          selfAwareness: 63,
          groupOrientation: 57,
        },
      },
      null,
      2,
    ),
  );
  const [out, setOut] = useState<string | null>(null);

  const run = () => {
    try {
      const profile = customJsonAdapter.normalizeResult(raw);
      const map = mapNormalizedToSBTI(profile, "Dev pack →");
      setOut(JSON.stringify({ profile, map }, null, 2));
    } catch (e) {
      setOut(e instanceof Error ? e.message : "Error");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-muted-foreground">
        <Link href="/integrations" className="hover:text-foreground">
          ← Integrations
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-bold">Dev: custom trait pack</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Paste JSON matching the custom adapter schema. This route is for local experimentation.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>JSON</CardTitle>
          <CardDescription>Must include <code className="text-xs">traits</code> with all normalized dimensions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={raw} onChange={(e) => setRaw(e.target.value)} className="min-h-[240px] font-mono text-xs" />
          <Button type="button" onClick={run}>
            Validate + map to SBTI
          </Button>
          {out && (
            <pre className="bg-muted/50 max-h-[320px] overflow-auto rounded-xl border p-4 text-xs">{out}</pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
