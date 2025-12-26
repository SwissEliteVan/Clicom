
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DiagnosticConfirmationPage = () => {
  const { toast } = useToast();

  const handleBookAppointment = () => {
    toast({
      title: "Redirection vers l'agenda...",
      description: "Simulation: La page Calendly s'ouvrirait ici.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Demande Reçue | Horizon</title>
      </Helmet>

      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Diagnostic reçu !</h1>
          <p className="text-lg text-slate-600 mb-8">
            Merci d'avoir pris le temps de nous partager ces informations. 
            Notre équipe va analyser votre situation et vous recontactera sous 24h.
          </p>

          <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Prochaines étapes :
            </h3>
            <ol className="space-y-4 relative border-l-2 border-slate-200 ml-2 pl-6">
              <li className="relative">
                <span className="absolute -left-[31px] w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></span>
                <p className="font-medium text-slate-900">Analyse préliminaire</p>
                <p className="text-sm text-slate-500">Nous étudions vos réponses et votre présence en ligne.</p>
              </li>
              <li className="relative">
                <span className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-300 border-4 border-white"></span>
                <p className="font-medium text-slate-900">Premier échange (15-30 min)</p>
                <p className="text-sm text-slate-500">Nous validons ensemble les points de blocage identifiés.</p>
              </li>
              <li className="relative">
                <span className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-300 border-4 border-white"></span>
                <p className="font-medium text-slate-900">Proposition d'action</p>
                <p className="text-sm text-slate-500">Vous recevez une feuille de route claire et chiffrée.</p>
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-700">Vous êtes pressé ? Prenez rendez-vous directement :</p>
            <Button 
              onClick={handleBookAppointment} 
              size="lg" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Calendar size={18} />
              Réserver mon créneau maintenant
            </Button>
            
            <div className="pt-4">
              <Link to="/" className="text-slate-500 hover:text-slate-800 text-sm font-medium inline-flex items-center gap-1">
                Retour à l'accueil <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiagnosticConfirmationPage;
