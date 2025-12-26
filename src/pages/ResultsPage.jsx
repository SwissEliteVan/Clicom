
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Search, MousePointerClick, Phone } from 'lucide-react';

const ResultsPage = () => {
  const testimonials = [
    {
      author: "Michel D.",
      role: "Menuisier",
      location: "Fribourg",
      quote: "J'ai dû embaucher deux personnes pour suivre la cadence.",
      text: "Avant, je bricolais ma page Facebook le dimanche soir. Depuis qu'ils ont repris les choses en main, j'ai des demandes de devis qualifiées qui tombent toutes les semaines. C'est le jour et la nuit.",
      result: "+40% de CA en 6 mois"
    },
    {
      author: "Sarah L.",
      role: "Dentiste",
      location: "Lausanne",
      quote: "Simple. Efficace. Rentable.",
      text: "Je ne voulais pas d'une usine à gaz. Ils ont mis en place un système simple pour que les patients me trouvent sur Google Maps. Résultat : mon agenda est plein 3 semaines à l'avance.",
      result: "15 nouveaux patients/mois"
    },
    {
      author: "Pierre V.",
      role: "Expert Comptable",
      location: "Genève",
      quote: "Mon meilleur investissement de l'année.",
      text: "Le marketing digital me semblait être une dépense inutile. J'ai changé d'avis. Le retour sur investissement est mesurable au centime près. Ils ne racontent pas d'histoires.",
      result: "ROI x4.5"
    },
    {
      author: "Julie M.",
      role: "Fleuriste",
      location: "Neuchâtel",
      quote: "Enfin une agence qui comprend le business local.",
      text: "Ils ne m'ont pas vendu du rêve international. Ils ont ciblé les gens à 10km de ma boutique. Maintenant, quand quelqu'un cherche un bouquet dans le coin, ils tombent sur moi.",
      result: "Trafic magasin doublé"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Résultats & Études de Cas | Marketing Digital PME Suisse</title>
        <meta name="description" content="Découvrez comment nous aidons les architectes, artisans et PME suisses à décoller. Études de cas concrètes et témoignages vérifiés." />
      </Helmet>

      <div className="pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Ils ne croyaient pas au digital.<br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Maintenant ils ne jurent que par ça.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Pas de théorie, juste de la pratique. Voici ce qui se passe quand on applique les bonnes méthodes.
              </p>
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">"{t.quote}"</h3>
                <p className="text-gray-600 mb-6 italic">
                  {t.text}
                </p>
                <div className="flex justify-between items-end border-t border-gray-200 pt-4">
                  <div>
                    <div className="font-bold text-gray-900">{t.author}</div>
                    <div className="text-sm text-gray-500">{t.role} • {t.location}</div>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full">
                    {t.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Case Study: Architecte Genève */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-32 bg-gray-900 rounded-3xl overflow-hidden text-white shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-block bg-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 w-fit">
                  Étude de cas
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Architecte à Genève :<br /> Du site fantôme à la référence locale
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="flex items-center text-xl font-bold text-indigo-300 mb-2">
                      <Search className="w-5 h-5 mr-2" />
                      Le Problème
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Un site vitrine magnifique visuellement, mais totalement invisible sur Google. 0 appel entrant en 6 mois. Une dépendance totale au bouche-à-oreille qui commençait à s'essouffler dangereusement.
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center text-xl font-bold text-indigo-300 mb-2">
                      <MousePointerClick className="w-5 h-5 mr-2" />
                      Nos Actions
                    </h3>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                      <li>Refonte structurelle pour le SEO local ("Architecte Genève", "Rénovation villa lac").</li>
                      <li>Campagne Google Ads chirurgicale ciblée uniquement sur les propriétaires de villas.</li>
                      <li>Mise en place d'un portfolio conçu pour convertir (pas juste pour faire joli).</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                    <h3 className="flex items-center text-xl font-bold text-green-400 mb-4">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Les Résultats (après 2 mois)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">3</div>
                        <div className="text-sm text-gray-400">Chantiers signés</div>
                      </div>
                      <div className="text-center border-l border-white/20">
                        <div className="text-2xl font-bold text-white">#1</div>
                        <div className="text-sm text-gray-400">Sur Google Maps</div>
                      </div>
                      <div className="text-center border-l border-white/20">
                        <div className="text-2xl font-bold text-white">&gt; 150k</div>
                        <div className="text-sm text-gray-400">Valeur contrats</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10 lg:hidden"></div>
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                  alt="Bureau d'architecte moderne avec plans et maquettes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Votre entreprise mérite ces résultats
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              On ne peut pas promettre de miracles, mais on peut promettre de travailler dur pour votre succès. Discutons de vos objectifs.
            </p>
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl transition-all hover:scale-105">
                <Phone className="w-5 h-5 mr-2" />
                Planifier un appel gratuit de 20 min
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default ResultsPage;
