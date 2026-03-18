import { UPGRADES, GENERATORS, formatNumber } from '@/lib/gameData';
import { motion } from 'framer-motion';
import { Check, ArrowUp } from 'lucide-react';

export default function UpgradesPanel({ state, onBuyUpgrade }) {
  const availableUpgrades = UPGRADES.filter(upg => {
    if (state.upgrades.includes(upg.id)) return true; // show owned
    if (upg.generatorId === 'all') return true;
    const genState = state.generators[upg.generatorId];
    return genState && genState.count > 0;
  });

  return (
    <div className="px-4 pb-4 space-y-2">
      <p className="font-body text-xs text-muted-foreground text-center mb-3">
        Multiply your earnings with powerful upgrades!
      </p>
      {availableUpgrades.map(upg => {
        const isOwned = state.upgrades.includes(upg.id);
        const canAfford = state.credits >= upg.cost;
        const gen = GENERATORS.find(g => g.id === upg.generatorId);
        const genState = state.generators[upg.generatorId];
        const meetsRequirement = upg.generatorId === 'all' || (genState && genState.count >= upg.requiredCount);

        return (
          <motion.div
            key={upg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-xl border p-3 flex items-center gap-3 transition-all
              ${isOwned
                ? 'border-accent/30 bg-accent/5'
                : 'border-border/50 bg-card/80'
              }`}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-xl">
              {upg.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-xs font-bold tracking-wide text-foreground">
                {upg.name}
              </h4>
              <p className="font-body text-xs text-muted-foreground">
                x{upg.multiplier} {upg.generatorId === 'all' ? 'all generators' : gen?.name}
              </p>
              {!isOwned && upg.requiredCount > 0 && (
                <p className="font-body text-[10px] text-muted-foreground/60">
                  Requires {upg.requiredCount}x {gen?.name}
                  {genState ? ` (${genState.count}/${upg.requiredCount})` : ''}
                </p>
              )}
            </div>
            {isOwned ? (
              <div className="flex items-center gap-1 text-accent">
                <Check className="w-4 h-4" />
                <span className="font-body text-xs font-bold">OWNED</span>
              </div>
            ) : (
              <button
                onClick={() => onBuyUpgrade(upg.id)}
                disabled={!canAfford || !meetsRequirement}
                className={`px-3 py-2 rounded-lg font-body text-xs font-bold transition-all
                  ${canAfford && meetsRequirement
                    ? 'bg-accent text-accent-foreground shadow-md active:scale-95'
                    : 'bg-muted text-muted-foreground opacity-50'
                  }`}
              >
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    BUY
                  </div>
                  <div className="text-[10px] opacity-80">💎{formatNumber(upg.cost)}</div>
                </div>
              </button>
            )}
          </motion.div>
        );
      })}
      {availableUpgrades.length === 0 && (
        <p className="font-body text-sm text-muted-foreground text-center py-8">
          Buy generators to unlock upgrades!
        </p>
      )}
    </div>
  );
}