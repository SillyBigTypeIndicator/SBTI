"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Hydration guard for next-themes (client-only)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount flip
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="relative size-9" aria-label="Toggle theme" />;
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative size-9"
      aria-label="Toggle theme"
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="dark:-rotate-90 h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
