"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useContent } from "@/lib/i18n";
import { ScrollHeading } from "./ui/ScrollHeading";
import { archiveAssets, archiveCategoryOrder, type ArchiveCategory } from "@/data/archive-assets";

type Filter = "all" | ArchiveCategory;

export default function ArchiveGallery() {
  const { t } = useContent();
  const ui = t.ui.archive;

  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null); // index di dalam `items`
  // Gambar yang gagal dimuat (file dihapus / path salah) → otomatis dibuang dari grid
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const markBroken = useCallback(
    (id: string) => setBroken((prev) => (prev.has(id) ? prev : new Set(prev).add(id))),
    [],
  );

  const visible = useMemo(() => archiveAssets.filter((a) => !broken.has(a.id)), [broken]);

  const items = useMemo(
    () => (filter === "all" ? visible : visible.filter((a) => a.category === filter)),
    [filter, visible],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: visible.length };
    for (const a of visible) c[a.category] = (c[a.category] ?? 0) + 1;
    return c;
  }, [visible]);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  // Keyboard + kunci scroll body saat lightbox terbuka
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  const current = active !== null ? items[active] : null;
  const chips: Filter[] = ["all", ...archiveCategoryOrder];

  return (
    <section id="archive" className="bg-pattern-dark py-24 text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{ui.eyebrow}</p>
            <ScrollHeading
              as="h2"
              variant="blur"
              color="#C9A24B"
              className="font-display mt-3 text-4xl text-gold-light md:text-5xl"
            >
              {ui.heading}
            </ScrollHeading>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/70">{ui.blurb}</p>
          </div>
          <p className="font-serif text-6xl italic leading-none text-gold/30 md:text-7xl">
            {String(items.length).padStart(2, "0")}
            <span className="ml-2 align-middle text-xs not-italic uppercase tracking-[0.25em] text-gold-deep">
              {ui.assets}
            </span>
          </p>
        </div>

        {/* Filter chips — bisa di-scroll horizontal di HP */}
        <div className="-mx-4 mt-10 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {chips.map((c) => {
              const on = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    on
                      ? "border-gold bg-gold text-ink-deep"
                      : "border-gold/25 text-cream/70 hover:border-gold/60 hover:text-gold-light"
                  }`}
                >
                  {c === "all" ? ui.all : ui.categories[c]}
                  <span className={`ml-2 tabular-nums ${on ? "text-ink-deep/60" : "text-gold-deep"}`}>{counts[c]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry — 2 kolom (HP) → 3 (tablet) → 4 (desktop) → 5 (layar lebar) */}
        <div key={filter} className="mt-8 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 2xl:columns-5">
          {items.map((a, i) => (
            <motion.button
              key={a.id}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-gold/15 bg-ink-black text-left outline-none transition duration-500 hover:border-gold/60 focus-visible:border-gold sm:mb-4"
              style={{ aspectRatio: `${a.w} / ${a.h}` }}
              aria-label={`${a.title} — ${ui.open}`}
            >
              <motion.img
                layoutId={`archive-${a.id}`}
                src={a.src}
                alt={a.title}
                width={a.w}
                height={a.h}
                loading="lazy"
                decoding="async"
                onError={() => markBroken(a.id)}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                style={{ opacity: current?.id === a.id ? 0 : 1 }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/10 to-transparent opacity-100 transition duration-500 md:opacity-0 md:group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 transition duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">{ui.categories[a.category]}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-snug text-cream-light sm:text-sm">{a.title}</p>
                </div>
                <Maximize2 size={14} className="mb-0.5 shrink-0 text-gold-light" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox — gambar "membesar" dari posisinya di grid (shared layout), gaya 21st.dev */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button
              type="button"
              onClick={close}
              aria-label={ui.close}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              aria-label={ui.prev}
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label={ui.next}
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white sm:right-6"
            >
              <ChevronRight size={20} />
            </button>

            <motion.img
              key={current.id}
              layoutId={`archive-${current.id}`}
              src={current.src}
              alt={current.title}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) next();
                else if (info.offset.x > 80) prev();
              }}
              className="cursor-grab rounded-2xl object-contain shadow-2xl active:cursor-grabbing"
              style={{
                width: `min(92vw, calc(82vh * ${current.w / current.h}))`,
                aspectRatio: `${current.w} / ${current.h}`,
              }}
              draggable={false}
            />

            <motion.div
              key={`cap-${current.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="pointer-events-none absolute inset-x-0 bottom-5 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{ui.categories[current.category]}</p>
              <p className="mt-1 text-sm text-white/90">{current.title}</p>
              <p className="mt-0.5 text-xs tabular-nums text-white/40">
                {active! + 1} / {items.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}