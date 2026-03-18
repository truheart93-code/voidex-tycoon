import { GENERATORS } from '@/lib/gameData';
import GeneratorCard from './GeneratorCard';

export default function GeneratorList({
  state,
  onBuy,
  onCollect,
}) {
  const visibleGenerators = GENERATORS.filter(
    gen => state.totalEarned >= gen.unlockAt || (state.generators[gen.id]?.count || 0) > 0
  );

  // Show next locked generator as teaser
  const nextLocked = GENERATORS.find(
    gen => state.totalEarned < gen.unlockAt && !(state.generators[gen.id]?.count > 0)
  );

  return (
    <div className="space-y-2 px-4 pb-4">
      {visibleGenerators.map(gen => (
        <GeneratorCard
          key={gen.id}
          generator={gen}
          genState={state.generators[gen.id]}
          credits={state.credits}
          prestigeStars={state.prestigeStars}
          upgrades={state.upgrades}
          isManaged={state.managers.includes(gen.id)}
          buyAmount={state.buyAmount}
          onBuy={onBuy}
          onCollect={onCollect}
        />
      ))}
      
      {nextLocked && (
        <div className="relative overflow-hidden rounded-xl border border-dashed border-border/30 bg-card/30 p-4 text-center">
          <div className="text-2xl mb-1 opacity-30">{nextLocked.emoji}</div>
          <p className="font-display text-xs text-muted-foreground tracking-wide">
            {nextLocked.name}
          </p>
          <p className="font-body text-xs text-muted-foreground/60 mt-1">
            Unlocks at 💎{nextLocked.unlockAt.toLocaleString()} total earned
          </p>
        </div>
      )}
    </div>
  );
}