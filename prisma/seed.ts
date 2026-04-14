import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { SBTI_QUESTIONS } from "../src/lib/sbti/questions-data";
import { takeSBTITest } from "../src/lib/sbti/scoring";
import { comparePersonalitySystems } from "../src/lib/comparison/engine";
import { letterCompassAdapter } from "../src/lib/providers/adapters/letter-compass";
import { oceanFiveAdapter } from "../src/lib/providers/adapters/ocean-five";

const prisma = new PrismaClient();

async function main() {
  const test = await prisma.personalityTest.upsert({
    where: { slug: "sbti-main" },
    create: {
      slug: "sbti-main",
      title: "Silly Big Type Indicator — Main Quest",
      description: "28 questions. One ridiculous label. Zero corporate overlap.",
    },
    update: {},
  });

  for (const q of SBTI_QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      create: {
        id: q.id,
        personalityTestId: test.id,
        orderIndex: SBTI_QUESTIONS.indexOf(q),
        prompt: q.prompt,
        optionsJson: JSON.stringify(q.options),
      },
      update: {
        prompt: q.prompt,
        optionsJson: JSON.stringify(q.options),
      },
    });
  }

  const demoUser = await prisma.user.upsert({
    where: { anonymousKey: "seed_key_demo" },
    create: {
      id: "seed-demo-user",
      name: "Demo Seedling",
      anonymousKey: "seed_key_demo",
    },
    update: {},
  });

  const demoAnswers: Record<string, string> = {};
  for (const q of SBTI_QUESTIONS) {
    demoAnswers[q.id] = q.options[0]?.id ?? "a";
  }
  const result = takeSBTITest(demoAnswers);

  if ((await prisma.submission.count({ where: { userId: demoUser.id } })) === 0) {
    const sub = await prisma.submission.create({
      data: {
        userId: demoUser.id,
        personalityTestId: test.id,
        completedAt: new Date(),
      },
    });
    for (const [qid, val] of Object.entries(demoAnswers)) {
      await prisma.answer.create({
        data: {
          submissionId: sub.id,
          questionId: qid,
          value: val,
        },
      });
    }
    await prisma.testResult.create({
      data: {
        submissionId: sub.id,
        typeCode: result.typeCode,
        scoresJson: JSON.stringify(result.axes),
        payloadJson: JSON.stringify(result),
      },
    });
  }

  if ((await prisma.externalPersonalityProfile.count({ where: { userId: demoUser.id } })) === 0) {
    await prisma.externalPersonalityProfile.createMany({
      data: [
        {
          userId: demoUser.id,
          providerId: "letter-compass",
          rawInputJson: JSON.stringify({ compass: "ENFP" }),
          normalizedJson: JSON.stringify(letterCompassAdapter.normalizeResult({ compass: "ENFP" })),
          label: "ENFP",
        },
        {
          userId: demoUser.id,
          providerId: "ocean-five",
          rawInputJson: JSON.stringify({
            openness: 4,
            conscientiousness: 3,
            extraversion: 5,
            agreeableness: 4,
            neuroticism: 2,
          }),
          normalizedJson: JSON.stringify(
            oceanFiveAdapter.normalizeResult({
              openness: 4,
              conscientiousness: 3,
              extraversion: 5,
              agreeableness: 4,
              neuroticism: 2,
            }),
          ),
          label: "O4C3E5A4N2",
        },
      ],
    });
  }

  if ((await prisma.comparisonReport.count({ where: { userId: demoUser.id } })) === 0) {
    const n1 = letterCompassAdapter.normalizeResult({ compass: "ENFP" });
    const cmp1 = comparePersonalitySystems(result.normalized, n1);
    const n2 = oceanFiveAdapter.normalizeResult({
      openness: 4,
      conscientiousness: 3,
      extraversion: 5,
      agreeableness: 4,
      neuroticism: 2,
    });
    const cmp2 = comparePersonalitySystems(result.normalized, n2);
    const n3 = letterCompassAdapter.normalizeResult({ compass: "ISTJ" });
    const cmp3 = comparePersonalitySystems(result.normalized, n3);

    await prisma.comparisonReport.createMany({
      data: [
        {
          userId: demoUser.id,
          sbtiTypeCode: result.typeCode,
          providerId: "letter-compass",
          overlapScore: cmp1.overlapScore,
          contradictionScore: cmp1.contradictionScore,
          summaryJson: JSON.stringify({ demo: true, ...cmp1 }),
        },
        {
          userId: demoUser.id,
          sbtiTypeCode: result.typeCode,
          providerId: "ocean-five",
          overlapScore: cmp2.overlapScore,
          contradictionScore: cmp2.contradictionScore,
          summaryJson: JSON.stringify({ demo: true, ...cmp2 }),
        },
        {
          userId: demoUser.id,
          sbtiTypeCode: result.typeCode,
          providerId: "letter-compass",
          overlapScore: cmp3.overlapScore,
          contradictionScore: cmp3.contradictionScore,
          summaryJson: JSON.stringify({ demo: true, ...cmp3 }),
        },
      ],
    });

    await prisma.shareCard.create({
      data: {
        userId: demoUser.id,
        typeCode: result.typeCode,
        payloadJson: JSON.stringify({ title: result.name, tagline: result.tagline }),
      },
    });
  }

  console.log("Seed OK — demo SBTI type:", result.typeCode);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
