
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { toast } = useToast();

  const handleLinkClick = (e) => {
    // Only show toast for links that aren't implemented in router yet
    // List of implemented routes
    const implementedRoutes = [
      '/', '/services', '/a-propos', '/resultats', '/blog', 
      '/contact', '/mentions-legales', '/tarifs', '/app',
      '/politique-confidentialite', '/conditions-utilisation', '/politique-cookies'
    ];
    
    const href = e.currentTarget.getAttribute('href');
    if (implementedRoutes.includes(href)) return;
    
    e.preventDefault();
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée",
      description: "Vous pouvez la demander dans votre prochain prompt ! 🚀",
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="inline-block text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Clic COM
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Le marketing digital qui fait vendre (pas juste briller). Agence 100% suisse dédiée aux PME ambitieuses.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300" aria-label="LinkedIn">
                   <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-300" aria-label="Instagram">
                   <Instagram className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Navigation Column */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-white mb-6">Agence</h3>
              <nav className="flex flex-col gap-4 text-sm">
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Accueil
                </Link>
                <Link to="/services" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Nos Services
                </Link>
                <Link to="/tarifs" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Tarifs & Packs
                </Link>
                <Link to="/a-propos" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Qui sommes-nous
                </Link>
                <Link to="/blog" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                   <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Blog & Conseils
                </Link>
              </nav>
            </motion.div>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-white mb-6">Légal</h3>
              <nav className="flex flex-col gap-4 text-sm">
                <Link to="/mentions-legales" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Mentions Légales
                </Link>
                <Link to="/politique-confidentialite" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Politique de Confidentialité
                </Link>
                 <Link to="/conditions-utilisation" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Conditions d'Utilisation
                </Link>
                <Link to="/politique-cookies" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Gestion des Cookies
                </Link>
              </nav>
            </motion.div>
          </div>

          {/* Contact Column */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
              <address className="flex flex-col gap-4 text-sm not-italic">
                <a href="mailto:contact@exemple.ch" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <div className="p-2 bg-gray-800 rounded-lg text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>contact@exemple.ch</span>
                </a>
                <a href="tel:+4100000000" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <div className="p-2 bg-gray-800 rounded-lg text-indigo-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+41 XX XXX XX XX</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="p-2 bg-gray-800 rounded-lg text-indigo-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Lausanne, Suisse</span>
                </div>
                <div className="mt-6">
                  <Link to="/contact" className="inline-block bg-white text-gray-900 hover:bg-indigo-50 px-6 py-3 rounded-lg text-sm font-bold transition-all transform hover:scale-105 shadow-lg">
                    Demander un devis gratuit
                  </Link>
                </div>
              </address>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4"
        >
          <p>&copy; {new Date().getFullYear()} Clic COM Sàrl. Tous droits réservés.</p>
          <div className="flex items-center gap-2 text-xs bg-gray-800 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-gray-300">Systèmes opérationnels</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
