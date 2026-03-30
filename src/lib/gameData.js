// Stellar Empire - Game Configuration

export const GENERATORS = [
  {
    id: 'asteroid_mine',
    name: 'Asteroid Mine',
    emoji: '🪨',
    baseCost: 4,
    baseRevenue: 1,
    baseTime: 1000,
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
  {
    id: 'void_reactor',
    name: 'Void Reactor',
    emoji: '🕳️',
    baseCost: 309586821120,
    baseRevenue: 65000000,
    baseTime: 900000,
    costMultiplier: 1.07,
    description: 'Extract energy from the space between dimensions',
    color: 'from-slate-600 to-slate-950',
    glowColor: 'shadow-slate-500/30',
    unlockAt: 50000000000,
  },
  {
    id: 'stellar_nursery',
    name: 'Stellar Nursery',
    emoji: '🌟',
    baseCost: 3715041853440,
    baseRevenue: 430000000,
    baseTime: 1200000,
    costMultiplier: 1.06,
    description: 'Birth new stars and harvest their primordial energy',
    color: 'from-orange-400 to-red-800',
    glowColor: 'shadow-orange-500/30',
    unlockAt: 500000000000,
  },
  {
    id: 'galactic_core',
    name: 'Galactic Core',
    emoji: '🌠',
    baseCost: 44580502241280,
    baseRevenue: 2900000000,
    baseTime: 1800000,
    costMultiplier: 1.06,
    description: 'Siphon power from the supermassive black hole at a galaxy\'s heart',
    color: 'from-indigo-700 to-black',
    glowColor: 'shadow-indigo-500/30',
    unlockAt: 5000000000000,
  },
  {
    id: 'reality_engine',
    name: 'Reality Engine',
    emoji: '🔯',
    baseCost: 534966026895360,
    baseRevenue: 21000000000,
    baseTime: 3600000,
    costMultiplier: 1.05,
    description: 'Rewrite the laws of physics to maximize output',
    color: 'from-teal-500 to-cyan-950',
    glowColor: 'shadow-teal-500/30',
    unlockAt: 50000000000000,
  },
  {
    id: 'universe_farm',
    name: 'Universe Farm',
    emoji: '🌍',
    baseCost: 6419592322744320,
    baseRevenue: 160000000000,
    baseTime: 7200000,
    costMultiplier: 1.05,
    description: 'Cultivate entire universes as resources',
    color: 'from-green-600 to-emerald-950',
    glowColor: 'shadow-green-500/30',
    unlockAt: 500000000000000,
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
  { id: 'mgr_void', generatorId: 'void_reactor', name: 'Void Shepherd', cost: 150000000000000, emoji: '🌑' },
  { id: 'mgr_stellar', generatorId: 'stellar_nursery', name: 'Star Midwife', cost: 2000000000000000, emoji: '🌠' },
  { id: 'mgr_galactic', generatorId: 'galactic_core', name: 'Gravity Bender', cost: 25000000000000000, emoji: '🕹️' },
  { id: 'mgr_reality', generatorId: 'reality_engine', name: 'Reality Hacker', cost: 300000000000000000, emoji: '🪄' },
  { id: 'mgr_universe', generatorId: 'universe_farm', name: 'Omni Creator', cost: 4000000000000000000, emoji: '🌌' },
];

export const UPGRADES = [
  // Asteroid Mine - 4 tiers
  { id: 'upg_ast_1', generatorId: 'asteroid_mine', name: 'Titanium Drills', cost: 500, multiplier: 3, requiredCount: 10, emoji: '⛏️' },
  { id: 'upg_ast_2', generatorId: 'asteroid_mine', name: 'Deep Core Mining', cost: 50000, multiplier: 3, requiredCount: 25, emoji: '💎' },
  { id: 'upg_ast_3', generatorId: 'asteroid_mine', name: 'Nano Extractors', cost: 5000000, multiplier: 3, requiredCount: 50, emoji: '🔩' },
  { id: 'upg_ast_4', generatorId: 'asteroid_mine', name: 'Quantum Drills', cost: 1000000000, multiplier: 5, requiredCount: 100, emoji: '✨' },
  { id: 'upg_ast_5', generatorId: 'asteroid_mine', name: 'Singularity Bore', cost: 500000000000, multiplier: 5, requiredCount: 200, emoji: '🌀' },
  // Solar Farm - 4 tiers
  { id: 'upg_sol_1', generatorId: 'solar_farm', name: 'Photon Amplifier', cost: 5000, multiplier: 3, requiredCount: 10, emoji: '🔆' },
  { id: 'upg_sol_2', generatorId: 'solar_farm', name: 'Stellar Mirror Array', cost: 500000, multiplier: 3, requiredCount: 25, emoji: '🪞' },
  { id: 'upg_sol_3', generatorId: 'solar_farm', name: 'Fusion Lens', cost: 50000000, multiplier: 3, requiredCount: 50, emoji: '🔭' },
  { id: 'upg_sol_4', generatorId: 'solar_farm', name: 'Plasma Concentrator', cost: 25000000000, multiplier: 5, requiredCount: 100, emoji: '💥' },
  // Ice Harvester - 4 tiers
  { id: 'upg_ice_1', generatorId: 'ice_harvester', name: 'Cryo Compressor', cost: 50000, multiplier: 3, requiredCount: 10, emoji: '❄️' },
  { id: 'upg_ice_2', generatorId: 'ice_harvester', name: 'Absolute Zero Tech', cost: 5000000, multiplier: 3, requiredCount: 25, emoji: '🥶' },
  { id: 'upg_ice_3', generatorId: 'ice_harvester', name: 'Comet Siphon', cost: 500000000, multiplier: 3, requiredCount: 50, emoji: '☄️' },
  { id: 'upg_ice_4', generatorId: 'ice_harvester', name: 'Dark Matter Ice', cost: 200000000000, multiplier: 5, requiredCount: 100, emoji: '🌊' },
  // Gas Refinery - 4 tiers
  { id: 'upg_gas_1', generatorId: 'gas_refinery', name: 'Fusion Catalyst', cost: 500000, multiplier: 3, requiredCount: 10, emoji: '⚗️' },
  { id: 'upg_gas_2', generatorId: 'gas_refinery', name: 'Plasma Separator', cost: 50000000, multiplier: 3, requiredCount: 25, emoji: '🧪' },
  { id: 'upg_gas_3', generatorId: 'gas_refinery', name: 'Nebula Concentrator', cost: 5000000000, multiplier: 3, requiredCount: 50, emoji: '🌫️' },
  { id: 'upg_gas_4', generatorId: 'gas_refinery', name: 'Exotic Matter Refiner', cost: 2000000000000, multiplier: 5, requiredCount: 100, emoji: '🔮' },
  // Colony Hub - 4 tiers
  { id: 'upg_col_1', generatorId: 'colony_hub', name: 'Terraformer', cost: 5000000, multiplier: 3, requiredCount: 10, emoji: '🌱' },
  { id: 'upg_col_2', generatorId: 'colony_hub', name: 'Mega Arcology', cost: 500000000, multiplier: 3, requiredCount: 25, emoji: '🏙️' },
  { id: 'upg_col_3', generatorId: 'colony_hub', name: 'Planet Shield', cost: 50000000000, multiplier: 3, requiredCount: 50, emoji: '🛡️' },
  { id: 'upg_col_4', generatorId: 'colony_hub', name: 'Dyno-Civilization', cost: 20000000000000, multiplier: 5, requiredCount: 100, emoji: '🌍' },
  // Warp Gate - 3 tiers
  { id: 'upg_warp_1', generatorId: 'warp_gate', name: 'Hyperdrive Core', cost: 50000000, multiplier: 3, requiredCount: 10, emoji: '🚀' },
  { id: 'upg_warp_2', generatorId: 'warp_gate', name: 'Stable Wormhole', cost: 5000000000, multiplier: 3, requiredCount: 25, emoji: '🌀' },
  { id: 'upg_warp_3', generatorId: 'warp_gate', name: 'Dimension Key', cost: 500000000000, multiplier: 5, requiredCount: 50, emoji: '🗝️' },
  // Dyson Sphere - 3 tiers
  { id: 'upg_dys_1', generatorId: 'dyson_sphere', name: 'Supernova Lens', cost: 500000000, multiplier: 3, requiredCount: 10, emoji: '🔭' },
  { id: 'upg_dys_2', generatorId: 'dyson_sphere', name: 'Star Shielding', cost: 50000000000, multiplier: 3, requiredCount: 25, emoji: '⭐' },
  { id: 'upg_dys_3', generatorId: 'dyson_sphere', name: 'Binary Capture', cost: 5000000000000, multiplier: 5, requiredCount: 50, emoji: '✨' },
  // Quantum Forge - 3 tiers
  { id: 'upg_qnt_1', generatorId: 'quantum_forge', name: 'String Theory Module', cost: 10000000000, multiplier: 3, requiredCount: 10, emoji: '🧬' },
  { id: 'upg_qnt_2', generatorId: 'quantum_forge', name: 'Higgs Boson Array', cost: 1000000000000, multiplier: 3, requiredCount: 25, emoji: '⚛️' },
  { id: 'upg_qnt_3', generatorId: 'quantum_forge', name: 'Matter Printer', cost: 100000000000000, multiplier: 5, requiredCount: 50, emoji: '🖨️' },
  // Dimension Rift - 3 tiers
  { id: 'upg_dim_1', generatorId: 'dimension_rift', name: 'Multiverse Key', cost: 500000000000, multiplier: 3, requiredCount: 10, emoji: '🗝️' },
  { id: 'upg_dim_2', generatorId: 'dimension_rift', name: 'Reality Shard', cost: 50000000000000, multiplier: 3, requiredCount: 25, emoji: '💠' },
  { id: 'upg_dim_3', generatorId: 'dimension_rift', name: 'Omega Conduit', cost: 5000000000000000, multiplier: 5, requiredCount: 50, emoji: '🌌' },
  // Cosmic Engine - 3 tiers
  { id: 'upg_cos_1', generatorId: 'cosmic_engine', name: 'Big Bang Spark', cost: 50000000000000, multiplier: 3, requiredCount: 10, emoji: '✨' },
  { id: 'upg_cos_2', generatorId: 'cosmic_engine', name: 'Entropy Reversal', cost: 5000000000000000, multiplier: 3, requiredCount: 25, emoji: '🔄' },
  { id: 'upg_cos_3', generatorId: 'cosmic_engine', name: 'Cosmic Singularity', cost: 500000000000000000, multiplier: 5, requiredCount: 50, emoji: '💫' },
  // Void Reactor
  { id: 'upg_void_1', generatorId: 'void_reactor', name: 'Dark Energy Tap', cost: 500000000000000, multiplier: 3, requiredCount: 10, emoji: '🕳️' },
  { id: 'upg_void_2', generatorId: 'void_reactor', name: 'Void Stabilizer', cost: 50000000000000000, multiplier: 5, requiredCount: 25, emoji: '⚫' },
  // Stellar Nursery
  { id: 'upg_stellar_1', generatorId: 'stellar_nursery', name: 'Star Seed', cost: 5000000000000000, multiplier: 3, requiredCount: 10, emoji: '🌱' },
  { id: 'upg_stellar_2', generatorId: 'stellar_nursery', name: 'Supergiant Catalyst', cost: 500000000000000000, multiplier: 5, requiredCount: 25, emoji: '🌟' },
  // Galactic Core
  { id: 'upg_gal_1', generatorId: 'galactic_core', name: 'Event Horizon Tap', cost: 50000000000000000, multiplier: 3, requiredCount: 10, emoji: '🌑' },
  { id: 'upg_gal_2', generatorId: 'galactic_core', name: 'Quasar Lens', cost: 5000000000000000000, multiplier: 5, requiredCount: 25, emoji: '🌠' },
  // Reality Engine
  { id: 'upg_real_1', generatorId: 'reality_engine', name: 'Physics Override', cost: 500000000000000000, multiplier: 3, requiredCount: 10, emoji: '🔯' },
  { id: 'upg_real_2', generatorId: 'reality_engine', name: 'Infinity Loop', cost: 50000000000000000000, multiplier: 5, requiredCount: 25, emoji: '♾️' },
  // Universe Farm
  { id: 'upg_uni_1', generatorId: 'universe_farm', name: 'Multiverse Plow', cost: 5000000000000000000, multiplier: 3, requiredCount: 10, emoji: '🌍' },
  { id: 'upg_uni_2', generatorId: 'universe_farm', name: 'Omniversal Harvest', cost: 500000000000000000000, multiplier: 5, requiredCount: 25, emoji: '🌌' },
  // Global upgrades
  { id: 'upg_global_1', generatorId: 'all', name: 'Galactic Trade Network', cost: 100000, multiplier: 2, requiredCount: 0, emoji: '🌐' },
  { id: 'upg_global_2', generatorId: 'all', name: 'Wormhole Express', cost: 10000000, multiplier: 2, requiredCount: 0, emoji: '🕳️' },
  { id: 'upg_global_3', generatorId: 'all', name: 'Cosmic Resonance', cost: 5000000000, multiplier: 2, requiredCount: 0, emoji: '🎵' },
  { id: 'upg_global_4', generatorId: 'all', name: 'Universal Constants Hacked', cost: 1000000000000, multiplier: 2, requiredCount: 0, emoji: '💻' },
  { id: 'upg_global_5', generatorId: 'all', name: 'Omnidimensional Banking', cost: 500000000000000, multiplier: 3, requiredCount: 0, emoji: '🏦' },
  { id: 'upg_global_6', generatorId: 'all', name: 'Temporal Arbitrage', cost: 100000000000000000, multiplier: 3, requiredCount: 0, emoji: '⏳' },
  { id: 'upg_global_7', generatorId: 'all', name: 'Entropy Reversal Engine', cost: 50000000000000000000, multiplier: 5, requiredCount: 0, emoji: '🔄' },
];

export const PRESTIGE_UPGRADES = [
  { id: 'pup_start_cash', name: 'Head Start', description: 'Begin each run with 10,000 credits', cost: 1, emoji: '💰', type: 'start_credits', value: 10000 },
  { id: 'pup_start_cash2', name: 'Silver Spoon', description: 'Begin each run with 1 million credits', cost: 3, emoji: '🥈', type: 'start_credits', value: 1000000, requires: 'pup_start_cash' },
  { id: 'pup_start_cash3', name: 'Golden Cradle', description: 'Begin each run with 1 billion credits', cost: 8, emoji: '🥇', type: 'start_credits', value: 1000000000, requires: 'pup_start_cash2' },
  { id: 'pup_offline', name: 'Dream Harvester', description: 'Offline earnings efficiency: 75%', cost: 2, emoji: '😴', type: 'offline_efficiency', value: 0.75 },
  { id: 'pup_offline2', name: 'Lucid Operator', description: 'Offline earnings efficiency: 100%', cost: 5, emoji: '💤', type: 'offline_efficiency', value: 1.0, requires: 'pup_offline' },
  { id: 'pup_income1', name: 'Star Power', description: '+25% income per prestige star', cost: 2, emoji: '⭐', type: 'income_per_star', value: 0.25 },
  { id: 'pup_income2', name: 'Nebula Surge', description: 'All income x1.5 permanently', cost: 4, emoji: '🌀', type: 'flat_income', value: 1.5 },
  { id: 'pup_income3', name: 'Galactic Surge', description: 'All income x2 permanently', cost: 10, emoji: '⚡', type: 'flat_income', value: 2.0, requires: 'pup_income2' },
  { id: 'pup_click', name: 'Precision Strike', description: 'Manual taps earn 2x', cost: 1, emoji: '👆', type: 'click_multiplier', value: 2 },
  { id: 'pup_click2', name: 'Hyperfinger', description: 'Manual taps earn 5x', cost: 3, emoji: '🖐️', type: 'click_multiplier', value: 5, requires: 'pup_click' },
  { id: 'pup_managers', name: 'Corporate Network', description: 'Managers cost 50% less', cost: 3, emoji: '📊', type: 'manager_discount', value: 0.5 },
  { id: 'pup_upgrades', name: 'R&D Budget', description: 'Upgrades cost 50% less', cost: 3, emoji: '🔬', type: 'upgrade_discount', value: 0.5 },
  { id: 'pup_time1', name: 'Overclock', description: 'All generators run 1.5x faster', cost: 4, emoji: '⏩', type: 'speed_multiplier', value: 1.5 },
  { id: 'pup_time2', name: 'Quantum Speed', description: 'All generators run 2x faster', cost: 8, emoji: '💨', type: 'speed_multiplier', value: 2.0, requires: 'pup_time1' },
  { id: 'pup_free_gen', name: 'Inheritance', description: 'Start with 1 free Asteroid Mine', cost: 1, emoji: '🎁', type: 'free_generator', value: 1 },
];

export const MILESTONES = [
  { count: 25, speedMultiplier: 2 },
  { count: 50, speedMultiplier: 2 },
  { count: 100, speedMultiplier: 2 },
  { count: 200, speedMultiplier: 2 },
  { count: 300, speedMultiplier: 2 },
  { count: 400, speedMultiplier: 2 },
  { count: 500, speedMultiplier: 2 },
];

export const ACHIEVEMENTS = [
  // Early game
  { id: 'ach_first', name: 'First Steps', description: 'Buy your first generator', condition: (s) => Object.values(s.generators).some(g => g.count > 0), emoji: '🎯' },
  { id: 'ach_5gen', name: 'Collector', description: 'Own 5 different generator types', condition: (s) => Object.values(s.generators).filter(g => g.count > 0).length >= 5, emoji: '🗂️' },
  { id: 'ach_all_gen', name: 'Full Spectrum', description: 'Own at least 1 of every generator', condition: (s) => GENERATORS.every(g => (s.generators[g.id]?.count || 0) > 0), emoji: '🌈' },
  // Credits milestones
  { id: 'ach_1k', name: 'Pocket Change', description: 'Earn 1,000 credits total', condition: (s) => s.totalEarned >= 1000, emoji: '💵' },
  { id: 'ach_100k', name: 'Space Mogul', description: 'Earn 100,000 credits total', condition: (s) => s.totalEarned >= 100000, emoji: '💰' },
  { id: 'ach_1m', name: 'Stellar Magnate', description: 'Earn 1 million credits', condition: (s) => s.totalEarned >= 1000000, emoji: '🏆' },
  { id: 'ach_1b', name: 'Galactic Titan', description: 'Earn 1 billion credits', condition: (s) => s.totalEarned >= 1000000000, emoji: '👾' },
  { id: 'ach_1t', name: 'Cosmic Baron', description: 'Earn 1 trillion credits', condition: (s) => s.totalEarned >= 1000000000000, emoji: '💎' },
  { id: 'ach_1qa', name: 'Universal Tycoon', description: 'Earn 1 quadrillion credits', condition: (s) => s.totalEarned >= 1000000000000000, emoji: '🌌' },
  { id: 'ach_1qi', name: 'Omni Billionaire', description: 'Earn 1 quintillion credits', condition: (s) => s.totalEarned >= 1e18, emoji: '♾️' },
  // Generator counts
  { id: 'ach_10_ast', name: 'Rock Hound', description: 'Own 10 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 10, emoji: '🪨' },
  { id: 'ach_25_ast', name: 'Mining Op', description: 'Own 25 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 25, emoji: '⛏️' },
  { id: 'ach_100_ast', name: 'Mining Baron', description: 'Own 100 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 100, emoji: '💎' },
  { id: 'ach_200_ast', name: 'Rock Empire', description: 'Own 200 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 200, emoji: '🌋' },
  { id: 'ach_100_any', name: 'Century Club', description: 'Own 100 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 100), emoji: '💯' },
  { id: 'ach_200_any', name: 'Industrial Giant', description: 'Own 200 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 200), emoji: '🏭' },
  { id: 'ach_500_any', name: 'Unstoppable', description: 'Own 500 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 500), emoji: '🚂' },
  // Managers
  { id: 'ach_mgr1', name: 'First Hire', description: 'Hire your first manager', condition: (s) => s.managers.length >= 1, emoji: '🤝' },
  { id: 'ach_mgr3', name: 'Delegation Master', description: 'Hire 3 managers', condition: (s) => s.managers.length >= 3, emoji: '📋' },
  { id: 'ach_mgr5', name: 'Executive', description: 'Hire 5 managers', condition: (s) => s.managers.length >= 5, emoji: '👔' },
  { id: 'ach_mgr_all', name: 'Full Roster', description: 'Hire all managers', condition: (s) => s.managers.length >= MANAGERS.length, emoji: '🏢' },
  // Speed milestones
  { id: 'ach_speed', name: 'Speed Demon', description: 'Reach a milestone on any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 25), emoji: '⚡' },
  { id: 'ach_fast', name: 'Hyperspeed', description: 'Reach the 100-unit milestone', condition: (s) => Object.values(s.generators).some(g => g.count >= 100), emoji: '💨' },
  { id: 'ach_ludicrous', name: 'Ludicrous Speed', description: 'Reach the 500-unit milestone', condition: (s) => Object.values(s.generators).some(g => g.count >= 500), emoji: '🌪️' },
  // Upgrades
  { id: 'ach_upg1', name: 'Research Begins', description: 'Purchase your first upgrade', condition: (s) => s.upgrades.length >= 1, emoji: '🔬' },
  { id: 'ach_upg5', name: 'Science Dept', description: 'Purchase 5 upgrades', condition: (s) => s.upgrades.length >= 5, emoji: '🧪' },
  { id: 'ach_upg10', name: 'Tech Tree', description: 'Purchase 10 upgrades', condition: (s) => s.upgrades.length >= 10, emoji: '🌲' },
  { id: 'ach_upg20', name: 'Innovation Lab', description: 'Purchase 20 upgrades', condition: (s) => s.upgrades.length >= 20, emoji: '🏗️' },
  // Prestige
  { id: 'ach_prestige', name: 'Cosmic Rebirth', description: 'Prestige for the first time', condition: (s) => s.totalPrestiges >= 1, emoji: '♻️' },
  { id: 'ach_prestige3', name: 'Veteran Star', description: 'Prestige 3 times', condition: (s) => s.totalPrestiges >= 3, emoji: '⭐' },
  { id: 'ach_prestige5', name: 'Eternal Empire', description: 'Prestige 5 times', condition: (s) => s.totalPrestiges >= 5, emoji: '🏛️' },
  { id: 'ach_prestige10', name: 'Phoenix Lord', description: 'Prestige 10 times', condition: (s) => s.totalPrestiges >= 10, emoji: '🦅' },
  { id: 'ach_10stars', name: 'Star Collector', description: 'Accumulate 10 prestige stars', condition: (s) => s.prestigeStars >= 10, emoji: '🌟' },
  { id: 'ach_50stars', name: 'Constellation', description: 'Accumulate 50 prestige stars', condition: (s) => s.prestigeStars >= 50, emoji: '✨' },
  // Prestige upgrades
  { id: 'ach_pup1', name: 'Legacy Begins', description: 'Buy your first prestige upgrade', condition: (s) => (s.prestigeUpgrades || []).length >= 1, emoji: '🎖️' },
  { id: 'ach_pup5', name: 'Eternal Scholar', description: 'Buy 5 prestige upgrades', condition: (s) => (s.prestigeUpgrades || []).length >= 5, emoji: '📚' },
  // Special
  { id: 'ach_all_upgrades', name: 'Completionist', description: 'Purchase every non-global upgrade', condition: (s) => UPGRADES.filter(u => u.generatorId !== 'all').every(u => s.upgrades.includes(u.id)), emoji: '🎮' },
  { id: 'ach_1000_gens', name: 'The Thousand', description: 'Own 1000 generators total', condition: (s) => Object.values(s.generators).reduce((a, g) => a + (g?.count || 0), 0) >= 1000, emoji: '🔢' },
];

export function formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  if (num < 0) return '-' + formatNumber(-num);

  const suffixes = [
    '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
    'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NoDc', 'Vg',
    'UVg', 'DVg', 'TVg',
  ];

  if (num < 1000) return Math.floor(num).toString();

  const tier = Math.min(Math.floor(Math.log10(num) / 3), suffixes.length - 1);
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

export function getTime(generatorConfig, generatorState, prestigeUpgrades = []) {
  const count = generatorState?.count || 0;
  let time = generatorConfig.baseTime;

  for (const milestone of MILESTONES) {
    if (count >= milestone.count) {
      time /= milestone.speedMultiplier;
    }
  }

  // Prestige speed upgrades
  const speedUpg = PRESTIGE_UPGRADES.filter(u => u.type === 'speed_multiplier' && prestigeUpgrades.includes(u.id));
  for (const u of speedUpg) {
    time /= u.value;
  }

  return Math.max(time, 50);
}

export function getPrestigeStars(totalEarned) {
  if (totalEarned < 1000000) return 0;
  return Math.floor(Math.sqrt(totalEarned / 1000000));
}

export function getPrestigeMultiplier(stars, prestigeUpgrades = []) {
  let base = 1 + stars * 0.1;

  // income per star upgrade
  const perStarUpg = PRESTIGE_UPGRADES.filter(u => u.type === 'income_per_star' && prestigeUpgrades.includes(u.id));
  for (const u of perStarUpg) {
    base += stars * u.value;
  }

  // flat income multipliers
  const flatUpg = PRESTIGE_UPGRADES.filter(u => u.type === 'flat_income' && prestigeUpgrades.includes(u.id));
  for (const u of flatUpg) {
    base *= u.value;
  }

  return base;
}

export function getStartCredits(prestigeUpgrades = []) {
  let credits = 25;
  const startUpgs = PRESTIGE_UPGRADES.filter(u => u.type === 'start_credits' && prestigeUpgrades.includes(u.id));
  for (const u of startUpgs) {
    credits = Math.max(credits, u.value);
  }
  return credits;
}

export function getClickMultiplier(prestigeUpgrades = []) {
  let mult = 1;
  const clickUpgs = PRESTIGE_UPGRADES.filter(u => u.type === 'click_multiplier' && prestigeUpgrades.includes(u.id));
  for (const u of clickUpgs) {
    mult = Math.max(mult, u.value);
  }
  return mult;
}

export function getOfflineEfficiency(prestigeUpgrades = []) {
  let eff = 0.5;
  const offlineUpgs = PRESTIGE_UPGRADES.filter(u => u.type === 'offline_efficiency' && prestigeUpgrades.includes(u.id));
  for (const u of offlineUpgs) {
    eff = Math.max(eff, u.value);
  }
  return eff;
}

export function getManagerCostMultiplier(prestigeUpgrades = []) {
  return prestigeUpgrades.includes('pup_managers') ? 0.5 : 1;
}

export function getUpgradeCostMultiplier(prestigeUpgrades = []) {
  return prestigeUpgrades.includes('pup_upgrades') ? 0.5 : 1;
}

export function createInitialState(prestigeUpgrades = []) {
  const startCredits = getStartCredits(prestigeUpgrades);
  const freeGen = prestigeUpgrades.includes('pup_free_gen');
  return {
    credits: startCredits,
    totalEarned: 0,
    lifetimeEarned: 0,
    generators: freeGen ? { asteroid_mine: { count: 1, upgradeMultiplier: 1, progress: 0, running: false } } : {},
    managers: [],
    upgrades: [],
    achievements: [],
    prestigeStars: 0,
    totalPrestiges: 0,
    prestigeUpgrades: [],
    lastSaveTime: Date.now(),
    buyAmount: 1,
  };
}