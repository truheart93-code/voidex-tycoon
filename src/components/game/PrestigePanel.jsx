import { formatNumber, getPrestigeStars, getPrestigeMultiplier } from '@/lib/gameData';
import { motion } from 'framer-motion';
import { Star, RotateCcw, Zap } from 'lucide-react';
import { useState } from 'react';

export default function PrestigePanel({ state, onPrestige }) {
  const [confirming, setConfirming] = useState(false);
  const currentStars = state.prestigeStars;
  const potentialStars = getPrestigeStars(state.totalEarned);
  const newStars = potentialStars - currentStars;
  const currentMult = getPrestigeMultiplier(currentStars);
  const newMult = getPrestigeMultiplier(potentialStars);

  const handlePrestige = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    onPrestige();
    setConfirming(false);
  };

  return (
    <div className="px-4 pb-4">
      <div className="rounded-2xl border border-secondary/30 bg-gradient-to-b from-secondary/10 to-background p-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4 shadow-lg shadow-secondary/20">
          <Star className="w-8 h-8 text-secondary-foreground" />
        </div>
        
        <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">
          COSMIC REBIRTH
        </h3>
        
        <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
          Reset your empire to gain permanent Star Multipliers. The more you've earned, the more stars you get!
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-muted/50 p-3">
            <p className="font-body text-xs text-muted-foreground">Current Stars</p>
            <p className="font-display text-xl font-bold text-secondary">{currentStars}</p>
            <p className="font-body text-xs text-muted-foreground">x{currentMult.toFixed(1)} multiplier</p>
          </div>
          <div className="rounded-xl bg-muted/50 p-3">
            <p className="font-body text-xs text-muted-foreground">After Rebirth</p>
            <p className="font-display text-xl font-bold text-primary">{potentialStars}</p>
            <p className="font-body text-xs text-primary">x{newMult.toFixed(1)} multiplier</p>
          </div>
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
              : 'bg-muted text-muted-foreground opacity-50'
            }`}
        >
          {confirming ? '⚠️ TAP AGAIN TO CONFIRM RESET' : newStars > 0 ? 'REBIRTH NOW' : 'EARN MORE TO REBIRTH'}
        </button>

        {confirming && (
          <button
            onClick={() => setConfirming(false)}
            className="mt-2 font-body text-xs text-muted-foreground underline"
          >
            Cancel
          </button>
        )}

        <div className="mt-4 rounded-lg bg-muted/30 p-3">
          <p className="font-body text-xs text-muted-foreground">
            Total Earned: 💎{formatNumber(state.totalEarned)}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Lifetime Earned: 💎{formatNumber(state.lifetimeEarned)}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Total Rebirths: {state.totalPrestiges}
          </p>
        </div>
      </div>
    </div>
  );
}