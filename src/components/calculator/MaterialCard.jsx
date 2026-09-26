import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { currency } from './calculatorData';

const textureStyles = {
  alcantara: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    backgroundSize: '10px 10px',
    position: 'relative',
  },
  'piele-eco': {
    background: 'linear-gradient(135deg, #2d1b0e 0%, #3d2b1a 50%, #2d1b0e 100%)',
    position: 'relative',
  },
  'stofa-oem': {
    background: 'linear-gradient(45deg, #1f1f1f 25%, #2a2a2a 25%, #2a2a2a 50%, #1f1f1f 50%, #1f1f1f 75%, #2a2a2a 75%)',
    backgroundSize: '8px 8px',
    position: 'relative',
  },
  microfiber: {
    background: 'linear-gradient(135deg, #0f1729 0%, #1a2540 50%, #0f1729 100%)',
    position: 'relative',
  },
};

const textureOverlays = {
  alcantara: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
  'piele-eco': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
  'stofa-oem': 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)',
  microfiber: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
};

export default function MaterialCard({ material, isSelected, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(material.id)}
      className={`relative w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-gold shadow-[0_0_20px_rgba(212,168,83,0.25)]'
          : 'border-dark-border hover:border-neutral-600'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Texture Preview */}
      <div
        className="h-32 w-full relative"
        style={textureStyles[material.texture] || textureStyles.alcantara}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: textureOverlays[material.texture] || textureOverlays.alcantara,
            backgroundSize: '4px 4px',
          }}
        />
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center"
          >
            <Check className="w-5 h-5 text-dark" />
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 bg-dark-card">
        <h4 className="font-semibold text-light text-lg">{material.name}</h4>
        <p className="text-light-muted text-sm mt-1">{material.description}</p>
        <p className="text-gold font-bold text-lg mt-2">
          {material.price} {currency}
        </p>
      </div>
    </motion.button>
  );
}
