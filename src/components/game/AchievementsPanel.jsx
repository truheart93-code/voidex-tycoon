import { ACHIEVEMENTS } from '@/lib/gameData';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

export default function AchievementsPanel({ state }) {
  const unlocked = state.achievements.length;
  const total = ACHIEVEMENTS.length;
  const pct = Math.round((unlocked / total) * 100);

  return (
    <div className="px-4 pb-4 space-y-2">
      {/* Progress header */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="font-display text-xs font-bold text-foreground tracking-wide">ACHIEVEMENTS</span>
          </div>
          <span className="font-body text-xs font-bold text-accent">{unlocked}/{total}</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="font-body text-[10px] text-muted-foreground mt-1">{pct}% complete</p>
      </div>
      {ACHIEVEMENTS.map(ach => {
        const isUnlocked = state.achievements.includes(ach.id);
        
        return (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-3 flex items-center gap-3 transition-all
              ${isUnlocked
                ? 'border-accent/40 bg-gradient-to-r from-accent/8 to-transparent shadow-sm'
                : 'border-border/20 bg-card/30 opacity-50'
              }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl
              ${isUnlocked ? 'bg-accent/20' : 'bg-muted/50'}`}>
              {isUnlocked ? ach.emoji : '🔒'}
            </div>
            <div className="flex-1">
              <h4 className={`font-display text-xs font-bold tracking-wide
                ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                {ach.name}
              </h4>
              <p className="font-body text-xs text-muted-foreground">
                {ach.description}
              </p>
            </div>
            {isUnlocked && (
              <Trophy className="w-4 h-4 text-accent flex-shrink-0" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}