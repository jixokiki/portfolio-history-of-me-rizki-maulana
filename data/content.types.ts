export type Media = { src: string; alt: string; kind?: "image" | "video"; poster?: string };

export type CaseStudy = {
  index: string;
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  tags: string[];
  description: string[];
  link?: string;
  linkLabel?: string;
  note?: string;
  media: Media[];
};

export type Experience = { org: string; role: string; period: string; points: string[] };
export type Project = { title: string; period: string; tag: string; description: string; link?: string };
export type SkillGroup = { label: string; items: string[] };
export type NavLink = { href: string; label: string };

export type Content = {
  nav: { links: NavLink[]; contactCta: string };
  hero: { eyebrowLeft: string; eyebrowRight: string; tagline: string; agencyNoteBefore: string; agencyNoteAfter: string };
  profile: {
    name: string;
    roles: string[];
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    agency: { name: string; url: string };
    summary: string;
    intro: string;
    photo: string;
  };
  brandStrip: string[];
  caseStudies: CaseStudy[];
  experience: Experience[];
  education: { school: string; detail: string; period: string }[];
  skills: SkillGroup[];
  moreWork: Project[];
  graphicHighlights: string[];
  ui: {
    work: { eyebrow: string; heading: string; blurb: string; peran: string; waktu: string; photosSuffix: string; prev: string; next: string; close: string };
    experience: { eyebrow: string; heading: string };
    skills: { eyebrow: string; heading: string; graphicHeading: string };
    moreWork: { eyebrow: string; heading: string };
    archive: {
      eyebrow: string;
      heading: string;
      blurb: string;
      assets: string;
      all: string;
      open: string;
      prev: string;
      next: string;
      close: string;
      categories: Record<"projects" | "graphic" | "game" | "three-d" | "tools" | "personal", string>;
    };
    education: { eyebrow: string; heading: string };
    contact: { blurb: string; copyrightConnector: string; headingGold: string; headingRest: string };
    footer: {
      statement: string;
      emailCta: string;
      sections: string;
      selectedWork: string;
      contact: string;
      rights: string;
      builtWith: string;
    };
  };
};