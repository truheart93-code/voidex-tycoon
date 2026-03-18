import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  GENERATORS, UPGRADES, MILESTONES,
  formatNumber, getCost, getRevenue, getTime, getPrestigeMultiplier
} from '@/lib/gameData';

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

  // Revenue per second for managed generators
  const revenuePerSec = count > 0 ? (revenue / time) * 1000 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm"
    >
      {/* Progress bar background */}
      {isRunning && !isComplete && (
        <div className="absolute inset-0 z-0">
          <div
            className="h-full bg-primary/10 transition-all duration-75 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="relative z-10 p-3">
        <div className="flex items-center gap-3">
          {/* Emoji & tap area */}
          <button
            onClick={() => count > 0 ? onCollect(generator.id) : null}
            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl
              bg-gradient-to-br ${generator.color} shadow-lg ${generator.glowColor}
              ${isComplete ? 'animate-pulse-glow scale-105' : ''}
              ${count === 0 ? 'opacity-40 grayscale' : ''}
              active:scale-95 transition-transform`}
          >
            {generator.emoji}
          </button>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-bold tracking-wide text-foreground truncate">
                {generator.name}
              </h3>
              <span className="font-body text-sm font-bold text-foreground ml-2">
                {count}
              </span>
            </div>

            {count > 0 && (
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-body text-xs text-muted-foreground">
                  💎 {formatNumber(revenue)} / cycle
                </span>
                {isManaged && (
                  <span className="font-body text-xs text-primary">
                    {formatNumber(revenuePerSec)}/s
                  </span>
                )}
              </div>
            )}

            {/* Milestone progress */}
            {count > 0 && nextMilestone && (
              <div className="mt-1.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-body text-muted-foreground">
                    Next: {nextMilestone.count} (x{nextMilestone.speedMultiplier} speed)
                  </span>
                  <span className="text-[10px] font-body text-muted-foreground">
                    {count}/{nextMilestone.count}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
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
            className={`flex-shrink-0 px-3 py-2 rounded-lg font-body text-xs font-bold transition-all
              ${canAfford
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 active:scale-95'
                : 'bg-muted text-muted-foreground opacity-50'
              }`}
          >
            <div className="text-center">
              <div>BUY</div>
              <div className="text-[10px] opacity-80">
                💎{formatNumber(cost)}
              </div>
            </div>
          </button>
        </div>

        {/* Production progress bar */}
        {count > 0 && isRunning && !isManaged && (
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-75 ease-linear ${
                isComplete ? 'bg-accent animate-pulse' : 'bg-primary'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Managed indicator */}
        {isManaged && count > 0 && (
          <div className="absolute top-1 right-1">
            <span className="text-[10px] bg-primary/20 text-primary rounded-full px-1.5 py-0.5 font-body font-bold">
              AUTO
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default memo(GeneratorCard);