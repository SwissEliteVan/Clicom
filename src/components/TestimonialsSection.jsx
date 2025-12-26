
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Fondatrice, Boulangerie Bio",
    text: "Depuis la refonte de notre site et la campagne locale, on a vu une augmentation de 40% de la fréquentation en magasin. L'équipe est super réactive !",
    rating: 5,
    imageDesc: "Portrait femme souriante commerçante"
  },
  {
    name: "Thomas Weber",
    role: "CEO, TechStart SA",
    text: "Enfin une agence qui comprend le B2B. Leurs leads sont qualifiés, on ne perd plus de temps avec des curieux. ROI positif dès le 2ème mois.",
    rating: 5,
    imageDesc: "Portrait homme affaires costard moderne"
  },
  {
    name: "Julie Dubois",
    role: "Architecte d'intérieur",
    text: "Le design de mon portfolio est juste magnifique. Il reflète parfaitement mon travail. J'ai signé deux gros chantiers grâce au site la semaine dernière.",
    rating: 5,
    imageDesc: "Portrait femme créative lunettes architecte"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Ils nous font confiance
          </motion.h2>
          <p className="text-lg text-slate-600">
            La meilleure preuve de notre efficacité, c'est le succès de nos clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 relative hover:shadow-lg transition-shadow"
            >
              {/* Quote icon decoration */}
              <div className="absolute top-6 right-8 text-indigo-100">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.896 14.383 15.998 15.115 15.306C16.592 13.914 18.006 13.914 18.006 13.914V8.00601H12V2H21.006V14.128C21.006 18.232 17.689 21 14.017 21ZM5.016 21L5.016 18C5.016 16.896 5.383 15.998 6.115 15.306C7.592 13.914 9.006 13.914 9.006 13.914V8.00601H3V2H12.006V14.128C12.006 18.232 8.689 21 5.016 21Z" />
                </svg>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                  <img alt={testimonial.name} class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
