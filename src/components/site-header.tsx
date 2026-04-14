import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/test", label: "Take the test" },
  { href: "/compare", label: "Compare" },
  { href: "/integrations", label: "Integrations" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 text-white shadow-sm">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <span>SBTI</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/test"
            className={cn(buttonVariants({ size: "sm" }), "rounded-full shadow-sm")}
          >
            Start
          </Link>
          <a
            href="https://www.sbti.ai/en"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ size: "sm", variant: "outline" }), "hidden rounded-full md:inline-flex")}
          >
            Live Site
          </a>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
