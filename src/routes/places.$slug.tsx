import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PanoramaViewer } from "@/components/PanoramaViewer";
import { getPlace, mapsEmbed, mapsLink, type Place } from "@/data/places";

export const Route = createFileRoute("/places/$slug")({
  loader: ({ params }) => {
    const place = getPlace(params.slug);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Site unavailable — Explore Gwalior" }, { name: "robots", content: "noindex" }],
      };
    }
    const { place } = loaderData;
    const title = `${place.name}, Gwalior — Timings, Entry Fee & History`;
    const description = `${place.summary} Open ${place.timings}. Entry: ${place.entryFee}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: PlaceNotFound,
  component: PlaceDetail,
});

function PlaceNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center sm:px-8">
      <h1 className="font-display text-4xl">We don&apos;t have that site yet</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        The place you&apos;re looking for isn&apos;t in this guide.
      </p>
      <Link to="/explore" className="btn-ink mt-9">
        Browse all sites
      </Link>
    </div>
  );
}

function PlaceDetail() {
  const { place } = Route.useLoaderData();
  const nearby = place.nearby.map(getPlace).filter(Boolean) as Place[];

  const facts = [
    { k: "Timings", v: place.timings },
    { k: "Entry fee", v: place.entryFee },
    { k: "Best time", v: place.bestTime },
    { k: "Time needed", v: place.duration },
  ];

  return (
    <article>
      {/* Cover */}
      <div className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          width={1024}
          height={1280}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14">
            <p className="eyebrow !text-ochre">
              {place.category} · {place.era}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-ink-foreground sm:text-6xl">
              {place.name}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-ink-foreground/75">{place.tagline}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Facts */}
        <div className="grid gap-8 border-b border-border py-10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <p className="eyebrow">{f.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{f.v}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-16 py-14 lg:grid-cols-[1.35fr_1fr]">
          {/* Story + gallery */}
          <div>
            <p className="eyebrow">History &amp; culture</p>
            <div className="mt-5 space-y-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {place.story.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <div className="mt-12">
              <p className="eyebrow">Gallery</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {place.gallery.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${place.name} view ${i + 1}`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className={`w-full rounded-sm object-cover ${
                      i === 0 ? "aspect-[4/3] sm:col-span-2" : "aspect-[4/3]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Map + planning */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="border border-border bg-card p-7">
              <p className="eyebrow">Location</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{place.address}</p>
              <div className="mt-5 overflow-hidden rounded-sm border border-border">
                <iframe
                  title={`Map of ${place.name}`}
                  src={mapsEmbed(place)}
                  loading="lazy"
                  className="h-56 w-full"
                />
              </div>
              <a
                href={mapsLink(place)}
                target="_blank"
                rel="noreferrer"
                className="btn-ink mt-5 w-full"
              >
                Open in maps
              </a>
            </div>

            {nearby.length > 0 && (
              <div className="mt-8 border border-border p-7">
                <p className="eyebrow">Nearby attractions</p>
                <ul className="mt-4 divide-y divide-border">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <Link
                        to="/places/$slug"
                        params={{ slug: n.slug }}
                        className="group flex items-baseline justify-between gap-4 py-3"
                      >
                        <span className="font-display text-lg transition-colors group-hover:text-primary">
                          {n.name}
                        </span>
                        <span className="shrink-0 text-[0.5625rem] uppercase tracking-[0.16em] text-muted-foreground">
                          {n.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* Virtual tour */}
        {place.panorama && (
          <section className="pb-20">
            <div className="rule-jali" />
            <div className="mt-12 max-w-xl">
              <p className="eyebrow">Virtual tour</p>
              <h2 className="mt-4 font-display text-4xl">Look around without leaving</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Drag across the panorama to change your view, and tap the marked points for the
                story behind each detail.
              </p>
            </div>
            <div className="mt-8">
              <PanoramaViewer
                image={place.panorama.image}
                label={place.panorama.label}
                placeName={place.name}
                hotspots={place.panorama.hotspots}
              />
            </div>
            <Link to="/virtual-tour" className="btn-outline-ink mt-8">
              All virtual locations
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}
