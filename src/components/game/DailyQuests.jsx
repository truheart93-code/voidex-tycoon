import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '@/lib/gameData';
import { CheckCircle2, Clock, Gift, Zap, Shield, AlertTriangle, ChevronDown } from 'lucide-react';
import { BUFFS } from '@/lib/questData';

function MissionStatus({ isComplete, isClaimed }) {
  if (isClaimed) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/15 border border-primary/25 font-display text-[9px] font-bold tracking-widest text-primary">
      <CheckCircle2 className="w-2.5 h-2.5" /> COMPLETE
    </span>
  );
  if (isComplete) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/20 border border-accent/40 font-display text-[9px] font-bold tracking-widest text-accent animate-pulse">
      ⚡ CLAIM NOW
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/50 border border-border/30 font-display text-[9px] font-bold tracking-widest text-muted-foreground">
      <Clock className="w-2.5 h-2.5" /> ACTIVE
    </span>
  );
}

export default function DailyQuests({ quests, weeklyQuests, onClaim, activeBuffs }) {
  const [activeTab, setActiveTab] = useState('daily');
  const [tick, setTick] = useState(0);

  // Tick to update countdown timers
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Midnight countdown
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const secsToReset = Math.max(0, Math.floor((midnight - now) / 1000));
  const hh = String(Math.floor(secsToReset / 3600)).padStart(2, '0');
  const mm = String(Math.floor((secsToReset % 3600) / 60)).padStart(2, '0');
  const ss = String(secsToReset % 60).padStart(2, '0');

  const displayQuests = activeTab === 'daily' ? quests : (weeklyQuests || []);
  if (!displayQuests || displayQuests.length === 0) return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-3xl mb-3 opacity-40">📡</div>
      <p className="font-display text-xs text-muted-foreground tracking-widest">CONNECTING TO MISSION CONTROL...</p>
    </div>
  );

  const completed = displayQuests.filter(q => q.claimed).length;
  const claimable = displayQuests.filter(q => !q.claimed && (q.progress || 0) >= q.target).length;

  return (
    <div className="px-4 pb-4 space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2">
        {['daily','weekly'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl font-display text-[10px] font-black tracking-widest border transition-all
              ${activeTab === tab ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-muted/20 border-border/20 text-muted-foreground'}`}>
            {tab === 'daily' ? '⚡ DAILY' : '📅 WEEKLY'}
          </button>
        ))}
      </div>

      {/* Terminal Header */}
      <div className="rounded-2xl overflow-hidden border border-primary/20" style={{ background: 'hsl(230 20% 9%)' }}>
        <div className="px-4 py-2 flex items-center justify-between border-b border-border/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive/70" />
              <div className="w-2 h-2 rounded-full bg-accent/70" />
              <div className="w-2 h-2 rounded-full bg-primary/70" />
            </div>
            <span className="font-display text-[10px] font-bold tracking-widest text-muted-foreground">MISSION_LOG.SYS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-primary" />
            <span className="font-display text-[10px] text-primary font-bold tracking-wide">{hh}:{mm}:{ss}</span>
          </div>
        </div>

        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-display text-xs font-black tracking-widest text-foreground">{activeTab === 'daily' ? 'DAILY MISSIONS' : 'WEEKLY MISSIONS'}</p>
            <p className="font-body text-[10px] text-muted-foreground mt-0.5">
              {completed}/{quests.length} missions completed
              {claimable > 0 && <span className="text-accent ml-2">• {claimable} ready to claim</span>}
            </p>
          </div>
          <div className="flex gap-1">
            {displayQuests.map((_, i) => (
              <div
                key={i}
                className={`w-5 h-1.5 rounded-full transition-all ${
                  i < completed ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Active Buffs Banner */}
      {activeBuffs && activeBuffs.length > 0 && (
        <div className="rounded-xl border border-accent/30 bg-accent/8 p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span className="font-display text-[10px] font-bold tracking-widest text-accent">ACTIVE PROTOCOLS</span>
          </div>
          <div className="space-y-1.5">
            {activeBuffs.map(buff => {
              const def = BUFFS.find(b => b.id === buff.id);
              if (!def) return null;
              const secs = Math.max(0, Math.ceil((buff.expiresAt - Date.now()) / 1000));
              const pct = Math.max(0, ((buff.expiresAt - Date.now()) / def.duration) * 100);
              return (
                <div key={buff.instanceId} className="flex items-center gap-2">
                  <span className="text-sm">{def.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-body text-[10px] font-bold text-foreground">{def.name}</span>
                      <span className="font-display text-[10px] font-bold text-accent">{secs}s</span>
                    </div>
                    <div className="h-0.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mission Cards */}
      {displayQuests.map((quest, idx) => {
        const progress = Math.min(quest.progress || 0, quest.target);
        const pct = Math.min((progress / quest.target) * 100, 100);
        const isComplete = progress >= quest.target;
        const isClaimed = quest.claimed;
        const buffDef = BUFFS.find(b => b.id === quest.reward);
        const missionCode = `M-${String(idx + 1).padStart(2, '0')}`;

        return (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className={`rounded-2xl border overflow-hidden transition-all
              ${isClaimed
                ? 'border-border/20 bg-muted/10 opacity-60'
                : isComplete
                  ? 'border-accent/50 shadow-lg shadow-accent/10'
                  : 'border-border/30 bg-card/50'}`}
          >
            {/* Mission header bar */}
            <div
              className={`px-4 py-2 flex items-center justify-between border-b
                ${isClaimed
                  ? 'bg-muted/20 border-border/10'
                  : isComplete
                    ? 'bg-accent/10 border-accent/20'
                    : 'bg-muted/15 border-border/15'}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-display text-[9px] font-bold tracking-widest text-muted-foreground">{missionCode}</span>
                <span className="text-base">{quest.emoji}</span>
                <span className={`font-display text-[10px] font-bold tracking-wide ${isClaimed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {quest.name}
                </span>
              </div>
              <MissionStatus isComplete={isComplete} isClaimed={isClaimed} />
            </div>

            <div className="p-4">
              {/* Objective */}
              <p className="font-body text-xs text-muted-foreground mb-3">
                <span className="text-foreground/60 font-semibold">OBJECTIVE: </span>
                {quest.description}
              </p>

              {/* Progress */}
              {!isClaimed && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body text-[10px] text-muted-foreground">
                      {progress >= 1000 ? formatNumber(progress) : progress.toLocaleString()} / {quest.target >= 1000 ? formatNumber(quest.target) : quest.target.toLocaleString()}
                    </span>
                    <span className={`font-display text-[10px] font-bold ${isComplete ? 'text-accent' : 'text-primary'}`}>
                      {Math.floor(pct)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                    <motion.div
                      className={`h-full rounded-full ${isComplete ? 'bg-accent' : 'bg-primary'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    {isComplete && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[progress-shine_1.5s_ease_infinite]" />
                    )}
                  </div>
                </div>
              )}

              {/* Reward + Claim */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Gift className="w-3 h-3 text-secondary" />
                  <span className="font-body text-[10px] font-semibold text-secondary">
                    {buffDef ? `${buffDef.emoji} ${buffDef.name} (${buffDef.description})` : quest.rewardLabel}
                  </span>
                </div>

                {isComplete && !isClaimed && (
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={() => onClaim(quest.id, activeTab === 'weekly')}
                    className="px-4 py-1.5 rounded-xl font-display text-[10px] font-black tracking-widest shadow-lg shadow-accent/30 active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, hsl(45 90% 55%), hsl(45 80% 45%))', color: 'hsl(230 25% 7%)' }}
                  >
                    ⚡ CLAIM
                  </motion.button>
                )}

                {isClaimed && (
                  <div className="flex items-center gap-1 text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-display text-[9px] font-bold tracking-wide">COLLECTED</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      {completed === displayQuests.length && displayQuests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-primary/30 bg-primary/8 p-6 text-center"
        >
          <div className="text-3xl mb-2">🏆</div>
          <p className="font-display text-sm font-black tracking-widest text-primary">ALL MISSIONS COMPLETE</p>
          <p className="font-body text-xs text-muted-foreground mt-1">New missions in {hh}:{mm}:{ss}</p>
        </motion.div>
      )}
    </div>
  );
}