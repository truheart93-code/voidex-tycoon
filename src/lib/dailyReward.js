const DAILY_KEY = 'voidex_daily_reward';
const CYCLE = 28; // days per cycle

// Base reward scaled by day number, with milestone bonuses
export function getDayReward(day) {
  const dayInCycle = ((day - 1) % CYCLE) + 1;
  const base = 100;
  const growth = Math.pow(1.18, dayInCycle - 1);
  const reward = Math.floor(base * growth);

  // Milestone days
  if (dayInCycle === 7) return { credits: reward * 3, label: 'WEEKLY BONUS', isMilestone: true, icon: '🌟' };
  if (dayInCycle === 14) return { credits: reward * 4, label: '2-WEEK STREAK', isMilestone: true, icon: '💫' };
  if (dayInCycle === 21) return { credits: reward * 5, label: '3-WEEK STREAK', isMilestone: true, icon: '⭐' };
  if (dayInCycle === 28) return { credits: reward * 8, label: 'MONTHLY LEGEND', isMilestone: true, icon: '🏆' };

  return { credits: reward, label: `Day ${dayInCycle}`, isMilestone: false, icon: '💎' };
}

export function loadDailyState() {
  try {
    const saved = localStorage.getItem(DAILY_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return { streak: 0, lastClaimedDate: null, totalDays: 0 };
}

export function saveDailyState(data) {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(data));
  } catch(e) {}
}

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export function checkDailyReward() {
  const data = loadDailyState();
  const today = getTodayKey();
  if (data.lastClaimedDate === today) return { available: false, data };
  // Check if streak is broken (missed a day)
  if (data.lastClaimedDate) {
    const last = new Date(data.lastClaimedDate);
    const now = new Date(today);
    const diffDays = Math.round((now - last) / 86400000);
    if (diffDays > 1) {
      // Streak broken, reset
      return { available: true, data: { ...data, streak: 0 } };
    }
  }
  return { available: true, data };
}

export function claimDailyReward(currentData) {
  const nextStreak = currentData.streak + 1;
  const nextTotal = (currentData.totalDays || 0) + 1;
  const reward = getDayReward(nextStreak);
  const updated = {
    streak: nextStreak,
    lastClaimedDate: getTodayKey(),
    totalDays: nextTotal,
  };
  saveDailyState(updated);
  return { reward, updated };
}