
import React from 'react';
import { Helmet } from 'react-helmet';

const LegalPage = () => {
  return (
    <>
      <Helmet>
        <title>Mentions Légales | Marketing Digital PME</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-12">Mentions Légales</h1>

          <div className="prose prose-indigo max-w-none text-gray-600">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
              <p>
                Le présent site est édité par :<br />
                <strong>Nom de l'entreprise</strong><br />
                Forme juridique : [Votre statut juridique]<br />
                Adresse : [Votre adresse complète]<br />
                IDE : [Numéro IDE]<br />
                Email : contact@exemple.ch<br />
                Téléphone : +41 XX XXX XX XX
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
              <p>
                Le site est hébergé par :<br />
                <strong>[Nom de l'hébergeur]</strong><br />
                Adresse : [Adresse de l'hébergeur]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation suisse et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Protection des données (RGPD / LPD)</h2>
              <p>
                Nous collectons uniquement les données nécessaires au traitement de votre demande de contact. Ces données ne sont jamais vendues à des tiers. Conformément à la loi, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Cookies</h2>
              <p>
                Ce site utilise des cookies à des fins de statistiques de visite (Google Analytics). Vous pouvez configurer votre navigateur pour refuser ces cookies.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalPage;
