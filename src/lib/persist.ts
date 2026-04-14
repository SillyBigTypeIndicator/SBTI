"use server";

import { prisma } from "./db";
import { getOrCreateAnonUserId } from "./session";
import type { SBTIResultPayload } from "./sbti/scoring";
import { normalizeExternalTestResult } from "./normalize-external";
import { getPersonalityProvider } from "./providers/registry";
import { compareWithProvider } from "./providers/compare-with";
import type { NormalizedTraitProfile } from "./traits/schema";

export async function saveSubmission(payload: {
  answers: Record<string, string | number>;
  result: SBTIResultPayload;
}) {
  const userId = await getOrCreateAnonUserId();
  const test = await prisma.personalityTest.findUnique({ where: { slug: "sbti-main" } });
  if (!test) throw new Error("Seed the database (npm run db:seed)");

  const submission = await prisma.submission.create({
    data: {
      userId,
      personalityTestId: test.id,
      completedAt: new Date(),
    },
  });

  for (const [questionId, value] of Object.entries(payload.answers)) {
    const q = await prisma.question.findUnique({ where: { id: questionId } });
    if (!q || q.personalityTestId !== test.id) continue;
    await prisma.answer.create({
      data: {
        submissionId: submission.id,
        questionId: q.id,
        value: String(value),
      },
    });
  }

  await prisma.testResult.create({
    data: {
      submissionId: submission.id,
      typeCode: payload.result.typeCode,
      scoresJson: JSON.stringify(payload.result.axes),
      payloadJson: JSON.stringify(payload.result),
    },
  });

  return { submissionId: submission.id };
}

export async function importExternalPersonalityResult(providerId: string, rawInput: unknown) {
  const userId = await getOrCreateAnonUserId();
  const normalized = normalizeExternalTestResult(providerId, rawInput);
  const adapter = getPersonalityProvider(providerId);
  const label = adapter?.getResultLabel(rawInput) ?? String(providerId);

  await prisma.externalPersonalityProfile.create({
    data: {
      userId,
      providerId,
      rawInputJson: JSON.stringify(rawInput),
      normalizedJson: JSON.stringify(normalized),
      label,
    },
  });

  return { normalized };
}

export async function saveComparisonReport(input: {
  sbtiTypeCode: string;
  providerId: string;
  sbtiNormalized: NormalizedTraitProfile;
  externalInput: unknown;
}) {
  const userId = await getOrCreateAnonUserId();
  const cmp = compareWithProvider(input.providerId, input.externalInput, input.sbtiNormalized);
  await prisma.comparisonReport.create({
    data: {
      userId,
      sbtiTypeCode: input.sbtiTypeCode,
      providerId: input.providerId,
      overlapScore: cmp.comparison.overlapScore,
      contradictionScore: cmp.comparison.contradictionScore,
      summaryJson: JSON.stringify(cmp),
    },
  });
  return cmp;
}

export async function saveShareCard(typeCode: string, payload: object) {
  const userId = await getOrCreateAnonUserId();
  await prisma.shareCard.create({
    data: {
      userId,
      typeCode,
      payloadJson: JSON.stringify(payload),
    },
  });
}

export async function exportUserProfile() {
  const userId = await getOrCreateAnonUserId();
  const submissions = await prisma.submission.findMany({
    where: { userId },
    include: { result: true },
    orderBy: { startedAt: "desc" },
    take: 20,
  });
  const externals = await prisma.externalPersonalityProfile.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  const comparisons = await prisma.comparisonReport.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return {
    userId,
    submissions,
    externalProfiles: externals,
    comparisons,
    exportedAt: new Date().toISOString(),
  };
}
