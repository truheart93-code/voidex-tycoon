import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GENERATORS, MANAGERS, UPGRADES, ACHIEVEMENTS, PRESTIGE_UPGRADES,
  getCost, getRevenue, getTime, getPrestigeStars, getPrestigeMultiplier,
  getOfflineEfficiency, getStartCredits, getClickMultiplier,
  createInitialState
} from './gameData';
import { generateDailyQuests, getDailySeedKey, generateWeeklyQuests, getWeeklySeedKey, BUFFS } from './questData';
import { generateRift, saveActiveRift } from './riftData';
import { RIFT_TOKEN_UPGRADES } from '../components/game/RiftTokenStore';
import { GALAXY_MULTIPLIERS } from '../components/game/GalaxyAscension';
import { playBuySound, playCollectSound, playUpgradeSound, playAchievementSound, playPrestigeSound } from './audioEngine';

const SAVE_KEY = 'stellar_empire_save';
const TICK_RATE = 50; // ms
const QUEST_KEY = 'stellar_quest_save';
const WEEKLY_QUEST_KEY = 'stellar_weekly_quest_save';
const RIFT_TOKENS_KEY = 'voidex_rift_tokens';
const RIFT_UPGRADES_KEY = 'voidex_rift_upgrades';

function loadRiftUpgrades() {
  try { return JSON.parse(localStorage.getItem(RIFT_UPGRADES_KEY) || '[]'); } catch(e) { return []; }
}
function saveRiftUpgrades(arr) {
  try { localStorage.setItem(RIFT_UPGRADES_KEY, JSON.stringify(arr)); } catch(e) {} 
}

function loadRiftTokens() {
  try { return parseInt(localStorage.getItem(RIFT_TOKENS_KEY) || '0', 10); } catch(e) { return 0; }
}

function saveRiftTokens(n) {
  try { localStorage.setItem(RIFT_TOKENS_KEY, String(n)); } catch(e) {}
}

function loadWeeklyQuests(prestigeStars) {
  try {
    const saved = localStorage.getItem(WEEKLY_QUEST_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.seed === getWeeklySeedKey()) return parsed.quests;
    }
  } catch(e) {}
  return generateWeeklyQuests(prestigeStars);
}

function saveWeeklyQuests(quests) {
  try {
    localStorage.setItem(WEEKLY_QUEST_KEY, JSON.stringify({ seed: getWeeklySeedKey(), quests }));
  } catch(e) {}
}

function loadQuests(prestigeStars) {
  try {
    const saved = localStorage.getItem(QUEST_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.seed === getDailySeedKey()) return parsed.quests;
    }
  } catch(e) {}
  return generateDailyQuests(prestigeStars);
}

function saveQuests(quests) {
  try {
    localStorage.setItem(QUEST_KEY, JSON.stringify({ seed: getDailySeedKey(), quests }));
  } catch(e) {}
}

function loadGame() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = { ...createInitialState(), ...parsed };
      // Ensure player always has at least starting credits if they've never earned anything
      if (merged.credits === 0 && merged.totalEarned === 0 && Object.keys(merged.generators).length === 0) {
        merged.credits = 25;
      }
      return merged;
    }
  } catch (e) {
    console.warn('Failed to load save');
  }
  return createInitialState();
}

function saveGame(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, lastSaveTime: Date.now() }));
  } catch (e) {
    console.warn('Failed to save game');
  }
}

