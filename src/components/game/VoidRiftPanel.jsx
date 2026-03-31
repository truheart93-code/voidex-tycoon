import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle, Shield, Trophy, Clock, Copy, Play, X, ShoppingBag } from 'lucide-react';
import { formatNumber } from '@/lib/gameData';
import { generateRift } from '@/lib/riftData';
import RiftTokenStore from './RiftTokenStore';

function ModifierBadge({ mod }) {
  const isDebuff = mod.side === 'debuff';
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isDebuff ? 'bg-destructive/10 border-destructive/30' : 'bg-primary/10 border-primary/30'}`}>
      <span className="text-lg">{mod.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className={`font-display text-[10px] font-black tracking-wider ${isDebuff ? 'text-destructive' : 'text-primary'}`}>{mod.name}</p>
        <p className="font-body text-[10px] text-muted-foreground">{mod.description}</p>
      </div>
      {isDebuff
        ? <AlertTriangle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
        : <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
      }
    </div>
  );
}

function RiftTimer({ endTime }) {
  const [remaining, setRemaining] = useState(Math.max(0, endTime - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, endTime - Date.now())), 1000);
    return () => clearInterval(id);
  }, [endTime]);
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  return <span className="font-display text-lg font-black text-accent tabular-nums">{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</span>;
}

export default function VoidRiftPanel({ state, activeRift, onStartRift, onAbandonRift, riftTokens, ownedRiftUpgrades, onBuyRiftUpgrade }) {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('rifts');

  const totalPrestiges = state.totalPrestiges || 0;
  const maxLevel = Math.max(1, Math.floor(totalPrestiges / 5) - 9); // 1 at 50, 2 at 55, etc.

  const previewRift = generateRift(selectedLevel);
  const riftComplete = activeRift && !activeRift.failed && activeRift.earnedCredits >= activeRift.creditGoal;
  const riftFailed = activeRift && (activeRift.failed || Date.now() > activeRift.startTime + activeRift.duration);
  const riftActive = activeRift && !riftComplete && !riftFailed;

  const copyCode = () => {
    const r = activeRift || previewRift;
    navigator.clipboard?.writeText(r.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const earnedPct = activeRift ? Math.min((activeRift.earnedCredits / activeRift.creditGoal) * 100, 100) : 0;

  return (
    <div className="px-4 pb-4 space-y-4">
      {/* Tabs */}
      <div className="flex gap-2">
        {[['rifts', '⚡ RIFTS'], ['store', '🛒 TOKEN STORE']].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl font-display text-[10px] font-black tracking-widest border transition-all
              ${ activeTab === tab ? 'bg-secondary/20 border-secondary/50 text-secondary' : 'bg-muted/20 border-border/20 text-muted-foreground'}`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'store' && (
        <RiftTokenStore
          riftTokens={riftTokens}
          ownedRiftUpgrades={ownedRiftUpgrades || []}
          onBuy={onBuyRiftUpgrade}
        />
      )}

      {activeTab === 'rifts' && <>
      {/* Header */}
      <div className="rounded-2xl overflow-hidden border border-secondary/30" style={{ background: 'hsl(230 20% 9%)' }}>
        <div className="px-4 py-2 flex items-center justify-between border-b border-border/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive/70" />
              <div className="w-2 h-2 rounded-full bg-accent/70" />
              <div className="w-2 h-2 rounded-full bg-primary/70" />
            </div>
            <span className="font-display text-[10px] font-bold tracking-widest text-muted-foreground">VOID_RIFT.SYS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3 h-3 text-accent" />
            <span className="font-display text-[10px] text-accent font-bold tracking-wide">{riftTokens || 0} TOKENS</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="font-display text-xs font-black tracking-widest text-foreground">VOID RIFTS</p>
          <p className="font-body text-[10px] text-muted-foreground mt-0.5">
            Procedural challenge runs with unique modifiers. Earn Rift Tokens for exclusive upgrades.
          </p>
        </div>
      </div>

      {/* Active Rift View */}
      {activeRift && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border overflow-hidden ${riftComplete ? 'border-primary/50' : riftFailed ? 'border-destructive/50' : 'border-secondary/50'}`}
          style={{ background: 'hsl(230 20% 9%)' }}>
          <div className={`h-0.5 w-full ${riftComplete ? 'bg-primary' : riftFailed ? 'bg-destructive' : 'bg-secondary'}`} />
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-[9px] tracking-widest text-muted-foreground">ACTIVE RIFT</p>
                <p className="font-display text-sm font-black text-foreground">Level {activeRift.level} Rift</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={copyCode} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/30 border border-border/20 font-display text-[9px] tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                  <Copy className="w-3 h-3" />
                  {copied ? 'COPIED!' : activeRift.code}
                </button>
                {!riftComplete && !riftFailed && (
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                )}
                {!riftComplete && !riftFailed && <RiftTimer endTime={activeRift.startTime + activeRift.duration} />}
              </div>
            </div>

            {/* Credit Progress */}
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-body text-[10px] text-muted-foreground">CREDITS EARNED IN RIFT</span>
                <span className={`font-display text-[10px] font-bold ${riftComplete ? 'text-primary' : 'text-foreground'}`}>
                  {formatNumber(activeRift.earnedCredits || 0)} / {formatNumber(activeRift.creditGoal)}
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div className={`h-full rounded-full ${riftComplete ? 'bg-primary' : 'bg-secondary'}`}
                  animate={{ width: `${earnedPct}%` }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            {/* Modifiers active */}
            <div className="space-y-1.5">
              {activeRift.modifiers.map(mod => <ModifierBadge key={mod.id} mod={mod} />)}
            </div>

            {riftComplete && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl bg-primary/15 border border-primary/40 p-3 text-center">
                <p className="font-display text-xs font-black text-primary">RIFT COMPLETE!</p>
                <p className="font-body text-[10px] text-muted-foreground mt-1">+{activeRift.tokenReward} Rift Tokens earned</p>
                <motion.button whileTap={{ scale: 0.95 }} onClick={onAbandonRift}
                  className="mt-2 px-4 py-1.5 rounded-xl font-display text-[10px] font-black tracking-widest text-primary-foreground"
                  style={{ background: 'hsl(var(--primary))' }}>
                  COLLECT REWARDS
                </motion.button>
              </motion.div>
            )}

            {riftFailed && !riftComplete && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl bg-destructive/10 border border-destructive/30 p-3 text-center">
                <p className="font-display text-xs font-black text-destructive">RIFT FAILED</p>
                <p className="font-body text-[10px] text-muted-foreground mt-1">Time expired. Better luck next rift!</p>
                <button onClick={onAbandonRift}
                  className="mt-2 px-4 py-1.5 rounded-xl font-display text-[10px] font-black tracking-widest text-destructive-foreground"
                  style={{ background: 'hsl(var(--destructive))' }}>
                  CLOSE RIFT
                </button>
              </motion.div>
            )}

            {riftActive && (
              <button onClick={onAbandonRift}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display text-[10px] font-bold tracking-widest text-muted-foreground bg-muted/20 border border-border/20 hover:text-destructive transition-colors">
                <X className="w-3 h-3" /> ABANDON RIFT
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Rift Selector (when no active rift) */}
      {!activeRift && (
        <>
          {/* Level selector */}
          <div className="rounded-2xl border border-border/30 bg-card/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-display text-xs font-black tracking-widest text-foreground">SELECT RIFT LEVEL</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedLevel(l => Math.max(1, l - 1))}
                  className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center font-bold text-foreground hover:bg-muted">-</button>
                <span className="font-display text-sm font-black text-accent w-6 text-center">{selectedLevel}</span>
                <button onClick={() => setSelectedLevel(l => Math.min(maxLevel, l + 1))}
                  className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center font-bold text-foreground hover:bg-muted">+</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-body text-muted-foreground">
              <div className="flex items-center gap-1"><Trophy className="w-3 h-3 text-accent" />{previewRift.tokenReward} tokens on win</div>
              <div className="flex items-center gap-1"><Zap className="w-3 h-3 text-secondary" />Goal: {formatNumber(previewRift.creditGoal)}</div>
              <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" />20 minute window</div>
              <div className="flex items-center gap-1">
                <button onClick={copyCode} className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Copy className="w-3 h-3" />{copied ? 'Copied!' : `Code: ${previewRift.code}`}
                </button>
              </div>
            </div>
          </div>

          {/* Modifiers preview */}
          <div className="space-y-2">
            <p className="font-display text-[10px] font-bold tracking-widest text-muted-foreground px-1">RIFT MODIFIERS PREVIEW</p>
            {previewRift.modifiers.map(mod => <ModifierBadge key={mod.id} mod={mod} />)}
          </div>

          {/* Start Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onStartRift(selectedLevel)}
            className="w-full py-4 rounded-2xl font-display text-sm font-black tracking-widest shadow-lg flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, hsl(270 60% 55%), hsl(270 50% 40%))' }}
          >
            <Play className="w-4 h-4" fill="currentColor" />
            ENTER THE VOID
          </motion.button>
        </>
      )}

      </>}
    </div>
  );
}