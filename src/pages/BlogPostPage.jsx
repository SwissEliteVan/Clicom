
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/components/Breadcrumbs';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    // In production, use navigator.share if available or copy to clipboard
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié !",
        description: "Le lien de l'article a été copié dans votre presse-papier.",
      });
    }
  };

  // Simulation of content based on slug
  const article = {
    title: 'Pourquoi 90% des PME gaspillent leur budget Google Ads',
    category: 'Google Ads',
    date: '15 déc. 2025',
    readTime: '5 min',
    imageAlt: 'Graphiques de performance Google Ads',
    author: 'Thomas R.',
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          C'est un classique. Vous lancez une campagne, Google vous dit que tout va bien, les clics augmentent... mais votre téléphone ne sonne pas plus que d'habitude. Voici pourquoi.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Les mots-clés trop larges (Le piège du "Large Match")</h2>
        <p className="mb-4">
          Google adore vous faire dépenser de l'argent. Par défaut, quand vous choisissez le mot-clé "Plombier", Google peut afficher votre annonce pour "Formation plomberie", "Photo plombier" ou "Mario Bros".
        </p>
        <p className="mb-8">
          <strong>La solution :</strong> Utilisez les correspondances exactes et de phrase. Et surtout, gavez votre compte de mots-clés négatifs.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Envoyer le trafic sur la page d'accueil</h2>
        <p className="mb-4">
          Si je cherche "Urgence fuite d'eau" et que j'arrive sur votre page d'accueil qui me parle de l'histoire de votre entreprise fondée en 1982, je pars.
        </p>
        <p className="mb-8">
          <strong>La solution :</strong> Créez des Landing Pages dédiées pour chaque service. Une page, une offre, un appel à l'action.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Ne pas suivre les conversions</h2>
        <p className="mb-6">
          Piloter une campagne sans tracking, c'est comme conduire les yeux bandés. Vous ne savez pas quel mot-clé vous rapporte de l'argent et lequel vous en coûte.
        </p>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 my-10 rounded-r-lg">
          <h3 className="text-indigo-900 font-bold text-lg mb-2">Le conseil de l'expert</h3>
          <p className="text-indigo-800">
            Commencez petit. Mieux vaut un budget de 500 CHF hyper ciblé qu'un budget de 2000 CHF arrosé au hasard.
          </p>
        </div>
      </>
    )
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "image": "https://clic-com.ch/images/blog/google-ads.jpg", 
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Clic COM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://clic-com.ch/logo.png"
      }
    },
    "datePublished": "2025-12-15",
    "description": "Découvrez pourquoi vos campagnes Google Ads ne convertissent pas et comment y remédier."
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Blog Marketing Digital</title>
        <meta name="description" content={`Article: ${article.title}. Découvrez nos conseils d'experts.`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="bg-white pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <Breadcrumbs 
            items={[
              { label: 'Blog', path: '/blog' },
              { label: article.title.substring(0, 30) + '...', path: '#' }
            ]} 
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-4 items-center text-sm font-medium text-gray-500 mb-6 flex-wrap">
              <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>

            <div className="aspect-video w-full overflow-hidden rounded-2xl mb-12 shadow-xl border border-gray-100">
              <img 
                alt={article.imageAlt} 
                className="w-full h-full object-cover"
                loading="eager"
               src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-3/4 prose prose-lg prose-indigo max-w-none text-gray-700 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                {article.content}
              </div>

              {/* Sidebar with Author & Share (Sticky on Desktop) */}
              <aside className="lg:w-1/4 space-y-8">
                <div className="sticky top-24">
                  <div className="border-t border-b border-gray-100 py-6 mb-6">
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-bold">Auteur</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {article.author.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">{article.author}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide font-bold">Partager</p>
                    <div className="flex flex-col gap-3">
                      <Button variant="outline" onClick={handleShare} className="justify-start gap-3 w-full hover:bg-slate-50 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all">
                        <Facebook className="w-4 h-4" /> Facebook
                      </Button>
                      <Button variant="outline" onClick={handleShare} className="justify-start gap-3 w-full hover:bg-slate-50 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all">
                        <Twitter className="w-4 h-4" /> Twitter / X
                      </Button>
                      <Button variant="outline" onClick={handleShare} className="justify-start gap-3 w-full hover:bg-slate-50 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </Button>
                      <Button variant="default" onClick={handleShare} className="justify-start gap-3 w-full bg-gray-900 text-white hover:bg-black transition-all">
                        <Share2 className="w-4 h-4" /> Copier le lien
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center border border-indigo-100">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Cet article vous a donné des idées ?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Ne laissez pas ces conseils rester de la théorie. Discutons de comment les appliquer concrètement à votre entreprise dès cette semaine.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Discuter de ma stratégie
                </Button>
              </Link>
            </div>
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
