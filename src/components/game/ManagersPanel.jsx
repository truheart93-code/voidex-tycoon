import { MANAGERS, GENERATORS, formatNumber } from '@/lib/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check } from 'lucide-react';

export default function ManagersPanel({ state, onBuyManager }) {
  return (
    <div className="px-4 pb-4 space-y-2">
      <p className="font-body text-xs text-muted-foreground text-center mb-3">
        Managers automate production so you earn while away!
      </p>
      {MANAGERS.map(mgr => {
        const gen = GENERATORS.find(g => g.id === mgr.generatorId);
        const isOwned = state.managers.includes(mgr.generatorId);
        const canAfford = state.credits >= mgr.cost;
        const hasGenerator = (state.generators[mgr.generatorId]?.count || 0) > 0;

        return (
          <motion.div
            key={mgr.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-xl border p-3 flex items-center gap-3 transition-all
              ${isOwned
                ? 'border-primary/30 bg-primary/5'
                : 'border-border/50 bg-card/80'
              }`}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-xl">
              {mgr.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-xs font-bold tracking-wide text-foreground">
                {mgr.name}
              </h4>
              <p className="font-body text-xs text-muted-foreground">
                Automates {gen?.name}
              </p>
            </div>
            {isOwned ? (
              <div className="flex items-center gap-1 text-primary">
                <Check className="w-4 h-4" />
                <span className="font-body text-xs font-bold">HIRED</span>
              </div>
            ) : (
              <button
                onClick={() => onBuyManager(mgr.id)}
                disabled={!canAfford || !hasGenerator}
                className={`px-3 py-2 rounded-lg font-body text-xs font-bold transition-all
                  ${canAfford && hasGenerator
                    ? 'bg-secondary text-secondary-foreground shadow-md active:scale-95'
                    : 'bg-muted text-muted-foreground opacity-50'
                  }`}
              >
                <div className="text-center">
                  <div>HIRE</div>
                  <div className="text-[10px] opacity-80">💎{formatNumber(mgr.cost)}</div>
                </div>
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}