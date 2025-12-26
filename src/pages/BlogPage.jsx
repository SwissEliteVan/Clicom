
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const articles = [
  {
    slug: 'google-ads-pme',
    title: 'Pourquoi 90% des PME gaspillent leur budget Google Ads',
    excerpt: 'Spoiler: c\'est pas votre faute. Mais vous pouvez arrêter de jeter votre argent par les fenêtres dès maintenant. Découvrez les 3 erreurs fatales que font la plupart des entrepreneurs.',
    category: 'Google Ads',
    readTime: '5 min',
    imageAlt: 'Analyse de données marketing sur ordinateur',
    date: '15 déc. 2025',
    tags: ['SEA', 'Budget', 'Rentabilité']
  },
  {
    slug: 'seo-local-guide',
    title: 'SEO Local: Comment être trouvé sans se ruiner',
    excerpt: 'Le guide sans BS pour dominer Google dans votre région. Même si vous n\'y connaissez rien. On vous explique comment optimiser votre fiche Google Business Profile en 30 minutes.',
    category: 'SEO',
    readTime: '7 min',
    imageAlt: 'Smartphone avec carte locale',
    date: '12 déc. 2025',
    tags: ['Référencement', 'Google Maps', 'Local']
  },
  {
    slug: 'instagram-pme',
    title: 'Instagram pour les PME: Ce qui marche VRAIMENT',
    excerpt: 'Oubliez les reels de danse. Voici comment transformer vos posts en clients qui paient. Une approche pragmatique pour les entreprises de service et les commerces locaux.',
    category: 'Social Media',
    readTime: '6 min',
    imageAlt: 'Création de contenu sur mobile',
    date: '8 déc. 2025',
    tags: ['Instagram', 'Contenu', 'Conversion']
  },
  {
    slug: 'site-web-conversion',
    title: 'Votre site est joli, mais est-ce qu\'il vend ?',
    excerpt: 'Le design ne fait pas tout. Découvrez les éléments psychologiques qui poussent un visiteur à demander un devis plutôt que de fermer l\'onglet.',
    category: 'Conversion',
    readTime: '8 min',
    imageAlt: 'Design web moderne sur laptop',
    date: '1 déc. 2025',
    tags: ['UX', 'Copywriting', 'Vente']
  }
];

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog Marketing Digital | Conseils Pragmatiques PME</title>
        <meta name="description" content="Articles de blog sur le marketing digital pour PME. Google Ads, SEO, Réseaux sociaux : des conseils concrets pour développer votre business." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Clic COM",
            "description": "Conseils en marketing digital pour PME suisses",
            "url": "https://clic-com.ch/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Clic COM",
              "logo": {
                "@type": "ImageObject",
                "url": "https://clic-com.ch/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ label: 'Blog', path: '/blog' }]} />

          <div className="max-w-3xl mx-auto text-center mb-16 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Le blog qui parle <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">business</span>, pas buzzwords.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Des stratégies testées sur le terrain, pas dans des livres.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/blog/${article.slug}`} className="block overflow-hidden relative h-56">
                  <img 
                    alt={article.imageAlt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                   src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm text-indigo-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </Link>

                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center text-xs font-medium text-gray-500 mb-3 gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <Link to={`/blog/${article.slug}`} className="block mb-3">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map(tag => (
                      <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    to={`/blog/${article.slug}`} 
                    className="inline-flex items-center text-indigo-600 font-bold text-sm group-hover:gap-2 transition-all mt-auto"
                    aria-label={`Lire l'article: ${article.title}`}
                  >
                    Lire l'article
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogPage;
