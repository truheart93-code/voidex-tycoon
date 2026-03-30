import { useState, useEffect, useRef } from 'react';
import { formatNumber, getPrestigeMultiplier } from '@/lib/gameData';
import { Volume2, VolumeX, Star, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ credits, creditsPerSec, prestigeStars, isMusicOn, onToggleMusic, onOpenThemes }) {
  const multiplier = getPrestigeMultiplier(prestigeStars);
  const prevCredits = useRef(credits);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (credits > prevCredits.current) {
      setBump(true);
      setTimeout(() => setBump(false), 200);
    }
    prevCredits.current = credits;
  }, [credits]);

  return (
    <div className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <h1 className="font-display text-sm font-bold tracking-wider text-primary">
              VOIDEX TYCOON
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {prestigeStars > 0 && (
              <div className="flex items-center gap-1 bg-secondary/20 rounded-full px-2 py-0.5">
                <Star className="w-3 h-3 text-secondary fill-secondary" />
                <span className="text-xs font-body font-semibold text-secondary">{prestigeStars}</span>
                <span className="text-xs font-body text-muted-foreground">x{multiplier.toFixed(1)}</span>
              </div>
            )}
            <button
              onClick={onOpenThemes}
              className="p-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Palette className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleMusic}
              className="p-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMusicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Credits display */}
        <div className="text-center">
          <motion.div
            animate={bump ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-2xl">💎</span>
            <span className="font-display text-2xl font-black tracking-wide text-foreground">
              {formatNumber(credits)}
            </span>
          </motion.div>
          {creditsPerSec > 0 && (
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="font-body text-xs text-primary/80">
                +{formatNumber(creditsPerSec)}/sec
              </span>
              <span className="font-body text-[10px] text-muted-foreground">auto</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}