import type { Metadata } from "next";
import { TestClient } from "./test-client";

export const metadata: Metadata = {
  title: "Main quest",
  description: "28 meme-native questions, one Silly Big Type.",
};

export default function TestPage() {
  return <TestClient />;
}
