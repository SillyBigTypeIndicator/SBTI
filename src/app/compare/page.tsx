import type { Metadata } from "next";
import { CompareClient } from "./compare-client";

export const metadata: Metadata = {
  title: "Compare",
  description: "Map other personality systems into SBTI’s shared trait graph.",
};

export default function ComparePage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-10 text-center sm:pt-14">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Personality translation layer</h1>
        <p className="mt-3 text-muted-foreground">
          Overlap, contradiction, and a radar chart—using the normalized trait graph.
        </p>
      </div>
      <CompareClient />
    </div>
  );
}
