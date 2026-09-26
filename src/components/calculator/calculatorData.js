/**
 * Calculator Data — I&D Custom
 * 
 * ═══════════════════════════════════════════════════════════
 *  EDITEAZĂ PREȚURILE AICI — nu trebuie să modifici altceva
 * ═══════════════════════════════════════════════════════════
 */

export const materials = [
  {
    id: 'alcantara',
    name: 'Alcantara',
    description: 'Material premium, catifelare, aspect sport-luxury',
    price: 800,
    texture: 'alcantara',
  },
  {
    id: 'piele-eco',
    name: 'Piele Ecologică',
    description: 'Durabilă, ușor de întreținut, aspect elegant',
    price: 600,
    texture: 'piele-eco',
  },
  {
    id: 'stofa-oem',
    name: 'Stofă OEM',
    description: 'Material original, potrivire perfectă cu interiorul',
    price: 500,
    texture: 'stofa-oem',
  },
  {
    id: 'microfiber',
    name: 'Microfiber',
    description: 'Ultra-soft, rezistent la uzură, aspect premium',
    price: 700,
    texture: 'microfiber',
  },
];

export const parasolarOptions = [
  { id: 'none', name: 'Fără modificare', price: 0 },
  { id: 'vopsire', name: 'Vopsire parasolare', price: 150 },
  { id: 'retapitare', name: 'Retapitare parasolare', price: 250 },
];

export const plasticOptions = [
  { id: 'none', name: 'Fără modificare', price: 0 },
  { id: 'vopsire', name: 'Vopsire elemente plastic', price: 400 },
];

export const carSizes = [
  { id: 'sedan', name: 'Sedan', description: 'Berlină clasică', multiplier: 1.0, extra: 0 },
  { id: 'coupe', name: 'Coupe', description: 'Coupé / Hatchback', multiplier: 1.0, extra: 100 },
  { id: 'suv', name: 'SUV', description: 'SUV / Crossover', multiplier: 1.0, extra: 150 },
];

export const ambientZones = [
  { id: 'bord', name: 'Bord', description: 'Iluminare pe conturul bordului', price: 500 },
  { id: 'usi-fata', name: 'Uși Față', description: 'Iluminare panouri uși față (2 buc.)', price: 400 },
  { id: 'usi-spate', name: 'Uși Spate', description: 'Iluminare panouri uși spate (2 buc.)', price: 400 },
  { id: 'consola', name: 'Consolă Centrală', description: 'Iluminare consolă centrală', price: 300 },
  { id: 'sub-scaune', name: 'Sub Scaune', description: 'Iluminare podea sub scaune', price: 250 },
];

/**
 * Reducere progresivă pentru lumini ambientale (non-liniară)
 * Cu cât alegi mai multe zone, cu atât reducerea e mai mare.
 */
export const zoneDiscounts = {
  1: 0,    // 1 zonă  → 0%
  2: 5,    // 2 zone  → 5%
  3: 12,   // 3 zone  → 12%
  4: 20,   // 4 zone  → 20%
  5: 30,   // 5 zone  → 30%
};

export function getZoneDiscount(zoneCount) {
  return zoneDiscounts[zoneCount] || 0;
}

export const currency = 'RON';
