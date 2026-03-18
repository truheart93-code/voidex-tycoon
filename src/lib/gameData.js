// Stellar Empire - Game Configuration

export const GENERATORS = [
  {
    id: 'asteroid_mine',
    name: 'Asteroid Mine',
    emoji: '🪨',
    baseCost: 4,
    baseRevenue: 1,
    baseTime: 1000, // ms
    costMultiplier: 1.07,
    description: 'Extract minerals from nearby asteroids',
    color: 'from-stone-600 to-stone-800',
    glowColor: 'shadow-stone-500/30',
    unlockAt: 0,
  },
  {
    id: 'solar_farm',
    name: 'Solar Collector',
    emoji: '☀️',
    baseCost: 60,
    baseRevenue: 8,
    baseTime: 3000,
    costMultiplier: 1.15,
    description: 'Harness energy from nearby stars',
    color: 'from-amber-500 to-orange-700',
    glowColor: 'shadow-amber-500/30',
    unlockAt: 50,
  },
  {
    id: 'ice_harvester',
    name: 'Ice Harvester',
    emoji: '🧊',
    baseCost: 720,
    baseRevenue: 47,
    baseTime: 6000,
    costMultiplier: 1.14,
    description: 'Collect ice from comet tails',
    color: 'from-cyan-400 to-blue-700',
    glowColor: 'shadow-cyan-500/30',
    unlockAt: 500,
  },
  {
    id: 'gas_refinery',
    name: 'Gas Refinery',
    emoji: '🌫️',
    baseCost: 8640,
    baseRevenue: 260,
    baseTime: 12000,
    costMultiplier: 1.13,
    description: 'Refine gases from giant planets',
    color: 'from-purple-500 to-indigo-800',
    glowColor: 'shadow-purple-500/30',
    unlockAt: 5000,
  },
  {
    id: 'colony_hub',
    name: 'Colony Hub',
    emoji: '🏗️',
    baseCost: 103680,
    baseRevenue: 1400,
    baseTime: 24000,
    costMultiplier: 1.12,
    description: 'Establish thriving space colonies',
    color: 'from-emerald-500 to-teal-800',
    glowColor: 'shadow-emerald-500/30',
    unlockAt: 50000,
  },
  {
    id: 'warp_gate',
    name: 'Warp Gate',
    emoji: '🌀',
    baseCost: 1244160,
    baseRevenue: 7800,
    baseTime: 48000,
    costMultiplier: 1.11,
    description: 'Open portals to distant systems',
    color: 'from-violet-500 to-fuchsia-800',
    glowColor: 'shadow-violet-500/30',
    unlockAt: 500000,
  },
  {
    id: 'dyson_sphere',
    name: 'Dyson Sphere',
    emoji: '🔮',
    baseCost: 14929920,
    baseRevenue: 44000,
    baseTime: 96000,
    costMultiplier: 1.10,
    description: 'Encase a star in energy collectors',
    color: 'from-rose-500 to-red-900',
    glowColor: 'shadow-rose-500/30',
    unlockAt: 5000000,
  },
  {
    id: 'quantum_forge',
    name: 'Quantum Forge',
    emoji: '⚛️',
    baseCost: 179159040,
    baseRevenue: 260000,
    baseTime: 192000,
    costMultiplier: 1.09,
    description: 'Forge matter from quantum fluctuations',
    color: 'from-sky-400 to-blue-900',
    glowColor: 'shadow-sky-500/30',
    unlockAt: 50000000,
  },
  {
    id: 'dimension_rift',
    name: 'Dimension Rift',
    emoji: '🌌',
    baseCost: 2149908480,
    baseRevenue: 1600000,
    baseTime: 384000,
    costMultiplier: 1.08,
    description: 'Tap into parallel dimension resources',
    color: 'from-pink-500 to-purple-900',
    glowColor: 'shadow-pink-500/30',
    unlockAt: 500000000,
  },
  {
    id: 'cosmic_engine',
    name: 'Cosmic Engine',
    emoji: '💫',
    baseCost: 25798901760,
    baseRevenue: 10000000,
    baseTime: 600000,
    costMultiplier: 1.07,
    description: 'Harness the fundamental forces of the cosmos',
    color: 'from-yellow-400 to-amber-900',
    glowColor: 'shadow-yellow-500/30',
    unlockAt: 5000000000,
  },
];

