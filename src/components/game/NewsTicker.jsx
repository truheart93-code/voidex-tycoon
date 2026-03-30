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
    // shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }, [state.credits > 0 && Math.floor(Math.log10(Math.max(state.credits, 1))), state.managers.length, state.prestigeStars]);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % allNews.length);
        setVisible(true);
      }, 400);
    }, 6000);
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