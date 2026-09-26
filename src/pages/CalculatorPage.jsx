import { motion } from 'framer-motion';
import { Calculator as CalcIcon } from 'lucide-react';
import Calculator from '../components/calculator/Calculator';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <CalcIcon className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">Configurator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
            Calculator <span className="text-gold-gradient">Prețuri</span>
          </h1>
          <p className="text-light-muted text-lg max-w-2xl mx-auto">
            Configurează serviciile dorite și obține o estimare de preț. 
            Selectează materialele, opțiunile și zonele care te interesează.
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Calculator />
        </motion.div>
      </div>
    </div>
  );
}
