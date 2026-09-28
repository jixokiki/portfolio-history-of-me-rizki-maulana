"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import GlyphLogo from "./GlyphLogo";
import { useContent } from "@/lib/i18n";
import { MagneticButton } from "./ui/MagneticButton";

export default function Contact() {
  const { t } = useContent();
  const { profile, ui } = t;

  const linkCard = "flex items-center gap-3 rounded-xl border border-gold/30 bg-cream-light px-4 py-3 text-ink-deep transition hover:border-gold";

  return (
    <section id="contact" className="bg-pattern-cream py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <GlyphLogo className="mx-auto h-10 w-16" />
        <h2 className="font-display mt-4 text-4xl text-ink-deep md:text-6xl">
          <span className="gold-text">{ui.contact.headingGold}</span> {ui.contact.headingRest}
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-serif text-base italic text-ink-deep/80">{ui.contact.blurb}</p>

        <div className="mx-auto mt-10 grid max-w-md gap-4 text-left text-sm">
          <MagneticButton href={`mailto:${profile.email}`} className={linkCard} ariaLabel="Email">
            <Mail size={16} className="text-gold-deep" /> {profile.email}
          </MagneticButton>
          <MagneticButton href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} className={linkCard} ariaLabel="Phone">
            <Phone size={16} className="text-gold-deep" /> {profile.phone}
          </MagneticButton>
          <MagneticButton href={`https://${profile.github}`} target="_blank" rel="noreferrer" className={linkCard} ariaLabel="GitHub">
            <Github size={16} className="text-gold-deep" /> {profile.github}
          </MagneticButton>
          <MagneticButton href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className={linkCard} ariaLabel="LinkedIn">
            <Linkedin size={16} className="text-gold-deep" /> {profile.linkedin}
          </MagneticButton>
        </div>

        <p className="mt-12 text-xs uppercase tracking-widest text-ink-deep/50">
          © {new Date().getFullYear()} {profile.name} {ui.contact.copyrightConnector} {profile.agency.name}
        </p>
      </div>
    </section>
  );
}
