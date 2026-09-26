import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, features, reversed }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: reversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(212,168,83,0.15)] transition-shadow duration-300`}
    >
      {/* Image Placeholder */}
      <div className="w-full lg:w-1/2 h-64 lg:h-auto bg-gradient-to-br from-[#0a0a0a] to-[#d4a853]/30"></div>
      
      {/* Content */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
        <div className="w-12 h-12 bg-[#0a0a0a] border border-[#262626] rounded-xl flex items-center justify-center mb-6">
          <Icon className="w-6 h-6 text-[#d4a853]" />
        </div>
        
        <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">{title}</h3>
        <p className="text-[#a3a3a3] mb-8 leading-relaxed">{description}</p>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-[#f5f5f5]">
              <Check className="w-5 h-5 text-[#d4a853] mr-3 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
