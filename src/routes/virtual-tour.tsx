import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PanoramaViewer } from "@/components/PanoramaViewer";
import { virtualPlaces } from "@/data/places";

export const Route = createFileRoute("/virtual-tour")({
  head: () => ({
    meta: [
      { title: "Virtual Tour of Gwalior — Interactive 360° Heritage Views" },
      {
        name: "description",
        content:
          "Explore Gwalior Fort, Jai Vilas Palace, Tansen's Tomb and Sas Bahu Temple through interactive 360° panoramas with clickable historical hotspots. No headset required.",
      },
      { property: "og:title", content: "Virtual Tour of Gwalior — Interactive 360° Views" },
      {
        property: "og:description",
        content:
          "Drag through panoramic views of Gwalior's heritage sites and tap hotspots for the history behind each detail.",
      },
    ],
  }),
  component: VirtualTour,
});

function VirtualTour() {
  const [activeSlug, setActiveSlug] = useState(virtualPlaces[0]!.slug);
  const active = virtualPlaces.find((p) => p.slug === activeSlug)!;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">Virtual tourism</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">
          Stand inside Gwalior from anywhere
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Each location below is an interactive 360° panorama. Drag across the image to look
          around, then tap a marked point to read what you&apos;re seeing. It runs in your
          browser — no headset or VR hardware involved.
        </p>
      </header>

      <div className="mt-12 flex flex-wrap gap-2">
        {virtualPlaces.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActiveSlug(p.slug)}
            className={`rounded-full border px-5 py-2.5 text-[0.625rem] uppercase tracking-[0.16em] transition-colors ${
              p.slug === activeSlug
                ? "border-ink bg-ink text-ink-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <PanoramaViewer
          key={active.slug}
          image={active.panorama!.image}
          label={active.panorama!.label}
          placeName={active.name}
          hotspots={active.panorama!.hotspots}
        />
      </div>

      <section className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">The story of {active.name}</p>
          <h2 className="mt-4 font-display text-4xl">{active.tagline}</h2>
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
            {active.story.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <Link to="/places/$slug" params={{ slug: active.slug }} className="btn-outline-ink mt-9">
            Visiting details
          </Link>
        </div>

        <aside className="h-fit border border-border bg-card p-8">
          <p className="eyebrow">Gallery</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {active.gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${active.name} view ${i + 1}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-square w-full rounded-sm object-cover"
              />
            ))}
          </div>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="eyebrow">Period</dt>
              <dd className="mt-1 text-muted-foreground">{active.era}</dd>
            </div>
            <div>
              <dt className="eyebrow">Category</dt>
              <dd className="mt-1 text-muted-foreground">{active.category}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </div>
  );
}
