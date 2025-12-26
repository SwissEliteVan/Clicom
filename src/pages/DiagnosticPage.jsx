
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Check, User, Building, Mail, Phone, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';

const StepOne = ({ data, onChange, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Building size={16} /> Société
          </label>
          <input
            type="text"
            placeholder="Nom de votre entreprise"
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={data.company}
            onChange={(e) => onChange('company', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User size={16} /> Nom du contact
          </label>
          <input
            type="text"
            placeholder="Votre nom complet"
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={data.contact}
            onChange={(e) => onChange('contact', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Mail size={16} /> Email professionnel
          </label>
          <input
            type="email"
            placeholder="nom@societe.com"
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Phone size={16} /> Téléphone
          </label>
          <input
            type="tel"
            placeholder="079 123 45 67"
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          Étape suivante <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

const StepTwo = ({ data, onChange, onBack, onSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Quel est votre principal défi actuellement ?</label>
        <select
          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          value={data.problem}
          onChange={(e) => onChange('problem', e.target.value)}
        >
          <option value="">Sélectionnez une option...</option>
          <option value="lead_gen">Manque de leads / clients</option>
          <option value="admin_heavy">Trop de tâches administratives</option>
          <option value="visibility">Manque de visibilité en ligne</option>
          <option value="conversion">Trafic web mais pas de ventes</option>
          <option value="scaling">Difficulté à passer à l'échelle</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Outils actuels (séparés par des virgules)</label>
        <input
          type="text"
          placeholder="Ex: Excel, Word, Mailchimp, Aucun..."
          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={data.tools}
          onChange={(e) => onChange('tools', e.target.value)}
        />
        <p className="text-xs text-slate-500">Cela nous aide à comprendre votre environnement technique.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Urgence du projet</label>
          <select
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            value={data.urgency}
            onChange={(e) => onChange('urgency', e.target.value)}
          >
            <option value="immediat">Immédiat (dès que possible)</option>
            <option value="1_month">Sous 1 mois</option>
            <option value="3_months">Sous 3 mois</option>
            <option value="exploratory">Exploratoire uniquement</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Budget estimé</label>
          <select
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            value={data.budget}
            onChange={(e) => onChange('budget', e.target.value)}
          >
            <option value="under_1k">&lt; 1'000 CHF</option>
            <option value="1k_3k">1'000 - 3'000 CHF</option>
            <option value="3k_10k">3'000 - 10'000 CHF</option>
            <option value="over_10k">&gt; 10'000 CHF</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-100 mt-6">
        <Button variant="outline" onClick={onBack} className="text-slate-600">
          Retour
        </Button>
        <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700 text-white px-8">
          Obtenir mon diagnostic <Check size={16} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

const DiagnosticPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    problem: '',
    tools: '',
    urgency: '1_month',
    budget: '1k_3k'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.company || !formData.contact || !formData.email) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Veuillez remplir au moins la société, le contact et l'email.",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (!formData.problem) {
      toast({
        variant: "destructive",
        title: "Information manquante",
        description: "Veuillez sélectionner votre défi principal.",
      });
      return;
    }

    try {
      // 1. Create client if not exists (simulated by just creating one for this entry)
      const newClient = db.clients.create({
        company: formData.company,
        main_contact: formData.contact,
        email: formData.email,
        phone: formData.phone
      });

      // 2. Create Demande (Diagnostic)
      db.demandes.create({
        client_id: newClient.id,
        type: 'Diagnostic',
        title: `Diagnostic: ${formData.company}`,
        description: `Problème: ${formData.problem}. Outils: ${formData.tools}`,
        status: 'Nouveau',
        due_date: new Date(Date.now() + 86400000 * 2).toISOString() // Due in 2 days
      });

      // 3. Navigate to confirmation
      navigate('/diagnostic/confirmation');
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Diagnostic Gratuit | Horizon</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Diagnostic Marketing Digital</h1>
          <p className="text-lg text-slate-600">
            Répondez à quelques questions pour identifier vos leviers de croissance.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-2 bg-slate-100">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: "50%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>

          <div className="p-8">
            <div className="mb-8 flex items-center justify-between text-sm font-medium text-slate-500 border-b border-slate-100 pb-4">
              <span className={step === 1 ? "text-blue-600" : "text-green-600"}>
                01. Vos Coordonnées
              </span>
              <span className={step === 2 ? "text-blue-600" : ""}>
                02. Votre Projet
              </span>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <StepOne 
                  key="step1" 
                  data={formData} 
                  onChange={handleChange} 
                  onNext={handleNext} 
                />
              )}
              {step === 2 && (
                <StepTwo 
                  key="step2" 
                  data={formData} 
                  onChange={handleChange} 
                  onBack={() => setStep(1)} 
                  onSubmit={handleSubmit} 
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="mt-8 text-center flex justify-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2"><Check size={14} /> Gratuit</div>
          <div className="flex items-center gap-2"><Check size={14} /> Sans engagement</div>
          <div className="flex items-center gap-2"><Check size={14} /> Confidentialité garantie</div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPage;
