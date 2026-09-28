"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import GlyphLogo from "./GlyphLogo";
import { useContent, type Locale } from "@/lib/i18n";
import { MagneticButton } from "./ui/MagneticButton";

export default function Nav() {
  const { t, locale, setLocale } = useContent();
  const [open, setOpen] = useState(false);

  const LangSwitch = ({ className = "" }: { className?: string }) => (
    <div className={`inline-flex items-center overflow-hidden rounded-full border border-gold/30 text-[11px] font-semibold ${className}`}>
      {(["en", "ko"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`px-2.5 py-1 uppercase tracking-wider transition ${
            locale === l ? "bg-ink-deep text-gold-pale" : "text-ink-deep/60 hover:text-ink-deep"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <GlyphLogo className="h-6 w-10 shrink-0" />
          <span className="truncate font-display text-xs tracking-widest text-ink-deep sm:text-sm">
            {t.profile.name.toUpperCase()}
          </span>
        </a>

        <ul className="hidden gap-8 text-sm font-medium text-ink-deep/80 md:flex">
          {t.nav.links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-gold-deep">
                <span className="mr-1 text-[10px] text-gold-deep/60">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <LangSwitch />
          <MagneticButton
            href="#contact"
            className="rounded-full bg-ink-deep px-4 py-2 text-xs font-semibold text-gold-pale transition hover:bg-ink-black"
          >
            {t.nav.contactCta}
          </MagneticButton>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-full border border-gold/30 p-2 text-ink-deep"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/20 bg-cream/95 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-ink-deep/80">
            {t.nav.links.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block transition hover:text-gold-deep">
                  <span className="mr-1 text-[10px] text-gold-deep/60">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 inline-block rounded-full bg-ink-deep px-4 py-2 text-xs font-semibold text-gold-pale transition hover:bg-ink-black"
          >
            {t.nav.contactCta}
          </a>
        </div>
      )}
    </header>
  );
}
