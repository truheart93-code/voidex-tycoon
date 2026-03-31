// Voidex Tycoon - Game Configuration

export const GENERATORS = [
  {
    id: 'asteroid_mine',
    name: 'Asteroid Mine',
    emoji: '🪨',
    baseCost: 10,
    baseRevenue: 1,
    baseTime: 1200,
    costMultiplier: 1.15,
    description: 'Extract minerals from nearby asteroids',
    color: 'from-stone-600 to-stone-800',
    glowColor: 'shadow-stone-500/30',
    unlockAt: 0,
  },
  {
    id: 'solar_farm',
    name: 'Solar Collector',
    emoji: '☀️',
    baseCost: 150,
    baseRevenue: 10,
    baseTime: 3500,
    costMultiplier: 1.16,
    description: 'Harness energy from nearby stars',
    color: 'from-amber-500 to-orange-700',
    glowColor: 'shadow-amber-500/30',
    unlockAt: 100,
  },
  {
    id: 'ice_harvester',
    name: 'Ice Harvester',
    emoji: '🧊',
    baseCost: 2000,
    baseRevenue: 75,
    baseTime: 6000,
    costMultiplier: 1.17,
    description: 'Collect ice from comet tails',
    color: 'from-cyan-400 to-blue-700',
    glowColor: 'shadow-cyan-500/30',
    unlockAt: 1200,
  },
  {
    id: 'gas_refinery',
    name: 'Gas Refinery',
    emoji: '🌫️',
    baseCost: 30000,
    baseRevenue: 500,
    baseTime: 12000,
    costMultiplier: 1.16,
    description: 'Refine gases from giant planets',
    color: 'from-purple-500 to-indigo-800',
    glowColor: 'shadow-purple-500/30',
    unlockAt: 15000,
  },
  {
    id: 'colony_hub',
    name: 'Colony Hub',
    emoji: '🏗️',
    baseCost: 500000,
    baseRevenue: 4000,
    baseTime: 20000,
    costMultiplier: 1.15,
    description: 'Establish thriving space colonies',
    color: 'from-emerald-500 to-teal-800',
    glowColor: 'shadow-emerald-500/30',
    unlockAt: 200000,
  },
  {
    id: 'warp_gate',
    name: 'Warp Gate',
    emoji: '🌀',
    baseCost: 8000000,
    baseRevenue: 30000,
    baseTime: 40000,
    costMultiplier: 1.14,
    description: 'Open portals to distant systems',
    color: 'from-violet-500 to-fuchsia-800',
    glowColor: 'shadow-violet-500/30',
    unlockAt: 3000000,
  },
  {
    id: 'dyson_sphere',
    name: 'Dyson Sphere',
    emoji: '🔮',
    baseCost: 140000000,
    baseRevenue: 200000,
    baseTime: 80000,
    costMultiplier: 1.14,
    description: 'Encase a star in energy collectors',
    color: 'from-rose-500 to-red-900',
    glowColor: 'shadow-rose-500/30',
    unlockAt: 60000000,
  },
  {
    id: 'quantum_forge',
    name: 'Quantum Forge',
    emoji: '⚛️',
    baseCost: 2500000000,
    baseRevenue: 1500000,
    baseTime: 150000,
    costMultiplier: 1.13,
    description: 'Forge matter from quantum fluctuations',
    color: 'from-sky-400 to-blue-900',
    glowColor: 'shadow-sky-500/30',
    unlockAt: 1000000000,
  },
  {
    id: 'dimension_rift',
    name: 'Dimension Rift',
    emoji: '🌌',
    baseCost: 45000000000,
    baseRevenue: 12000000,
    baseTime: 300000,
    costMultiplier: 1.13,
    description: 'Tap into parallel dimension resources',
    color: 'from-pink-500 to-purple-900',
    glowColor: 'shadow-pink-500/30',
    unlockAt: 20000000000,
  },
  {
    id: 'cosmic_engine',
    name: 'Cosmic Engine',
    emoji: '💫',
    baseCost: 800000000000,
    baseRevenue: 100000000,
    baseTime: 480000,
    costMultiplier: 1.12,
    description: 'Harness the fundamental forces of the cosmos',
    color: 'from-yellow-400 to-amber-900',
    glowColor: 'shadow-yellow-500/30',
    unlockAt: 400000000000,
  },
  {
    id: 'void_reactor',
    name: 'Void Reactor',
    emoji: '🕳️',
    baseCost: 15000000000000,
    baseRevenue: 800000000,
    baseTime: 700000,
    costMultiplier: 1.12,
    description: 'Extract energy from the space between dimensions',
    color: 'from-slate-600 to-slate-950',
    glowColor: 'shadow-slate-500/30',
    unlockAt: 8000000000000,
  },
  {
    id: 'stellar_nursery',
    name: 'Stellar Nursery',
    emoji: '🌟',
    baseCost: 300000000000000,
    baseRevenue: 7000000000,
    baseTime: 1000000,
    costMultiplier: 1.11,
    description: 'Birth new stars and harvest their primordial energy',
    color: 'from-orange-400 to-red-800',
    glowColor: 'shadow-orange-500/30',
    unlockAt: 150000000000000,
  },
  {
    id: 'galactic_core',
    name: 'Galactic Core',
    emoji: '🌠',
    baseCost: 6000000000000000,
    baseRevenue: 60000000000,
    baseTime: 1400000,
    costMultiplier: 1.11,
    description: 'Siphon power from the supermassive black hole at a galaxy\'s heart',
    color: 'from-indigo-700 to-black',
    glowColor: 'shadow-indigo-500/30',
    unlockAt: 3000000000000000,
  },
  {
    id: 'reality_engine',
    name: 'Reality Engine',
    emoji: '🔯',
    baseCost: 120000000000000000,
    baseRevenue: 550000000000,
    baseTime: 2000000,
    costMultiplier: 1.10,
    description: 'Rewrite the laws of physics to maximize output',
    color: 'from-teal-500 to-cyan-950',
    glowColor: 'shadow-teal-500/30',
    unlockAt: 60000000000000000,
  },
  {
    id: 'universe_farm',
    name: 'Universe Farm',
    emoji: '🌍',
    baseCost: 2500000000000000000,
    baseRevenue: 5000000000000,
    baseTime: 3000000,
    costMultiplier: 1.10,
    description: 'Cultivate entire universes as resources',
    color: 'from-green-600 to-emerald-950',
    glowColor: 'shadow-green-500/30',
    unlockAt: 1200000000000000000,
  },
  {
    id: 'omniversal_nexus',
    name: 'Omniversal Nexus',
    emoji: '♾️',
    baseCost: 50000000000000000000,
    baseRevenue: 50000000000000,
    baseTime: 5000000,
    costMultiplier: 1.09,
    description: 'Connect and harvest from infinite parallel omniverses',
    color: 'from-fuchsia-600 to-pink-950',
    glowColor: 'shadow-fuchsia-500/30',
    unlockAt: 25000000000000000000,
  },
  {
    id: 'time_crystallizer',
    name: 'Time Crystallizer',
    emoji: '⏳',
    baseCost: 1e21,
    baseRevenue: 500000000000000,
    baseTime: 7200000,
    costMultiplier: 1.09,
    description: 'Crystallize moments in time to extract temporal energy',
    color: 'from-lime-500 to-green-950',
    glowColor: 'shadow-lime-500/30',
    unlockAt: 5e20,
  },
  {
    id: 'entropy_sink',
    name: 'Entropy Sink',
    emoji: '🌀',
    baseCost: 2e22,
    baseRevenue: 5000000000000000,
    baseTime: 10000000,
    costMultiplier: 1.08,
    description: 'Reverse entropy itself to power your empire eternally',
    color: 'from-red-700 to-rose-950',
    glowColor: 'shadow-red-500/30',
    unlockAt: 1e22,
  },
];

