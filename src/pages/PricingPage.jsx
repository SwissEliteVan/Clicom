
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, HelpCircle, ShieldCheck, Zap, PenTool, Layout, Search, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingPage = () => {
  const packs = [
    {
      id: "essentiel",
      name: "Site Essentiel",
      price: "990",
      description: "Pour démarrer votre présence en ligne proprement.",
      features: [
        "Page unique (Landing Page)",
        "Design pro & Mobile first",
        "Formulaire de contact",
        "Intégration réseaux sociaux",
        "Hébergement inclus (1 an)",
        "Certificat SSL (HTTPS)"
      ],
      highlight: false,
      cta: "Commander l'Essentiel"
    },
    {
      id: "pro",
      name: "Site Pro + SEO",
      price: "2490",
      description: "L'outil de croissance idéal pour PME & artisans.",
      features: [
        "Site vitrine 5 à 8 pages",
        "CMS (WordPress/Webflow)",
        "Optimisation fiche Google (GMB)",
        "SEO Technique de base",
        "Blog actualités",
        "Formation prise en main (1h)"
      ],
      highlight: true,
      badge: "Le plus choisi",
      cta: "Booster ma visibilité"
    },
    {
      id: "premium",
      name: "Premium Marque",
      price: "3990 - 5990",
      description: "Une image de marque forte pour se démarquer.",
      features: [
        "Design 100% sur mesure",
        "Animations & Interactions",
        "Stratégie de contenu & Copywriting",
        "SEO Avancé (Structure sémantique)",
        "Connexion CRM / Newsletter",
        "Support prioritaire (3 mois)"
      ],
      highlight: false,
      cta: "Discuter du projet"
    },
    {
      id: "excellence",
      name: "Swiss Excellence",
      price: "6900 - 12900",
      description: "Plateformes complexes et E-commerce.",
      features: [
        "E-commerce ou Web App",
        "Espace client privé",
        "Automatisations lourdes (API)",
        "Audit de marché complet",
        "Dashboard de performance",
        "Maintenance VIP"
      ],
      highlight: false,
      cta: "Sur devis uniquement"
    }
  ];

  const options = [
    { icon: PenTool, name: "Création de Logo", price: "490 CHF" },
    { icon: Layout, name: "Charte Graphique complète", price: "890 CHF" },
    { icon: Search, name: "Audit SEO complet", price: "890 CHF" },
    { icon: Zap, name: "SEO Mensuel (Suivi)", price: "dès 590 CHF/mois" },
    { icon: Server, name: "Maintenance technique", price: "dès 89 CHF/mois" },
    { icon: Zap, name: "Livraison Express (5 jours)", price: "+ 20%" },
    { icon: ShieldCheck, name: "Module QR-Facture", price: "290 CHF" }
  ];

  const steps = [
    { number: "01", title: "Cadrage", desc: "Atelier de définition des besoins et objectifs." },
    { number: "02", title: "Production", desc: "Design, développement et intégration du contenu." },
    { number: "03", title: "Validation", desc: "Retours, ajustements et recette finale." },
    { number: "04", title: "Mise en ligne", desc: "Formation, transfert de propriété et lancement." }
  ];

  const faq = [
    { q: "Quels sont les délais de livraison ?", a: "Pour un Site Essentiel, comptez 1 à 2 semaines. Un Site Pro prend généralement 3 à 5 semaines. Les projets Premium peuvent prendre 6 à 10 semaines selon la complexité." },
    { q: "Suis-je propriétaire de mon site ?", a: "Oui, à 100%. Une fois le solde réglé, vous êtes le seul propriétaire du nom de domaine, de l'hébergement et de tout le contenu." },
    { q: "Y a-t-il des frais mensuels ?", a: "Non, nos prix sont 'one-shot'. Les seuls frais récurrents sont l'hébergement et le nom de domaine (env. 100-150 CHF/an), que vous payez directement au prestataire (Infomaniak, Hostinger, etc.)." },
    { q: "Le site sera-t-il visible sur Google ?", a: "Oui. Tous nos sites sont construits avec les meilleures pratiques techniques pour le SEO. Le pack Pro inclut une optimisation spécifique pour le référencement local." },
    { q: "Puis-je modifier le texte moi-même ?", a: "Absolument. Nous utilisons des CMS modernes (WordPress, Webflow) et nous vous formons pour que vous puissiez modifier textes et images en toute autonomie." },
    { q: "Comment se passe le paiement ?", a: "Nous demandons un acompte de 50% à la commande pour lancer le projet, et le solde de 50% à la livraison, avant la mise en ligne." },
    { q: "Faites-vous la rédaction des textes ?", a: "Pour les packs Essentiel et Pro, vous fournissez les textes (nous pouvons les relire). Le pack Premium inclut une aide à la stratégie éditoriale." },
    { q: "Proposez-vous un service de maintenance ?", a: "Oui, nous proposons des forfaits de maintenance optionnels pour les mises à jour de sécurité et les petites modifications, mais ce n'est pas obligatoire." },
    { q: "Et si j'ai déjà un site ?", a: "Nous pouvons effectuer une refonte. Nous analysons l'existant pour ne pas perdre votre référencement actuel et nous modernisons le design et la technique." },
    { q: "Acceptez-vous les paiements en plusieurs fois ?", a: "Pour les projets supérieurs à 5000 CHF, nous pouvons mettre en place un échéancier en 3 fois sans frais." }
  ];

  return (
    <>
      <Helmet>
        <title>Tarifs Création Site Web Suisse | Transparence & Qualité</title>
        <meta name="description" content="Découvrez nos tarifs pour la création de sites web en Suisse. Packs tout inclus dès 990 CHF. Sites vitrines, e-commerce et SEO. Transparence totale." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Tarifs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Investissez dans un outil rentable, pas dans une dépense. <br/>
            Des prix clairs, fixes et sans surprise.
          </motion.p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="bg-slate-50 py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {packs.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col bg-white rounded-2xl p-6 ${
                  pack.highlight 
                    ? 'border-2 border-indigo-600 shadow-2xl scale-105 z-10' 
                    : 'border border-slate-200 shadow-sm hover:shadow-lg'
                }`}
              >
                {pack.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    {pack.badge}
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{pack.name}</h3>
                  <div className="mt-2 mb-2">
                    <span className="text-3xl font-bold text-slate-900">{pack.price}</span>
                    <span className="text-slate-500 font-medium text-sm"> CHF</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">{pack.description}</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-700">
                        <Check className={`h-5 w-5 mr-3 flex-shrink-0 ${pack.highlight ? 'text-indigo-600' : 'text-green-500'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={`/contact?pack=${pack.id}`} className="mt-auto">
                  <Button 
                    className={`w-full ${
                      pack.highlight 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                    }`}
                  >
                    {pack.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Options à la carte */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Options à la carte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {options.map((option, index) => (
              <div key={index} className="flex items-center p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors">
                <div className="bg-slate-100 p-3 rounded-lg mr-4 text-slate-600">
                  <option.icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{option.name}</h4>
                  <p className="text-indigo-600 font-bold text-sm">{option.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Notre méthode de travail</h2>
            <p className="text-slate-600">Un processus rodé pour des projets livrés à l'heure.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-6xl font-bold text-slate-200 mb-4 group-hover:text-indigo-100 transition-colors">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-slate-200 -z-10 translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-slate-900">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Legal Note */}
      <div className="bg-slate-50 py-8 text-center border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-xs text-slate-400">
          <p>
            * Tous nos prix s'entendent hors TVA (8.1%). Les tarifs sont indicatifs et peuvent varier selon la complexité spécifique de votre projet.
            Un devis détaillé est systématiquement fourni avant tout démarrage. 
            Conditions de paiement : 50% à la commande, 50% à la livraison.
          </p>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
