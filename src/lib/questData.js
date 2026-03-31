// Daily Quest definitions and generation

export const QUEST_TEMPLATES = [
  { type: 'earn_credits', name: 'Credit Collector', emoji: '💎', description: 'Earn {target} credits', reward: 'buff_rush', rewardLabel: 'Credit Rush buff' },
  { type: 'buy_generators', name: 'Expansion Drive', emoji: '🏗️', description: 'Buy {target} generators', reward: 'buff_overdrive', rewardLabel: 'Overdrive buff' },
  { type: 'tap_generators', name: 'Manual Override', emoji: '👆', description: 'Manually collect {target} times', reward: 'credits_bonus', rewardLabel: 'Credit bonus' },
  { type: 'reach_milestone', name: 'Milestone Racer', emoji: '⚡', description: 'Reach {target} of any generator', reward: 'buff_fever', rewardLabel: 'Gold Fever buff' },
  { type: 'buy_upgrades', name: 'R&D Sprint', emoji: '🔬', description: 'Purchase {target} upgrades', reward: 'credits_bonus', rewardLabel: 'Credit bonus' },
  { type: 'earn_credits', name: 'The Grind', emoji: '⛏️', description: 'Grind {target} credits this session', reward: 'buff_megadrive', rewardLabel: 'Mega Drive buff' },
  { type: 'buy_generators', name: 'Fleet Builder', emoji: '🚀', description: 'Expand fleet by {target} units', reward: 'buff_rush', rewardLabel: 'Credit Rush buff' },
  { type: 'tap_generators', name: 'Hands On', emoji: '🖐️', description: 'Tap {target} times manually', reward: 'buff_overdrive', rewardLabel: 'Overdrive buff' },
  { type: 'reach_milestone', name: 'Going Faster', emoji: '💨', description: 'Hit {target}-unit milestone', reward: 'buff_megadrive', rewardLabel: 'Mega Drive buff' },
  { type: 'buy_upgrades', name: 'Lab Hours', emoji: '🧪', description: 'Research {target} new upgrades today', reward: 'buff_fever', rewardLabel: 'Gold Fever buff' },
  { type: 'earn_credits', name: 'Profit Report', emoji: '📈', description: 'Log {target} credits earned', reward: 'buff_fever', rewardLabel: 'Gold Fever buff' },
  { type: 'buy_generators', name: 'Infrastructure Day', emoji: '🏭', description: 'Commission {target} new generators', reward: 'buff_megadrive', rewardLabel: 'Mega Drive buff' },
];

export const BUFFS = [
  { id: 'buff_rush', name: 'Credit Rush', emoji: '💰', description: '3x income for 90s', incomeMultiplier: 3, duration: 90000, color: 'text-accent', bg: 'bg-accent/20 border-accent/40' },
  { id: 'buff_overdrive', name: 'Overdrive', emoji: '⚡', description: '2x speed for 120s', speedMultiplier: 2, duration: 120000, color: 'text-primary', bg: 'bg-primary/20 border-primary/40' },
  { id: 'buff_fever', name: 'Gold Fever', emoji: '🌟', description: '5x income for 45s', incomeMultiplier: 5, duration: 45000, color: 'text-secondary', bg: 'bg-secondary/20 border-secondary/40' },
  { id: 'buff_megadrive', name: 'Mega Drive', emoji: '🚀', description: '10x income for 30s', incomeMultiplier: 10, duration: 30000, color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-500/40' },
  { id: 'buff_hypertime', name: 'Hypertime', emoji: '⏩', description: '4x speed for 60s', speedMultiplier: 4, duration: 60000, color: 'text-cyan-400', bg: 'bg-cyan-500/20 border-cyan-500/40' },
  { id: 'buff_jackpot', name: 'Jackpot', emoji: '🎰', description: '20x income for 15s', incomeMultiplier: 20, duration: 15000, color: 'text-yellow-300', bg: 'bg-yellow-500/20 border-yellow-500/40' },
];

function getDailySeed() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return () => {
    h ^= h >>> 16; h = Math.imul(h, 0x45d9f3b); h ^= h >>> 16;
    return (h >>> 0) / 0xFFFFFFFF;
  };
}

export function generateDailyQuests(prestigeStars = 0) {
  const seed = getDailySeed();
  const rng = seededRandom(seed);
  const scale = Math.max(1, 1 + prestigeStars * 0.5);

  const targets = {
    earn_credits: [10000, 100000, 1000000, 25000000, 500000000, 10000000000, 250000000000],
    buy_generators: [5, 15, 30, 60, 100, 200, 500],
    tap_generators: [10, 25, 50, 100, 200, 500, 1000],
    reach_milestone: [10, 25, 50, 100, 200, 400, 500],
    buy_upgrades: [1, 2, 3, 5, 8, 12, 20],
  };

  // Pick 5 unique quest templates shuffled
  const shuffled = [...QUEST_TEMPLATES].sort(() => rng() - 0.5);

  return shuffled.slice(0, 5).map((tmpl, i) => {
    const pool = targets[tmpl.type];
    const tierIdx = Math.min(Math.floor(rng() * pool.length), pool.length - 1);
    const rawTarget = pool[tierIdx];
    const target = tmpl.type === 'earn_credits' ? Math.floor(rawTarget * scale) : rawTarget;
    return {
      id: `${seed}_${i}`,
      type: tmpl.type,
      name: tmpl.name,
      emoji: tmpl.emoji,
      description: tmpl.description.replace('{target}', target.toLocaleString()),
      target,
      reward: tmpl.reward,
      rewardLabel: tmpl.rewardLabel,
      progress: 0,
      claimed: false,
    };
  });
}

export function getDailySeedKey() {
  return getDailySeed();
}