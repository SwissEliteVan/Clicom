
import React from 'react';
import { Helmet } from 'react-helmet';
import { Cookie } from 'lucide-react';

const CookiePolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Cookies | Clic COM Suisse</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <Cookie size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Politique de Cookies</h1>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600">
            <p>
              Cette politique explique comment Clic COM utilise les cookies et technologies similaires pour vous reconnaître lorsque vous visitez notre site web.
            </p>

            <h3>Qu'est-ce qu'un cookie ?</h3>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, mobile) lorsque vous visitez un site. Il permet au site de se souvenir de vos actions et préférences sur une période donnée.
            </p>

            <h3>Quels types de cookies utilisons-nous ?</h3>
            
            <div className="grid gap-6 my-8 not-prose">
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-2">1. Cookies Essentiels</h4>
                <p className="text-sm mb-0">Nécessaires au fonctionnement technique du site. Ils ne peuvent pas être désactivés.</p>
              </div>
              
              <div className="border border-slate-200 rounded-xl p-6 bg-white">
                <h4 className="font-bold text-slate-900 mb-2">2. Cookies de Performance (Analytics)</h4>
                <p className="text-sm mb-0">Nous utilisons Google Analytics de manière anonymisée pour comprendre le trafic et améliorer nos pages. </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 bg-white">
                <h4 className="font-bold text-slate-900 mb-2">3. Cookies Fonctionnels</h4>
                <p className="text-sm mb-0">Permettent de mémoriser vos choix (langue, région, fermeture de pop-ups).</p>
              </div>
            </div>

            <h3>Comment gérer vos préférences ?</h3>
            <p>
              Vous pouvez à tout moment modifier vos préférences via notre bannière de consentement ou via les paramètres de votre navigateur.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage;
