import { createFileRoute, Link } from "@tanstack/react-router";
import heroFort from "@/assets/hero-fort.jpg";
import { PlaceCard } from "@/components/PlaceCard";
import { places, virtualPlaces } from "@/data/places";
import AIGuide from "@/components/AIGuide";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explore Gwalior — Heritage Travel & 360° Virtual Tours" },
      {
        name: "description",
        content:
          "Plan a visit to Gwalior's fort, palaces and temples, or explore them virtually with interactive 360° panoramas and heritage stories.",
      },
      { property: "og:title", content: "Explore Gwalior — Heritage Travel & 360° Virtual Tours" },
      {
        property: "og:description",
        content:
          "Timings, tickets, maps and interactive 360° tours of Gwalior Fort, Jai Vilas Palace, Tansen's Tomb and Sas Bahu Temple.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = places.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
          <img
            src={heroFort}
            alt="Gwalior Fort ramparts glowing in golden evening light above the city"
            width={1920}
            height={1088}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
              <p className="reveal eyebrow !text-ochre">Madhya Pradesh · India</p>
              <h1 className="reveal mt-5 max-w-3xl font-display text-5xl leading-[1.05] text-ink-foreground sm:text-6xl lg:text-7xl">
                A fortress city carved in sandstone and song
              </h1>
              <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/75">
                Gwalior holds a thousand years of building on one hill — Tomar palaces, Jain
                colossi, an eleventh-century temple pair, and the tomb of the musician Tansen.
                Walk it in person, or explore it from wherever you are.
              </p>
              <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/explore" className="btn-sand">
                  Plan your visit
                </Link>
                <Link
                  to="/virtual-tour"
                  className="btn-base border border-ink-foreground/40 text-ink-foreground hover:bg-ink-foreground hover:text-ink"
                >
                  Explore virtually
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two experiences */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-px bg-border md:grid-cols-2">
          <div className="bg-background p-8 sm:p-12">
            <p className="eyebrow">01 · Physical tourism</p>
            <h2 className="mt-5 font-display text-4xl">Here on the ground</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Opening hours, ticket prices, how long each site takes, what sits nearby, and a map
              link that opens straight in your phone. Search by name or filter by the kind of
              place you want to see.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="border-t border-border pt-3">Timings &amp; entry fees for every site</li>
              <li className="border-t border-border pt-3">Location, map and directions</li>
              <li className="border-t border-border pt-3">Nearby attractions and visit duration</li>
            </ul>
            <Link to="/explore" className="btn-ink mt-9">
              Browse {places.length} sites
            </Link>
          </div>

          <div className="bg-ink p-8 text-ink-foreground sm:p-12">
            <p className="eyebrow !text-ochre">02 · Virtual tourism</p>
            <h2 className="mt-5 font-display text-4xl">Or from anywhere</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/70">
              Drag through interactive 360° panoramas of the fort courtyard, the Durbar Hall and
              the temple platforms. Tap the marked points to read the history behind what
              you&apos;re looking at.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink-foreground/70">
              <li className="border-t border-ink-foreground/15 pt-3">
                {virtualPlaces.length} panoramic locations
              </li>
              <li className="border-t border-ink-foreground/15 pt-3">
                Clickable hotspots with heritage notes
              </li>
              <li className="border-t border-ink-foreground/15 pt-3">
                Works in the browser — no headset needed
              </li>
            </ul>
            <Link to="/virtual-tour" className="btn-sand mt-9">
              Start the virtual tour
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Where to begin</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Three that define the city</h2>
          </div>
          <Link
            to="/explore"
            className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            All heritage sites →
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PlaceCard key={p.slug} place={p} />
          ))}
        </div>
      </section>

      {/* Planning strip */}
      <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <div className="rule-jali" />
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Best season", v: "October – March", n: "Cool mornings, clear light on the stone" },
            { k: "Ideal stay", v: "2 days", n: "One for the fort, one for the city below" },
            { k: "Getting there", v: "Rail & air", n: "Delhi–Bhopal line; Gwalior airport (GWL)" },
            { k: "Local highlight", v: "Tansen Samaroh", n: "Classical music festival each December" },
          ].map((item) => (
            <div key={item.k}>
              <p className="eyebrow">{item.k}</p>
              <p className="mt-3 font-display text-2xl">{item.v}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.n}</p>
            </div>
          ))}
        </div>
      </section>
      {/* AI Tourism Guide */}
      <AIGuide />
    </>
  );
}
