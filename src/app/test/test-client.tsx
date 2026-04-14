"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { analytics } from "@/lib/analytics";
import { getSBTIQuestionList, takeSBTITest, validateSBTIAnswersComplete } from "@/lib/sbti/scoring";
import { saveSubmission } from "@/lib/persist";
import { useTestStore } from "@/stores/test-store";

const questions = getSBTIQuestionList();

export function TestClient() {
  const router = useRouter();
  const { answers, setAnswer, setResult, reset } = useTestStore();
  const [i, setI] = useState(0);

  const q = questions[i];
  const progress = useMemo(() => ((i + 1) / questions.length) * 100, [i]);

  const onPick = async (optionId: string) => {
    if (!q) return;
    setAnswer(q.id, optionId);
    analytics.track("sbti_answer", { questionId: q.id });
    if (i < questions.length - 1) {
      setI((x) => x + 1);
      return;
    }
    const nextAnswers = { ...answers, [q.id]: optionId };
    if (!validateSBTIAnswersComplete(nextAnswers)) {
      setI(0);
      return;
    }
    const result = takeSBTITest(nextAnswers);
    setResult(result);
    analytics.track("sbti_complete", { type: result.typeCode });
    try {
      await saveSubmission({ answers: nextAnswers, result });
    } catch {
      /* offline / seed missing */
    }
    router.push(`/result/${result.typeCode}?from=test`);
  };

  const goBack = () => setI((x) => Math.max(0, x - 1));

  if (!q) {
    return null;
  }

  const selected = answers[q.id] ? String(answers[q.id]) : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Question {i + 1} / {questions.length}
        </p>
        <Button variant="ghost" size="sm" type="button" onClick={() => reset()} className="text-xs">
          Reset
        </Button>
      </div>
      <Progress value={progress} className="h-2" />
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
        >
          <Card className="mt-8 border-border/80 shadow-lg shadow-violet-500/10">
            <CardHeader>
              <CardTitle className="text-xl leading-snug sm:text-2xl">{q.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {q.options.map((opt) => (
                <Button
                  key={opt.id}
                  variant={selected === opt.id ? "default" : "secondary"}
                  className="h-auto justify-start whitespace-normal py-4 text-left text-base font-normal leading-snug"
                  type="button"
                  onClick={() => onPick(opt.id)}
                >
                  {opt.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex justify-between">
        <Button variant="outline" type="button" disabled={i === 0} onClick={goBack}>
          <ChevronLeft className="mr-1 size-4" /> Back
        </Button>
        <Button variant="ghost" type="button" onClick={() => setI((x) => Math.min(questions.length - 1, x + 1))}>
          Skip ahead <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}
