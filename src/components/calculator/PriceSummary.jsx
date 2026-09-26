import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { materials, parasolarOptions, plasticOptions, ambientZones, getZoneDiscount, currency, carSizes } from './calculatorData';

export default function PriceSummary({ retapitareSelections, luminiSelections }) {
  const items = [];

  // Car Size extra cost (only if it has an extra cost > 0)
  if (retapitareSelections.carSize) {
    const size = carSizes.find((s) => s.id === retapitareSelections.carSize);
    if (size && size.extra > 0) {
      items.push({ label: `Tip mașină — ${size.name}`, price: size.extra, category: 'retapitare' });
    }
  }

  // Material plafon
  if (retapitareSelections.material) {
    const material = materials.find((m) => m.id === retapitareSelections.material);
    if (material) {
      items.push({ label: `Plafon — ${material.name}`, price: material.price, category: 'retapitare' });
    }
  }

  // Plastic (now shown before parasolar)
  if (retapitareSelections.plastic && retapitareSelections.plastic !== 'none') {
    const option = plasticOptions.find((o) => o.id === retapitareSelections.plastic);
    if (option) {
      items.push({ label: option.name, price: option.price, category: 'retapitare' });
    }
  }

  // Parasolar — show as "inclus" if plastic vopsire is active and parasolar is vopsire
  if (retapitareSelections.parasolar && retapitareSelections.parasolar !== 'none') {
    const option = parasolarOptions.find((o) => o.id === retapitareSelections.parasolar);
    if (option) {
      const isIncluded = retapitareSelections.plastic === 'vopsire' && retapitareSelections.parasolar === 'vopsire';
      items.push({
        label: isIncluded ? `${option.name} (inclus)` : option.name,
        price: isIncluded ? 0 : option.price,
        category: 'retapitare',
        isBonus: isIncluded,
      });
    }
  }

  // Lumini — each zone individually
  luminiSelections.zones.forEach((zoneId) => {
    const zone = ambientZones.find((z) => z.id === zoneId);
    if (zone) {
      items.push({
        label: `Lumini — ${zone.name}`,
        price: zone.price,
        category: 'lumini',
      });
    }
  });

  // Calculate discount
  const zoneCount = luminiSelections.zones.length;
  const discountPercent = getZoneDiscount(zoneCount);
  const luminiSubtotal = items
    .filter((i) => i.category === 'lumini')
    .reduce((sum, i) => sum + i.price, 0);
  const discountAmount = Math.round(luminiSubtotal * discountPercent / 100);

  const subtotalBrut = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotalBrut - discountAmount;

  // Build the message for the contact form
  const getSelectedOptionsText = () => {
    let text = 'Salut! Aș dori o ofertă pentru următoarele servicii:\n\n';

    // Add retapitare items
    items.filter(i => i.category === 'retapitare' && !i.label.startsWith('Tip mașină')).forEach(item => {
      text += `- ${item.label}\n`;
    });

    // Add lumini items
    if (zoneCount > 0) {
      text += `\nLumini Ambientale (${zoneCount} zone selectate):\n`;
      items.filter(i => i.category === 'lumini').forEach(item => {
        text += `- ${item.label.replace('Lumini — ', '')}\n`;
      });
    }

    if (total > 0) {
      text += `\nTotal estimat în calculator: ${total} ${currency}`;
    }

    return text;
  };

  const generatedMessage = encodeURIComponent(getSelectedOptionsText());
  const selectedCarSize = retapitareSelections.carSize || '';

  // Validation logic
  const hasRetapitareValid = Boolean(retapitareSelections.material && retapitareSelections.carSize);
  const hasLuminiValid = zoneCount > 0;
  const canSubmit = hasRetapitareValid || hasLuminiValid;

  return (
    <div className="sticky top-24">
      <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-light">Rezumat Comandă</h3>
              <p className="text-light-muted text-xs">Estimare de preț</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="p-5 space-y-3 min-h-[120px]">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-light-muted text-sm text-center py-6"
              >
                Selectează serviciile dorite pentru a vedea prețul estimativ
              </motion.p>
            ) : (
              items.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-start gap-2"
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 ${
                        item.isBonus ? 'bg-green-400' : item.category === 'retapitare' ? 'bg-blue-400' : 'bg-amber-400'
                      }`}
                    />
                    <span className={`text-sm ${item.isBonus ? 'text-green-400' : 'text-light'}`}>
                      {item.label}
                    </span>
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${item.isBonus ? 'text-green-400' : 'text-light'}`}>
                    {item.isBonus ? 'GRATIS' : `${item.price} ${currency}`}
                  </span>
                </motion.div>
              ))
            )}

            {/* Discount line */}
            {discountAmount > 0 && (
              <motion.div
                key="discount"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex justify-between items-start gap-2 pt-2 border-t border-dashed border-dark-border"
              >
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-1.5 bg-green-400" />
                  <span className="text-sm text-green-400">
                    Reducere pachet lumini (-{discountPercent}%)
                  </span>
                </div>
                <span className="text-sm font-medium text-green-400 whitespace-nowrap">
                  -{discountAmount} {currency}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Total */}
        <div className="p-5 border-t border-dark-border bg-neutral-900/50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-light-muted font-medium">TOTAL ESTIMATIV</span>
            <motion.span
              key={total}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-gold"
            >
              {total} {currency}
            </motion.span>
          </div>

          {/* CTA Button */}
          {canSubmit ? (
            <Link
              to={`/contact?msg=${generatedMessage}&carSize=${selectedCarSize}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold hover:bg-gold-light text-dark font-semibold rounded-xl transition-colors duration-300"
            >
              Solicită Ofertă
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-neutral-800 text-neutral-500 font-semibold rounded-xl cursor-not-allowed"
            >
              Alege un pachet complet
            </button>
          )}

          {/* Disclaimer */}
          <p className="text-light-muted text-xs text-center mt-3">
            Prețurile sunt estimative și pot varia în funcție de model și complexitate
          </p>
        </div>
      </div>
    </div>
  );
}
