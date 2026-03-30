import { formatNumber, getPrestigeStars, getPrestigeMultiplier, PRESTIGE_UPGRADES } from '@/lib/gameData';
import { motion } from 'framer-motion';
import { Star, RotateCcw, Zap, Lock, Check } from 'lucide-react';
import { useState } from 'react';
import PrestigeSkillTree from './PrestigeSkillTree';

function PrestigeUpgradeCard({ upg, owned, canAfford, onBuy, locked }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-3 flex items-center gap-3 transition-all
        ${owned ? 'border-accent/40 bg-accent/5'
        : locked ? 'border-border/20 bg-muted/20 opacity-50'
        : 'border-border/50 bg-card/80'}`}
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center text-xl flex-shrink-0">
        {upg.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display text-xs font-bold tracking-wide text-foreground">{upg.name}</h4>
        <p className="font-body text-xs text-muted-foreground">{upg.description}</p>
      </div>
      {owned ? (
        <div className="flex items-center gap-1 text-accent flex-shrink-0">
          <Check className="w-4 h-4" />
        </div>
      ) : locked ? (
        <div className="flex-shrink-0">
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
      ) : (
        <button
          onClick={() => onBuy(upg.id)}
          disabled={!canAfford}
          className={`flex-shrink-0 px-3 py-2 rounded-lg font-body text-xs font-bold transition-all
            ${canAfford
              ? 'bg-secondary text-secondary-foreground shadow-md active:scale-95'
              : 'bg-muted text-muted-foreground opacity-50'}`}
        >
          <div className="text-center">
            <Star className="w-3 h-3 mx-auto" />
            <div className="text-[10px]">{upg.cost}★</div>
          </div>
        </button>
      )}
    </motion.div>
  );
}

export default function PrestigePanel({ state, onPrestige, onBuyPrestigeUpgrade }) {
  const [confirming, setConfirming] = useState(false);
  const [activeSection, setActiveSection] = useState('rebirth');

  const prestigeUpgrades = state.prestigeUpgrades || [];
  const currentStars = state.prestigeStars;
  const potentialStars = getPrestigeStars(state.totalEarned);
  const newStars = potentialStars - currentStars;
  const currentMult = getPrestigeMultiplier(currentStars, prestigeUpgrades);
  const newMult = getPrestigeMultiplier(potentialStars, prestigeUpgrades);

  // Spent stars = sum of costs of owned prestige upgrades
  const spentStars = PRESTIGE_UPGRADES.filter(u => prestigeUpgrades.includes(u.id)).reduce((s, u) => s + u.cost, 0);
  const availableStars = currentStars - spentStars;

  const handlePrestige = () => {
    if (!confirming) { setConfirming(true); return; }
    onPrestige();
    setConfirming(false);
  };

  return (
    <div className="px-4 pb-4">
      {/* Section tabs */}
      <div className="flex gap-2 mb-4">
        {['rebirth', 'upgrades'].map(s => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`flex-1 py-2 rounded-xl font-display text-xs font-bold tracking-wide transition-all
              ${activeSection === s
                ? 'bg-secondary text-secondary-foreground shadow-md'
                : 'bg-muted text-muted-foreground'}`}
          >
            {s === 'rebirth' ? '♻️ REBIRTH' : '⭐ STAR SHOP'}
          </button>
        ))}
      </div>

      {activeSection === 'rebirth' && (
        <div className="rounded-2xl border border-secondary/30 bg-gradient-to-b from-secondary/10 to-background p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4 shadow-lg shadow-secondary/20">
            <Star className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">COSMIC REBIRTH</h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            Reset your empire to gain permanent Star Multipliers. Spend stars in the Star Shop for lasting bonuses!
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="font-body text-xs text-muted-foreground">Current Stars</p>
              <p className="font-display text-xl font-bold text-secondary">{currentStars}</p>
              <p className="font-body text-xs text-muted-foreground">x{currentMult.toFixed(2)} mult</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="font-body text-xs text-muted-foreground">After Rebirth</p>
              <p className="font-display text-xl font-bold text-primary">{potentialStars}</p>
              <p className="font-body text-xs text-primary">x{newMult.toFixed(2)} mult</p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-2 mb-4 flex items-center justify-center gap-2">
            <Star className="w-3 h-3 text-accent fill-accent" />
            <span className="font-body text-xs text-muted-foreground">
              Available stars: <span className="text-accent font-bold">{availableStars}</span> / {currentStars}
            </span>
          </div>

          {newStars > 0 && (
            <div className="flex items-center justify-center gap-2 mb-4 text-accent">
              <Zap className="w-4 h-4" />
              <span className="font-body text-sm font-bold">+{newStars} new stars!</span>
            </div>
          )}

          <button
            onClick={handlePrestige}
            disabled={newStars <= 0}
            className={`w-full py-3 rounded-xl font-display text-sm font-bold tracking-wide transition-all
              ${newStars > 0
                ? confirming
                  ? 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30 animate-pulse'
                  : 'bg-gradient-to-r from-secondary to-primary text-primary-foreground shadow-lg shadow-secondary/30 active:scale-95'
                : 'bg-muted text-muted-foreground opacity-50'}`}
          >
            {confirming ? '⚠️ TAP AGAIN TO CONFIRM RESET' : newStars > 0 ? 'REBIRTH NOW' : 'EARN MORE TO REBIRTH'}
          </button>

          {confirming && (
            <button onClick={() => setConfirming(false)} className="mt-2 font-body text-xs text-muted-foreground underline">
              Cancel
            </button>
          )}

          <div className="mt-4 rounded-lg bg-muted/30 p-3 text-left space-y-1">
            <p className="font-body text-xs text-muted-foreground">Total Earned: 💎{formatNumber(state.totalEarned)}</p>
            <p className="font-body text-xs text-muted-foreground">Lifetime Earned: 💎{formatNumber(state.lifetimeEarned)}</p>
            <p className="font-body text-xs text-muted-foreground">Total Rebirths: {state.totalPrestiges}</p>
            <p className="font-body text-xs text-muted-foreground">Rebirth at: 💎{formatNumber(1000000)} (1M+)</p>
          </div>
        </div>
      )}

      {activeSection === 'upgrades' && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div>
              <p className="font-body text-xs text-muted-foreground">Tap a node to unlock — hover for details</p>
            </div>
            <div className="flex items-center gap-1 bg-secondary/20 rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-secondary fill-secondary" />
              <span className="font-display text-xs font-bold text-secondary">{availableStars} stars</span>
            </div>
          </div>
          {currentStars === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3 opacity-40">🌟</div>
              <p className="font-body text-sm text-muted-foreground">Prestige to earn stars and unlock skills!</p>
            </div>
          ) : (
            <PrestigeSkillTree
              prestigeUpgrades={prestigeUpgrades}
              availableStars={availableStars}
              onBuy={onBuyPrestigeUpgrade}
            />
          )}
        </div>
      )}
    </div>
  );
}