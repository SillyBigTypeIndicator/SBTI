export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30 py-10 text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl space-y-4 px-4">
        <p>
          <strong className="text-foreground">Disclaimer:</strong> SBTI is for entertainment, creative
          self-reflection, and meme science—not clinical, educational, or employment diagnosis. It is an
          original parody project and is not affiliated with any similarly named organization or test.
        </p>
        <p className="text-xs">© {new Date().getFullYear()} Silly Big Type Indicator contributors. MIT License.</p>
      </div>
    </footer>
  );
}
