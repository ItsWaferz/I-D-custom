import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { steleData, currency } from './calculatorData';

export default function TabStele({ selections, onUpdate }) {
  const { packageId } = selections;

  return (
    <div className="space-y-8">
      {/* Informative Header */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Star className="w-32 h-32" />
        </div>
        <h3 className="text-xl font-semibold text-light mb-2 relative z-10">Plafon Înstelat</h3>
        <p className="text-light-muted relative z-10 max-w-xl">
          Instalația constă în fibră optică cu sursă de lumină ascunsă. Toate pachetele includ control complet (culori, intensitate, efect de sclipire) din telefon sau telecomandă.
        </p>
      </div>

      {/* Package Selection */}
      <section>
        <h4 className="text-lg font-medium text-light mb-4 flex items-center gap-2">
          Alege numărul de fire (Densitate)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steleData.map((pkg) => {
            const isSelected = packageId === pkg.id;
            return (
              <motion.button
                key={pkg.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onUpdate({ packageId: isSelected ? null : pkg.id })}
                className={`relative p-5 rounded-xl border-2 text-left transition-all duration-300 min-h-[80px] flex items-center ${
                  isSelected
                    ? 'border-gold bg-gold/10'
                    : 'border-dark-border bg-dark-card hover:border-gold/50'
                }`}
              >
                {/* Discount Badge */}
                {pkg.discountBadge && (
                  <div className="absolute -top-3 -right-2 px-3 py-1 bg-gold text-[#4a3300] border border-amber-300/30 rounded-full text-xs font-bold shadow-lg z-10">
                    {pkg.discountBadge}
                  </div>
                )}
                
                <div className="flex justify-between items-center w-full">
                  <h5 className={`font-semibold text-lg ${isSelected ? 'text-gold' : 'text-light'}`}>
                    {pkg.name}
                  </h5>
                  <div className="text-right">
                    {pkg.originalPrice && (
                      <div className="text-xs text-light-muted line-through mb-0.5">
                        {pkg.originalPrice} {currency}
                      </div>
                    )}
                    <span className={`font-bold ${isSelected ? 'text-gold' : 'text-light'}`}>
                      {pkg.price} {currency}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
