import { Link } from "@tanstack/react-router";
import { places } from "@/data/places";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-sandstone/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h3 className="font-display text-3xl">Explore Gwalior</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A digital tourism and cultural heritage project for the fortress city of Gwalior,
            Madhya Pradesh — built to be explored on foot or from a screen.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Virtual tours use interactive 360° panoramas and photography. No headset or VR
            hardware is required.
          </p>
        </div>

        <div>
          <p className="eyebrow">Heritage sites</p>
          <ul className="mt-5 space-y-3 text-sm">
            {places.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  to="/places/$slug"
                  params={{ slug: p.slug }}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Visiting Gwalior</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Best season: October – March</li>
            <li>Nearest airport: Gwalior (GWL)</li>
            <li>On the Delhi – Bhopal rail corridor</li>
            <li>
              <Link to="/virtual-tour" className="transition-colors hover:text-primary">
                Can&apos;t travel? Tour virtually
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rule-jali" />
        <div className="flex flex-col gap-2 py-6 text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:justify-between">
          <span>Explore Gwalior · Digital Tourism &amp; Cultural Heritage</span>
          <span>Placeholder content for demonstration</span>
        </div>
      </div>
    </footer>
  );
}
