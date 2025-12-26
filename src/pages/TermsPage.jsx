
import React from 'react';
import { Helmet } from 'react-helmet';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Conditions d'Utilisation | Clic COM Suisse</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Conditions Générales d'Utilisation</h1>
          
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="text-sm text-slate-500 mb-8">En vigueur au 01.01.2024</p>

            <h3>1. Acceptation</h3>
            <p>L'accès et l'utilisation du site Clic COM impliquent l'acceptation sans réserve des présentes conditions.</p>

            <h3>2. Propriété intellectuelle</h3>
            <p>
              Tout le contenu de ce site (textes, images, logos, code) est la propriété exclusive de Clic COM ou de ses partenaires. Toute reproduction est interdite sans autorisation écrite.
            </p>

            <h3>3. Responsabilité</h3>
            <p>
              Clic COM s'efforce de fournir des informations exactes mais ne saurait être tenu responsable des erreurs ou omissions, ni d'une indisponibilité du service. L'utilisateur utilise le site sous sa seule responsabilité.
            </p>

            <h3>4. Liens externes</h3>
            <p>
              Le site peut contenir des liens vers des sites tiers. Clic COM n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>

            <h3>5. Droit applicable</h3>
            <p>
              Les présentes conditions sont régies par le droit suisse. Tout litige sera soumis à la compétence exclusive des tribunaux du siège de Clic COM.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
