import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryGrid = () => {
  const [filter, setFilter] = useState('toate');

  const filters = [
    { id: 'toate', label: 'Toate' },
    { id: 'retapitare', label: 'Retapițare' },
    { id: 'vopsire', label: 'Vopsire' },
    { id: 'lumini', label: 'Lumini Ambientale' },
  ];

  const items = [
    { id: 1, title: 'Plafon Alcantara — BMW F30', category: 'retapitare', gradient: 'from-[#0a0a0a] to-[#d4a853]/40' },
    { id: 2, title: 'Plafon Microfiber — Audi A4', category: 'retapitare', gradient: 'from-[#141414] to-[#262626]' },
    { id: 3, title: 'Mânere vopsite — VW Golf 7', category: 'vopsire', gradient: 'from-blue-900/30 to-[#d4a853]/30' },
    { id: 4, title: 'Parasolar retapițat — Mercedes C-Class', category: 'retapitare', gradient: 'from-purple-900/20 to-[#d4a853]/40' },
    { id: 5, title: 'Trim interior vopsit — BMW E90', category: 'vopsire', gradient: 'from-[#0a0a0a] to-blue-900/40' },
    { id: 6, title: 'Lumini ambientale bord — Audi A3', category: 'lumini', gradient: 'from-indigo-900/40 to-[#d4a853]/20' },
    { id: 7, title: 'Lumini RGB uși — VW Passat', category: 'lumini', gradient: 'from-pink-900/30 to-purple-900/30' },
    { id: 8, title: 'Plafon piele eco — Skoda Octavia', category: 'retapitare', gradient: 'from-[#141414] to-[#d4a853]/50' },
  ];

  const filteredItems = filter === 'toate' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              filter === f.id 
                ? 'bg-[#d4a853] text-[#0a0a0a]' 
                : 'bg-[#141414] text-[#a3a3a3] border border-[#262626] hover:text-[#f5f5f5]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={item.id}
              className="group relative bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden hover:border-[#d4a853]/50 transition-colors cursor-pointer"
            >
              <div className={`w-full h-64 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`}></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-80"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-[#d4a853]/20 text-[#d4a853] text-xs rounded-full mb-3 uppercase tracking-wider font-semibold border border-[#d4a853]/30">
                  {filters.find(f => f.id === item.category)?.label}
                </span>
                <h3 className="text-lg font-bold text-[#f5f5f5] group-hover:text-[#d4a853] transition-colors">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GalleryGrid;
