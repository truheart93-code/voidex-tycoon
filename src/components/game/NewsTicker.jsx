import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio } from 'lucide-react';
import { formatNumber } from '@/lib/gameData';

const STATIC_NEWS = [
  "🌍 Earth scientists baffled by disappearing asteroid clusters near sector 7",
  "💹 Galactic Credits Exchange reports record trading volume this cycle",
  "🛸 Unidentified vessels spotted near the outer rim — authorities investigating",
  "🌠 Rare supernova event detected in the Andromeda quadrant",
  "🧬 Quantum researchers claim breakthrough in matter synthesis technology",
  "⚔️ Border skirmish near Kepler-452b resolved peacefully after negotiations",
  "🏆 Annual Voidex Tycoon Rankings released — top empires revealed!",
  "🌋 Volcanic moon of Jupiter showing signs of rare crystalline formations",
  "📡 Deep space signal decoded — message appears to be an advertisement",
  "🔭 New exoplanet discovered with potential for rare mineral deposits",
  "🤖 AI trading bots now control 47% of the intergalactic commodities market",
  "🎰 Gambling dens on Ceres Station report all-time high revenues",
  "🚀 Fuel prices spike after wormhole disruption near the trade routes",
  "☄️ Rogue comet narrowly misses populated space station — locals shaken",
  "🌊 Ice harvester union demands better working conditions in Europa orbit",
  "🪐 Senate debates whether Saturn's rings count as territory under galactic law",
  "🧪 Scientists develop new element — found only in the void between galaxies",
  "💀 Pirates intercept shipment of quantum processors near Titan relay station",
  "🦠 Alien microbes discovered on Enceladus — classified immediately by authorities",
  "🌀 Wormhole collapses stranding 400 cargo ships — insurance companies scramble",
  "🛰️ Communications satellite hacked to broadcast ancient Earth soap operas",
  "🏗️ Mega-structure construction halted after workers find space whale migration path",
  "⚗️ Black market sells 'bottled singularity' — experts urge extreme caution",
  "🌙 Lunar real estate prices surge as billionaires flee Earth's tax reforms",
  "🔋 Solar energy consortium announces Dyson Sphere pilot program for next decade",
  "👾 Extraterrestrial diplomats demand a seat on the Galactic Stock Exchange",
  "🎭 Famous space opera cancelled mid-season after star literally goes nova",
  "🕳️ Void energy leak detected — scientists say 'probably fine, don't worry about it'",
  "🌿 Terraformed Mars colony stages protest: demands to be called 'New Earth 2'",
  "🧲 Magnetic anomaly near asteroid belt bending compass readings across sector 9",
  "📦 Lost cargo container from 2187 finally recovered — contents still unexplained",
  "🏥 Medical bay aboard ISS Prometheus reports 47 cases of 'space vertigo'",
  "💊 Galactic FDA bans new supplement claiming to extend life by 300 years",
  "🎵 DJ NOVA-3000 breaks intergalactic listening record with 8-hour space rave set",
  "🦅 Rare space eagle spotted nesting in decommissioned warship near Pluto",
  "🔑 Encryption key to legendary treasure lost to solar flare — adventurers mourn",
  "🌐 Universal translator glitch causes diplomatic incident — apologies issued",
  "🎲 Gambling laws updated: all bets on black hole survival now legally enforceable",
  "🏊 Zero-gravity water park opens on Ganymede — instant 6-month waitlist",
  "🌪️ Plasma storm sweeps through the Kuiper Belt, disrupting seventeen mining ops",
  "🔭 Hubble-X spots galaxy shaped exactly like a credit symbol — considered omen",
  "🪂 Escape pod lands in wrong star system — pilot unfazed, calls it 'adventure'",
  "🤯 Philosopher claims entire universe is a simulation — simulator billed for overtime",
  "💡 Inventor pitches gravity-powered espresso machine to Galactic Shark Tank",
  "🧊 Record cold snap on Triton — minus 300°C, locals describe it as 'crisp'",
  "🛡️ Galactic Defense Fleet commissions 10,000 new drones — stock soars 400%",
  "🎯 Precision asteroid redirect saves colony — crew celebrates with freeze-dried cake",
  "🪩 Disco-themed space station opens near Neptune — surprisingly popular",
  "🔩 Supply chain disruption blamed on sentient forklift union demands",
  "🌏 Earth declared 'Heritage Site' — tourism now only legal industry remaining",
  "🧠 Neural implant upgrade causes 30% of users to briefly believe they're asteroids",
  "🐙 Alien species discovered communicating entirely through rhythmic tentacle taps",
  "⚡ Power grid failure on Titan blamed on overloaded quantum gaming servers",
  "🎪 Traveling circus arrives at Vega Station — acrobats reportedly defy physics",
  "🌈 Unexplained aurora phenomenon spotted simultaneously on 6 planets — no comment from authorities",
  "📰 Galactic Tribune wins award for 'Most Dramatic Headline About Nothing'",
  "🦾 Cybernetic enhancement clinic accused of installing cup holders without consent",
  "🚂 Hyperrail project connecting three star systems declared over-budget by 900%",
  "🎖️ Veteran asteroid miner retires after 40 years — cites 'too many rocks'",
  "🤝 Two rival megacorps merge — resulting entity immediately sues itself",
];

function getDynamicNews(state) {
  const news = [];
  const totalGens = Object.values(state.generators).reduce((s, g) => s + (g?.count || 0), 0);

  if (state.credits > 1000000) news.push(`💎 Your empire holds ${formatNumber(state.credits)} credits — markets are watching`);
  if (state.managers.length >= 3) news.push(`🤖 Reports indicate ${state.managers.length} autonomous managers operating in your empire`);
  if (state.prestigeStars > 0) news.push(`⭐ Legendary empire with ${state.prestigeStars} Prestige Stars spotted in sector reports`);
  if (totalGens > 50) news.push(`🏭 Industrial giant operates ${totalGens} active generators across the galaxy`);
  if (state.totalPrestiges > 0) news.push(`♻️ Cosmic Rebirth recorded ${state.totalPrestiges} time(s) — empire transcends time itself`);
  if (state.achievements.length > 5) news.push(`🏆 Empire earns ${state.achievements.length} achievements — rivals take notice`);

  return news;
}

export default function NewsTicker({ state }) {
  const allNews = useMemo(() => {
    const dynamic = getDynamicNews(state);
    const pool = [...dynamic, ...STATIC_NEWS];
    // Fisher-Yates shuffle with seeded start for variety
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }, [Math.floor(Math.log10(Math.max(state.credits || 1, 1))), state.managers.length, state.prestigeStars, state.totalPrestiges]);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % allNews.length);
        setVisible(true);
      }, 400);
    }, 14000);
    return () => clearInterval(cycle);
  }, [allNews.length]);

  return (
    <div className="flex items-start gap-2 px-3 py-2 bg-card/60 backdrop-blur-sm border-b border-border/30">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Radio className="w-3 h-3 text-primary animate-pulse" />
        <span className="font-display text-[9px] font-bold tracking-widest text-primary">GALACTIC NEWS</span>
      </div>
      <div className="w-px h-3 bg-border/50 flex-shrink-0" />
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="font-body text-[11px] text-muted-foreground leading-relaxed"
            >
              {allNews[index]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}