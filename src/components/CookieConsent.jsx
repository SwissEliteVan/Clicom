
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    // Logic to save granular preferences would go here
    localStorage.setItem('cookie-consent', 'custom');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8">
              {!showDetails ? (
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                        <Cookie size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Nous respectons votre vie privée</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 md:mb-0">
                      Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                      Conformément à la nLPD (Suisse) et au RGPD (UE), nous avons besoin de votre consentement.
                      <br/>
                      <Link to="/politique-cookies" className="text-indigo-600 hover:underline font-medium mt-1 inline-block">
                        En savoir plus sur notre politique
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-fit">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDetails(true)}
                      className="whitespace-nowrap"
                    >
                      Personnaliser
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleReject}
                      className="whitespace-nowrap text-slate-600"
                    >
                      Refuser
                    </Button>
                    <Button 
                      onClick={handleAccept}
                      className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
                    >
                      Tout accepter
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck size={20} className="text-indigo-600" />
                      Préférences de cookies
                    </h3>
                    <button onClick={() => setShowDetails(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                    <div className="flex items-start justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Cookies Nécessaires</h4>
                        <p className="text-xs text-slate-500 mt-1">Indispensables au fonctionnement du site (sécurité, panier, connexion).</p>
                      </div>
                      <div className="flex items-center h-6">
                         <input type="checkbox" checked disabled className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between p-4 border border-slate-100 rounded-xl">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Analytique (Anonyme)</h4>
                        <p className="text-xs text-slate-500 mt-1">Nous aide à comprendre comment le site est utilisé pour l'améliorer.</p>
                      </div>
                      <div className="flex items-center h-6">
                         <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between p-4 border border-slate-100 rounded-xl">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Marketing</h4>
                        <p className="text-xs text-slate-500 mt-1">Permet de vous proposer des contenus pertinents sur d'autres sites.</p>
                      </div>
                      <div className="flex items-center h-6">
                         <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <Button variant="ghost" onClick={() => setShowDetails(false)}>Retour</Button>
                    <Button onClick={handleSavePreferences} className="bg-indigo-600 hover:bg-indigo-700">Enregistrer mes préférences</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