export const MANAGERS = [
  { id: 'mgr_asteroid', generatorId: 'asteroid_mine', name: 'Drill Bot', cost: 2500, emoji: '🤖' },
  { id: 'mgr_solar', generatorId: 'solar_farm', name: 'Photon AI', cost: 40000, emoji: '🧠' },
  { id: 'mgr_ice', generatorId: 'ice_harvester', name: 'Cryo Captain', cost: 600000, emoji: '👩‍🚀' },
  { id: 'mgr_gas', generatorId: 'gas_refinery', name: 'Nebula Warden', cost: 5000000, emoji: '👽' },
  { id: 'mgr_colony', generatorId: 'colony_hub', name: 'Governor Prime', cost: 80000000, emoji: '👑' },
  { id: 'mgr_warp', generatorId: 'warp_gate', name: 'Void Walker', cost: 1500000000, emoji: '🧙' },
  { id: 'mgr_dyson', generatorId: 'dyson_sphere', name: 'Star Architect', cost: 30000000000, emoji: '⭐' },
  { id: 'mgr_quantum', generatorId: 'quantum_forge', name: 'Quark Master', cost: 600000000000, emoji: '🔬' },
  { id: 'mgr_dimension', generatorId: 'dimension_rift', name: 'Rift Lord', cost: 12000000000000, emoji: '🌊' },
  { id: 'mgr_cosmic', generatorId: 'cosmic_engine', name: 'Cosmic Sage', cost: 250000000000000, emoji: '🧿' },
  { id: 'mgr_void', generatorId: 'void_reactor', name: 'Void Shepherd', cost: 5000000000000000, emoji: '🌑' },
  { id: 'mgr_stellar', generatorId: 'stellar_nursery', name: 'Star Midwife', cost: 100000000000000000, emoji: '🌠' },
  { id: 'mgr_galactic', generatorId: 'galactic_core', name: 'Gravity Bender', cost: 2000000000000000000, emoji: '🕹️' },
  { id: 'mgr_reality', generatorId: 'reality_engine', name: 'Reality Hacker', cost: 4e19, emoji: '🪄' },
  { id: 'mgr_universe', generatorId: 'universe_farm', name: 'Omni Creator', cost: 8e20, emoji: '🌌' },
  { id: 'mgr_nexus', generatorId: 'omniversal_nexus', name: 'Nexus Weaver', cost: 2e22, emoji: '🕸️' },
  { id: 'mgr_time', generatorId: 'time_crystallizer', name: 'Chrono Master', cost: 5e23, emoji: '⌚' },
  { id: 'mgr_entropy', generatorId: 'entropy_sink', name: 'Chaos Lord', cost: 1e25, emoji: '💀' },
];