export default function useGameState() {
  const [state, setState] = useState(() => {
    const loaded = loadGame();
    // Calculate offline earnings
    const now = Date.now();
    const elapsed = now - (loaded.lastSaveTime || now);
    if (elapsed > 5000) { // 5 seconds minimum
    let offlineEarnings = 0;
    const prestigeMult = getPrestigeMultiplier(loaded.prestigeStars || 0, loaded.prestigeUpgrades || [], loaded.galaxyCount || 0);
      let globalMult = 1;
      (loaded.upgrades || []).forEach(uid => {
        const upg = UPGRADES.find(u => u.id === uid);
        if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
      });

      GENERATORS.forEach(gen => {
        const genState = loaded.generators[gen.id];
        if (genState && genState.count > 0 && loaded.managers?.includes(gen.id)) {
          const revenue = getRevenue(gen, genState, prestigeMult, globalMult);
          const time = getTime(gen, genState, loaded.prestigeUpgrades || []);
          const cycles = elapsed / time;
          offlineEarnings += revenue * cycles;
        }
      });

      // Apply offline efficiency (default 50%, improved by prestige upgrades)
      const offlineEff = getOfflineEfficiency(loaded.prestigeUpgrades || []);
      offlineEarnings *= offlineEff;
      if (offlineEarnings > 0) {
        loaded.credits = (loaded.credits || 0) + offlineEarnings;
        loaded.totalEarned = (loaded.totalEarned || 0) + offlineEarnings;
        loaded.lifetimeEarned = (loaded.lifetimeEarned || 0) + offlineEarnings;
        loaded.offlineEarnings = offlineEarnings;
        loaded.offlineSeconds = Math.floor(elapsed / 1000);
      }
    }
    loaded.lastSaveTime = now;
    return loaded;
  });

  const stateRef = useRef(state);
  stateRef.current = state;
  const [newAchievements, setNewAchievements] = useState([]);
  const [quests, setQuests] = useState(() => loadQuests(state.prestigeStars));
  const [weeklyQuests, setWeeklyQuests] = useState(() => loadWeeklyQuests(state.prestigeStars));
  const [riftTokens, setRiftTokens] = useState(() => loadRiftTokens());
  const [ownedRiftUpgrades, setOwnedRiftUpgrades] = useState(() => loadRiftUpgrades());
  const [activeRift, setActiveRift] = useState(null);
  const [activeBuffs, setActiveBuffs] = useState([]);
  const tapCountRef = useRef(0);

  // Expire buffs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBuffs(prev => prev.filter(b => b.expiresAt > Date.now()));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Save quests whenever they change
  useEffect(() => { saveQuests(quests); }, [quests]);
  useEffect(() => { saveWeeklyQuests(weeklyQuests); }, [weeklyQuests]);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => saveGame(stateRef.current), 10000);
    return () => clearInterval(interval);
  }, []);

  // Save on unload or visibility change (minimized/tab switch)
  useEffect(() => {
    const handleUnload = () => saveGame(stateRef.current);
    const handleVisibility = () => { if (document.hidden) saveGame(stateRef.current); };
    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Game tick - auto collect for managed generators
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        let newCredits = prev.credits;
        let newTotalEarned = prev.totalEarned;
        let newLifetime = prev.lifetimeEarned;
        const newGenerators = { ...prev.generators };
        const prestigeMult = getPrestigeMultiplier(prev.prestigeStars, prev.prestigeUpgrades || [], prev.galaxyCount || 0);
        let globalMult = 1;
        prev.upgrades.forEach(uid => {
          const upg = UPGRADES.find(u => u.id === uid);
          if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
        });
        // Apply active buffs
        const now = Date.now();
        // NOTE: activeBuffs is read via closure from outer scope

        let changed = false;

        GENERATORS.forEach(gen => {
          const genState = newGenerators[gen.id];
          if (!genState || genState.count === 0) return;

          const isManaged = prev.managers.includes(gen.id);
          const time = getTime(gen, genState, prev.prestigeUpgrades || []);

          if (!genState.progress) genState.progress = 0;
          if (!genState.running && isManaged) genState.running = true;

          if (genState.running) {
            genState.progress += TICK_RATE;
            if (genState.progress >= time) {
              const revenue = getRevenue(gen, genState, prestigeMult, globalMult);
              newCredits += revenue;
              newTotalEarned += revenue;
              newLifetime += revenue;
              genState.progress = 0;
              if (!isManaged) genState.running = false;
              changed = true;
            }
            newGenerators[gen.id] = { ...genState };
            changed = true;
          }
        });

        if (!changed) return prev;

        return {
          ...prev,
          credits: newCredits,
          totalEarned: newTotalEarned,
          lifetimeEarned: newLifetime,
          generators: newGenerators,
        };
      });
    }, TICK_RATE);

    return () => clearInterval(interval);
  }, []);

  // Check achievements
  useEffect(() => {
    const unclaimed = ACHIEVEMENTS.filter(
      ach => !state.achievements.includes(ach.id) && ach.condition(state)
    );
    if (unclaimed.length > 0) {
      playAchievementSound();
      setNewAchievements(prev => [...prev, ...unclaimed]);
      setState(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...unclaimed.map(a => a.id)]
      }));
    }
  }, [state.credits, state.totalEarned, state.managers.length, state.totalPrestiges]);

  const dismissAchievement = useCallback(() => {
    setNewAchievements(prev => prev.slice(1));
  }, []);

  const startRift = useCallback((level) => {
    const rift = generateRift(level);
    const active = { ...rift, startTime: Date.now(), earnedCredits: 0, failed: false };
    setActiveRift(active);
    saveActiveRift(active);
  }, []);

  const abandonRift = useCallback(() => {
    setActiveRift(prev => {
      if (!prev) return null;
      const complete = prev.earnedCredits >= prev.creditGoal;
      if (complete) {
        setRiftTokens(t => { saveRiftTokens(t + prev.tokenReward); return t + prev.tokenReward; });
      }
      saveActiveRift(null);
      return null;
    });
  }, []);

  const buyGenerator = useCallback((generatorId, amount = null) => {
    setState(prev => {
      const gen = GENERATORS.find(g => g.id === generatorId);
      if (!gen) return prev;
      const buyAmt = amount || prev.buyAmount;
      const genState = prev.generators[generatorId] || { count: 0, upgradeMultiplier: 1, progress: 0, running: false };
      const cost = getCost(gen, genState.count, buyAmt);
      const playerName = localStorage.getItem('stellar_player_name') || '';
      const isFreeMode = playerName === 'shawntest1234gametest';
      if (!isFreeMode && prev.credits < cost) return prev;

      playBuySound();
      const newCount = genState.count + buyAmt;
      // Update buy_generators quest
      const updGen = (qprev) => qprev.map(q =>
        q.type === 'buy_generators' && !q.claimed
          ? { ...q, progress: (q.progress || 0) + buyAmt }
          : q.type === 'reach_milestone' && !q.claimed && newCount >= q.target
            ? { ...q, progress: q.target }
            : q
      );
      setQuests(updGen);
      setWeeklyQuests(updGen);
      return {
        ...prev,
        credits: prev.credits - cost,
        generators: {
          ...prev.generators,
          [generatorId]: {
            ...genState,
            count: newCount,
          }
        }
      };
    });
  }, []);

  const collectGenerator = useCallback((generatorId) => {
    tapCountRef.current += 1;
    // Update tap quest progress
    const tapUpdater = (prev) => prev.map(q =>
      q.type === 'tap_generators' && !q.claimed
        ? { ...q, progress: (q.progress || 0) + 1 }
        : q
    );
    setQuests(tapUpdater);
    setWeeklyQuests(tapUpdater);

    setState(prev => {
      const gen = GENERATORS.find(g => g.id === generatorId);
      const genState = prev.generators[generatorId];
      if (!gen || !genState || genState.count === 0) return prev;

      if (!genState.running) {
        return {
          ...prev,
          generators: {
            ...prev.generators,
            [generatorId]: { ...genState, running: true, progress: 0 }
          }
        };
      }

      const time = getTime(gen, genState, prev.prestigeUpgrades || []);
      if (genState.progress >= time) {
        const prestigeMult = getPrestigeMultiplier(prev.prestigeStars, prev.prestigeUpgrades || [], prev.galaxyCount || 0);
        let globalMult = 1;
        prev.upgrades.forEach(uid => {
          const upg = UPGRADES.find(u => u.id === uid);
          if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
        });
        const clickMult = getClickMultiplier(prev.prestigeUpgrades || []);
        const revenue = getRevenue(gen, genState, prestigeMult, globalMult) * clickMult;
        playCollectSound();
        return {
          ...prev,
          credits: prev.credits + revenue,
          totalEarned: prev.totalEarned + revenue,
          lifetimeEarned: prev.lifetimeEarned + revenue,
          generators: {
            ...prev.generators,
            [generatorId]: { ...genState, running: false, progress: 0 }
          }
        };
      }

      return prev;
    });
  }, []);

  const buyManager = useCallback((managerId) => {
    setState(prev => {
      const mgr = MANAGERS.find(m => m.id === managerId);
      if (!mgr || prev.managers.includes(mgr.generatorId)) return prev;
      const playerName = localStorage.getItem('stellar_player_name') || '';
      const isFreeMode = playerName === 'shawntest1234gametest';
      if (!isFreeMode && prev.credits < mgr.cost) return prev;

      playBuySound();
      return {
        ...prev,
        credits: prev.credits - mgr.cost,
        managers: [...prev.managers, mgr.generatorId],
      };
    });
  }, []);

  const buyUpgrade = useCallback((upgradeId) => {
    setState(prev => {
      const upg = UPGRADES.find(u => u.id === upgradeId);
      if (!upg || prev.upgrades.includes(upgradeId)) return prev;
      const playerName = localStorage.getItem('stellar_player_name') || '';
      const isFreeMode = playerName === 'shawntest1234gametest';
      if (!isFreeMode && prev.credits < upg.cost) return prev;
      const updUpg = q => q.type === 'buy_upgrades' && !q.claimed ? { ...q, progress: (q.progress || 0) + 1 } : q;
      setQuests(qprev => qprev.map(updUpg));
      setWeeklyQuests(qprev => qprev.map(updUpg));

      // Check required count
      if (upg.generatorId !== 'all') {
        const genState = prev.generators[upg.generatorId];
        if (!genState || genState.count < upg.requiredCount) return prev;
      }

      playUpgradeSound();
      const newGenerators = { ...prev.generators };

      if (upg.generatorId === 'all') {
        // Global multiplier handled in revenue calculation
      } else {
        const genState = newGenerators[upg.generatorId] || { count: 0, upgradeMultiplier: 1 };
        newGenerators[upg.generatorId] = {
          ...genState,
          upgradeMultiplier: (genState.upgradeMultiplier || 1) * upg.multiplier,
        };
      }

      return {
        ...prev,
        credits: prev.credits - upg.cost,
        upgrades: [...prev.upgrades, upgradeId],
        generators: newGenerators,
      };
    });
  }, []);

  const prestige = useCallback(() => {
    setState(prev => {
      const stars = getPrestigeStars(prev.totalEarned);
      if (stars <= prev.prestigeStars) return prev;

      playPrestigeSound();
      const prestigeUpgrades = prev.prestigeUpgrades || [];
      const fresh = createInitialState(prestigeUpgrades, prev.galaxyCount || 0);
      return {
        ...fresh,
        prestigeStars: stars,
        totalPrestiges: (prev.totalPrestiges || 0) + 1,
        lifetimeEarned: prev.lifetimeEarned,
        achievements: prev.achievements,
        prestigeUpgrades,
        galaxyCount: prev.galaxyCount || 0,
        lastSaveTime: Date.now(),
      };
    });
  }, []);

  const claimQuest = useCallback((questId, isWeekly = false) => {
    const setter = isWeekly ? setWeeklyQuests : setQuests;
    setter(prev => prev.map(q => {
      if (q.id !== questId || q.claimed || q.progress < q.target) return q;
      if (q.reward === 'rift_tokens') {
        const earned = q.rewardTokens || 10;
        setRiftTokens(t => { saveRiftTokens(t + earned); return t + earned; });
      } else {
        const buffDef = BUFFS.find(b => b.id === q.reward);
        if (buffDef) {
          setActiveBuffs(bprev => [...bprev, { id: buffDef.id, instanceId: Date.now(), expiresAt: Date.now() + buffDef.duration }]);
        } else if (q.reward === 'credits_bonus') {
          setState(sprev => ({
            ...sprev,
            credits: sprev.credits + Math.floor(sprev.totalEarned * 0.01 + 1000),
            totalEarned: sprev.totalEarned + Math.floor(sprev.totalEarned * 0.01 + 1000),
            lifetimeEarned: sprev.lifetimeEarned + Math.floor(sprev.totalEarned * 0.01 + 1000),
          }));
        }
      }
      return { ...q, claimed: true };
    }));
  }, []);

  const buyPrestigeUpgrade = useCallback((upgradeId) => {
    setState(prev => {
      const upg = PRESTIGE_UPGRADES.find(u => u.id === upgradeId);
      if (!upg) return prev;
      const prestigeUpgrades = prev.prestigeUpgrades || [];
      if (prestigeUpgrades.includes(upgradeId)) return prev;
      if (upg.requires && !prestigeUpgrades.includes(upg.requires)) return prev;

      // Calculate available stars
      const spentStars = PRESTIGE_UPGRADES.filter(u => prestigeUpgrades.includes(u.id)).reduce((s, u) => s + u.cost, 0);
      const availableStars = prev.prestigeStars - spentStars;
      if (availableStars < upg.cost) return prev;

      playUpgradeSound();
      return {
        ...prev,
        prestigeUpgrades: [...prestigeUpgrades, upgradeId],
      };
    });
  }, []);

  const setBuyAmount = useCallback((amount) => {
    setState(prev => ({ ...prev, buyAmount: amount }));
  }, []);

  const applyGalaxyCredits = useCallback((amount) => {
    setState(prev => ({
      ...prev,
      credits: prev.credits + amount,
      totalEarned: prev.totalEarned + amount,
      lifetimeEarned: prev.lifetimeEarned + amount,
    }));
  }, []);

  const triggerBuff = useCallback((buff) => {
    setActiveBuffs(prev => [...prev, buff]);
  }, []);

  const buyRiftUpgrade = useCallback((upgradeId) => {
    const upg = RIFT_TOKEN_UPGRADES.find(u => u.id === upgradeId);
    if (!upg) return;
    setOwnedRiftUpgrades(prev => {
      if (prev.includes(upgradeId)) return prev;
      const parentOwned = !upg.requires || prev.includes(upg.requires);
      if (!parentOwned) return prev;
      setRiftTokens(t => {
        if (t < upg.cost) return t;
        const next = t - upg.cost;
        saveRiftTokens(next);
        return next;
      });
      const next = [...prev, upgradeId];
      saveRiftUpgrades(next);
      return next;
    });
  }, []);

  const ascendGalaxy = useCallback(() => {
    setState(prev => {
      const galaxyCount = (prev.galaxyCount || 0);
      const thresholds = [100, 250, 500];
      if (galaxyCount >= thresholds.length) return prev;
      if (prev.prestigeStars < thresholds[galaxyCount]) return prev;
      playPrestigeSound();
      const fresh = createInitialState([]);
      return {
        ...fresh,
        galaxyCount: galaxyCount + 1,
        lifetimeEarned: prev.lifetimeEarned,
        achievements: prev.achievements,
        lastSaveTime: Date.now(),
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(SAVE_KEY);
    setState(createInitialState());
  }, []);

  // Update earn_credits quest from state changes
  const lastEarned = useRef(state.totalEarned);
  useEffect(() => {
    const diff = state.totalEarned - lastEarned.current;
    if (diff > 0) {
      setQuests(prev => prev.map(q =>
        q.type === 'earn_credits' && !q.claimed
          ? { ...q, progress: Math.min((q.progress || 0) + diff, q.target) }
          : q
      ));
      setWeeklyQuests(prev => prev.map(q =>
        q.type === 'earn_credits' && !q.claimed
          ? { ...q, progress: Math.min((q.progress || 0) + diff, q.target) }
          : q
      ));
      // Track rift earnings
      if (activeRift && !activeRift.failed) {
        setActiveRift(r => r ? { ...r, earnedCredits: (r.earnedCredits || 0) + diff } : r);
      }
    }
    lastEarned.current = state.totalEarned;
  }, [state.totalEarned, activeRift]);

  return {
    state,
    buyGenerator,
    collectGenerator,
    buyManager,
    buyUpgrade,
    prestige,
    buyPrestigeUpgrade,
    setBuyAmount,
    resetGame,
    newAchievements,
    dismissAchievement,
    quests,
    weeklyQuests,
    activeBuffs,
    claimQuest,
    applyGalaxyCredits,
    triggerBuff,
    riftTokens,
    ownedRiftUpgrades,
    buyRiftUpgrade,
    activeRift,
    startRift,
    abandonRift,
    ascendGalaxy,
  };
}