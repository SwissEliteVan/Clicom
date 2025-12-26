
import React from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Lock, Eye, Server } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | Clic COM Suisse (nLPD / RGPD)</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Politique de Confidentialité</h1>
            <p className="text-slate-600">Dernière mise à jour : {new Date().toLocaleDateString('fr-CH')}</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-slate-900 prose-a:text-indigo-600">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8">
              <h3 className="text-indigo-900 font-bold text-lg mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" /> En bref
              </h3>
              <p className="mb-0 text-sm">
                Chez Clic COM, nous prenons la protection de vos données au sérieux. Nous collectons uniquement ce qui est nécessaire pour vous fournir nos services. Nous ne vendons jamais vos données. Nous respectons la Nouvelle Loi sur la Protection des Données (nLPD) suisse et le RGPD européen.
              </p>
            </div>

            <section className="mb-8">
              <h2>1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement de vos données est :<br />
                <strong>Clic COM Sàrl</strong><br />
                [Adresse Complète]<br />
                Suisse<br />
                Email : privacy@clic-com.ch
              </p>
            </section>

            <section className="mb-8">
              <h2>2. Données collectées</h2>
              <p>Nous pouvons collecter les données suivantes :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Données de contact :</strong> Nom, prénom, email, téléphone, entreprise (via formulaires).</li>
                <li><strong>Données techniques :</strong> Adresse IP, type de navigateur, pages visitées (via logs serveur et analytics).</li>
                <li><strong>Données de communication :</strong> Contenu des messages que vous nous envoyez.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>3. Finalités du traitement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Lock size={16}/> Exécution du contrat</h4>
                  <p className="text-sm">Pour gérer vos commandes, facturation et l'espace client.</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Eye size={16}/> Amélioration</h4>
                  <p className="text-sm">Pour analyser l'utilisation de notre site et optimiser nos services.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2>4. Partage des données</h2>
              <p>
                Vos données peuvent être accessibles par nos sous-traitants techniques (hébergement, outils d'emailing) qui sont tenus à une stricte confidentialité.
              </p>
              <p>
                <strong>Transfert à l'étranger :</strong> Si des données sont transférées hors de Suisse/UE, nous nous assurons que le pays offre un niveau de protection adéquat ou que des clauses contractuelles types sont en place.
              </p>
            </section>

            <section className="mb-8">
              <h2>5. Vos droits</h2>
              <p>Conformément à la nLPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Droit d'accès à vos données.</li>
                <li>Droit de rectification des données inexactes.</li>
                <li>Droit à l'effacement ("droit à l'oubli").</li>
                <li>Droit à la limitation du traitement.</li>
                <li>Droit de révoquer votre consentement à tout moment.</li>
              </ul>
              <p>Pour exercer ces droits, contactez-nous à privacy@clic-com.ch.</p>
            </section>

            <section className="mb-8">
              <h2>6. Sécurité</h2>
              <p className="flex items-start gap-3">
                <Server className="w-5 h-5 mt-1 text-indigo-600 flex-shrink-0" />
                <span>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre la perte, l'accès non autorisé ou la modification (chiffrement SSL, pare-feu, accès restreints).
                </span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