export const UPGRADES = [
  // Asteroid Mine - 6 tiers
  { id: 'upg_ast_1', generatorId: 'asteroid_mine', name: 'Titanium Drills', cost: 1000, multiplier: 2, requiredCount: 10, emoji: '⛏️' },
  { id: 'upg_ast_2', generatorId: 'asteroid_mine', name: 'Deep Core Mining', cost: 15000, multiplier: 3, requiredCount: 25, emoji: '💎' },
  { id: 'upg_ast_3', generatorId: 'asteroid_mine', name: 'Nano Extractors', cost: 500000, multiplier: 3, requiredCount: 50, emoji: '🔩' },
  { id: 'upg_ast_4', generatorId: 'asteroid_mine', name: 'Quantum Drills', cost: 50000000, multiplier: 3, requiredCount: 100, emoji: '✨' },
  { id: 'upg_ast_5', generatorId: 'asteroid_mine', name: 'Singularity Bore', cost: 10000000000, multiplier: 5, requiredCount: 200, emoji: '🌀' },
  { id: 'upg_ast_6', generatorId: 'asteroid_mine', name: 'Void Drill Array', cost: 5000000000000, multiplier: 5, requiredCount: 400, emoji: '🕳️' },

  // Solar Farm - 6 tiers
  { id: 'upg_sol_1', generatorId: 'solar_farm', name: 'Photon Amplifier', cost: 8000, multiplier: 2, requiredCount: 10, emoji: '🔆' },
  { id: 'upg_sol_2', generatorId: 'solar_farm', name: 'Stellar Mirror Array', cost: 150000, multiplier: 3, requiredCount: 25, emoji: '🪞' },
  { id: 'upg_sol_3', generatorId: 'solar_farm', name: 'Fusion Lens', cost: 8000000, multiplier: 3, requiredCount: 50, emoji: '🔭' },
  { id: 'upg_sol_4', generatorId: 'solar_farm', name: 'Plasma Concentrator', cost: 500000000, multiplier: 3, requiredCount: 100, emoji: '💥' },
  { id: 'upg_sol_5', generatorId: 'solar_farm', name: 'Solar Singularity', cost: 100000000000, multiplier: 5, requiredCount: 200, emoji: '⭐' },
  { id: 'upg_sol_6', generatorId: 'solar_farm', name: 'Star Engine Core', cost: 50000000000000, multiplier: 5, requiredCount: 400, emoji: '🌞' },

  // Ice Harvester - 6 tiers
  { id: 'upg_ice_1', generatorId: 'ice_harvester', name: 'Cryo Compressor', cost: 80000, multiplier: 2, requiredCount: 10, emoji: '❄️' },
  { id: 'upg_ice_2', generatorId: 'ice_harvester', name: 'Absolute Zero Tech', cost: 2000000, multiplier: 3, requiredCount: 25, emoji: '🥶' },
  { id: 'upg_ice_3', generatorId: 'ice_harvester', name: 'Comet Siphon', cost: 100000000, multiplier: 3, requiredCount: 50, emoji: '☄️' },
  { id: 'upg_ice_4', generatorId: 'ice_harvester', name: 'Dark Matter Ice', cost: 8000000000, multiplier: 3, requiredCount: 100, emoji: '🌊' },
  { id: 'upg_ice_5', generatorId: 'ice_harvester', name: 'Quantum Frost', cost: 2000000000000, multiplier: 5, requiredCount: 200, emoji: '💠' },
  { id: 'upg_ice_6', generatorId: 'ice_harvester', name: 'Absolute Void Cold', cost: 1000000000000000, multiplier: 5, requiredCount: 400, emoji: '🧊' },

  // Gas Refinery - 6 tiers
  { id: 'upg_gas_1', generatorId: 'gas_refinery', name: 'Fusion Catalyst', cost: 800000, multiplier: 2, requiredCount: 10, emoji: '⚗️' },
  { id: 'upg_gas_2', generatorId: 'gas_refinery', name: 'Plasma Separator', cost: 20000000, multiplier: 3, requiredCount: 25, emoji: '🧪' },
  { id: 'upg_gas_3', generatorId: 'gas_refinery', name: 'Nebula Concentrator', cost: 1000000000, multiplier: 3, requiredCount: 50, emoji: '🌫️' },
  { id: 'upg_gas_4', generatorId: 'gas_refinery', name: 'Exotic Matter Refiner', cost: 80000000000, multiplier: 3, requiredCount: 100, emoji: '🔮' },
  { id: 'upg_gas_5', generatorId: 'gas_refinery', name: 'Dark Energy Tap', cost: 20000000000000, multiplier: 5, requiredCount: 200, emoji: '🌌' },
  { id: 'upg_gas_6', generatorId: 'gas_refinery', name: 'Nebula Singularity', cost: 10000000000000000, multiplier: 5, requiredCount: 400, emoji: '💜' },

  // Colony Hub - 6 tiers
  { id: 'upg_col_1', generatorId: 'colony_hub', name: 'Terraformer', cost: 8000000, multiplier: 2, requiredCount: 10, emoji: '🌱' },
  { id: 'upg_col_2', generatorId: 'colony_hub', name: 'Mega Arcology', cost: 200000000, multiplier: 3, requiredCount: 25, emoji: '🏙️' },
  { id: 'upg_col_3', generatorId: 'colony_hub', name: 'Planet Shield', cost: 15000000000, multiplier: 3, requiredCount: 50, emoji: '🛡️' },
  { id: 'upg_col_4', generatorId: 'colony_hub', name: 'Dyno-Civilization', cost: 1000000000000, multiplier: 3, requiredCount: 100, emoji: '🌍' },
  { id: 'upg_col_5', generatorId: 'colony_hub', name: 'Galactic Empire', cost: 300000000000000, multiplier: 5, requiredCount: 200, emoji: '🏛️' },
  { id: 'upg_col_6', generatorId: 'colony_hub', name: 'Universal Dominion', cost: 1e17, multiplier: 5, requiredCount: 400, emoji: '👑' },

  // Warp Gate - 5 tiers
  { id: 'upg_warp_1', generatorId: 'warp_gate', name: 'Hyperdrive Core', cost: 80000000, multiplier: 2, requiredCount: 10, emoji: '🚀' },
  { id: 'upg_warp_2', generatorId: 'warp_gate', name: 'Stable Wormhole', cost: 3000000000, multiplier: 3, requiredCount: 25, emoji: '🌀' },
  { id: 'upg_warp_3', generatorId: 'warp_gate', name: 'Dimension Key', cost: 200000000000, multiplier: 3, requiredCount: 50, emoji: '🗝️' },
  { id: 'upg_warp_4', generatorId: 'warp_gate', name: 'Hyperspace Fold', cost: 20000000000000, multiplier: 5, requiredCount: 100, emoji: '🌊' },
  { id: 'upg_warp_5', generatorId: 'warp_gate', name: 'Warp Singularity', cost: 5000000000000000, multiplier: 5, requiredCount: 200, emoji: '♾️' },

  // Dyson Sphere - 5 tiers
  { id: 'upg_dys_1', generatorId: 'dyson_sphere', name: 'Supernova Lens', cost: 1000000000, multiplier: 2, requiredCount: 10, emoji: '🔭' },
  { id: 'upg_dys_2', generatorId: 'dyson_sphere', name: 'Star Shielding', cost: 50000000000, multiplier: 3, requiredCount: 25, emoji: '⭐' },
  { id: 'upg_dys_3', generatorId: 'dyson_sphere', name: 'Binary Capture', cost: 5000000000000, multiplier: 3, requiredCount: 50, emoji: '✨' },
  { id: 'upg_dys_4', generatorId: 'dyson_sphere', name: 'Neutron Shell', cost: 500000000000000, multiplier: 5, requiredCount: 100, emoji: '💥' },
  { id: 'upg_dys_5', generatorId: 'dyson_sphere', name: 'Star Cluster Array', cost: 1e17, multiplier: 5, requiredCount: 200, emoji: '🌟' },

  // Quantum Forge - 5 tiers
  { id: 'upg_qnt_1', generatorId: 'quantum_forge', name: 'String Theory Module', cost: 20000000000, multiplier: 2, requiredCount: 10, emoji: '🧬' },
  { id: 'upg_qnt_2', generatorId: 'quantum_forge', name: 'Higgs Boson Array', cost: 800000000000, multiplier: 3, requiredCount: 25, emoji: '⚛️' },
  { id: 'upg_qnt_3', generatorId: 'quantum_forge', name: 'Matter Printer', cost: 60000000000000, multiplier: 3, requiredCount: 50, emoji: '🖨️' },
  { id: 'upg_qnt_4', generatorId: 'quantum_forge', name: 'Quantum Singularity', cost: 5000000000000000, multiplier: 5, requiredCount: 100, emoji: '🔮' },
  { id: 'upg_qnt_5', generatorId: 'quantum_forge', name: 'Planck Scale Extractor', cost: 2e18, multiplier: 5, requiredCount: 200, emoji: '🔬' },

  // Dimension Rift - 5 tiers
  { id: 'upg_dim_1', generatorId: 'dimension_rift', name: 'Multiverse Key', cost: 500000000000, multiplier: 2, requiredCount: 10, emoji: '🗝️' },
  { id: 'upg_dim_2', generatorId: 'dimension_rift', name: 'Reality Shard', cost: 30000000000000, multiplier: 3, requiredCount: 25, emoji: '💠' },
  { id: 'upg_dim_3', generatorId: 'dimension_rift', name: 'Omega Conduit', cost: 2000000000000000, multiplier: 3, requiredCount: 50, emoji: '🌌' },
  { id: 'upg_dim_4', generatorId: 'dimension_rift', name: 'Parallel Siphon', cost: 2e17, multiplier: 5, requiredCount: 100, emoji: '🔄' },
  { id: 'upg_dim_5', generatorId: 'dimension_rift', name: 'Dimensional Core', cost: 8e19, multiplier: 5, requiredCount: 200, emoji: '🌀' },

  // Cosmic Engine - 4 tiers
  { id: 'upg_cos_1', generatorId: 'cosmic_engine', name: 'Big Bang Spark', cost: 10000000000000, multiplier: 2, requiredCount: 10, emoji: '✨' },
  { id: 'upg_cos_2', generatorId: 'cosmic_engine', name: 'Entropy Reversal', cost: 500000000000000, multiplier: 3, requiredCount: 25, emoji: '🔄' },
  { id: 'upg_cos_3', generatorId: 'cosmic_engine', name: 'Cosmic Singularity', cost: 4e16, multiplier: 3, requiredCount: 50, emoji: '💫' },
  { id: 'upg_cos_4', generatorId: 'cosmic_engine', name: 'Universal Force', cost: 4e19, multiplier: 5, requiredCount: 100, emoji: '⚡' },

  // Void Reactor - 4 tiers
  { id: 'upg_void_1', generatorId: 'void_reactor', name: 'Dark Energy Tap', cost: 200000000000000, multiplier: 2, requiredCount: 10, emoji: '🕳️' },
  { id: 'upg_void_2', generatorId: 'void_reactor', name: 'Void Stabilizer', cost: 10000000000000000, multiplier: 3, requiredCount: 25, emoji: '⚫' },
  { id: 'upg_void_3', generatorId: 'void_reactor', name: 'Null Field Matrix', cost: 8e18, multiplier: 3, requiredCount: 50, emoji: '🌑' },
  { id: 'upg_void_4', generatorId: 'void_reactor', name: 'Entropic Collapse', cost: 5e21, multiplier: 5, requiredCount: 100, emoji: '💀' },

  // Stellar Nursery - 4 tiers
  { id: 'upg_stellar_1', generatorId: 'stellar_nursery', name: 'Star Seed', cost: 3000000000000000, multiplier: 2, requiredCount: 10, emoji: '🌱' },
  { id: 'upg_stellar_2', generatorId: 'stellar_nursery', name: 'Supergiant Catalyst', cost: 2e17, multiplier: 3, requiredCount: 25, emoji: '🌟' },
  { id: 'upg_stellar_3', generatorId: 'stellar_nursery', name: 'Neutron Star Cradle', cost: 1e20, multiplier: 3, requiredCount: 50, emoji: '💥' },
  { id: 'upg_stellar_4', generatorId: 'stellar_nursery', name: 'Hypernova Forge', cost: 8e22, multiplier: 5, requiredCount: 100, emoji: '🌠' },

  // Galactic Core - 4 tiers
  { id: 'upg_gal_1', generatorId: 'galactic_core', name: 'Event Horizon Tap', cost: 5e16, multiplier: 2, requiredCount: 10, emoji: '🌑' },
  { id: 'upg_gal_2', generatorId: 'galactic_core', name: 'Quasar Lens', cost: 3e18, multiplier: 3, requiredCount: 25, emoji: '🌠' },
  { id: 'upg_gal_3', generatorId: 'galactic_core', name: 'Galactic Jet Harness', cost: 2e21, multiplier: 3, requiredCount: 50, emoji: '⚡' },
  { id: 'upg_gal_4', generatorId: 'galactic_core', name: 'Singularity Siphon', cost: 1e24, multiplier: 5, requiredCount: 100, emoji: '🌌' },

  // Reality Engine - 3 tiers
  { id: 'upg_real_1', generatorId: 'reality_engine', name: 'Physics Override', cost: 1e18, multiplier: 2, requiredCount: 10, emoji: '🔯' },
  { id: 'upg_real_2', generatorId: 'reality_engine', name: 'Infinity Loop', cost: 8e20, multiplier: 3, requiredCount: 25, emoji: '♾️' },
  { id: 'upg_real_3', generatorId: 'reality_engine', name: 'Causality Breach', cost: 5e23, multiplier: 5, requiredCount: 50, emoji: '🌀' },

  // Universe Farm - 3 tiers
  { id: 'upg_uni_1', generatorId: 'universe_farm', name: 'Multiverse Plow', cost: 2e19, multiplier: 2, requiredCount: 10, emoji: '🌍' },
  { id: 'upg_uni_2', generatorId: 'universe_farm', name: 'Omniversal Harvest', cost: 1e22, multiplier: 3, requiredCount: 25, emoji: '🌌' },
  { id: 'upg_uni_3', generatorId: 'universe_farm', name: 'Creation Engine', cost: 8e24, multiplier: 5, requiredCount: 50, emoji: '🌱' },

  // Omniversal Nexus - 3 tiers
  { id: 'upg_nex_1', generatorId: 'omniversal_nexus', name: 'Omniverse Thread', cost: 5e20, multiplier: 2, requiredCount: 10, emoji: '🕸️' },
  { id: 'upg_nex_2', generatorId: 'omniversal_nexus', name: 'Infinite Loop Gate', cost: 3e23, multiplier: 3, requiredCount: 25, emoji: '♾️' },
  { id: 'upg_nex_3', generatorId: 'omniversal_nexus', name: 'Omni Conduit', cost: 2e26, multiplier: 5, requiredCount: 50, emoji: '🔮' },

  // Time Crystallizer - 3 tiers
  { id: 'upg_time_1', generatorId: 'time_crystallizer', name: 'Temporal Echo', cost: 1e22, multiplier: 2, requiredCount: 10, emoji: '⏳' },
  { id: 'upg_time_2', generatorId: 'time_crystallizer', name: 'Chrono Compressor', cost: 8e24, multiplier: 3, requiredCount: 25, emoji: '⌛' },
  { id: 'upg_time_3', generatorId: 'time_crystallizer', name: 'Eternity Tap', cost: 5e27, multiplier: 5, requiredCount: 50, emoji: '🌀' },

  // Entropy Sink - 2 tiers
  { id: 'upg_ent_1', generatorId: 'entropy_sink', name: 'Chaos Capacitor', cost: 2e23, multiplier: 2, requiredCount: 10, emoji: '🌪️' },
  { id: 'upg_ent_2', generatorId: 'entropy_sink', name: 'Omega Reversal', cost: 1e26, multiplier: 5, requiredCount: 25, emoji: '💀' },

  // Global upgrades - 10 tiers
  { id: 'upg_global_1', generatorId: 'all', name: 'Galactic Trade Network', cost: 500000, multiplier: 1.5, requiredCount: 0, emoji: '🌐' },
  { id: 'upg_global_2', generatorId: 'all', name: 'Wormhole Express', cost: 50000000, multiplier: 2, requiredCount: 0, emoji: '🕳️' },
  { id: 'upg_global_3', generatorId: 'all', name: 'Cosmic Resonance', cost: 5000000000, multiplier: 2, requiredCount: 0, emoji: '🎵' },
  { id: 'upg_global_4', generatorId: 'all', name: 'Universal Constants Hacked', cost: 500000000000, multiplier: 2, requiredCount: 0, emoji: '💻' },
  { id: 'upg_global_5', generatorId: 'all', name: 'Omnidimensional Banking', cost: 50000000000000, multiplier: 2, requiredCount: 0, emoji: '🏦' },
  { id: 'upg_global_6', generatorId: 'all', name: 'Temporal Arbitrage', cost: 5000000000000000, multiplier: 2, requiredCount: 0, emoji: '⏳' },
  { id: 'upg_global_7', generatorId: 'all', name: 'Entropy Reversal Engine', cost: 5e17, multiplier: 3, requiredCount: 0, emoji: '🔄' },
  { id: 'upg_global_8', generatorId: 'all', name: 'Multiverse Syndicate', cost: 5e19, multiplier: 3, requiredCount: 0, emoji: '🕸️' },
  { id: 'upg_global_9', generatorId: 'all', name: 'Omniversal Accord', cost: 5e22, multiplier: 4, requiredCount: 0, emoji: '🤝' },
  { id: 'upg_global_10', generatorId: 'all', name: 'God Mode Unlocked', cost: 5e25, multiplier: 5, requiredCount: 0, emoji: '⚡' },
];

