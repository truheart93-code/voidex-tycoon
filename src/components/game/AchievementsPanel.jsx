import { ACHIEVEMENTS } from '@/lib/gameData';
import { motion } from 'framer-motion';
import { Lock, Trophy } from 'lucide-react';

export default function AchievementsPanel({ state }) {
  return (
    <div className="px-4 pb-4 space-y-2">
      <div className="text-center mb-3">
        <span className="font-body text-xs text-muted-foreground">
          {state.achievements.length} / {ACHIEVEMENTS.length} unlocked
        </span>
      </div>
      {ACHIEVEMENTS.map(ach => {
        const isUnlocked = state.achievements.includes(ach.id);
        
        return (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-3 flex items-center gap-3
              ${isUnlocked
                ? 'border-accent/30 bg-accent/5'
                : 'border-border/30 bg-card/40 opacity-60'
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