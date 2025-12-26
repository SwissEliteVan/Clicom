
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const articles = [
  {
    title: 'Pourquoi 90% des PME gaspillent leur budget Google Ads',
    excerpt: 'Spoiler: c\'est pas votre faute. Mais vous pouvez arrêter de jeter votre argent par les fenêtres dès maintenant.',
    category: 'Google Ads',
    readTime: '5 min',
    imageAlt: 'Business analytics dashboard showing negative trend',
    date: '15 déc. 2025',
    slug: 'google-ads-pme'
  },
  {
    title: 'SEO Local: Comment être trouvé sans se ruiner',
    excerpt: 'Le guide sans BS pour dominer Google dans votre région. Même si vous n\'y connaissez rien.',
    category: 'SEO',
    readTime: '7 min',
    imageAlt: 'Map pin markers on a digital map',
    date: '12 déc. 2025',
    slug: 'seo-local-guide'
  },
  {
    title: 'Instagram pour les PME: Ce qui marche VRAIMENT',
    excerpt: 'Oubliez les reels de danse. Voici comment transformer vos posts en clients qui paient.',
    category: 'Social Media',
    readTime: '6 min',
    imageAlt: 'Person holding smartphone with social media app',
    date: '8 déc. 2025',
    slug: 'instagram-pme'
  },
];

const BlogSection = () => {
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
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Le blog sans{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              langue de bois
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Des conseils qui marchent. Pas de théories fumeuses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <Link to={`/blog/${article.slug}`} className="block relative h-52 overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={article.imageAlt}
                  loading="lazy"
                 src="https://images.unsplash.com/photo-1654892968823-ea564870a96f" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-indigo-700 font-bold px-3 py-1.5 rounded-full text-xs shadow-sm uppercase tracking-wide">
                    {article.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <Link to={`/blog/${article.slug}`} className="block mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">
                  {article.excerpt}
                </p>

                <Link 
                  to={`/blog/${article.slug}`} 
                  className="flex items-center text-indigo-600 font-bold text-sm group-hover:gap-2 transition-all duration-300 mt-auto"
                >
                  Lire l'article
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/blog">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Voir tous les articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
