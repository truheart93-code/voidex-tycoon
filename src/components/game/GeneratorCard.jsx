import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UPGRADES, MILESTONES,
  formatNumber, getCost, getRevenue, getTime, getPrestigeMultiplier
} from '@/lib/gameData';

function FloatingText({ value }) {
  return (
    <AnimatePresence>
      {value && (
        <motion.div
          key={value.id}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -60, scale: 1.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute top-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <span className="font-display text-sm font-black text-accent drop-shadow-lg whitespace-nowrap">
            +💎{formatNumber(value.amount)}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GeneratorCard({
  generator,
  genState,
  credits,
  prestigeStars,
  upgrades,
  isManaged,
  buyAmount,
  onBuy,
  onCollect,
}) {
  const [floats, setFloats] = useState([]);

  const count = genState?.count || 0;
  const progress = genState?.progress || 0;
  const isRunning = genState?.running || false;
  const time = getTime(generator, genState);
  const progressPercent = isRunning ? Math.min((progress / time) * 100, 100) : 0;
  const isComplete = isRunning && progress >= time;

  const prestigeMult = getPrestigeMultiplier(prestigeStars);
  let globalMult = 1;
  upgrades.forEach(uid => {
    const upg = UPGRADES.find(u => u.id === uid);
    if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
  });

  const revenue = getRevenue(generator, genState, prestigeMult, globalMult);
  const cost = getCost(generator, count, buyAmount);
  const canAfford = credits >= cost;
  const nextMilestone = MILESTONES.find(m => count < m.count);
  const revenuePerSec = count > 0 ? (revenue / time) * 1000 : 0;

  const handleCollect = useCallback((e) => {
    if (count === 0) return;
    if (isComplete) {
      setFloats(prev => [...prev.slice(-3), { id: Date.now(), amount: revenue }]);
      setTimeout(() => setFloats(prev => prev.slice(1)), 1000);
    }
    onCollect(generator.id, e);
  }, [count, isComplete, revenue, onCollect, generator.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl border transition-all duration-200
        ${isComplete
          ? 'border-accent/60 bg-accent/5 shadow-lg shadow-accent/20'
          : 'border-border/50 bg-card/80'
        }`}
    >
      {/* Floating earn text */}
      {floats.map(f => <FloatingText key={f.id} value={f} />)}

      {/* Progress fill background */}
      {isRunning && count > 0 && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className={`h-full transition-all ease-linear duration-75
              ${isComplete ? 'bg-accent/15' : 'bg-primary/8'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Complete flash overlay */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 z-0 bg-accent/10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 p-3">
        <div className="flex items-center gap-3">
          {/* Emoji button */}
          <button
            onClick={handleCollect}
            className={`relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl
              bg-gradient-to-br ${generator.color} shadow-lg ${generator.glowColor}
              ${count === 0 ? 'opacity-35 grayscale' : ''}
              ${isComplete ? 'ring-2 ring-accent ring-offset-1 ring-offset-background' : ''}
              active:scale-90 transition-all duration-150`}
          >
            <span className={isComplete ? 'animate-bounce' : ''}>{generator.emoji}</span>
            {isComplete && !isManaged && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-accent text-accent-foreground rounded-full px-1 font-display font-black leading-none py-0.5">
                TAP
              </span>
            )}
          </button>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-display text-xs font-bold tracking-wide text-foreground truncate">
                {generator.name}
              </h3>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {isManaged && (
                  <span className="text-[9px] bg-primary/20 text-primary rounded-full px-1.5 py-0.5 font-body font-bold">
                    AUTO
                  </span>
                )}
                <span className={`font-display text-sm font-black ${count > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {count}
                </span>
              </div>
            </div>

            {count > 0 ? (
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-body text-[11px] text-muted-foreground">
                  💎{formatNumber(revenue)}/cycle
                </span>
                {isManaged && (
                  <span className="font-body text-[11px] font-semibold text-primary">
                    {formatNumber(revenuePerSec)}/s
                  </span>
                )}
              </div>
            ) : (
              <p className="font-body text-[10px] text-muted-foreground/60 mt-0.5 truncate">
                {generator.description}
              </p>
            )}

            {/* Progress bar */}
            {count > 0 && isRunning && (
              <div className="mt-1.5 space-y-0.5">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${isComplete ? 'bg-accent' : 'bg-primary'}`}
                    style={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.075, ease: 'linear' }}
                  />
                </div>
              </div>
            )}

            {/* Not running hint */}
            {count > 0 && !isRunning && !isManaged && (
              <div className="mt-1.5">
                <span className="font-body text-[10px] text-accent/80 animate-pulse">
                  ↑ Tap to start production
                </span>
              </div>
            )}

            {/* Milestone */}
            {count > 0 && nextMilestone && !isRunning && (
              <div className="mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-body text-muted-foreground/60">
                    {count}/{nextMilestone.count} → x{nextMilestone.speedMultiplier} speed
                  </span>
                </div>
                <div className="h-0.5 rounded-full bg-muted overflow-hidden mt-0.5">
                  <div
                    className="h-full rounded-full bg-secondary/60"
                    style={{ width: `${Math.min((count / nextMilestone.count) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Buy button */}
          <button
            onClick={() => onBuy(generator.id)}
            disabled={!canAfford}
            className={`flex-shrink-0 px-3 py-2.5 rounded-xl font-body text-xs font-bold transition-all
              ${canAfford
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 active:scale-90'
                : 'bg-muted text-muted-foreground opacity-40'
              }`}
          >
            <div className="text-center leading-tight">
              <div className="text-[11px] font-display tracking-wide">BUY</div>
              <div className="text-[10px] opacity-80">
                💎{formatNumber(cost)}
              </div>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(GeneratorCard);