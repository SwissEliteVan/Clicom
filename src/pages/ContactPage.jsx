
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Send, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message envoyé avec succès !",
        description: "Merci de nous avoir contactés. Nous vous répondrons sous 24h ouvrées.",
        className: "bg-green-50 border-green-200 text-green-900",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Clic COM",
    "image": "https://clic-com.ch/logo.png",
    "telephone": "+41210000000",
    "email": "contact@exemple.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue de l'Exemple 123",
      "addressLocality": "Lausanne",
      "postalCode": "1000",
      "addressCountry": "CH"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <Helmet>
        <title>Contactez-nous | Agence Marketing Digital Suisse</title>
        <meta name="description" content="Prêt à faire décoller votre activité ? Contactez-nous pour un audit gratuit ou planifiez directement un appel de 20 minutes." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ label: 'Contact', path: '/contact' }]} />

          <div className="text-center max-w-3xl mx-auto mb-16 mt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Parlons de votre <span className="text-indigo-600">croissance</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Vous avez des objectifs ? Nous avons des solutions. Choisissez comment vous préférez commencer.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Calendar / Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Option 1: Fast Track */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white p-2.5 rounded-full shadow-sm text-indigo-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Appel découverte (20 min)</h2>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Le moyen le plus rapide de savoir si on peut vous aider. Pas de vente forcée, juste un échange honnête sur votre situation.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Analyse rapide de votre présence actuelle</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Estimation du potentiel de croissance</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>Réponses à vos questions techniques</span>
                  </li>
                </ul>

                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all" 
                  onClick={() => window.open('https://calendly.com', '_blank')}
                  aria-label="Ouvrir Calendly pour réserver un créneau"
                >
                  Réserver un créneau maintenant
                </Button>
                <p className="text-center text-xs text-gray-500 mt-3 font-medium">C'est gratuit et sans engagement.</p>
              </div>

              {/* Direct Info */}
              <address className="space-y-6 pl-4 not-italic">
                <h3 className="text-xl font-bold text-gray-900">Coordonnées directes</h3>
                <a href="mailto:contact@exemple.ch" className="flex items-center gap-4 text-gray-600 hover:text-indigo-600 transition-colors group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-lg">contact@exemple.ch</span>
                </a>
                <a href="tel:+4100000000" className="flex items-center gap-4 text-gray-600 hover:text-indigo-600 transition-colors group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-lg">+41 XX XXX XX XX</span>
                </a>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-lg">Suisse Romande</span>
                </div>
              </address>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-500 mb-8">On vous répond généralement dans la journée.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      placeholder="Jean Dupont"
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-gray-700">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      placeholder="+41 79 123 45 67"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">Email professionnel</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="jean@entreprise.ch"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">Comment peut-on vous aider ?</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                    placeholder="Je souhaite augmenter ma visibilité locale..."
                    aria-required="true"
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gray-900 hover:bg-black text-white py-6 text-lg rounded-xl font-bold shadow-md hover:shadow-xl transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Clock className="animate-spin mr-2 h-5 w-5" /> Envoi...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Envoyer le message <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-2">
                  En envoyant ce formulaire, vous acceptez notre <a href="/politique-confidentialite" className="underline hover:text-indigo-600">politique de confidentialité</a>.
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
