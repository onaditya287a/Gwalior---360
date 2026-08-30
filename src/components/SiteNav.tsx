import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/virtual-tour", label: "Virtual Tour" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl tracking-tight">Explore Gwalior</span>
          <span className="eyebrow mt-1 text-[0.5625rem]">Heritage &amp; Digital Tourism</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/explore" className="btn-ink px-5 py-3">
            Plan your visit
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-4 bg-foreground" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 pb-5 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-foreground"
              activeProps={{ className: "!text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
