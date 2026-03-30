import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame } from 'lucide-react';
import { getDayReward, claimDailyReward } from '@/lib/dailyReward';
import { formatNumber } from '@/lib/gameData';

const CYCLE = 28;

export default function DailyRewardModal({ dailyData, onClaim, onClose }) {
  const [claimed, setClaimed] = useState(false);
  const [claimedReward, setClaimedReward] = useState(null);

  const currentStreak = dailyData.streak;
  const dayInCycle = (currentStreak % CYCLE) + 1; // next day to claim

  const days = useMemo(() => {
    return Array.from({ length: CYCLE }, (_, i) => {
      const day = i + 1;
      const reward = getDayReward(day);
      const isPast = day < dayInCycle;
      const isCurrent = day === dayInCycle;
      return { day, reward, isPast, isCurrent };
    });
  }, [dayInCycle]);

  const handleClaim = () => {
    const { reward, updated } = claimDailyReward(dailyData);
    setClaimedReward(reward);
    setClaimed(true);
    onClaim(reward.credits, updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-sm rounded-3xl border border-accent/40 overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))' }}
      >
        {/* Top bar */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)' }} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" />
              <div>
                <h2 className="font-display text-sm font-black tracking-widest text-foreground">DAILY REWARD</h2>
                <p className="font-body text-xs text-muted-foreground">
                  {currentStreak > 0 ? `${currentStreak} day streak` : 'Start your streak today!'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-muted/30 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {days.map(({ day, reward, isPast, isCurrent }) => (
              <motion.div
                key={day}
                whileTap={isCurrent && !claimed ? { scale: 0.92 } : {}}
                className={`relative flex flex-col items-center justify-center rounded-xl p-1 aspect-square border transition-all
                  ${isCurrent && !claimed ? 'border-accent bg-accent/15 shadow-lg shadow-accent/20' : ''}
                  ${isPast ? 'border-primary/30 bg-primary/8 opacity-60' : ''}
                  ${!isPast && !isCurrent ? 'border-border/30 bg-muted/10 opacity-40' : ''}
                  ${claimed && isCurrent ? 'border-primary/50 bg-primary/15' : ''}
                `}
              >
                {/* Milestone glow */}
                {reward.isMilestone && (
                  <div className="absolute inset-0 rounded-xl opacity-30"
                    style={{ background: isCurrent ? 'radial-gradient(circle, hsl(var(--accent)), transparent)' : 'none' }} />
                )}
                <span className="text-[10px] leading-none">{reward.icon}</span>
                <span className={`font-display text-[7px] font-bold mt-0.5 ${isCurrent && !claimed ? 'text-accent' : 'text-muted-foreground'}`}>
                  D{day}
                </span>
                {isPast && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/10">
                    <span className="text-[8px]">✓</span>
                  </div>
                )}
                {reward.isMilestone && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Current day reward highlight */}
          <AnimatePresence mode="wait">
            {!claimed ? (
              <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
                <div className={`rounded-2xl p-4 border ${getDayReward(dayInCycle).isMilestone ? 'border-accent/50 bg-accent/10' : 'border-primary/30 bg-primary/8'} flex items-center gap-3`}>
                  <span className="text-3xl">{getDayReward(dayInCycle).icon}</span>
                  <div>
                    <p className="font-display text-[10px] font-bold tracking-widest text-accent">{getDayReward(dayInCycle).label}</p>
                    <p className="font-display text-lg font-black text-foreground">+{formatNumber(getDayReward(dayInCycle).credits)} credits</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="claimed" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="mb-4 rounded-2xl p-4 border border-primary/40 bg-primary/10 flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div>
                  <p className="font-display text-[10px] font-bold tracking-widest text-primary">CLAIMED!</p>
                  <p className="font-display text-lg font-black text-foreground">+{formatNumber(claimedReward.credits)} credits</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          {!claimed ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleClaim}
              className="w-full py-3 rounded-2xl font-display text-sm font-black tracking-widest shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, hsl(45 90% 55%), hsl(35 90% 50%))', color: 'hsl(230 25% 7%)' }}
            >
              CLAIM TODAY'S REWARD
            </motion.button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl font-display text-sm font-black tracking-widest bg-muted/30 border border-border/20 text-muted-foreground transition-all active:scale-95"
            >
              CLOSE
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}