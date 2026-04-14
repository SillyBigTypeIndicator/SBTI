import { NextResponse } from "next/server";
import { z } from "zod";
import { compareWithProvider } from "@/lib/providers/compare-with";
import { normalizedTraitProfileSchema } from "@/lib/traits/schema";

const bodySchema = z.object({
  providerId: z.string(),
  externalInput: z.unknown(),
  sbtiNormalized: normalizedTraitProfileSchema,
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { providerId, externalInput, sbtiNormalized } = parsed.data;
    const out = compareWithProvider(providerId, externalInput, sbtiNormalized);
    return NextResponse.json(out);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 },
    );
  }
}
