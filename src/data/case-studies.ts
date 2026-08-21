import portfolioNatPatoune from '../assets/editorial/portfolio-nat-patoune.webp';
import portfolioRikunali from '../assets/editorial/portfolio-rikunali.webp';

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

// Les études de cas documentent uniquement des réalisations réelles,
// avec des descriptions factuelles et des résultats qualitatifs vérifiables.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'nat-et-patoune',
    client: 'Nat et Patoune',
    sector: 'Boutique animale & Accessoires',
    problem: 'Structurer un assortiment d’articles et produits animaliers pour offrir une expérience d’achat claire, fluide et rassurante sur mobile et ordinateur.',
    services: [
      { label: 'Création de site web', href: '/creation-site-web/' },
      { label: 'Branding & Identité', href: '/branding/' },
      { label: 'Création de contenu', href: '/creation-contenu/' },
    ],
    strategy: 'Organiser l’assortiment par catégories d’animaux et types de besoins, avec un univers visuel chaleureux et une navigation épurée conçue pour faciliter le choix du client.',
    actions: [
      'Conception d’une architecture d’information intuitive articulée autour des univers chiens, chats et petits animaux.',
      'Mise en place d’une charte graphique soignée valorisant les visuels produits et la qualité des articles.',
      'Développement responsive haute performance pour une consultation fluide sur smartphone.',
      'Rédaction des fiches d’offres et structuration des points de commande sans friction.',
    ],
    results: [
      { label: 'Ergonomie & Navigation', value: 'Parcours d’achat fluide', context: 'Catalogue hiérarchisé par univers facilitant la recherche d’articles.' },
      { label: 'Identité visuelle', value: 'Image de marque soignée', context: 'Univers graphique chaleureux inspirant immédiatement confiance.' },
      { label: 'Performance technique', value: 'Affichage mobile instantané', context: 'Chargement rapide et ergonomie pensée pour l’usage nomade.' },
    ],
    image: {
      src: portfolioNatPatoune.src,
      alt: 'Projet Nat et Patoune — Présentation de la boutique en ligne sur ordinateur et smartphone',
      width: portfolioNatPatoune.width,
      height: portfolioNatPatoune.height,
    },
    date: '2025-11-15',
    seo: {
      title: 'Étude de cas Nat et Patoune — Boutique animale | CLICOM',
      description: 'Découvrez la conception du site Nat et Patoune : mise en valeur des produits animaliers, ergonomie responsive et clarté du parcours client.',
    },
  },
  {
    slug: 'rikunali',
    client: 'Rikunali',
    sector: 'Soins, thérapies naturelles & bien-être',
    problem: 'Créer un univers digital apaisant et chaleureux capable d’expliquer des approches de soins avec clarté et de faciliter la prise de contact.',
    services: [
      { label: 'Création de site web', href: '/creation-site-web/' },
      { label: 'Branding & Design UX', href: '/branding/' },
      { label: 'Création de contenu', href: '/creation-contenu/' },
    ],
    strategy: 'Associer des teintes naturelles douces, une typographie soignée et une présentation pédagogique des soins pour inspirer la sérénité et guider vers la prise de rendez-vous.',
    actions: [
      'Définition d’une direction artistique épurée et harmonieuse, inspirée des éléments naturels.',
      'Structuration des pages de prestations par bénéfice recherché (détente, équilibre, accompagnement personnalisé).',
      'Rédaction de textes sensibles et clairs explicitant le déroulement des séances.',
      'Intégration d’appels à l’action discrets mais visibles pour fluidifier la prise de rendez-vous.',
    ],
    results: [
      { label: 'Univers graphique', value: 'Atmosphère apaisante', context: 'Identité visuelle douce et élégante en parfaite adéquation avec la pratique.' },
      { label: 'Clarté de l’offre', value: 'Pédagogie des soins', context: 'Explication limpide des bienfaits et des modalités de chaque séance.' },
      { label: 'Simplicité d’accès', value: 'Prise de contact directe', context: 'Boutons de contact et réservation accessibles sur tous les écrans.' },
    ],
    image: {
      src: portfolioRikunali.src,
      alt: 'Projet Rikunali — Présentation du site de soins et bien-être sur tablette',
      width: portfolioRikunali.width,
      height: portfolioRikunali.height,
    },
    date: '2025-12-10',
    seo: {
      title: 'Étude de cas Rikunali — Soins & Bien-être | CLICOM',
      description: 'Découvrez la conception du site Rikunali : univers visuel apaisant, présentation claire des soins et prise de contact simplifiée.',
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
