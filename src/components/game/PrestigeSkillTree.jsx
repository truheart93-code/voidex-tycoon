import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Lock, ChevronRight } from 'lucide-react';
import { PRESTIGE_UPGRADES } from '@/lib/gameData';

const BRANCHES = [
  {
    id: 'wealth', label: 'Wealth', emoji: '💰', color: '#f59e0b',
    ids: ['pup_free_gen', 'pup_free_gen2', 'pup_start_cash', 'pup_start_cash2', 'pup_start_cash3', 'pup_start_cash4'],
  },
  {
    id: 'efficiency', label: 'Efficiency', emoji: '⚙️', color: '#22d3ee',
    ids: ['pup_offline', 'pup_offline2', 'pup_offline3', 'pup_managers', 'pup_upgrades', 'pup_gen_discount', 'pup_gen_discount2'],
  },
  {
    id: 'income', label: 'Income', emoji: '📈', color: '#a78bfa',
    ids: ['pup_income1', 'pup_income2', 'pup_income3', 'pup_income4', 'pup_income5', 'pup_star_boost', 'pup_star_boost2'],
  },
  {
    id: 'speed', label: 'Speed & Tap', emoji: '⚡', color: '#34d399',
    ids: ['pup_time1', 'pup_time2', 'pup_time3', 'pup_click', 'pup_click2', 'pup_click3'],
  },
  {
    id: 'misc', label: 'Special', emoji: '🌟', color: '#f472b6',
    ids: ['pup_auto_start'],
  },
];

function UpgradeNode({ upg, owned, locked, canAfford, color, onBuy, isLast }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex gap-2">
      {/* Vertical connector line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 28 }}>
        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm z-10 transition-all ${
          owned ? '' : locked ? 'bg-muted/50 border-border/30' : canAfford ? '' : 'bg-muted/30 border-border/20'
        }`}
          style={owned ? { background: `${color}33`, borderColor: color, boxShadow: `0 0 8px ${color}44` }
            : canAfford ? { background: `${color}15`, borderColor: `${color}66` } : {}}>
          {owned ? '✓' : locked ? '🔒' : upg.emoji}
        </div>
        {!isLast && <div className="w-0.5 flex-1 mt-1" style={{ background: owned ? `${color}55` : 'hsl(230 15% 22%)' }} />}
      </div>

      {/* Card */}
      <div className="flex-1 mb-2">
        <button
          onClick={() => setExpanded(e => !e)}
          className={`w-full rounded-xl border p-3 text-left transition-all ${
            owned ? 'border-border/30 bg-card/40' :
            locked ? 'border-border/20 bg-muted/10 opacity-50' :
            canAfford ? 'border-border/50 bg-card/70' :
            'border-border/20 bg-muted/20 opacity-60'
          }`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-display text-xs font-bold text-foreground truncate">{upg.name}</p>
                {owned && <Check className="w-3 h-3 flex-shrink-0" style={{ color }} />}
              </div>
              <p className="font-body text-[10px] text-muted-foreground">{upg.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!owned && !locked && (
                <div className="flex items-center gap-0.5" style={{ color }}>
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-display text-xs font-bold">{upg.cost}</span>
                </div>
              )}
              {locked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
            </div>
          </div>
        </button>

        {/* Buy button - shown when expanded and can afford */}
        {expanded && !owned && !locked && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
            <div className="px-3 pb-2 pt-1">
              {canAfford ? (
                <button onClick={() => { onBuy(upg.id); setExpanded(false); }}
                  className="w-full py-2 rounded-lg font-display text-[10px] font-black tracking-widest active:scale-95 transition-all"
                  style={{ background: color, color: 'hsl(230 25% 7%)' }}>
                  UNLOCK — {upg.cost} ★
                </button>
              ) : (
                <p className="font-body text-[10px] text-muted-foreground text-center">Not enough stars ({upg.cost} needed)</p>
              )}
            </div>
          </motion.div>
        )}
        {expanded && locked && upg.requires && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
            <div className="px-3 pb-2">
              <p className="font-body text-[10px] text-destructive/70">
                Requires: {PRESTIGE_UPGRADES.find(u => u.id === upg.requires)?.name}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PrestigeSkillTree({ prestigeUpgrades, availableStars, onBuy }) {
  const [activeBranch, setActiveBranch] = useState('wealth');
  const owned = prestigeUpgrades || [];

  const branch = BRANCHES.find(b => b.id === activeBranch);
  const upgrades = branch.ids.map(id => PRESTIGE_UPGRADES.find(u => u.id === id)).filter(Boolean);

  return (
    <div className="space-y-3">
      {/* Branch selector */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {BRANCHES.map(b => (
          <button key={b.id} onClick={() => setActiveBranch(b.id)}
            className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-display text-[9px] font-black tracking-wider transition-all ${
              activeBranch === b.id ? 'border-transparent' : 'border-border/30 bg-muted/20 text-muted-foreground'
            }`}
            style={activeBranch === b.id ? { background: b.color, color: 'hsl(230 25% 7%)' } : {}}>
            {b.emoji} {b.label}
          </button>
        ))}
      </div>

      {/* Branch header */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-5 h-5 rounded-full flex items-center justify-center text-sm"
          style={{ background: `${branch.color}33`, border: `1px solid ${branch.color}66` }}>
          {branch.emoji}
        </div>
        <p className="font-display text-xs font-bold tracking-wide" style={{ color: branch.color }}>{branch.label}</p>
        <div className="flex-1 h-px" style={{ background: `${branch.color}33` }} />
      </div>

      {/* Upgrade chain */}
      <div className="pl-1">
        {upgrades.map((upg, i) => {
          const isOwned = owned.includes(upg.id);
          const isLocked = upg.requires && !owned.includes(upg.requires);
          const canAfford = !isLocked && !isOwned && availableStars >= upg.cost;
          return (
            <UpgradeNode
              key={upg.id}
              upg={upg}
              owned={isOwned}
              locked={!!isLocked}
              canAfford={canAfford}
              color={branch.color}
              onBuy={onBuy}
              isLast={i === upgrades.length - 1}
            />
          );
        })}
      </div>

      {/* Stars info */}
      <div className="flex items-center gap-2 px-1 py-2 rounded-xl bg-muted/20 border border-border/20 justify-center">
        <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
        <span className="font-display text-xs font-bold text-secondary">{availableStars}</span>
        <span className="font-body text-xs text-muted-foreground">stars available</span>
      </div>
    </div>
  );
}