export const PRESTIGE_UPGRADES = [
  // Starting resources
  { id: 'pup_start_cash', name: 'Head Start', description: 'Begin each run with 50,000 credits', cost: 1, emoji: '💰', type: 'start_credits', value: 50000 },
  { id: 'pup_start_cash2', name: 'Silver Spoon', description: 'Begin each run with 10 million credits', cost: 10, emoji: '🥈', type: 'start_credits', value: 10000000, requires: 'pup_start_cash' },
  { id: 'pup_start_cash3', name: 'Golden Cradle', description: 'Begin each run with 10 billion credits', cost: 200, emoji: '🥇', type: 'start_credits', value: 10000000000, requires: 'pup_start_cash2' },
  { id: 'pup_start_cash4', name: 'Cosmic Inheritance', description: 'Begin each run with 10 trillion credits', cost: 25000, emoji: '💎', type: 'start_credits', value: 10000000000000, requires: 'pup_start_cash3' },
  // Offline earnings
  { id: 'pup_offline', name: 'Dream Harvester', description: 'Offline earnings: 75%', cost: 3, emoji: '😴', type: 'offline_efficiency', value: 0.75 },
  { id: 'pup_offline2', name: 'Lucid Operator', description: 'Offline earnings: 100%', cost: 50, emoji: '💤', type: 'offline_efficiency', value: 1.0, requires: 'pup_offline' },
  { id: 'pup_offline3', name: 'Time Banker', description: 'Offline earnings: 150% (time debt!)', cost: 10000, emoji: '⏰', type: 'offline_efficiency', value: 1.5, requires: 'pup_offline2' },
  // Income multipliers
  { id: 'pup_income1', name: 'Star Power', description: '+30% income per prestige star', cost: 2, emoji: '⭐', type: 'income_per_star', value: 0.3 },
  { id: 'pup_income2', name: 'Nebula Surge', description: 'All income x1.5 permanently', cost: 8, emoji: '🌀', type: 'flat_income', value: 1.5 },
  { id: 'pup_income3', name: 'Galactic Surge', description: 'All income x2 permanently', cost: 80, emoji: '⚡', type: 'flat_income', value: 2.0, requires: 'pup_income2' },
  { id: 'pup_income4', name: 'Cosmic Surge', description: 'All income x3 permanently', cost: 2000, emoji: '💥', type: 'flat_income', value: 3.0, requires: 'pup_income3' },
  { id: 'pup_income5', name: 'Omnipotent Flow', description: 'All income x5 permanently', cost: 1000000, emoji: '♾️', type: 'flat_income', value: 5.0, requires: 'pup_income4' },
  // Click multipliers
  { id: 'pup_click', name: 'Precision Strike', description: 'Manual taps earn 3x', cost: 1, emoji: '👆', type: 'click_multiplier', value: 3 },
  { id: 'pup_click2', name: 'Hyperfinger', description: 'Manual taps earn 8x', cost: 15, emoji: '🖐️', type: 'click_multiplier', value: 8, requires: 'pup_click' },
  { id: 'pup_click3', name: 'Cyberhand', description: 'Manual taps earn 20x', cost: 3000, emoji: '🦾', type: 'click_multiplier', value: 20, requires: 'pup_click2' },
  // Discounts
  { id: 'pup_managers', name: 'Corporate Network', description: 'Managers cost 50% less', cost: 5, emoji: '📊', type: 'manager_discount', value: 0.5 },
  { id: 'pup_upgrades', name: 'R&D Budget', description: 'Upgrades cost 50% less', cost: 5, emoji: '🔬', type: 'upgrade_discount', value: 0.5 },
  { id: 'pup_gen_discount', name: 'Bulk Deal', description: 'Generators cost 20% less', cost: 15, emoji: '🏷️', type: 'generator_discount', value: 0.8 },
  { id: 'pup_gen_discount2', name: 'Supply Chain Master', description: 'Generators cost 35% less', cost: 5000, emoji: '📦', type: 'generator_discount', value: 0.65, requires: 'pup_gen_discount' },
  // Speed upgrades
  { id: 'pup_time1', name: 'Overclock', description: 'All generators run 1.5x faster', cost: 4, emoji: '⏩', type: 'speed_multiplier', value: 1.5 },
  { id: 'pup_time2', name: 'Quantum Speed', description: 'All generators run 2x faster', cost: 100, emoji: '💨', type: 'speed_multiplier', value: 2.0, requires: 'pup_time1' },
  { id: 'pup_time3', name: 'Temporal Rush', description: 'All generators run 3x faster', cost: 50000, emoji: '🚀', type: 'speed_multiplier', value: 3.0, requires: 'pup_time2' },
  // Free generators
  { id: 'pup_free_gen', name: 'Inheritance', description: 'Start with 1 free Asteroid Mine', cost: 1, emoji: '🎁', type: 'free_generator', value: 1 },
  { id: 'pup_free_gen2', name: 'Estate', description: 'Start with 5 free Asteroid Mines', cost: 8, emoji: '🏠', type: 'free_generator', value: 5, requires: 'pup_free_gen' },
  // Prestige stars bonus
  { id: 'pup_star_boost', name: 'Stellar Ambition', description: 'Earn 25% more prestige stars on rebirth', cost: 20, emoji: '🌟', type: 'star_bonus', value: 0.25 },
  { id: 'pup_star_boost2', name: 'Star Magnate', description: 'Earn 50% more prestige stars on rebirth', cost: 100000, emoji: '✨', type: 'star_bonus', value: 0.5, requires: 'pup_star_boost' },
  // Global passive bonus
  { id: 'pup_auto_start', name: 'Autopilot', description: 'All owned managers activate immediately on rebirth', cost: 10, emoji: '🤖', type: 'auto_start', value: 1 },
];

