import { formatNumber } from '@/lib/gameData';
import { TrendingUp, Zap, Award } from 'lucide-react';

export default function StatsBar({ state, creditsPerSec }) {
  const totalGens = Object.values(state.generators).reduce((s, g) => s + (g?.count || 0), 0);
  const managedCount = state.managers.length;

  return (
    <div className="flex items-center justify-around px-4 py-1.5 bg-card/40 border-b border-border/20">
      <div className="flex items-center gap-1.5">
        <TrendingUp className="w-3 h-3 text-primary" />
        <div className="text-center">
          <div className="font-display text-[10px] font-black text-primary">{formatNumber(creditsPerSec)}/s</div>
          <div className="font-body text-[8px] text-muted-foreground tracking-wide">PASSIVE</div>
        </div>
      </div>
      <div className="w-px h-6 bg-border/40" />
      <div className="flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-accent" />
        <div className="text-center">
          <div className="font-display text-[10px] font-black text-accent">{totalGens}</div>
          <div className="font-body text-[8px] text-muted-foreground tracking-wide">GENERATORS</div>
        </div>
      </div>
      <div className="w-px h-6 bg-border/40" />
      <div className="flex items-center gap-1.5">
        <Award className="w-3 h-3 text-secondary" />
        <div className="text-center">
          <div className="font-display text-[10px] font-black text-secondary">{formatNumber(state.lifetimeEarned)}</div>
          <div className="font-body text-[8px] text-muted-foreground tracking-wide">ALL TIME</div>
        </div>
      </div>
    </div>
  );
}