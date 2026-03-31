import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShoppingBag, Check, Lock } from 'lucide-react';

export const RIFT_TOKEN_UPGRADES = [
  // Permanent income boosts
  { id: 'rt_income_5', name: 'Void Dividend', description: '+5% all income permanently', cost: 10, emoji: '💰', type: 'flat_income', value: 1.05, category: 'income' },
  { id: 'rt_income_10', name: 'Rift Surplus', description: '+10% all income permanently', cost: 25, emoji: '📈', type: 'flat_income', value: 1.10, category: 'income', requires: 'rt_income_5' },
  { id: 'rt_income_25', name: 'Chaos Dividend', description: '+25% all income permanently', cost: 60, emoji: '⚡', type: 'flat_income', value: 1.25, category: 'income', requires: 'rt_income_10' },
  { id: 'rt_income_50', name: 'Void Mastery', description: '+50% all income permanently', cost: 150, emoji: '🌌', type: 'flat_income', value: 1.50, category: 'income', requires: 'rt_income_25' },

  // Speed
  { id: 'rt_speed_1', name: 'Rift Overclock', description: 'All generators run 10% faster', cost: 15, emoji: '⏩', type: 'speed_multiplier', value: 1.10, category: 'speed' },
  { id: 'rt_speed_2', name: 'Temporal Tear', description: 'All generators run 25% faster', cost: 40, emoji: '💨', type: 'speed_multiplier', value: 1.25, category: 'speed', requires: 'rt_speed_1' },

  // Offline
  { id: 'rt_offline_1', name: 'Dream Cache', description: '+25% offline earnings efficiency', cost: 20, emoji: '😴', type: 'offline_bonus', value: 0.25, category: 'offline' },
  { id: 'rt_offline_2', name: 'Void Sleep', description: '+50% more offline earnings', cost: 50, emoji: '💤', type: 'offline_bonus', value: 0.50, category: 'offline', requires: 'rt_offline_1' },

  // Start bonuses
  { id: 'rt_start_1', name: 'Rift Inheritance', description: 'Start each run with 1 free Solar Collector', cost: 30, emoji: '🎁', type: 'free_solar', value: 1, category: 'start' },
  { id: 'rt_start_2', name: 'Void Headstart', description: '1st manager costs only 1 credit', cost: 45, emoji: '🤖', type: 'free_first_manager', value: 1, category: 'start', requires: 'rt_start_1' },

  // Click power
  { id: 'rt_click_1', name: 'Void Finger', description: 'Manual taps earn 5x more', cost: 20, emoji: '👆', type: 'click_multiplier', value: 5, category: 'tap' },
  { id: 'rt_click_2', name: 'Rift Strike', description: 'Manual taps earn 15x more', cost: 55, emoji: '🖐️', type: 'click_multiplier', value: 15, category: 'tap', requires: 'rt_click_1' },
];

const CATEGORY_LABELS = {
  income: { label: 'Income', color: '#f59e0b', emoji: '💎' },
  speed: { label: 'Speed', color: '#22d3ee', emoji: '⚡' },
  offline: { label: 'Offline', color: '#a78bfa', emoji: '😴' },
  start: { label: 'Headstart', color: '#34d399', emoji: '🚀' },
  tap: { label: 'Tap Power', color: '#f472b6', emoji: '👆' },
};

export function getRiftTokenMultiplier(type, ownedRiftUpgrades = []) {
  let mult = 1;
  RIFT_TOKEN_UPGRADES.filter(u => u.type === type && ownedRiftUpgrades.includes(u.id))
    .forEach(u => { mult *= u.value; });
  return mult;
}

export function getRiftTokenOfflineBonus(ownedRiftUpgrades = []) {
  let bonus = 0;
  RIFT_TOKEN_UPGRADES.filter(u => u.type === 'offline_bonus' && ownedRiftUpgrades.includes(u.id))
    .forEach(u => { bonus += u.value; });
  return bonus;
}

export default function RiftTokenStore({ riftTokens, ownedRiftUpgrades = [], onBuy }) {
  const [selectedCat, setSelectedCat] = useState('income');

  const categories = [...new Set(RIFT_TOKEN_UPGRADES.map(u => u.category))];
  const filtered = RIFT_TOKEN_UPGRADES.filter(u => u.category === selectedCat);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-accent" />
          <p className="font-display text-xs font-black tracking-widest text-foreground">TOKEN STORE</p>
        </div>
        <div className="flex items-center gap-1.5 bg-accent/15 rounded-full px-3 py-1">
          <Trophy className="w-3 h-3 text-accent" />
          <span className="font-display text-xs font-bold text-accent">{riftTokens} TOKENS</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => {
          const info = CATEGORY_LABELS[cat];
          return (
            <button key={cat} onClick={() => setSelectedCat(cat)}
              className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-display text-[9px] font-black tracking-wider transition-all ${
                selectedCat === cat ? 'border-transparent text-background' : 'border-border/30 bg-muted/20 text-muted-foreground'
              }`}
              style={selectedCat === cat ? { background: info.color, color: 'hsl(230 25% 7%)' } : {}}>
              {info.emoji} {info.label}
            </button>
          );
        })}
      </div>

      {/* Upgrades list */}
      <div className="space-y-2">
        {filtered.map((upg, i) => {
          const owned = ownedRiftUpgrades.includes(upg.id);
          const parentOwned = !upg.requires || ownedRiftUpgrades.includes(upg.requires);
          const locked = !parentOwned;
          const canAfford = !owned && !locked && riftTokens >= upg.cost;
          const catInfo = CATEGORY_LABELS[upg.category];

          return (
            <motion.div key={upg.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border p-3 flex items-center gap-3 transition-all ${
                owned ? 'border-accent/30 bg-accent/5'
                : locked ? 'border-border/20 bg-muted/10 opacity-50'
                : canAfford ? 'border-border/40 bg-card/80'
                : 'border-border/20 bg-muted/10'
              }`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${catInfo.color}22`, border: `1px solid ${catInfo.color}44` }}>
                {upg.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-xs font-bold text-foreground">{upg.name}</h4>
                <p className="font-body text-[10px] text-muted-foreground">{upg.description}</p>
                {locked && upg.requires && (
                  <p className="font-body text-[9px] text-destructive/70 mt-0.5">
                    Requires: {RIFT_TOKEN_UPGRADES.find(u => u.id === upg.requires)?.name}
                  </p>
                )}
              </div>
              {owned ? (
                <Check className="w-5 h-5 flex-shrink-0" style={{ color: catInfo.color }} />
              ) : locked ? (
                <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <button onClick={() => canAfford && onBuy(upg.id)}
                  disabled={!canAfford}
                  className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg font-display text-[9px] font-black tracking-wide transition-all ${
                    canAfford ? 'active:scale-90 shadow-md' : 'opacity-40'
                  }`}
                  style={canAfford ? { background: catInfo.color, color: 'hsl(230 25% 7%)' } : { background: 'hsl(230 15% 18%)', color: 'hsl(210 20% 50%)' }}>
                  <Trophy className="w-3 h-3" />
                  {upg.cost}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}