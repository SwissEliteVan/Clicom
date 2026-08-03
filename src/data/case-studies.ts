export interface CaseStudyMedia {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CaseStudyVideo {
  src: string;
  poster?: CaseStudyMedia;
  title: string;
}

export interface CaseStudyResultItem {
  label: string;
  value: string;
  context?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  problem: string;
  services: Array<{ label: string; href: string }>;
  strategy: string;
  actions: string[];
  results: CaseStudyResultItem[];
  testimonial?: { quote: string; author: string; role?: string };
  image: CaseStudyMedia;
  gallery?: CaseStudyMedia[];
  video?: CaseStudyVideo;
  date: string;
  seo: {
    title: string;
    description: string;
    canonical?: string;
    socialImage?: string;
  };
}

// Les études de cas ne sont ajoutées qu'avec des informations réelles,
// des médias autorisés et des résultats dont le contexte peut être publié.
export const caseStudies: CaseStudy[] = [];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
