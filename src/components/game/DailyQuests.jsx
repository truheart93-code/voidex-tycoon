import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/gameData';
import { CheckCircle2, Clock, Gift, Zap } from 'lucide-react';
import { BUFFS } from '@/lib/questData';

export default function DailyQuests({ quests, onClaim, activeBuffs }) {
  if (!quests || quests.length === 0) return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <Clock className="w-8 h-8 mb-2 opacity-40" />
      <p className="font-body text-sm">Loading quests...</p>
    </div>
  );

  const activeBuffIds = (activeBuffs || []).map(b => b.id);
  const completed = quests.filter(q => q.claimed).length;

  return (
    <div className="px-4 pb-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-bold tracking-wide text-foreground">Daily Quests</h3>
          <p className="font-body text-xs text-muted-foreground">Resets at midnight • {completed}/{quests.length} done</p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: quests.length }).map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i < completed ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
      </div>

      {/* Quest cards */}
      {quests.map((quest, idx) => {
        const progress = Math.min(quest.progress || 0, quest.target);
        const pct = Math.min((progress / quest.target) * 100, 100);
        const isComplete = progress >= quest.target;
        const isClaimed = quest.claimed;
        const buffDef = BUFFS.find(b => b.id === quest.reward);
        const buffActive = activeBuffIds.includes(quest.reward);

        return (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`rounded-2xl border p-4 transition-all
              ${isClaimed ? 'border-primary/20 bg-primary/5 opacity-70'
              : isComplete ? 'border-accent/50 bg-gradient-to-r from-accent/10 to-transparent shadow-lg shadow-accent/10'
              : 'border-border/40 bg-card/60'}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                ${isClaimed ? 'bg-primary/20' : isComplete ? 'bg-accent/20 ring-2 ring-accent/40' : 'bg-muted/50'}`}>
                {isClaimed ? '✅' : quest.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`font-display text-xs font-bold tracking-wide
                    ${isClaimed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {quest.name}
                  </h4>
                  {isClaimed && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{quest.description}</p>

                {/* Reward badge */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Gift className="w-3 h-3 text-secondary" />
                  <span className="font-body text-[10px] text-secondary font-semibold">
                    {buffDef ? `${buffDef.emoji} ${buffDef.name}: ${buffDef.description}` : quest.rewardLabel}
                  </span>
                </div>

                {/* Progress bar */}
                {!isClaimed && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[10px] text-muted-foreground">
                        {typeof quest.progress === 'number' && quest.progress >= 1000
                          ? formatNumber(progress)
                          : progress.toLocaleString()} / {quest.target >= 1000 ? formatNumber(quest.target) : quest.target.toLocaleString()}
                      </span>
                      <span className="font-body text-[10px] text-muted-foreground">{Math.floor(pct)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${isComplete ? 'bg-accent' : 'bg-primary'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Claim button */}
              {isComplete && !isClaimed && (
                <button
                  onClick={() => onClaim(quest.id)}
                  className="flex-shrink-0 px-3 py-2 rounded-xl bg-gradient-to-b from-accent to-accent/80 text-accent-foreground font-display text-[10px] font-bold tracking-wide shadow-lg shadow-accent/30 active:scale-95 transition-all animate-pulse"
                >
                  CLAIM
                </button>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Active buffs */}
      {activeBuffs && activeBuffs.length > 0 && (
        <div className="mt-4">
          <h4 className="font-display text-xs font-bold tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-accent" /> ACTIVE BUFFS
          </h4>
          {activeBuffs.map(buff => {
            const def = BUFFS.find(b => b.id === buff.id);
            if (!def) return null;
            const secs = Math.max(0, Math.ceil((buff.expiresAt - Date.now()) / 1000));
            return (
              <div key={buff.instanceId} className={`rounded-xl border px-3 py-2 flex items-center justify-between mb-1.5 ${def.bg}`}>
                <span className="font-body text-xs font-bold">{def.emoji} {def.name}</span>
                <span className={`font-display text-xs font-bold ${def.color}`}>{secs}s left</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}