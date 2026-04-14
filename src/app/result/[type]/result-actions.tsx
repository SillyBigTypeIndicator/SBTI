"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ShareCardPayload } from "@/lib/share";
import { saveShareCard } from "@/lib/persist";

export function ResultActions({ share, typeCode }: { share: ShareCardPayload; typeCode: string }) {
  const [copied, setCopied] = useState(false);
  const summary = share.summary;

  const copy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    try {
      await saveShareCard(typeCode, share);
    } catch {
      /* optional persistence */
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(share, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sbti-share-${typeCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Share zone</CardTitle>
        <CardDescription>Copy a timeline-ready summary or download the JSON payload.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button type="button" variant="secondary" onClick={copy}>
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied" : "Copy summary"}
        </Button>
        <Button type="button" variant="outline" onClick={download}>
          <Download className="mr-2 size-4" /> Download share card JSON
        </Button>
      </CardContent>
    </Card>
  );
}
