import { useCallback, useEffect, useRef, useState } from "react";
import type { Hotspot } from "@/data/places";

type Props = {
  image: string;
  label: string;
  placeName: string;
  hotspots: Hotspot[];
};

const WIDTH_FACTOR = 2.6; // panorama is rendered this many times the viewport width

/**
 * Drag-to-pan panoramic viewer built on a wide equirectangular still.
 * Interactive 360° photography — no VR hardware involved.
 */
export function PanoramaViewer({ image, label, placeName, hotspots }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startOffset: number } | null>(null);
  const [offset, setOffset] = useState(0.5); // 0 = far left, 1 = far right
  const [active, setActive] = useState<Hotspot | null>(hotspots[0] ?? null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setActive(hotspots[0] ?? null);
    setOffset(0.5);
  }, [image, hotspots]);

  const pan = useCallback((delta: number) => {
    setOffset((o) => Math.min(1, Math.max(0, o + delta)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, startOffset: offset };
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    const frame = frameRef.current;
    if (!drag || !frame) return;
    const travel = frame.clientWidth * (WIDTH_FACTOR - 1);
    const next = drag.startOffset - (e.clientX - drag.startX) / travel;
    setOffset(Math.min(1, Math.max(0, next)));
  };

  const endDrag = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const translate = -offset * (WIDTH_FACTOR - 1) * 100;

  return (
    <div className="overflow-hidden rounded-md bg-ink text-ink-foreground">
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") pan(0.08);
          if (e.key === "ArrowLeft") pan(-0.08);
        }}
        tabIndex={0}
        role="group"
        aria-label={`Interactive 360 degree view: ${label}, ${placeName}`}
        className={`relative h-[320px] touch-none select-none overflow-hidden outline-none sm:h-[440px] lg:h-[560px] ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${WIDTH_FACTOR * 100}%`,
            transform: `translateX(${translate / WIDTH_FACTOR}%)`,
            transition: dragging ? "none" : "transform 0.7s var(--ease-heritage)",
          }}
        >
          <img
            src={image}
            alt={`${label} at ${placeName}`}
            loading="lazy"
            width={1920}
            height={640}
            draggable={false}
            className="size-full object-cover"
          />

          {hotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setActive(h)}
              aria-label={h.title}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span className="relative flex size-7 items-center justify-center">
                <span className="hotspot-ring absolute inset-0 rounded-full bg-ochre" />
                <span
                  className={`relative size-3 rounded-full ring-2 ring-ink-foreground/70 ${
                    active?.id === h.id ? "bg-ink-foreground" : "bg-ochre"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.5625rem] uppercase tracking-[0.24em] text-ink-foreground/60">
              Interactive 360° view · drag to look around
            </p>
            <p className="mt-1 font-display text-xl">{label}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => pan(-0.15)}
              aria-label="Pan left"
              className="size-10 rounded-full border border-ink-foreground/25 text-sm transition-colors hover:bg-ink-foreground/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => pan(0.15)}
              aria-label="Pan right"
              className="size-10 rounded-full border border-ink-foreground/25 text-sm transition-colors hover:bg-ink-foreground/10"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 border-t border-ink-foreground/10 p-6 sm:grid-cols-[1fr_1.4fr] sm:p-8">
        <div>
          <p className="text-[0.5625rem] uppercase tracking-[0.24em] text-ochre">
            Points of interest
          </p>
          <ul className="mt-4 space-y-1">
            {hotspots.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => setActive(h)}
                  className={`w-full border-l-2 py-2 pl-4 text-left text-sm transition-colors ${
                    active?.id === h.id
                      ? "border-ochre text-ink-foreground"
                      : "border-ink-foreground/15 text-ink-foreground/55 hover:text-ink-foreground"
                  }`}
                >
                  {h.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {active && (
          <div className="border-t border-ink-foreground/10 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <h3 className="font-display text-2xl">{active.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{active.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