export const MILESTONES = [
  { count: 10, speedMultiplier: 2 },
  { count: 25, speedMultiplier: 2 },
  { count: 50, speedMultiplier: 2 },
  { count: 100, speedMultiplier: 2 },
  { count: 150, speedMultiplier: 1.5 },
  { count: 200, speedMultiplier: 2 },
  { count: 300, speedMultiplier: 1.5 },
  { count: 400, speedMultiplier: 2 },
  { count: 500, speedMultiplier: 2 },
];

export const ACHIEVEMENTS = [
  // Ownership basics
  { id: 'ach_first', name: 'First Steps', description: 'Buy your first generator', condition: (s) => Object.values(s.generators).some(g => g.count > 0), emoji: '🎯' },
  { id: 'ach_5gen', name: 'Diversified', description: 'Own 5 different generator types', condition: (s) => Object.values(s.generators).filter(g => g.count > 0).length >= 5, emoji: '🗂️' },
  { id: 'ach_10gen', name: 'Empire Builder', description: 'Own 10 different generator types', condition: (s) => Object.values(s.generators).filter(g => g.count > 0).length >= 10, emoji: '🏰' },
  { id: 'ach_all_gen', name: 'Full Spectrum', description: 'Own at least 1 of every generator', condition: (s) => GENERATORS.every(g => (s.generators[g.id]?.count || 0) > 0), emoji: '🌈' },
  // Credit milestones
  { id: 'ach_500', name: 'Getting Started', description: 'Earn 500 credits total', condition: (s) => s.totalEarned >= 500, emoji: '🪙' },
  { id: 'ach_5k', name: 'Pocket Change', description: 'Earn 5,000 credits total', condition: (s) => s.totalEarned >= 5000, emoji: '💵' },
  { id: 'ach_50k', name: 'Hustler', description: 'Earn 50,000 credits total', condition: (s) => s.totalEarned >= 50000, emoji: '💸' },
  { id: 'ach_500k', name: 'Space Mogul', description: 'Earn 500,000 credits total', condition: (s) => s.totalEarned >= 500000, emoji: '💰' },
  { id: 'ach_5m', name: 'Stellar Magnate', description: 'Earn 5 million credits', condition: (s) => s.totalEarned >= 5000000, emoji: '🏆' },
  { id: 'ach_50m', name: 'Star Baron', description: 'Earn 50 million credits', condition: (s) => s.totalEarned >= 50000000, emoji: '⭐' },
  { id: 'ach_500m', name: 'Galactic Titan', description: 'Earn 500 million credits', condition: (s) => s.totalEarned >= 500000000, emoji: '👾' },
  { id: 'ach_5b', name: 'Cosmic Billionaire', description: 'Earn 5 billion credits', condition: (s) => s.totalEarned >= 5000000000, emoji: '💎' },
  { id: 'ach_50b', name: 'Galactic Mogul', description: 'Earn 50 billion credits', condition: (s) => s.totalEarned >= 50000000000, emoji: '🌟' },
  { id: 'ach_500b', name: 'Void Plutocrat', description: 'Earn 500 billion credits', condition: (s) => s.totalEarned >= 500000000000, emoji: '🌌' },
  { id: 'ach_5t', name: 'Cosmic Baron', description: 'Earn 5 trillion credits', condition: (s) => s.totalEarned >= 5000000000000, emoji: '🔮' },
  { id: 'ach_50t', name: 'Dimensional Tycoon', description: 'Earn 50 trillion credits', condition: (s) => s.totalEarned >= 50000000000000, emoji: '🌀' },
  { id: 'ach_1qa', name: 'Universal Tycoon', description: 'Earn 1 quadrillion credits', condition: (s) => s.totalEarned >= 1000000000000000, emoji: '🔯' },
  { id: 'ach_1qi', name: 'Omni Billionaire', description: 'Earn 1 quintillion credits', condition: (s) => s.totalEarned >= 1e18, emoji: '♾️' },
  { id: 'ach_1sx', name: 'Reality Tycoon', description: 'Earn 1 sextillion credits', condition: (s) => s.totalEarned >= 1e21, emoji: '🌌' },
  { id: 'ach_1sp', name: 'Omniversal Baron', description: 'Earn 1 septillion credits', condition: (s) => s.totalEarned >= 1e24, emoji: '💫' },
  // Generator counts - Asteroid Mine
  { id: 'ach_10_ast', name: 'Rock Hound', description: 'Own 10 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 10, emoji: '🪨' },
  { id: 'ach_25_ast', name: 'Mining Op', description: 'Own 25 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 25, emoji: '⛏️' },
  { id: 'ach_50_ast', name: 'Mining Corp', description: 'Own 50 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 50, emoji: '🏗️' },
  { id: 'ach_100_ast', name: 'Mining Baron', description: 'Own 100 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 100, emoji: '💎' },
  { id: 'ach_200_ast', name: 'Rock Empire', description: 'Own 200 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 200, emoji: '🌋' },
  { id: 'ach_400_ast', name: 'Asteroid Overlord', description: 'Own 400 Asteroid Mines', condition: (s) => (s.generators.asteroid_mine?.count || 0) >= 400, emoji: '🪐' },
  // Generator counts - any
  { id: 'ach_50_any', name: 'Industrialist', description: 'Own 50 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 50), emoji: '🔧' },
  { id: 'ach_100_any', name: 'Century Club', description: 'Own 100 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 100), emoji: '💯' },
  { id: 'ach_200_any', name: 'Industrial Giant', description: 'Own 200 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 200), emoji: '🏭' },
  { id: 'ach_400_any', name: 'Megacorp', description: 'Own 400 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 400), emoji: '🌐' },
  { id: 'ach_500_any', name: 'Unstoppable', description: 'Own 500 of any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 500), emoji: '🚂' },
  // Total generators
  { id: 'ach_100_total', name: 'Hundred Strong', description: 'Own 100 generators total', condition: (s) => Object.values(s.generators).reduce((a, g) => a + (g?.count || 0), 0) >= 100, emoji: '💪' },
  { id: 'ach_500_total', name: 'Army of Machines', description: 'Own 500 generators total', condition: (s) => Object.values(s.generators).reduce((a, g) => a + (g?.count || 0), 0) >= 500, emoji: '🤖' },
  { id: 'ach_1000_gens', name: 'The Thousand', description: 'Own 1,000 generators total', condition: (s) => Object.values(s.generators).reduce((a, g) => a + (g?.count || 0), 0) >= 1000, emoji: '🔢' },
  { id: 'ach_2500_gens', name: 'Endless Fleet', description: 'Own 2,500 generators total', condition: (s) => Object.values(s.generators).reduce((a, g) => a + (g?.count || 0), 0) >= 2500, emoji: '🛸' },
  { id: 'ach_5000_gens', name: 'Infinite Machine', description: 'Own 5,000 generators total', condition: (s) => Object.values(s.generators).reduce((a, g) => a + (g?.count || 0), 0) >= 5000, emoji: '⚙️' },
  // Managers
  { id: 'ach_mgr1', name: 'First Hire', description: 'Hire your first manager', condition: (s) => s.managers.length >= 1, emoji: '🤝' },
  { id: 'ach_mgr3', name: 'Delegation Master', description: 'Hire 3 managers', condition: (s) => s.managers.length >= 3, emoji: '📋' },
  { id: 'ach_mgr5', name: 'Executive', description: 'Hire 5 managers', condition: (s) => s.managers.length >= 5, emoji: '👔' },
  { id: 'ach_mgr8', name: 'Corporate Suite', description: 'Hire 8 managers', condition: (s) => s.managers.length >= 8, emoji: '🏢' },
  { id: 'ach_mgr12', name: 'Board of Directors', description: 'Hire 12 managers', condition: (s) => s.managers.length >= 12, emoji: '🎩' },
  { id: 'ach_mgr_all', name: 'Full Roster', description: 'Hire all managers', condition: (s) => s.managers.length >= MANAGERS.length, emoji: '👥' },
  // Speed milestones
  { id: 'ach_speed', name: 'Speed Demon', description: 'Reach 10-unit milestone on any generator', condition: (s) => Object.values(s.generators).some(g => g.count >= 10), emoji: '⚡' },
  { id: 'ach_fast', name: 'Hyperspeed', description: 'Reach the 100-unit milestone', condition: (s) => Object.values(s.generators).some(g => g.count >= 100), emoji: '💨' },
  { id: 'ach_ludicrous', name: 'Ludicrous Speed', description: 'Reach the 400-unit milestone', condition: (s) => Object.values(s.generators).some(g => g.count >= 400), emoji: '🌪️' },
  // Upgrades
  { id: 'ach_upg1', name: 'Research Begins', description: 'Purchase your first upgrade', condition: (s) => s.upgrades.length >= 1, emoji: '🔬' },
  { id: 'ach_upg5', name: 'Science Dept', description: 'Purchase 5 upgrades', condition: (s) => s.upgrades.length >= 5, emoji: '🧪' },
  { id: 'ach_upg10', name: 'Tech Tree', description: 'Purchase 10 upgrades', condition: (s) => s.upgrades.length >= 10, emoji: '🌲' },
  { id: 'ach_upg20', name: 'Innovation Lab', description: 'Purchase 20 upgrades', condition: (s) => s.upgrades.length >= 20, emoji: '🏗️' },
  { id: 'ach_upg35', name: 'R&D Giant', description: 'Purchase 35 upgrades', condition: (s) => s.upgrades.length >= 35, emoji: '🔭' },
  { id: 'ach_upg50', name: 'Tech Empire', description: 'Purchase 50 upgrades', condition: (s) => s.upgrades.length >= 50, emoji: '💡' },
  // Prestige
  { id: 'ach_prestige', name: 'Cosmic Rebirth', description: 'Prestige for the first time', condition: (s) => s.totalPrestiges >= 1, emoji: '♻️' },
  { id: 'ach_prestige3', name: 'Veteran Star', description: 'Prestige 3 times', condition: (s) => s.totalPrestiges >= 3, emoji: '⭐' },
  { id: 'ach_prestige5', name: 'Eternal Empire', description: 'Prestige 5 times', condition: (s) => s.totalPrestiges >= 5, emoji: '🏛️' },
  { id: 'ach_prestige10', name: 'Phoenix Lord', description: 'Prestige 10 times', condition: (s) => s.totalPrestiges >= 10, emoji: '🦅' },
  { id: 'ach_prestige20', name: 'Transcendent', description: 'Prestige 20 times', condition: (s) => s.totalPrestiges >= 20, emoji: '🌟' },
  { id: 'ach_prestige50', name: 'Eternal Being', description: 'Prestige 50 times', condition: (s) => s.totalPrestiges >= 50, emoji: '♾️' },
  { id: 'ach_5stars', name: 'Star Hoarder', description: 'Accumulate 5 prestige stars', condition: (s) => s.prestigeStars >= 5, emoji: '⭐' },
  { id: 'ach_10stars', name: 'Star Collector', description: 'Accumulate 10 prestige stars', condition: (s) => s.prestigeStars >= 10, emoji: '🌟' },
  { id: 'ach_25stars', name: 'Star Lord', description: 'Accumulate 25 prestige stars', condition: (s) => s.prestigeStars >= 25, emoji: '💫' },
  { id: 'ach_50stars', name: 'Constellation', description: 'Accumulate 50 prestige stars', condition: (s) => s.prestigeStars >= 50, emoji: '✨' },
  { id: 'ach_100stars', name: 'Galaxy Heart', description: 'Accumulate 100 prestige stars', condition: (s) => s.prestigeStars >= 100, emoji: '🌌' },
  // Prestige upgrades
  { id: 'ach_pup1', name: 'Legacy Begins', description: 'Buy your first prestige upgrade', condition: (s) => (s.prestigeUpgrades || []).length >= 1, emoji: '🎖️' },
  { id: 'ach_pup5', name: 'Eternal Scholar', description: 'Buy 5 prestige upgrades', condition: (s) => (s.prestigeUpgrades || []).length >= 5, emoji: '📚' },
  { id: 'ach_pup10', name: 'Cosmic Scholar', description: 'Buy 10 prestige upgrades', condition: (s) => (s.prestigeUpgrades || []).length >= 10, emoji: '🎓' },
  { id: 'ach_pup_all', name: 'Omniscient', description: 'Buy every prestige upgrade', condition: (s) => (s.prestigeUpgrades || []).length >= PRESTIGE_UPGRADES.length, emoji: '🧠' },
  // Special
  { id: 'ach_all_upgrades', name: 'Completionist', description: 'Purchase every non-global upgrade', condition: (s) => UPGRADES.filter(u => u.generatorId !== 'all').every(u => s.upgrades.includes(u.id)), emoji: '🎮' },
  { id: 'ach_all_globals', name: 'Universal Law', description: 'Purchase all global upgrades', condition: (s) => UPGRADES.filter(u => u.generatorId === 'all').every(u => s.upgrades.includes(u.id)), emoji: '🌐' },
  { id: 'ach_passive_1m', name: 'Money Machine', description: 'Earn 1 million credits per second passively', condition: (s, cps) => (cps || 0) >= 1000000, emoji: '🏧' },
  { id: 'ach_passive_1b', name: 'Infinite Tap', description: 'Earn 1 billion credits per second passively', condition: (s, cps) => (cps || 0) >= 1000000000, emoji: '💎' },
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

  const speedUpg = PRESTIGE_UPGRADES.filter(u => u.type === 'speed_multiplier' && prestigeUpgrades.includes(u.id));
  for (const u of speedUpg) {
    time /= u.value;
  }

  return Math.max(time, 50);
}

export function getPrestigeStars(totalEarned) {
  if (totalEarned < 10000000) return 0;
  return Math.floor(Math.sqrt(totalEarned / 10000000));
}

export function getGalaxyMultiplier(galaxyCount = 0) {
  const mults = [1, 2, 4, 8];
  return mults[Math.min(galaxyCount, mults.length - 1)];
}

export function getPrestigeMultiplier(stars, prestigeUpgrades = [], galaxyCount = 0) {
  let base = 1 + stars * 0.1;

  const perStarUpg = PRESTIGE_UPGRADES.filter(u => u.type === 'income_per_star' && prestigeUpgrades.includes(u.id));
  for (const u of perStarUpg) {
    base += stars * u.value;
  }

  const flatUpg = PRESTIGE_UPGRADES.filter(u => u.type === 'flat_income' && prestigeUpgrades.includes(u.id));
  for (const u of flatUpg) {
    base *= u.value;
  }

  base *= getGalaxyMultiplier(galaxyCount);

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

export function getGeneratorCostMultiplier(prestigeUpgrades = []) {
  if (prestigeUpgrades.includes('pup_gen_discount2')) return 0.65;
  if (prestigeUpgrades.includes('pup_gen_discount')) return 0.8;
  return 1;
}

export function createInitialState(prestigeUpgrades = [], galaxyCount = 0) {
  const startCredits = getStartCredits(prestigeUpgrades);
  const freeGenCount = prestigeUpgrades.includes('pup_free_gen2') ? 5 : prestigeUpgrades.includes('pup_free_gen') ? 1 : 0;
  return {
    credits: startCredits,
    totalEarned: 0,
    lifetimeEarned: 0,
    generators: freeGenCount > 0 ? { asteroid_mine: { count: freeGenCount, upgradeMultiplier: 1, progress: 0, running: false } } : {},
    managers: [],
    upgrades: [],
    achievements: [],
    prestigeStars: 0,
    totalPrestiges: 0,
    prestigeUpgrades: [],
    galaxyCount: galaxyCount,
    lastSaveTime: Date.now(),
    buyAmount: 1,
  };
}