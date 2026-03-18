import { formatNumber, getPrestigeMultiplier } from '@/lib/gameData';
import { Volume2, VolumeX, Star } from 'lucide-react';

export default function Header({ credits, prestigeStars, isMusicOn, onToggleMusic }) {
  const multiplier = getPrestigeMultiplier(prestigeStars);
  
  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <h1 className="font-display text-sm font-bold tracking-wider text-primary">
              STELLAR EMPIRE
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {prestigeStars > 0 && (
              <div className="flex items-center gap-1 bg-secondary/20 rounded-full px-2 py-0.5">
                <Star className="w-3 h-3 text-secondary fill-secondary" />
                <span className="text-xs font-body font-semibold text-secondary">{prestigeStars}</span>
                <span className="text-xs font-body text-muted-foreground">x{multiplier.toFixed(1)}</span>
              </div>
            )}
            <button
              onClick={onToggleMusic}
              className="p-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMusicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">💎</span>
          <span className="font-display text-2xl font-black tracking-wide text-foreground">
            {formatNumber(credits)}
          </span>
        </div>
      </div>
    </div>
  );
}