
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const caseStudies = [
  {
    company: 'Café du Centre',
    location: 'Lausanne',
    industry: 'Restauration',
    results: [
      { icon: TrendingUp, value: '+147%', label: 'Réservations en ligne' },
      { icon: Users, value: '2.3x', label: 'Plus de trafic local' },
      { icon: DollarSign, value: '+89K CHF', label: 'CA additionnel' },
    ],
    quote: 'En 3 mois, on a doublé nos réservations. Et le téléphone sonne non-stop.',
    image: 'Modern café interior with customers enjoying coffee',
  },
  {
    company: 'Plomberie Genève Pro',
    location: 'Genève',
    industry: 'Services',
    results: [
      { icon: TrendingUp, value: '+203%', label: 'Appels qualifiés' },
      { icon: Users, value: '1er', label: 'Sur Google Maps' },
      { icon: DollarSign, value: '+125K CHF', label: 'CA mensuel' },
    ],
    quote: 'Je refuse des clients maintenant. Un bon problème à avoir !',
    image: 'Professional plumber working on modern installation',
  },
  {
    company: 'Boutique Mode Élégance',
    location: 'Neuchâtel',
    industry: 'Commerce',
    results: [
      { icon: TrendingUp, value: '+312%', label: 'Ventes en ligne' },
      { icon: Users, value: '5.2x', label: 'Engagement social' },
      { icon: DollarSign, value: '+76K CHF', label: 'Nouveaux clients' },
    ],
    quote: 'Nos posts se transforment en ventes. Simple mais terriblement efficace.',
    image: 'Elegant fashion boutique with stylish clothing displays',
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ils ont arrêté de{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              payer des clics
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Et ont commencé à gagner des clients. Voici leurs résultats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={`${study.company} - ${study.industry}`}
                 src="https://images.unsplash.com/photo-1601429675201-f66be94607bb" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{study.company}</h3>
                  <p className="text-white/90 text-sm">{study.location} • {study.industry}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.map((result, idx) => {
                    const Icon = result.icon;
                    return (
                      <div key={idx} className="text-center">
                        <Icon className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{result.value}</div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    );
                  })}
                </div>

                <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-700">
                  "{study.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
