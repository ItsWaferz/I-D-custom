import React from 'react';
import { motion } from 'framer-motion';
import GalleryGrid from '../components/gallery/GalleryGrid';

const GalleryPage = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">Galerie Lucrări</h1>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto">
            Exemple din proiectele noastre recente. Descoperă calitatea și atenția la detalii pe care le oferim.
          </p>
        </motion.div>

        <GalleryGrid />
      </div>
    </div>
  );
};

export default GalleryPage;
