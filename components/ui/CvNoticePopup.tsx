"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, Minus, X } from "lucide-react";
import { useContent } from "@/lib/i18n";

const CV_PDF = "/cv/CV_Rizki_Maulana.pdf";
const CV_PAGES = ["/cv/cv-page-1.webp", "/cv/cv-page-2.webp", "/cv/cv-page-3.webp"];
const SHOW_AFTER_MS = 3000;

const copy = {
  en: {
    badge: "Quick note",
    title: "This portfolio was built in just 2 days",
    body: "I made it as an optional requirement for my application to Eterna — I'm genuinely interested in joining the team. For the full details, take a look at my CV.",
    view: "View CV",
    download: "Download",
    close: "Close",
    minimize: "Minimize",
    reopen: "Open note about this portfolio",
    pill: "About this portfolio",
    cvTitle: "Curriculum Vitae — Rizki Maulana",
  },
  ko: {
    badge: "안내",
    title: "이 포트폴리오는 단 2일 만에 제작했습니다",
    body: "에테르나(Eterna) 지원의 선택 과제로 만들었으며, 함께하고 싶은 마음이 큽니다. 자세한 내용은 제 이력서(CV)에서 확인해 주세요.",
    view: "CV 보기",
    download: "다운로드",
    close: "닫기",
    minimize: "최소화",
    reopen: "이 포트폴리오 안내 다시 열기",
    pill: "포트폴리오 안내",
    cvTitle: "이력서 — Rizki Maulana",
  },
} as const;

/**
 * Popup 3 detik setelah halaman dimuat (tiap refresh) + viewer CV inline (tanpa pindah halaman).
 * Di-render lewat portal ke <body> supaya `fixed` tidak terpengaruh transform di StickyReveal.
 */
export default function CvNoticePopup() {
  const { locale } = useContent();
  const c = copy[locale];

  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false); // false = belum muncul / sudah ditutup total
  const [minimized, setMinimized] = useState(false);
  const [viewer, setViewer] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = window.setTimeout(() => setShow(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(id);
  }, []);

  // Esc + kunci scroll saat viewer terbuka
  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setViewer(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [viewer]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Popup notifikasi */}
      <AnimatePresence>
        {show && !minimized && !viewer && (
          <motion.div
            key="notice"
            role="dialog"
            aria-label={c.title}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-ink-deep p-5 text-cream shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
              <div className="absolute right-2.5 top-2.5 flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setMinimized(true)}
                  aria-label={c.minimize}
                  title={c.minimize}
                  className="rounded-full p-1.5 text-cream/60 transition hover:bg-white/10 hover:text-cream"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  aria-label={c.close}
                  title={c.close}
                  className="rounded-full p-1.5 text-cream/60 transition hover:bg-white/10 hover:text-cream"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{c.badge}</p>
              <p className="font-display mt-1.5 pr-14 text-xl leading-tight text-gold-light">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">{c.body}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setViewer(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-deep transition hover:bg-gold-light"
                >
                  <FileText size={14} /> {c.view}
                </button>
                <a
                  href={CV_PDF}
                  download="CV_Rizki_Maulana.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-light transition hover:border-gold hover:bg-gold/10"
                >
                  <Download size={14} /> {c.download}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill hasil minimize — klik untuk membuka lagi */}
      <AnimatePresence>
        {show && minimized && !viewer && (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setMinimized(false)}
            aria-label={c.reopen}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed bottom-4 right-4 z-[90] inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink-deep py-2.5 pl-3.5 pr-4 text-xs font-semibold uppercase tracking-wider text-gold-light shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] transition hover:border-gold hover:bg-ink-black sm:bottom-6 sm:right-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {c.pill}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Viewer CV inline */}
      <AnimatePresence>
        {viewer && (
          <motion.div
            key="cv-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={c.cvTitle}
            className="fixed inset-0 z-[110] flex flex-col bg-black/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewer(false)}
          >
            <div
              className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="min-w-0 truncate text-sm font-medium text-cream-light">{c.cvTitle}</p>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={CV_PDF}
                  download="CV_Rizki_Maulana.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-ink-deep transition hover:bg-gold-light"
                >
                  <Download size={14} /> {c.download}
                </a>
                <button
                  type="button"
                  onClick={() => setViewer(false)}
                  aria-label={c.close}
                  className="rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <motion.div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-8 sm:px-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {CV_PAGES.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${c.cvTitle} — ${i + 1}/${CV_PAGES.length}`}
                    onClick={(e) => e.stopPropagation()}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="w-full rounded-lg bg-white shadow-2xl"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}