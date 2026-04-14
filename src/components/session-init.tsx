"use client";

import { useEffect } from "react";

/** Ensures anonymous cookie + user row via API */
export function SessionInit() {
  useEffect(() => {
    fetch("/api/session").catch(() => {});
  }, []);
  return null;
}
