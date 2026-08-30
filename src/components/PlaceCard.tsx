import { Link } from "@tanstack/react-router";
import type { Place } from "@/data/places";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Link
      to="/places/$slug"
      params={{ slug: place.slug }}
      className="card-heritage group flex flex-col overflow-hidden rounded-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="size-full object-cover transition-transform duration-[1200ms] ease-heritage group-hover:scale-[1.06]"
        />
        <span className="absolute left-0 top-4 bg-ink px-3 py-1.5 text-[0.5625rem] uppercase tracking-[0.18em] text-ink-foreground">
          {place.category}
        </span>
        {place.panorama && (
          <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[0.5625rem] uppercase tracking-[0.18em] text-primary">
            360° tour
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight">{place.name}</h3>
          <span className="mt-1 shrink-0 text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            {place.era}
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {place.summary}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[0.625rem] uppercase tracking-[0.14em]">
          <span className="text-muted-foreground">{place.entryFee.split("·")[0]}</span>
          <span className="text-foreground transition-colors group-hover:text-primary">
            Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
