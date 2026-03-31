import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Star, AlertTriangle, ChevronRight } from 'lucide-react';
import { formatNumber } from '@/lib/gameData';

export const GALAXY_THRESHOLDS = [100, 250, 500];
export const GALAXY_NAMES = ['Milky Way', 'Andromeda', 'Triangulum', 'Whirlpool'];
export const GALAXY_MULTIPLIERS = [1, 2, 4, 8]; // cumulative income multiplier per galaxy

export default function GalaxyAscension({ state, onAscend }) {
  const [confirming, setConfirming] = useState(false);

  const galaxyCount = state.galaxyCount || 0;
  const currentGalaxy = GALAXY_NAMES[galaxyCount] || GALAXY_NAMES[GALAXY_NAMES.length - 1];
  const nextGalaxy = GALAXY_NAMES[galaxyCount + 1];
  const nextThreshold = GALAXY_THRESHOLDS[galaxyCount];
  const canAscend = galaxyCount < GALAXY_THRESHOLDS.length && state.prestigeStars >= (nextThreshold || Infinity);
  const maxReached = galaxyCount >= GALAXY_THRESHOLDS.length;

  const currentMult = GALAXY_MULTIPLIERS[galaxyCount] || GALAXY_MULTIPLIERS[GALAXY_MULTIPLIERS.length - 1];
  const nextMult = GALAXY_MULTIPLIERS[galaxyCount + 1] || currentMult;

  return (
    <div className="space-y-4">
      {/* Current Galaxy Status */}
      <div className="rounded-2xl border border-primary/30 overflow-hidden" style={{ background: 'hsl(230 20% 9%)' }}>
        <div className="h-0.5" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }} />
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl">
              🌌
            </div>
            <div>
              <p className="font-display text-[9px] tracking-widest text-muted-foreground">CURRENT GALAXY</p>
              <p className="font-display text-base font-black text-foreground">{currentGalaxy}</p>
              <p className="font-body text-xs text-primary">×{currentMult} income multiplier</p>
            </div>
          </div>

          {/* Galaxy path */}
          <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
            {GALAXY_NAMES.map((name, i) => {
              const unlocked = i <= galaxyCount;
              const isCurrent = i === galaxyCount;
              return (
                <div key={name} className="flex items-center gap-1 flex-shrink-0">
                  <div className={`flex flex-col items-center`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm transition-all ${
                      isCurrent ? 'border-primary bg-primary/20 shadow-md shadow-primary/30' :
                      unlocked ? 'border-accent/50 bg-accent/10' :
                      'border-border/30 bg-muted/20 opacity-40'
                    }`}>
                      {unlocked ? (isCurrent ? '🌌' : '✅') : '🔒'}
                    </div>
                    <span className={`font-display text-[7px] font-bold mt-0.5 tracking-wide ${isCurrent ? 'text-primary' : unlocked ? 'text-muted-foreground' : 'text-border/50'}`}>
                      {name.split(' ')[0]}
                    </span>
                  </div>
                  {i < GALAXY_NAMES.length - 1 && (
                    <ChevronRight className={`w-3 h-3 flex-shrink-0 ${unlocked && i < galaxyCount ? 'text-accent/60' : 'text-border/30'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress to next */}
          {!maxReached && (
            <div className="rounded-xl bg-muted/30 p-3 mb-4">
              <div className="flex justify-between mb-1.5">
                <span className="font-body text-[10px] text-muted-foreground">Stars for next galaxy</span>
                <span className="font-display text-[10px] font-bold text-foreground">
                  {state.prestigeStars} / {nextThreshold}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${Math.min((state.prestigeStars / nextThreshold) * 100, 100)}%` }} />
              </div>
              {canAscend && (
                <p className="font-body text-[10px] text-primary mt-1.5">✓ Ready to ascend to {nextGalaxy}!</p>
              )}
            </div>
          )}

          {/* What you gain/lose */}
          {!maxReached && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3">
                <p className="font-display text-[9px] font-bold tracking-wide text-destructive mb-1.5">YOU LOSE</p>
                <div className="space-y-1">
                  {['All generators', 'All managers', 'All upgrades', 'Prestige stars', 'Star tree progress'].map(item => (
                    <p key={item} className="font-body text-[10px] text-muted-foreground">✗ {item}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-3">
                <p className="font-display text-[9px] font-bold tracking-wide text-primary mb-1.5">YOU KEEP</p>
                <div className="space-y-1">
                  {['Achievements', 'Lifetime stats', 'Rift Tokens', 'Rift store unlocks'].map(item => (
                    <p key={item} className="font-body text-[10px] text-muted-foreground">✓ {item}</p>
                  ))}
                  <p className="font-body text-[10px] text-primary font-bold">+ ×{nextMult} global income!</p>
                </div>
              </div>
            </div>
          )}

          {maxReached ? (
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-display text-xs font-black tracking-widest text-accent">ALL GALAXIES CONQUERED</p>
              <p className="font-body text-xs text-muted-foreground mt-1">You've ascended through all known galaxies. ×{currentMult} permanent income boost active.</p>
            </div>
          ) : (
            <>
              <button
                onClick={() => { if (!confirming) setConfirming(true); else { onAscend(); setConfirming(false); } }}
                disabled={!canAscend}
                className={`w-full py-3 rounded-xl font-display text-sm font-black tracking-wide transition-all ${
                  !canAscend ? 'bg-muted text-muted-foreground opacity-40' :
                  confirming ? 'bg-destructive text-destructive-foreground animate-pulse shadow-lg shadow-destructive/30' :
                  'active:scale-95 shadow-lg'
                }`}
                style={canAscend && !confirming ? { background: 'linear-gradient(135deg, hsl(270 60% 55%), hsl(185 80% 45%))' } : {}}>
                {confirming ? '⚠️ CONFIRM GALAXY JUMP — ALL PROGRESS RESETS' :
                  canAscend ? `🌌 ASCEND TO ${nextGalaxy?.toUpperCase()}` :
                  `NEED ${nextThreshold} PRESTIGE STARS`}
              </button>
              {confirming && (
                <button onClick={() => setConfirming(false)} className="mt-2 w-full font-body text-xs text-muted-foreground underline">
                  Cancel
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-xl border border-border/20 bg-muted/10 p-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="font-display text-[9px] text-muted-foreground tracking-widest">GALAXIES</p>
          <p className="font-display text-lg font-black text-foreground">{galaxyCount}</p>
        </div>
        <div>
          <p className="font-display text-[9px] text-muted-foreground tracking-widest">BONUS</p>
          <p className="font-display text-lg font-black text-primary">×{currentMult}</p>
        </div>
        <div>
          <p className="font-display text-[9px] text-muted-foreground tracking-widest">LIFETIME</p>
          <p className="font-display text-sm font-black text-foreground">{formatNumber(state.lifetimeEarned)}</p>
        </div>
      </div>
    </div>
  );
}