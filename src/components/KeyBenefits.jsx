
import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, DollarSign, Clock } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: "Ciblage Précis",
    description: "On ne tire pas au hasard. On vise exactement vos futurs clients idéaux.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Croissance Durable",
    description: "Des stratégies SEO et contenu qui paient sur le long terme, pas juste un buzz d'un jour.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: DollarSign,
    title: "ROI Transparent",
    description: "Chaque franc investi doit rapporter. Nos rapports sont clairs : combien ça coûte, combien ça rapporte.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Clock,
    title: "Gain de Temps",
    description: "Vous gérez votre boîte, on gère votre web. Déléguez et respirez.",
    color: "bg-amber-100 text-amber-600"
  }
];

const KeyBenefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img alt="Réunion stratégique équipe marketing" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1681949215173-fe0d15c790c1" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white max-w-xs">
                <p className="font-bold text-xl">"Leur approche a transformé notre acquisition client en 3 mois."</p>
                <p className="text-sm mt-2 opacity-90">- Marc D., Directeur PME</p>
              </div>
            </div>
            {/* Decorator blob */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-slate-100 rounded-3xl transform -rotate-3"></div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Pourquoi les PME suisses nous choisissent ?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Marre des agences qui parlent chinois ? Nous aussi. Voici comment on travaille pour faire décoller votre business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-start"
                  >
                    <div className={`p-3 rounded-xl ${benefit.color} mb-4`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
