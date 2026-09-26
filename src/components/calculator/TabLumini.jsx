import { Lightbulb, MapPin, Info, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import ZoneSelector from './ZoneSelector';
import { ambientZones, getZoneDiscount, zoneDiscounts, currency } from './calculatorData';

function InfoBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
      <Info className="w-3 h-3" />
      {children}
    </span>
  );
}

export default function TabLumini({ selections, onUpdate }) {
  const handleToggleZone = (zoneId) => {
    const zones = selections.zones.includes(zoneId)
      ? selections.zones.filter((z) => z !== zoneId)
      : [...selections.zones, zoneId];
    onUpdate({ ...selections, zones });
  };

  const zoneCount = selections.zones.length;
  const discountPercent = getZoneDiscount(zoneCount);

  const subtotalBrut = selections.zones.reduce((sum, zoneId) => {
    const zone = ambientZones.find((z) => z.id === zoneId);
    return sum + (zone?.price || 0);
  }, 0);

  const discountAmount = Math.round(subtotalBrut * discountPercent / 100);
  const subtotalNet = subtotalBrut - discountAmount;

  // Build discount tiers for display
  const discountTiers = Object.entries(zoneDiscounts)
    .filter(([, pct]) => pct > 0)
    .map(([count, pct]) => ({ count: Number(count), pct }));

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-gold/5 border border-gold/20">
        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-light">Addressable RGB LED</h3>
          <p className="text-light-muted text-sm">
            Efecte avansate, culori individuale per LED — prețuri diferite per zonă
          </p>
        </div>
      </div>

      {/* Discount Tiers */}
      <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
        <div className="flex items-center gap-2 mb-3">
          <Percent className="w-4 h-4 text-green-400" />
          <h4 className="text-sm font-semibold text-light">Reduceri la pachet</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {discountTiers.map(({ count, pct }) => (
            <span
              key={count}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                zoneCount >= count
                  ? 'bg-green-500/15 text-green-400 border-green-500/30'
                  : 'bg-dark-card text-light-muted border-dark-border'
              }`}
            >
              {count} zone → -{pct}%
            </span>
          ))}
        </div>
      </div>

      {/* Info Badges (Moved here) */}
      <div className="flex flex-wrap gap-2 mt-2">
        <InfoBadge>Montaj profesional inclus</InfoBadge>
        <InfoBadge>Controller cu telecomandă / app inclus</InfoBadge>
        <InfoBadge>Garanție 2 ani</InfoBadge>
      </div>

      {/* Zone Selection */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-light">Selectează Zonele</h3>
            <p className="text-light-muted text-sm">Apasă pe zonele din mașină sau din lista de mai jos</p>
          </div>
        </div>

        {zoneCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-gold/5 border border-gold/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <p className="text-sm text-light">
                <span className="font-semibold text-gold">{zoneCount}</span> zone selectate — subtotal:{' '}
                {discountPercent > 0 && (
                  <span className="line-through text-light-muted mr-1">{subtotalBrut} {currency}</span>
                )}
                <span className="font-bold text-gold text-base">{subtotalNet} {currency}</span>
              </p>
              {discountPercent > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                  -{discountPercent}% reducere
                </span>
              )}
            </div>
          </motion.div>
        )}

        <ZoneSelector
          selectedZones={selections.zones}
          onToggleZone={handleToggleZone}
        />
      </section>
    </div>
  );
}
