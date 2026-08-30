import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PlaceCard } from "@/components/PlaceCard";
import { categories, places, type Category } from "@/data/places";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Heritage Sites in Gwalior — Timings, Tickets & Maps" },
      {
        name: "description",
        content:
          "Search and filter Gwalior's forts, palaces, temples and memorials. Opening hours, entry fees, visit duration, nearby attractions and map links.",
      },
      { property: "og:title", content: "Explore Heritage Sites in Gwalior" },
      {
        property: "og:description",
        content:
          "Timings, entry fees, maps and nearby attractions for Gwalior Fort, Jai Vilas Palace, Sas Bahu Temple and more.",
      },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">Physical tourism</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">
          Every site, with the practical details
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Hours, tickets and travel time for Gwalior&apos;s heritage sites. Figures shown are
          indicative placeholders — confirm on the day before you travel.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-6 border-y border-border py-6 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Search heritage sites</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a fort, palace or temple…"
            className="w-full rounded-sm border border-input bg-card px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-[0.625rem] uppercase tracking-[0.16em] transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-ink-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
        {results.length} {results.length === 1 ? "site" : "sites"}
      </p>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PlaceCard key={p.slug} place={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-border p-12 text-center">
          <h2 className="font-display text-3xl">Nothing matches that</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Try a different word, or clear the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="btn-outline-ink mt-8"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
