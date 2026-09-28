"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useContent } from "@/lib/i18n";
import type { CaseStudy } from "@/data/content.types";
import { ScrollHeading } from "./ui/ScrollHeading";
import Skills from "./Skills";

function BrowserFrame({ study }: { study: CaseStudy }) {
  const host = study.link ? study.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return (
    <a
      href={study.link}
      target="_blank"
      rel="noreferrer"
      className="group/frame block overflow-hidden rounded-lg border border-gold/25 bg-ink-deep shadow-[0_30px_60px_-30px_rgba(13,8,3,0.5)]"
    >
      <div className="flex items-center gap-2 border-b border-gold/15 bg-ink-black/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-gold/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/30" />
        <span className="ml-3 truncate rounded bg-cream/5 px-3 py-1 text-[11px] text-gold-pale/60">{host}</span>
      </div>
      <div className="flex min-h-[220px] flex-col items-start justify-center gap-4 px-8 py-14 md:min-h-[280px]">
        <p className="font-display text-3xl leading-none text-cream-light md:text-4xl">{study.title}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
          {study.linkLabel} <ArrowUpRight size={14} className="transition group-hover/frame:translate-x-0.5 group-hover/frame:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}

function SingleAsset({ study }: { study: CaseStudy }) {
  const m = study.media[0];
  const tone = study.slug === "trulek" ? "bg-ink-black" : "bg-[#7c3f2c]";
  return (
    <div className={`flex items-center justify-center rounded-lg border border-gold/20 ${tone} p-10 md:p-14`}>
      <img src={m.src} alt={m.alt} className="w-full max-w-sm" />
    </div>
  );
}

type GalleryLabels = { photosSuffix: string; prev: string; next: string; close: string };

const slide = {
  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -60, opacity: 0 }),
};

/**
 * Carousel satu-foto-per-layar. Kalau media pertama adalah video, video tampil dulu di atas,
 * lalu foto-fotonya di bawah (satu foto saja, geser kiri/kanan untuk ganti).
 */
