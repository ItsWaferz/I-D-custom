import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Paintbrush, Sun, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Retapițare & Elemente Plastic',
    description: 'Refacem complet plafonul și recondiționăm elementele din interior (plastice, parasolare) folosind materiale premium pentru un finisaj elegant.',
    icon: Layers,
  },
  {
    id: 2,
    title: 'Lumini Ambientale RGB',
    description: 'Modernizează interiorul cu sisteme de iluminat ambiental Addressable RGB. Culori vibrante și personalizabile pe zone.',
    icon: Lightbulb,
  }
];

const ServicesOverview = () => {
  return (
    <section className="py-24 bg-dark relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-light mb-4 relative inline-block"
          >
            Serviciile Noastre
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-gold rounded-full"></span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-dark-card border border-dark-border rounded-xl p-8 group hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,168,83,0.1)] transition-all duration-300"
              >
                <div className="mb-6 inline-block p-4 bg-dark rounded-lg border border-dark-border group-hover:border-gold/30 transition-colors">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-light mb-4">{service.title}</h3>
                <p className="text-light-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link 
            to="/calculator"
            className="px-8 py-4 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-colors duration-300 text-lg shadow-[0_0_15px_rgba(212,168,83,0.3)] hover:shadow-[0_0_25px_rgba(232,201,122,0.5)]"
          >
            Calculează Prețul
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
