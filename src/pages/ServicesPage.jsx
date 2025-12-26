
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Zap, Users, Search, Database, GraduationCap, BarChart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ServicesPage = () => {
  const { toast } = useToast();

  const handleDiagnosticClick = () => {
    toast({
      title: "Demande reçue ! 🚀",
      description: "Nous vous recontacterons sous 24h pour planifier votre diagnostic personnalisé.",
    });
  };

  const services = [
    {
      title: "Diagnostic & Plan d'action",
      description: "Un audit complet de votre situation actuelle pour identifier les points de blocage et les leviers de croissance immédiats.",
      icon: Search,
      features: [
        "Audit des processus ventes & marketing",
        "Analyse de la stack technique actuelle",
        "Feuille de route priorisée sur 6 mois"
      ],
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Automatisation",
      description: "Gagnez du temps précieux en automatisant les tâches chronophages : devis, facturation et relances clients.",
      icon: Zap,
      features: [
        "Génération automatique de devis & factures",
        "Séquences de relances emails intelligentes",
        "Synchronisation entre vos outils"
      ],
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "CRM Simple (HubSpot/Notion)",
      description: "Centralisez vos données clients. Fini les fichiers Excel dispersés. Nous implémentons la solution adaptée à votre taille.",
      icon: Database,
      features: [
        "Installation HubSpot, Notion ou Pipedrive",
        "Migration de vos données existantes",
        "Configuration des pipelines de vente"
      ],
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Formation Équipes",
      description: "L'outil n'est rien sans la maîtrise. Nous formons vos équipes pour une adoption rapide et durable des nouveaux process.",
      icon: GraduationCap,
      features: [
        "Ateliers pratiques sur vos nouveaux outils",
        "Création de la documentation (Playbook)",
        "Suivi et coaching post-formation"
      ],
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Services | Automatisation, CRM & Formation | Horizon</title>
        <meta name="description" content="Boostez votre productivité avec nos services : Diagnostic, Automatisation de factures, Mise en place CRM (HubSpot/Notion) et Formation d'équipes." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        
        {/* Hero Section */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Structurez votre croissance avec <span className="text-blue-600">les bons outils</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto mb-8"
            >
              Ne laissez plus l'administratif et les processus manuels ralentir vos ventes. 
              Nous vous aidons à automatiser, organiser et former vos équipes pour plus d'efficacité.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
               <Button onClick={handleDiagnosticClick} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Demander un diagnostic
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform`}>
                  <service.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed h-auto md:h-16">
                  {service.description}
                </p>
                <ul className="space-y-3 pt-4 border-t border-slate-100">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-slate-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Section */}
        <div className="bg-white py-20 border-t border-slate-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="w-full md:w-1/2">
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                   <img alt="Dashboard CRM moderne et automatisé sur un ordinateur portable" className="w-full h-auto" src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b" />
                 </div>
               </div>
               <div className="w-full md:w-1/2">
                 <h2 className="text-3xl font-bold text-slate-900 mb-6">Pourquoi digitaliser vos processus ?</h2>
                 <p className="text-slate-600 mb-8">
                   La plupart des PME perdent jusqu'à 30% de leur temps sur des tâches administratives à faible valeur ajoutée.
                 </p>
                 <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg h-fit text-blue-600">
                        <BarChart size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Visibilité accrue</h4>
                        <p className="text-slate-600 text-sm">Pilotez votre activité avec des données fiables en temps réel via des tableaux de bord clairs.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-green-50 p-3 rounded-lg h-fit text-green-600">
                        <Users size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Satisfaction client</h4>
                        <p className="text-slate-600 text-sm">Plus d'oublis de relance ou de devis perdu. Une communication fluide et professionnelle.</p>
                      </div>
                    </div>
                 </div>
                  <div className="mt-8">
                    <Button onClick={handleDiagnosticClick} variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700">
                      En savoir plus sur nos méthodes
                    </Button>
                  </div>
               </div>
             </div>
           </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à passer à la vitesse supérieure ?</h2>
            <p className="text-slate-300 text-lg mb-10">
              Discutons de vos besoins et voyons comment nous pouvons vous faire gagner du temps dès la semaine prochaine.
            </p>
            <Button onClick={handleDiagnosticClick} size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-10 py-6 text-lg font-bold">
              Demander mon diagnostic
            </Button>
          </div>
        </div>

      </div>
    </>
  );
};

export default ServicesPage;
