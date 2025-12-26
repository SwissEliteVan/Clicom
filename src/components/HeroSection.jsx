
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { toast } = useToast();

  const handleCTA = () => {
    // In a real scenario, scroll to contact section or open modal
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-16">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <motion.div 
          className="flex-1 text-center lg:text-left z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Agence 100% Suisse & Pragmatique</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Gagnez des clients,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              pas juste des clics.
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Le marketing digital ne devrait pas être un casse-tête. Nous transformons votre budget en résultats concrets : leads qualifiés, ventes et croissance réelle pour votre PME.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200 transition-all">
                Démarrer maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-slate-300 hover:bg-white hover:text-indigo-600 hover:border-indigo-200">
                Voir nos services
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                 {/* Replaced with img-replace as per instructions */}
                 <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                   <img alt="Portrait client satisfait 1" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1677563231818-7d4e2c7b7c2c" />
                 </div>
                 <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                   <img alt="Portrait client satisfait 2" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1657028087704-0742c57df253" />
                 </div>
                 <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                   <img alt="Portrait client satisfait 3" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1668461151563-36883cc34c51" />
                 </div>
              </div>
              <span>Déjà 50+ PME accompagnées</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image / Illustration */}
        <motion.div 
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img alt="Tableau de bord de croissance marketing" class="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
            
            {/* Floating Card 1 */}
            <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 transform -rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ArrowRight className="transform -rotate-45" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Croissance mensuelle</p>
                  <p className="text-lg font-bold text-slate-900">+127%</p>
                </div>
              </div>
            </div>

             {/* Floating Card 2 */}
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 transform rotate-2 animate-float animation-delay-1000">
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                 </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Nouveaux leads</p>
                  <p className="text-lg font-bold text-slate-900">24 this week</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
