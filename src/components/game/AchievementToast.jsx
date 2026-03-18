import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function AchievementToast({ achievement, onDismiss }) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-16 left-4 right-4 z-50"
        onClick={onDismiss}
      >
        <div className="bg-gradient-to-r from-accent/90 to-accent/70 backdrop-blur-xl rounded-xl p-4 shadow-2xl shadow-accent/30 border border-accent/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-foreground/20 flex items-center justify-center text-xl">
              {achievement.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-accent-foreground" />
                <span className="font-display text-[10px] font-bold tracking-widest text-accent-foreground/80">
                  ACHIEVEMENT UNLOCKED
                </span>
              </div>
              <h4 className="font-display text-sm font-bold text-accent-foreground">
                {achievement.name}
              </h4>
              <p className="font-body text-xs text-accent-foreground/80">
                {achievement.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}