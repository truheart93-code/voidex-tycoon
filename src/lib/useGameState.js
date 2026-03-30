import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GENERATORS, MANAGERS, UPGRADES, ACHIEVEMENTS,
  getCost, getRevenue, getTime, getPrestigeStars, getPrestigeMultiplier,
  createInitialState
} from './gameData';
import { playBuySound, playCollectSound, playUpgradeSound, playAchievementSound, playPrestigeSound } from './audioEngine';

const SAVE_KEY = 'stellar_empire_save';
const TICK_RATE = 50; // ms

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
      const prestigeMult = getPrestigeMultiplier(loaded.prestigeStars || 0);
      let globalMult = 1;
      (loaded.upgrades || []).forEach(uid => {
        const upg = UPGRADES.find(u => u.id === uid);
        if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
      });

      GENERATORS.forEach(gen => {
        const genState = loaded.generators[gen.id];
        if (genState && genState.count > 0 && loaded.managers?.includes(gen.id)) {
          const revenue = getRevenue(gen, genState, prestigeMult, globalMult);
          const time = getTime(gen, genState);
          const cycles = elapsed / time;
          offlineEarnings += revenue * cycles;
        }
      });

      // Cap offline at 50% efficiency
      offlineEarnings *= 0.5;
      if (offlineEarnings > 0) {
        loaded.credits = (loaded.credits || 0) + offlineEarnings;
        loaded.totalEarned = (loaded.totalEarned || 0) + offlineEarnings;
        loaded.lifetimeEarned = (loaded.lifetimeEarned || 0) + offlineEarnings;
        loaded.offlineEarnings = offlineEarnings;
      }
    }
    loaded.lastSaveTime = now;
    return loaded;
  });

  const stateRef = useRef(state);
  stateRef.current = state;
  const [newAchievements, setNewAchievements] = useState([]);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => saveGame(stateRef.current), 10000);
    return () => clearInterval(interval);
  }, []);

  // Save on unload
  useEffect(() => {
    const handleUnload = () => saveGame(stateRef.current);
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  // Game tick - auto collect for managed generators
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        let newCredits = prev.credits;
        let newTotalEarned = prev.totalEarned;
        let newLifetime = prev.lifetimeEarned;
        const newGenerators = { ...prev.generators };
        const prestigeMult = getPrestigeMultiplier(prev.prestigeStars);
        let globalMult = 1;
        prev.upgrades.forEach(uid => {
          const upg = UPGRADES.find(u => u.id === uid);
          if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
        });

        let changed = false;

        GENERATORS.forEach(gen => {
          const genState = newGenerators[gen.id];
          if (!genState || genState.count === 0) return;

          const isManaged = prev.managers.includes(gen.id);
          const time = getTime(gen, genState);

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

  const buyGenerator = useCallback((generatorId, amount = null) => {
    setState(prev => {
      const gen = GENERATORS.find(g => g.id === generatorId);
      if (!gen) return prev;
      const buyAmt = amount || prev.buyAmount;
      const genState = prev.generators[generatorId] || { count: 0, upgradeMultiplier: 1, progress: 0, running: false };
      const cost = getCost(gen, genState.count, buyAmt);
      if (prev.credits < cost) return prev;

      playBuySound();
      return {
        ...prev,
        credits: prev.credits - cost,
        generators: {
          ...prev.generators,
          [generatorId]: {
            ...genState,
            count: genState.count + buyAmt,
          }
        }
      };
    });
  }, []);

  const collectGenerator = useCallback((generatorId) => {
    setState(prev => {
      const gen = GENERATORS.find(g => g.id === generatorId);
      const genState = prev.generators[generatorId];
      if (!gen || !genState || genState.count === 0) return prev;

      if (!genState.running) {
        // Start production
        return {
          ...prev,
          generators: {
            ...prev.generators,
            [generatorId]: { ...genState, running: true, progress: 0 }
          }
        };
      }

      const time = getTime(gen, genState);
      if (genState.progress >= time) {
        const prestigeMult = getPrestigeMultiplier(prev.prestigeStars);
        let globalMult = 1;
        prev.upgrades.forEach(uid => {
          const upg = UPGRADES.find(u => u.id === uid);
          if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
        });
        const revenue = getRevenue(gen, genState, prestigeMult, globalMult);
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
      if (prev.credits < mgr.cost) return prev;

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
      if (prev.credits < upg.cost) return prev;

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
      const fresh = createInitialState();
      return {
        ...fresh,
        prestigeStars: stars,
        totalPrestiges: (prev.totalPrestiges || 0) + 1,
        lifetimeEarned: prev.lifetimeEarned,
        achievements: prev.achievements,
        lastSaveTime: Date.now(),
      };
    });
  }, []);

  const setBuyAmount = useCallback((amount) => {
    setState(prev => ({ ...prev, buyAmount: amount }));
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(SAVE_KEY);
    setState(createInitialState());
  }, []);

  return {
    state,
    buyGenerator,
    collectGenerator,
    buyManager,
    buyUpgrade,
    prestige,
    setBuyAmount,
    resetGame,
    newAchievements,
    dismissAchievement,
  };
}