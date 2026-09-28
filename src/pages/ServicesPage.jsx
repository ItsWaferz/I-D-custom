import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Lightbulb, Star } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';

const ServicesPage = () => {
  const services = [
    {
      icon: Layers,
      title: 'Retapițare plafon & vopsire elemente de plastic',
      description: 'Oferim servicii complete de retapițare a plafoanelor auto și recondiționăm sau personalizăm elementele de plastic din interior (inclusiv parasolare). Redăm un aspect curat, unitar și elegant interiorului mașinii tale.',
      features: ['Materiale premium (textil, alcantara)', 'Vopsire ornamente și mânere plastic', 'Retapițare sau vopsire parasolare', 'Garanție pe manoperă'],
      reversed: false
    },
    {
      icon: Lightbulb,
      title: 'Lumini ambientale',
      description: 'Adaugă un plus de atmosferă și lux cu sistemele noastre de iluminare ambientală Addressable RGB, complet personalizabile și perfect integrate în panourile mașinii.',
      features: ['Iluminare LED Addressable RGB', 'Control inteligent din telefon (Aplicație)', 'Multiple zone: bord, uși, sub scaune', 'Montaj fără fire vizibile'],
      reversed: true
    },
    {
      icon: Star,
      title: 'Plafon înstelat',
      description: 'Oferă interiorului tău un aspect de lux absolut. Instalăm cu precizie sute de fire de fibră optică în plafon pentru a simula un cer înstelat impresionant, controlabil din telefon.',
      features: ['Fibră optică premium', 'Control culori și intensitate', 'Efecte dinamice de sclipire (Twinkle)', 'Integrare invizibilă pe timpul zilei'],
      reversed: false
    }
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">Serviciile Noastre</h1>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto">
            Descoperă gama noastră completă de servicii de personalizare auto, concepute pentru a transforma interiorul mașinii tale.
          </p>
        </motion.div>

        <div className="space-y-12 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-[#141414] border border-[#262626] rounded-2xl p-10 lg:p-16"
        >
          <h2 className="text-3xl font-bold text-[#f5f5f5] mb-4">Ești gata pentru o schimbare?</h2>
          <p className="text-[#a3a3a3] mb-8 max-w-xl mx-auto">
            Află o estimare de preț pentru proiectul tău de vis. Folosește calculatorul nostru rapid.
          </p>
          <Link 
            to="/calculator" 
            className="inline-block bg-[#d4a853] hover:bg-[#e8c97a] text-[#0a0a0a] font-semibold py-4 px-8 rounded-full transition-colors duration-300"
          >
            Calculează Prețul
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