function MediaCarousel({ study, labels }: { study: CaseStudy; labels: GalleryLabels }) {
  const video = study.media[0]?.kind === "video" ? study.media[0] : null;
  const images = video ? study.media.slice(1) : study.media;
  const n = images.length;

  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [zoom, setZoom] = useState(false);

  const go = useCallback(
    (d: 1 | -1) => {
      if (n < 2) return;
      setDir(d);
      setI((v) => (v + d + n) % n);
    },
    [n],
  );
  const goTo = (idx: number) => {
    setDir(idx > i ? 1 : -1);
    setI(idx);
  };

  // Keyboard + kunci scroll saat zoom terbuka
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoom, go]);

  const onDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
  };

  const cur = images[i];

  return (
    <div className="min-w-0 space-y-3">
      {video && (
        <div className="overflow-hidden rounded-lg border border-gold/20 bg-black">
          <video
            className="aspect-video w-full object-contain"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        </div>
      )}

      {cur && (
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gold/20 bg-ink-deep sm:aspect-[16/10]">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.img
                key={cur.src}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeOut" }}
                src={cur.src}
                alt={cur.alt}
                draggable={false}
                drag={n > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={onDragEnd}
                onTap={() => setZoom(true)}
                className="absolute inset-0 h-full w-full cursor-grab select-none object-contain active:cursor-grabbing"
              />
            </AnimatePresence>

            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={labels.prev}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink-black/60 p-2 text-cream backdrop-blur transition hover:bg-gold hover:text-ink-deep"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={labels.next}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink-black/60 p-2 text-cream backdrop-blur transition hover:bg-gold hover:text-ink-deep"
                >
                  <ChevronRight size={18} />
                </button>
                <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-ink-black/70 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-gold-pale">
                  {i + 1}/{n}
                </span>
              </>
            )}
          </div>

          {n > 1 && (
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-widest text-ink-deep/50">
                {n} {labels.photosSuffix}
              </span>
              <div className="flex flex-wrap justify-end gap-1.5">
                {images.map((m, idx) => (
                  <button
                    key={m.src}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`${idx + 1} / ${n}`}
                    className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-gold-deep" : "w-1.5 bg-ink-deep/25 hover:bg-ink-deep/50"}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {zoom && cur && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            role="dialog"
            aria-modal="true"
            aria-label={cur.alt}
          >
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label={labels.close}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white"
            >
              <X size={18} />
            </button>
            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label={labels.prev}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label={labels.next}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.img
                key={cur.src}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                src={cur.src}
                alt={cur.alt}
                onClick={(e) => e.stopPropagation()}
                drag={n > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={onDragEnd}
                draggable={false}
                className="max-h-[85vh] max-w-full select-none rounded-xl object-contain shadow-2xl"
              />
            </AnimatePresence>
            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tabular-nums text-white/60">
              {i + 1} / {n}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StudyMedia({ study, galleryLabels }: { study: CaseStudy; galleryLabels: GalleryLabels }) {
  if (study.media.length === 0) return <BrowserFrame study={study} />;
  if (study.media.length > 1) return <MediaCarousel study={study} labels={galleryLabels} />;
  return <SingleAsset study={study} />;
}

export default function CaseStudies() {
  const { t } = useContent();
  const { caseStudies, ui } = t;

  return (
    <section id="work" className="bg-pattern-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{ui.work.eyebrow}</p>
            <ScrollHeading as="h2" variant="roll" className="font-display mt-3 text-4xl text-ink-deep md:text-5xl">
              {ui.work.heading}
            </ScrollHeading>
          </div>
          <p className="max-w-sm font-serif text-sm italic text-ink-deep/70">{ui.work.blurb}</p>
        </div>

        <div className="mt-16 divide-y divide-gold/20">
          {caseStudies.map((study) => (
            <motion.article
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group grid gap-8 py-14 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <span className="font-serif text-6xl italic text-gold/25 md:text-7xl">{study.index}</span>
                <h3 className="font-display -mt-2 text-3xl text-ink-deep md:text-4xl">{study.title}</h3>
                <p className="mt-1 text-sm text-ink-deep/70">{study.subtitle}</p>

                <dl className="mt-6 space-y-2 text-xs">
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 uppercase tracking-wider text-gold-deep">{ui.work.peran}</dt>
                    <dd className="text-ink-deep/80">{study.role}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 uppercase tracking-wider text-gold-deep">{ui.work.waktu}</dt>
                    <dd className="text-ink-deep/80">{study.period}</dd>
                  </div>
                </dl>

                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] uppercase tracking-wide text-ink-deep/60">
                  {study.tags.map((tag) => (
                    <li key={tag} className="hairline pt-1.5 first:border-t-0 first:pt-0">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-3 text-sm leading-relaxed text-ink-deep/85">
                  {study.description.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {study.note && <p className="mt-4 border-l-2 border-gold/50 pl-3 text-xs italic text-ink-deep/60">{study.note}</p>}

                {study.link && study.media.length > 0 && (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-deep underline decoration-gold decoration-2 underline-offset-4"
                  >
                    {study.linkLabel} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              <div className="min-w-0 md:col-span-8">
                <StudyMedia study={study} galleryLabels={ui.work} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <Skills />
    </section>
  );
}


// "use client";

// import { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
// import { useContent } from "@/lib/i18n";
// import type { CaseStudy } from "@/data/content.types";
// import { ScrollHeading } from "./ui/ScrollHeading";
// import Skills from "./Skills";

// function BrowserFrame({ study }: { study: CaseStudy }) {
//   const host = study.link ? study.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
//   return (
//     <a
//       href={study.link}
//       target="_blank"
//       rel="noreferrer"
//       className="group/frame block overflow-hidden rounded-lg border border-gold/25 bg-ink-deep shadow-[0_30px_60px_-30px_rgba(13,8,3,0.5)]"
//     >
//       <div className="flex items-center gap-2 border-b border-gold/15 bg-ink-black/60 px-4 py-2.5">
//         <span className="h-2.5 w-2.5 rounded-full bg-gold/30" />
//         <span className="h-2.5 w-2.5 rounded-full bg-gold/30" />
//         <span className="h-2.5 w-2.5 rounded-full bg-gold/30" />
//         <span className="ml-3 truncate rounded bg-cream/5 px-3 py-1 text-[11px] text-gold-pale/60">{host}</span>
//       </div>
//       <div className="flex min-h-[220px] flex-col items-start justify-center gap-4 px-8 py-14 md:min-h-[280px]">
//         <p className="font-display text-3xl leading-none text-cream-light md:text-4xl">{study.title}</p>
//         <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
//           {study.linkLabel} <ArrowUpRight size={14} className="transition group-hover/frame:translate-x-0.5 group-hover/frame:-translate-y-0.5" />
//         </span>
//       </div>
//     </a>
//   );
// }

// function DoeunGallery({ study }: { study: CaseStudy }) {
//   const [video, logo, ...rest] = study.media;
//   return (
//     <div className="grid grid-cols-6 gap-3">
//       <div className="group relative col-span-6 overflow-hidden rounded-lg border border-gold/20 sm:col-span-3 sm:row-span-2">
//         <video className="h-full w-full object-cover" src={video.src} poster={video.poster} autoPlay muted loop playsInline />
//       </div>
//       <div className="col-span-3 flex items-center justify-center rounded-lg border border-gold/20 bg-ink-deep p-6 sm:col-span-2">
//         <img src={logo.src} alt={logo.alt} className="w-full max-w-[140px]" />
//       </div>
//       {rest.slice(0, 7).map((m, i) => (
//         <div
//           key={m.src}
//           className={`group relative overflow-hidden rounded-lg border border-gold/20 ${
//             i === 0 ? "col-span-3 sm:col-span-1" : "col-span-3 sm:col-span-2"
//           } ${i === 2 ? "sm:col-span-2" : ""}`}
//         >
//           <img src={m.src} alt={m.alt} className="photo-duotone h-full w-full object-cover" loading="lazy" />
//         </div>
//       ))}
//     </div>
//   );
// }

// function SingleAsset({ study }: { study: CaseStudy }) {
//   const m = study.media[0];
//   const tone = study.slug === "trulek" ? "bg-ink-black" : "bg-[#7c3f2c]";
//   return (
//     <div className={`flex items-center justify-center rounded-lg border border-gold/20 ${tone} p-10 md:p-14`}>
//       <img src={m.src} alt={m.alt} className="w-full max-w-sm" />
//     </div>
//   );
// }

// type GalleryLabels = { photosSuffix: string; prev: string; next: string; close: string };

// function Gallery({ study, labels }: { study: CaseStudy; labels: GalleryLabels }) {
//   const [index, setIndex] = useState<number | null>(null);
//   const trackRef = useRef<HTMLDivElement>(null);

//   const scrollByCard = (dir: 1 | -1) => {
//     const el = trackRef.current;
//     if (!el) return;
//     const card = el.querySelector<HTMLElement>("[data-card]");
//     const step = card ? card.offsetWidth + 12 : 260;
//     el.scrollBy({ left: dir * step, behavior: "smooth" });
//   };

//   return (
//     <div className="relative">
//       <div
//         ref={trackRef}
//         className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
//       >
//         {study.media.map((m, i) => (
//           <button
//             key={m.src}
//             data-card
//             type="button"
//             onClick={() => setIndex(i)}
//             className="group relative aspect-[9/16] w-[74%] shrink-0 snap-start overflow-hidden rounded-lg border border-gold/20 bg-ink-deep sm:w-[44%] lg:w-[30%]"
//           >
//             <img src={m.src} alt={m.alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
//             <span className="absolute bottom-2 right-2 rounded-full bg-ink-black/70 px-2 py-0.5 text-[10px] font-semibold text-gold-pale">
//               {i + 1}/{study.media.length}
//             </span>
//           </button>
//         ))}
//       </div>

//       <div className="mt-3 flex items-center justify-between gap-3">
//         <span className="text-[11px] uppercase tracking-widest text-ink-deep/50">
//           {study.media.length} {labels.photosSuffix}
//         </span>
//         <div className="flex shrink-0 gap-2">
//           <button type="button" onClick={() => scrollByCard(-1)} aria-label={labels.prev} className="rounded-full border border-gold/30 p-1.5 text-ink-deep transition hover:border-gold">
//             <ChevronLeft size={16} />
//           </button>
//           <button type="button" onClick={() => scrollByCard(1)} aria-label={labels.next} className="rounded-full border border-gold/30 p-1.5 text-ink-deep transition hover:border-gold">
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>

//       <AnimatePresence>
//         {index !== null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/90 p-4"
//             onClick={() => setIndex(null)}
//           >
//             <button type="button" onClick={() => setIndex(null)} aria-label={labels.close} className="absolute right-4 top-4 rounded-full border border-gold/30 p-2 text-cream">
//               <X size={20} />
//             </button>

//             {index > 0 && (
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIndex((v) => (v !== null && v > 0 ? v - 1 : v));
//                 }}
//                 aria-label={labels.prev}
//                 className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-gold/30 p-2 text-cream sm:left-6"
//               >
//                 <ChevronLeft size={22} />
//               </button>
//             )}
//             {index < study.media.length - 1 && (
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIndex((v) => (v !== null && v < study.media.length - 1 ? v + 1 : v));
//                 }}
//                 aria-label={labels.next}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-gold/30 p-2 text-cream sm:right-6"
//               >
//                 <ChevronRight size={22} />
//               </button>
//             )}

//             <motion.img
//               key={study.media[index].src}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.96 }}
//               src={study.media[index].src}
//               alt={study.media[index].alt}
//               onClick={(e) => e.stopPropagation()}
//               className="max-h-[85vh] max-w-full rounded-lg object-contain"
//             />

//             <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink-deep/80 px-3 py-1 text-xs text-gold-pale">
//               {index + 1} / {study.media.length}
//             </span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function StudyMedia({ study, galleryLabels }: { study: CaseStudy; galleryLabels: GalleryLabels }) {
//   if (study.slug === "doeun") return <DoeunGallery study={study} />;
//   if (study.media.length === 0) return <BrowserFrame study={study} />;
//   if (study.media.length > 1) return <Gallery study={study} labels={galleryLabels} />;
//   return <SingleAsset study={study} />;
// }

// export default function CaseStudies() {
//   const { t } = useContent();
//   const { caseStudies, ui } = t;

//   return (
//     <section id="work" className="bg-pattern-cream py-24">
//       <div className="mx-auto max-w-6xl px-6">
//         <div className="flex flex-wrap items-end justify-between gap-4">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{ui.work.eyebrow}</p>
//             <ScrollHeading as="h2" variant="roll" className="font-display mt-3 text-4xl text-ink-deep md:text-5xl">
//               {ui.work.heading}
//             </ScrollHeading>
//           </div>
//           <p className="max-w-sm font-serif text-sm italic text-ink-deep/70">{ui.work.blurb}</p>
//         </div>

//         <div className="mt-16 divide-y divide-gold/20">
//           {caseStudies.map((study) => (
//             <motion.article
//               key={study.slug}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//               className="group grid gap-8 py-14 md:grid-cols-12 md:gap-10"
//             >
//               <div className="md:col-span-4">
//                 <span className="font-serif text-6xl italic text-gold/25 md:text-7xl">{study.index}</span>
//                 <h3 className="font-display -mt-2 text-3xl text-ink-deep md:text-4xl">{study.title}</h3>
//                 <p className="mt-1 text-sm text-ink-deep/70">{study.subtitle}</p>

//                 <dl className="mt-6 space-y-2 text-xs">
//                   <div className="flex gap-2">
//                     <dt className="w-16 shrink-0 uppercase tracking-wider text-gold-deep">{ui.work.peran}</dt>
//                     <dd className="text-ink-deep/80">{study.role}</dd>
//                   </div>
//                   <div className="flex gap-2">
//                     <dt className="w-16 shrink-0 uppercase tracking-wider text-gold-deep">{ui.work.waktu}</dt>
//                     <dd className="text-ink-deep/80">{study.period}</dd>
//                   </div>
//                 </dl>

//                 <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] uppercase tracking-wide text-ink-deep/60">
//                   {study.tags.map((tag) => (
//                     <li key={tag} className="hairline pt-1.5 first:border-t-0 first:pt-0">
//                       {tag}
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="mt-6 space-y-3 text-sm leading-relaxed text-ink-deep/85">
//                   {study.description.map((p) => (
//                     <p key={p}>{p}</p>
//                   ))}
//                 </div>

//                 {study.note && <p className="mt-4 border-l-2 border-gold/50 pl-3 text-xs italic text-ink-deep/60">{study.note}</p>}

//                 {study.link && study.media.length > 0 && (
//                   <a
//                     href={study.link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-deep underline decoration-gold decoration-2 underline-offset-4"
//                   >
//                     {study.linkLabel} <ArrowUpRight size={14} />
//                   </a>
//                 )}
//               </div>

//               <div className="md:col-span-8">
//                 <StudyMedia study={study} galleryLabels={ui.work} />
//               </div>
//             </motion.article>
//           ))}
//         </div>
//       </div>
//       <Skills />
//     </section>
//   );
// }