export const MANAGERS = [
  { id: 'mgr_asteroid', generatorId: 'asteroid_mine', name: 'Drill Bot', cost: 1000, emoji: '🤖' },
  { id: 'mgr_solar', generatorId: 'solar_farm', name: 'Photon AI', cost: 15000, emoji: '🧠' },
  { id: 'mgr_ice', generatorId: 'ice_harvester', name: 'Cryo Captain', cost: 100000, emoji: '👩‍🚀' },
  { id: 'mgr_gas', generatorId: 'gas_refinery', name: 'Nebula Warden', cost: 500000, emoji: '👽' },
  { id: 'mgr_colony', generatorId: 'colony_hub', name: 'Governor Prime', cost: 10000000, emoji: '👑' },
  { id: 'mgr_warp', generatorId: 'warp_gate', name: 'Void Walker', cost: 100000000, emoji: '🧙' },
  { id: 'mgr_dyson', generatorId: 'dyson_sphere', name: 'Star Architect', cost: 1000000000, emoji: '⭐' },
  { id: 'mgr_quantum', generatorId: 'quantum_forge', name: 'Quark Master', cost: 50000000000, emoji: '🔬' },
  { id: 'mgr_dimension', generatorId: 'dimension_rift', name: 'Rift Lord', cost: 500000000000, emoji: '🌊' },
  { id: 'mgr_cosmic', generatorId: 'cosmic_engine', name: 'Cosmic Sage', cost: 10000000000000, emoji: '🧿' },
];

export const UPGRADES = [
  { id: 'upg_ast_1', generatorId: 'asteroid_mine', name: 'Titanium Drills', cost: 500, multiplier: 3, requiredCount: 25, emoji: '⛏️' },
  { id: 'upg_ast_2', generatorId: 'asteroid_mine', name: 'Deep Core Mining', cost: 50000, multiplier: 3, requiredCount: 100, emoji: '💎' },
  { id: 'upg_ast_3', generatorId: 'asteroid_mine', name: 'Nano Extractors', cost: 25000000, multiplier: 3, requiredCount: 200, emoji: '🔩' },
  { id: 'upg_sol_1', generatorId: 'solar_farm', name: 'Photon Amplifier', cost: 5000, multiplier: 3, requiredCount: 25, emoji: '🔆' },
  { id: 'upg_sol_2', generatorId: 'solar_farm', name: 'Stellar Mirror Array', cost: 500000, multiplier: 3, requiredCount: 100, emoji: '🪞' },
  { id: 'upg_ice_1', generatorId: 'ice_harvester', name: 'Cryo Compressor', cost: 50000, multiplier: 3, requiredCount: 25, emoji: '❄️' },
  { id: 'upg_ice_2', generatorId: 'ice_harvester', name: 'Absolute Zero Tech', cost: 5000000, multiplier: 3, requiredCount: 100, emoji: '🥶' },
  { id: 'upg_gas_1', generatorId: 'gas_refinery', name: 'Fusion Catalyst', cost: 500000, multiplier: 3, requiredCount: 25, emoji: '⚗️' },
  { id: 'upg_gas_2', generatorId: 'gas_refinery', name: 'Plasma Separator', cost: 50000000, multiplier: 3, requiredCount: 100, emoji: '🧪' },
  { id: 'upg_col_1', generatorId: 'colony_hub', name: 'Terraformer', cost: 5000000, multiplier: 3, requiredCount: 25, emoji: '🌱' },
  { id: 'upg_warp_1', generatorId: 'warp_gate', name: 'Hyperdrive Core', cost: 50000000, multiplier: 3, requiredCount: 25, emoji: '🚀' },
  { id: 'upg_dys_1', generatorId: 'dyson_sphere', name: 'Supernova Lens', cost: 500000000, multiplier: 3, requiredCount: 25, emoji: '🔭' },
  { id: 'upg_qnt_1', generatorId: 'quantum_forge', name: 'String Theory Module', cost: 10000000000, multiplier: 3, requiredCount: 25, emoji: '🧬' },
  { id: 'upg_dim_1', generatorId: 'dimension_rift', name: 'Multiverse Key', cost: 500000000000, multiplier: 3, requiredCount: 25, emoji: '🗝️' },
  { id: 'upg_cos_1', generatorId: 'cosmic_engine', name: 'Big Bang Spark', cost: 50000000000000, multiplier: 3, requiredCount: 25, emoji: '✨' },
  // Global upgrades
  { id: 'upg_global_1', generatorId: 'all', name: 'Galactic Trade Network', cost: 100000, multiplier: 2, requiredCount: 0, emoji: '🌐' },
  { id: 'upg_global_2', generatorId: 'all', name: 'Wormhole Express', cost: 10000000, multiplier: 2, requiredCount: 0, emoji: '🕳️' },
  { id: 'upg_global_3', generatorId: 'all', name: 'Cosmic Resonance', cost: 5000000000, multiplier: 2, requiredCount: 0, emoji: '🎵' },
];

