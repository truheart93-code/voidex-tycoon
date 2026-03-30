import { motion } from 'framer-motion';
import { Star, Check, Lock } from 'lucide-react';
import { PRESTIGE_UPGRADES } from '@/lib/gameData';

// Tree layout: col × row grid positions
const TREE_LAYOUT = [
  // Col 0 — Wealth
  { id: 'pup_free_gen',      col: 0, row: 0 },
  { id: 'pup_start_cash',    col: 0, row: 1 },
  { id: 'pup_start_cash2',   col: 0, row: 2 },
  { id: 'pup_start_cash3',   col: 0, row: 3 },
  // Col 1 — Efficiency
  { id: 'pup_offline',       col: 1, row: 0 },
  { id: 'pup_offline2',      col: 1, row: 1 },
  { id: 'pup_managers',      col: 1, row: 2 },
  { id: 'pup_upgrades',      col: 1, row: 3 },
  // Col 2 — Income
  { id: 'pup_income1',       col: 2, row: 0 },
  { id: 'pup_income2',       col: 2, row: 1 },
  { id: 'pup_income3',       col: 2, row: 2 },
  // Col 3 — Speed & Tap
  { id: 'pup_time1',         col: 3, row: 0 },
  { id: 'pup_time2',         col: 3, row: 1 },
  { id: 'pup_click',         col: 3, row: 2 },
  { id: 'pup_click2',        col: 3, row: 3 },
];

const COL_SIZE = 100;
const ROW_SIZE = 100;
const NODE_R = 28;
const COLS = 4;
const ROWS = 4;
const SVG_W = COLS * COL_SIZE;
const SVG_H = ROWS * ROW_SIZE;

const BRANCH_COLORS = {
  0: '#f59e0b',   // amber — wealth
  1: '#22d3ee',   // cyan — efficiency
  2: '#a78bfa',   // violet — income
  3: '#34d399',   // emerald — speed/tap
};

function nodeCenter(col, row) {
  return {
    cx: col * COL_SIZE + COL_SIZE / 2,
    cy: row * ROW_SIZE + ROW_SIZE / 2,
  };
}

export default function PrestigeSkillTree({ prestigeUpgrades, availableStars, onBuy }) {
  const owned = prestigeUpgrades || [];

  // Build edges from `requires` relationships
  const edges = TREE_LAYOUT.filter(n => {
    const upg = PRESTIGE_UPGRADES.find(u => u.id === n.id);
    return upg?.requires;
  }).map(n => {
    const upg = PRESTIGE_UPGRADES.find(u => u.id === n.id);
    const parent = TREE_LAYOUT.find(l => l.id === upg.requires);
    if (!parent) return null;
    return { from: parent, to: n, ownedEdge: owned.includes(upg.requires) && owned.includes(n.id) };
  }).filter(Boolean);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative mx-auto" style={{ width: SVG_W, height: SVG_H }}>
        {/* SVG edges */}
        <svg
          width={SVG_W}
          height={SVG_H}
          className="absolute inset-0 pointer-events-none"
        >
          {edges.map((edge, i) => {
            const from = nodeCenter(edge.from.col, edge.from.row);
            const to = nodeCenter(edge.to.col, edge.to.row);
            const color = BRANCH_COLORS[edge.from.col] || '#6b7280';
            return (
              <line
                key={i}
                x1={from.cx} y1={from.cy}
                x2={to.cx} y2={to.cy}
                stroke={color}
                strokeWidth={edge.ownedEdge ? 2.5 : 1.5}
                strokeOpacity={edge.ownedEdge ? 0.7 : 0.2}
                strokeDasharray={edge.ownedEdge ? undefined : '4 3'}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {TREE_LAYOUT.map(({ id, col, row }) => {
          const upg = PRESTIGE_UPGRADES.find(u => u.id === id);
          if (!upg) return null;
          const isOwned = owned.includes(id);
          const isLocked = upg.requires && !owned.includes(upg.requires);
          const canAfford = !isLocked && availableStars >= upg.cost && !isOwned;
          const { cx, cy } = nodeCenter(col, row);
          const color = BRANCH_COLORS[col];

          return (
            <motion.div
              key={id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (col * ROWS + row) * 0.04, type: 'spring', damping: 15 }}
              style={{
                position: 'absolute',
                left: cx - NODE_R,
                top: cy - NODE_R,
                width: NODE_R * 2,
                height: NODE_R * 2,
              }}
            >
              <button
                onClick={() => !isOwned && !isLocked && canAfford && onBuy(id)}
                disabled={isOwned || isLocked || !canAfford}
                className="relative w-full h-full rounded-full flex items-center justify-center transition-all active:scale-90 group"
                style={{
                  background: isOwned
                    ? `radial-gradient(circle, ${color}55, ${color}22)`
                    : isLocked
                      ? 'hsl(230 15% 18%)'
                      : canAfford
                        ? `radial-gradient(circle, ${color}33, ${color}11)`
                        : 'hsl(230 15% 14%)',
                  border: isOwned
                    ? `2px solid ${color}`
                    : isLocked
                      ? '2px solid hsl(230 15% 25%)'
                      : canAfford
                        ? `2px solid ${color}88`
                        : '2px solid hsl(230 15% 22%)',
                  boxShadow: isOwned
                    ? `0 0 12px ${color}44`
                    : canAfford
                      ? `0 0 8px ${color}22`
                      : 'none',
                }}
              >
                {isOwned ? (
                  <Check
                    className="w-4 h-4 absolute top-0.5 right-0.5"
                    style={{ color }}
                  />
                ) : isLocked ? (
                  <Lock className="w-3 h-3 absolute top-0.5 right-0.5 text-muted-foreground opacity-60" />
                ) : null}

                <span className={`text-lg leading-none ${isLocked ? 'grayscale opacity-40' : ''}`}>
                  {upg.emoji}
                </span>

                {/* Tooltip on hover */}
                <div
                  className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 rounded-xl border border-border/50 bg-popover text-popover-foreground p-2.5 text-left shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backdropFilter: 'blur(12px)' }}
                >
                  <p className="font-display text-[10px] font-bold tracking-wide text-foreground">{upg.name}</p>
                  <p className="font-body text-[10px] text-muted-foreground mt-0.5">{upg.description}</p>
                  {!isOwned && !isLocked && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-2.5 h-2.5" style={{ color }} />
                      <span className="font-display text-[10px] font-bold" style={{ color }}>
                        {upg.cost} star{upg.cost > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  {isLocked && (
                    <p className="font-body text-[10px] text-destructive mt-1">
                      Requires: {PRESTIGE_UPGRADES.find(u => u.id === upg.requires)?.name}
                    </p>
                  )}
                  {isOwned && (
                    <p className="font-body text-[10px] text-emerald-400 mt-1">✓ Unlocked</p>
                  )}
                </div>
              </button>

              {/* Node label */}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 whitespace-nowrap"
                style={{ maxWidth: COL_SIZE - 8 }}
              >
                <p
                  className="font-body text-[8px] font-semibold text-center leading-tight truncate"
                  style={{ color: isOwned ? color : isLocked ? 'hsl(210 15% 40%)' : 'hsl(210 20% 68%)' }}
                >
                  {upg.name}
                </p>
                {!isOwned && !isLocked && (
                  <p className="font-display text-[8px] text-center" style={{ color }}>
                    {upg.cost}★
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 px-1">
        {[['Wealth', 0], ['Efficiency', 1], ['Income', 2], ['Speed / Tap', 3]].map(([label, col]) => (
          <div key={col} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: BRANCH_COLORS[col] }} />
            <span className="font-body text-[9px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}