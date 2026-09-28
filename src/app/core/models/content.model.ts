import type { FrameTone } from '../../shared/image-frame.component';

export interface Profile {
  name: string;
  role: string;
  location: string;
  intro: string;
  email: string;
  socials: SocialLink[];
  siteUrl: string;
}

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface Qualification {
  period: string;
  tag: string;
  title: string;
  institution: string;
  description: string;
  current?: boolean;
}

export interface JourneyStage {
  numeral: string;
  title: string;
  description: string;
  current?: boolean;
}

export interface Interest {
  title: string;
  description: string;
  /** SVG path data for a 24×24 stroke icon */
  icon: string;
}

export interface Hobby {
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
  /** Masonry shape on desktop */
  shape: 'tall' | 'wide' | 'square' | 'feature';
  tone: FrameTone;
}

export interface Book {
  title: string;
  author: string;
  thought: string;
  cover?: string;
  tone: 'pink' | 'teal' | 'marigold' | 'saffron';
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}
