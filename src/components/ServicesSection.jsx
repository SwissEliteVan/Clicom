
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Share2, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Search,
    title: 'SEO Local',
    description: 'Dominez les recherches Google dans votre région. Vos clients vous trouvent avant la concurrence.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Share2,
    title: 'Social Media',
    description: 'Des posts qui engagent vraiment. Pas de likes vides, des vrais prospects qui vous contactent.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Target,
    title: 'Google Ads',
    description: 'Chaque franc investi rapporte. On arrête ce qui marche pas, on double ce qui cartonne.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Analytics',
    description: 'Des chiffres qui parlent. Vous voyez en temps réel ce qui fait rentrer les clients.',
    color: 'from-green-500 to-emerald-500',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Services clés qui{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              font la différence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pas de menu à rallonge. On fait ce qu'on fait le mieux : générer des clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/services">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Découvrir tous nos services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
