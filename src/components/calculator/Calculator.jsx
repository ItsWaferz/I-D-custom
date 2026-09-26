import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Lightbulb } from 'lucide-react';
import TabRetapitare from './TabRetapitare';
import TabLumini from './TabLumini';
import PriceSummary from './PriceSummary';

const tabs = [
  { id: 'retapitare', label: 'Retapitare & Vopsire', icon: Layers },
  { id: 'lumini', label: 'Lumini Ambientale', icon: Lightbulb },
];

export default function Calculator() {
  const [activeTab, setActiveTab] = useState('retapitare');
  const [retapitareSelections, setRetapitareSelections] = useState({
    carSize: null,
    material: null,
    parasolar: 'none',
    plastic: 'none',
  });
  const [luminiSelections, setLuminiSelections] = useState({
    zones: [],
    ledType: 'argb',
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Tabs */}
        <div className="flex border-b border-dark-border mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors duration-300 cursor-pointer ${isActive ? 'text-gold' : 'text-light-muted hover:text-light'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id === 'retapitare' ? 'Retapitare' : 'Lumini'}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'retapitare' ? (
              <TabRetapitare
                selections={retapitareSelections}
                onUpdate={setRetapitareSelections}
              />
            ) : (
              <TabLumini
                selections={luminiSelections}
                onUpdate={setLuminiSelections}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Price Summary Sidebar */}
      <div className="w-full lg:w-[360px] shrink-0 lg:mt-[50px]">
        <PriceSummary
          retapitareSelections={retapitareSelections}
          luminiSelections={luminiSelections}
        />
      </div>
    </div>
  );
}
