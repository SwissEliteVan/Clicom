
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingPreviewSection = () => {
  const cards = [
    {
      name: "Site Essentiel",
      price: "990",
      description: "Parfait pour se lancer proprement.",
      features: ["Page unique (Landing Page)", "Design mobile-first", "Formulaire de contact", "Hébergement inclus (1 an)"],
      highlight: false
    },
    {
      name: "Site Pro + SEO",
      price: "2490",
      description: "Le standard pour les PME.",
      features: ["Site 5-8 pages", "CMS (autonomie totale)", "Optimisation Google (SEO)", "Blog intégré"],
      highlight: true
    },
    {
      name: "Premium Marque",
      price: "Dès 3990",
      description: "Pour dominer votre marché.",
      features: ["Design 100% sur mesure", "Animations avancées", "Stratégie de contenu", "Connexion CRM"],
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            Investissez dans votre <span className="text-indigo-600">croissance</span>
          </motion.h2>
          <p className="text-lg text-slate-600">
            Des tarifs transparents, sans coûts cachés. Choisissez le pack adapté à votre stade de développement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 border ${
                card.highlight ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm hover:shadow-md'
              } flex flex-col`}
            >
              {card.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Le plus populaire
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-2">{card.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-slate-900">{card.price}</span>
                <span className="text-slate-500 font-medium text-sm"> CHF</span>
              </div>
              <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-100">
                {card.description}
              </p>
              <ul className="space-y-4 mb-8 flex-grow">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-700">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={`/tarifs`}>
                <Button 
                  variant={card.highlight ? "default" : "outline"}
                  className={`w-full ${card.highlight ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
                >
                  En savoir plus
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/tarifs">
            <Button size="lg" className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 gap-2">
              Voir tous les détails et options <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPreviewSection;
