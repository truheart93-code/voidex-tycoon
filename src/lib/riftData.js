// Void Rift System - unlocks at prestige 50

export const RIFT_DEBUFFS = [
  { id: 'cost_3x', name: 'Scarcity Protocol', description: 'Generators cost 3x more', emoji: '📈', type: 'cost_multiplier', value: 3 },
  { id: 'income_half', name: 'Signal Dampener', description: 'Income reduced by 50%', emoji: '📉', type: 'income_multiplier', value: 0.5 },
  { id: 'buy_cooldown', name: 'Rate Limiter', description: 'Buy cooldown: 5 seconds', emoji: '⏱️', type: 'buy_cooldown', value: 5000 },
  { id: 'no_upgrades', name: 'Tech Blackout', description: 'Upgrades disabled', emoji: '🚫', type: 'no_upgrades', value: 1 },
  { id: 'no_prestige', name: 'Blank Slate', description: 'Prestige multiplier disabled', emoji: '⭐', type: 'no_prestige', value: 1 },
];

export const RIFT_BUFFS = [
  { id: 'free_generator', name: 'Phantom Supply', description: 'One random generator costs 1 credit', emoji: '🎁', type: 'free_generator', value: 1 },
  { id: 'click_10x', name: 'Neural Amplifier', description: 'Manual taps give 10x income', emoji: '👆', type: 'click_multiplier', value: 10 },
  { id: 'offline_active', name: 'Quantum Sleep', description: '3x offline earnings efficiency', emoji: '😴', type: 'offline_boost', value: 3 },
  { id: 'speed_2x', name: 'Warp Overdrive', description: 'All generators run 2x faster', emoji: '⚡', type: 'speed_multiplier', value: 2 },
  { id: 'income_2x', name: 'Void Resonance', description: 'Income boosted 2x', emoji: '💰', type: 'income_bonus', value: 2 },
];

function seededRng(seed) {
  let h = seed;
  return () => {
    h ^= h << 13; h ^= h >> 17; h ^= h << 5;
    return Math.abs(h) / 2147483647;
  };
}

export function generateRift(level) {
  const seed = level * 7919 + 31337;
  const rng = seededRng(seed);

  let debuffCount, buffCount;
  if (level <= 5) { debuffCount = 1; buffCount = 2; }
  else if (level <= 10) { debuffCount = 2; buffCount = 2; }
  else if (level <= 20) { debuffCount = 2; buffCount = 1; }
  else { debuffCount = 3; buffCount = 1; }

  // Shuffle and pick debuffs
  const shuffledDebuffs = [...RIFT_DEBUFFS].sort(() => rng() - 0.5);
  const shuffledBuffs = [...RIFT_BUFFS].sort(() => rng() - 0.5);

  const modifiers = [
    ...shuffledDebuffs.slice(0, debuffCount).map(d => ({ ...d, side: 'debuff' })),
    ...shuffledBuffs.slice(0, buffCount).map(b => ({ ...b, side: 'buff' })),
  ];

  // Shareable code: encode level + seed
  const code = (level * 999983 + 77777).toString(36).toUpperCase().slice(0, 6).padStart(6, '0');

  // Token reward scales with level and debuffs
  const baseTokens = 3 + Math.floor(level * 1.5) + debuffCount * 4;

  // Credit goal scales with level
  const creditGoal = Math.floor(1000 * Math.pow(3.5, Math.min(level, 30)));

  // Duration: 20 minutes
  const duration = 20 * 60 * 1000;

  // Free generator pick
  const freeGenBuff = modifiers.find(m => m.id === 'free_generator');
  const GENERATOR_IDS = ['asteroid_mine','solar_farm','ice_harvester','gas_refinery','colony_hub','warp_gate','dyson_sphere'];
  const freeGenId = freeGenBuff ? GENERATOR_IDS[Math.floor(rng() * GENERATOR_IDS.length)] : null;

  return { level, seed, code, modifiers, creditGoal, duration, tokenReward: baseTokens, freeGenId };
}

export function getRiftModifier(activeRift, type) {
  if (!activeRift) return null;
  return activeRift.modifiers.find(m => m.type === type) || null;
}

const RIFT_SAVE_KEY = 'voidex_active_rift';

export function loadActiveRift() {
  try {
    const saved = localStorage.getItem(RIFT_SAVE_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return null;
}

export function saveActiveRift(rift) {
  try {
    if (rift) localStorage.setItem(RIFT_SAVE_KEY, JSON.stringify(rift));
    else localStorage.removeItem(RIFT_SAVE_KEY);
  } catch(e) {}
}