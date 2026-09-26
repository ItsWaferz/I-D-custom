import { Layers, Sun, Paintbrush, Info, Gift, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import MaterialCard from './MaterialCard';
import { materials, parasolarOptions, plasticOptions, carSizes, currency } from './calculatorData';

function OptionCard({ option, isSelected, onSelect, showPrice = true, disabled = false, badge = null }) {
  return (
    <motion.button
      onClick={() => !disabled && onSelect(option.id)}
      className={`flex-1 p-4 rounded-xl border-2 text-left transition-all duration-300 ${
        disabled ? 'cursor-default opacity-60' : 'cursor-pointer'
      } ${
        isSelected
          ? 'border-gold bg-gold/10 shadow-[0_0_15px_rgba(212,168,83,0.15)]'
          : 'border-dark-border bg-dark-card hover:border-neutral-600'
      }`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            isSelected ? 'border-gold' : 'border-neutral-500'
          }`}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-gold"
            />
          )}
        </div>
        <span className={`font-medium ${isSelected ? 'text-gold' : 'text-light'}`}>
          {option.name}
        </span>
        {badge && (
          <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
            {badge}
          </span>
        )}
      </div>
      {showPrice && option.price > 0 && (
        <p className="text-light-muted text-sm mt-2 ml-6">
          +{option.price} {currency}
        </p>
      )}
      {showPrice && option.extra > 0 && (
        <p className="text-light-muted text-sm mt-2 ml-6">
          +{option.extra} {currency}
        </p>
      )}
    </motion.button>
  );
}

function InfoBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
      <Info className="w-3 h-3" />
      {children}
    </span>
  );
}

export default function TabRetapitare({ selections, onUpdate }) {
  const handleCarSizeSelect = (sizeId) => {
    onUpdate({ ...selections, carSize: sizeId });
  };

  const handleMaterialSelect = (materialId) => {
    onUpdate({ ...selections, material: materialId });
  };

  const handlePlasticSelect = (optionId) => {
    const newSelections = { ...selections, plastic: optionId };
    // If plastic painting is selected, auto-include parasolar vopsire
    if (optionId === 'vopsire') {
      if (selections.parasolar === 'none') {
        newSelections.parasolar = 'vopsire';
      }
    }
    onUpdate(newSelections);
  };

  const handleParasolarSelect = (optionId) => {
    onUpdate({ ...selections, parasolar: optionId });
  };

  // Parasolar vopsire is included when plastic vopsire is active
  const parasolarIncluded = selections.plastic === 'vopsire' && selections.parasolar === 'vopsire';

  return (
    <div className="space-y-10">
      {/* Section A: Material */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-light">Alege Materialul pentru Plafon</h3>
            <p className="text-light-muted text-sm">Selectează tipul de material dorit</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <InfoBadge>Include demontare și montare plafon</InfoBadge>
          <InfoBadge>Garanție 2 ani pe manoperă</InfoBadge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              isSelected={selections.material === material.id}
              onSelect={handleMaterialSelect}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />

      {/* Section B: Car Size */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Car className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-light">Tip Caroserie</h3>
            <p className="text-light-muted text-sm">Selectează mărimea mașinii tale</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {carSizes.map((size) => (
            <OptionCard
              key={size.id}
              option={size}
              isSelected={selections.carSize === size.id}
              onSelect={handleCarSizeSelect}
              showPrice={true} // will show option.extra if > 0
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />

      {/* Section B: Elemente Plastic (MOVED BEFORE PARASOLARE) */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Paintbrush className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-light">Elemente Plastic</h3>
            <p className="text-light-muted text-sm">Vopsire mânere, ornamente și alte elemente de plastic</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <InfoBadge>Mânere, trim-uri, grile interior</InfoBadge>
          <InfoBadge>Lac protector UV inclus</InfoBadge>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {plasticOptions.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={selections.plastic === option.id}
              onSelect={handlePlasticSelect}
              badge={option.id === 'vopsire' ? '+ parasolare incluse' : null}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />

      {/* Section C: Parasolare */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Sun className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-light">Parasolare</h3>
            <p className="text-light-muted text-sm">Vopsire sau retapitare parasolare (set 2 buc.)</p>
          </div>
        </div>
        {parasolarIncluded && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20"
          >
            <Gift className="w-4 h-4 text-green-400" />
            <p className="text-green-400 text-sm font-medium">
              Vopsire parasolare inclusă la vopsire elemente plastic!
            </p>
          </motion.div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          <InfoBadge>Set complet 2 parasolare</InfoBadge>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {parasolarOptions.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={selections.parasolar === option.id}
              onSelect={handleParasolarSelect}
              badge={option.id === 'vopsire' && parasolarIncluded ? 'INCLUS' : null}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
