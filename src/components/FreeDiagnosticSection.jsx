
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const benefits = [
  'Analyse de votre présence en ligne actuelle',
  'Identification des opportunités manquées',
  'Plan d\'action concret et chiffré',
  'Estimation du ROI potentiel',
];

const FreeDiagnosticSection = () => {
  const { toast } = useToast();

  const handleContactClick = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée",
      description: "Vous pouvez la demander dans votre prochain prompt ! 🚀",
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>100% Gratuit • Sans engagement</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Diagnostic gratuit de votre marketing digital
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            On analyse votre situation et on vous montre exactement comment gagner plus de clients. En 30 minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 text-left"
              >
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span className="text-white font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={handleContactClick}
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-bold"
          >
            Obtenir mon diagnostic gratuit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-white/80 text-sm mt-4">
            ⚡ Réponse sous 24h • Aucune carte bancaire requise
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeDiagnosticSection;
