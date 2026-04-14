"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SBTIResultPayload } from "@/lib/sbti/scoring";

type TestState = {
  answers: Record<string, string | number>;
  result: SBTIResultPayload | null;
  setAnswer: (questionId: string, value: string | number) => void;
  setResult: (r: SBTIResultPayload | null) => void;
  reset: () => void;
};

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      answers: {},
      result: null,
      setAnswer: (questionId, value) =>
        set((s) => ({ answers: { ...s.answers, [questionId]: value } })),
      setResult: (result) => set({ result }),
      reset: () => set({ answers: {}, result: null }),
    }),
    { name: "sbti-test-v1" },
  ),
);