export const MILESTONES = [
  { count: 25, speedMultiplier: 2 },
  { count: 50, speedMultiplier: 2 },
  { count: 100, speedMultiplier: 2 },
  { count: 200, speedMultiplier: 2 },
  { count: 300, speedMultiplier: 2 },
  { count: 400, speedMultiplier: 2 },
];

export const ACHIEVEMENTS = [
  { id: 'ach_first', name: 'First Steps', description: 'Buy your first generator', condition: (state) => Object.values(state.generators).some(g => g.count > 0), emoji: '🎯' },
  { id: 'ach_100k', name: 'Space Mogul', description: 'Earn 100,000 credits total', condition: (state) => state.totalEarned >= 100000, emoji: '💰' },
  { id: 'ach_1m', name: 'Stellar Magnate', description: 'Earn 1 million credits total', condition: (state) => state.totalEarned >= 1000000, emoji: '🏆' },
  { id: 'ach_1b', name: 'Galactic Titan', description: 'Earn 1 billion credits total', condition: (state) => state.totalEarned >= 1000000000, emoji: '👾' },
  { id: 'ach_mgr3', name: 'Delegation Master', description: 'Hire 3 managers', condition: (state) => state.managers.length >= 3, emoji: '📋' },
  { id: 'ach_all_gen', name: 'Full Spectrum', description: 'Own at least 1 of every generator', condition: (state) => GENERATORS.every(g => (state.generators[g.id]?.count || 0) > 0), emoji: '🌈' },
  { id: 'ach_prestige', name: 'Cosmic Rebirth', description: 'Prestige for the first time', condition: (state) => state.totalPrestiges >= 1, emoji: '♻️' },
  { id: 'ach_prestige5', name: 'Eternal Empire', description: 'Prestige 5 times', condition: (state) => state.totalPrestiges >= 5, emoji: '🏛️' },
  { id: 'ach_100_ast', name: 'Mining Baron', description: 'Own 100 Asteroid Mines', condition: (state) => (state.generators.asteroid_mine?.count || 0) >= 100, emoji: '⛏️' },
  { id: 'ach_speed', name: 'Speed Demon', description: 'Reach a milestone on any generator', condition: (state) => Object.values(state.generators).some(g => g.count >= 25), emoji: '⚡' },
];

export function formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  if (num < 0) return '-' + formatNumber(-num);
  
  const suffixes = [
    '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
    'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NoDc', 'Vg'
  ];
  
  if (num < 1000) return Math.floor(num).toString();
  
  const tier = Math.floor(Math.log10(num) / 3);
  if (tier >= suffixes.length) return num.toExponential(2);
  
  const scaled = num / Math.pow(10, tier * 3);
  return scaled.toFixed(scaled < 10 ? 2 : scaled < 100 ? 1 : 0) + suffixes[tier];
}

export function getCost(generator, count, buyAmount = 1) {
  let total = 0;
  for (let i = 0; i < buyAmount; i++) {
    total += generator.baseCost * Math.pow(generator.costMultiplier, count + i);
  }
  return Math.ceil(total);
}

export function getRevenue(generatorConfig, generatorState, prestigeMultiplier, globalMultiplier) {
  const count = generatorState?.count || 0;
  if (count === 0) return 0;
  const upgradeMultiplier = generatorState?.upgradeMultiplier || 1;
  return generatorConfig.baseRevenue * count * upgradeMultiplier * prestigeMultiplier * globalMultiplier;
}

export function getTime(generatorConfig, generatorState) {
  const count = generatorState?.count || 0;
  let time = generatorConfig.baseTime;
  
  for (const milestone of MILESTONES) {
    if (count >= milestone.count) {
      time /= milestone.speedMultiplier;
    }
  }
  
  return Math.max(time, 50); // minimum 50ms
}

export function getPrestigeStars(totalEarned) {
  if (totalEarned < 1000000) return 0;
  return Math.floor(Math.sqrt(totalEarned / 1000000));
}

export function getPrestigeMultiplier(stars) {
  return 1 + stars * 0.1;
}

export function createInitialState() {
  return {
    credits: 10,
    totalEarned: 0,
    lifetimeEarned: 0,
    generators: {},
    managers: [],
    upgrades: [],
    achievements: [],
    prestigeStars: 0,
    totalPrestiges: 0,
    lastSaveTime: Date.now(),
    buyAmount: 1,
  };
}