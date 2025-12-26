
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Zap, TrendingUp, Users, ShieldCheck, MapPin } from 'lucide-react';

const AboutPage = () => {
  const philosophyPoints = [
    {
      icon: MessageCircle,
      title: "Parler simple",
      description: "Le marketing digital est souvent obscur à dessein. Nous le rendons limpide. Pas de mots compliqués pour justifier des factures, mais des explications claires sur ce qui fonctionne pour vous.",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Zap,
      title: "Agir vite",
      description: "Le marché n'attend pas. Les PME doivent être agiles pour survivre. Nous ne faisons pas de réunions interminables : nous lançons vos campagnes en quelques jours, pas en quelques mois.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: TrendingUp,
      title: "Livrer des résultats",
      description: "Les 'impressions' et les 'likes', c'est bien pour l'ego. Les clients et le chiffre d'affaires, c'est mieux pour votre entreprise. Nos rapports se concentrent sur votre ROI.",
      color: "text-green-600",
      bg: "bg-green-100"
    }
  ];

  return (
    <>
      <Helmet>
        <title>À Propos | Agence Marketing Digital Pragmatique Suisse</title>
        <meta name="description" content="Découvrez notre équipe locale en Suisse. Une approche pragmatique du marketing digital : parler simple, agir vite et livrer des résultats concrets pour les PME." />
      </Helmet>

      <div className="pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-24 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Une petite équipe locale.<br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Un gros impact business.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Nous ne sommes pas une multinationale avec des bureaux à New York. 
                Nous sommes une équipe suisse, à taille humaine, qui comprend la réalité des PME locales.
              </p>
            </motion.div>
          </div>

          {/* Philosophy Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Notre philosophie en 3 piliers</h2>
              <p className="mt-4 text-gray-600">Pas de blabla théorique, juste du bon sens.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {philosophyPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                  >
                    <div className={`w-14 h-14 rounded-xl ${point.bg} flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${point.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{point.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* About / Credibility Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pourquoi nous faire confiance ?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Expertise certifiée</h3>
                    <p className="text-gray-600 mt-1">
                      Certifiés Google Partner et Meta Ads. On connait les outils sur le bout des doigts, mais on ne s'y perd pas.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Proximité réelle</h3>
                    <p className="text-gray-600 mt-1">
                      Basés en Suisse Romande. Quand vous appelez, c'est nous qui répondons. Pas de centre d'appel à l'autre bout du monde.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Indépendance</h3>
                    <p className="text-gray-600 mt-1">
                      Nous sommes 100% indépendants. Nous vous recommandons les solutions qui sont bonnes pour vous, pas celles qui nous rapportent des commissions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-3xl transform rotate-3 scale-105 opacity-50 -z-10"></div>
               <img 
                 className="rounded-3xl shadow-2xl w-full h-auto object-cover" 
                 alt="Équipe travaillant sur un projet marketing dans un bureau moderne"
                src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa" />
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-3xl p-10 sm:p-16 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Envie de discuter de votre projet ?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              On ne mord pas. Et le premier diagnostic est offert. Venez nous parler de vos défis, on vous dira honnêtement si on peut vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-white text-gray-900 hover:bg-gray-100">
                  Prendre contact
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full text-white border-gray-700 hover:bg-gray-800 hover:text-white">
                  Voir nos services
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default AboutPage;
