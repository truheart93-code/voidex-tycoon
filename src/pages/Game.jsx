import { useState, useEffect, useMemo, useCallback } from 'react';
import useGameState from '@/lib/useGameState';
import { GENERATORS, UPGRADES, getRevenue, getTime, getPrestigeMultiplier } from '@/lib/gameData';
import { toggleMusic } from '@/lib/audioEngine';
import StarField from '@/components/game/StarField';
import Header from '@/components/game/Header';
import TabBar from '@/components/game/TabBar';
import GeneratorList from '@/components/game/GeneratorList';
import BuyAmountSelector from '@/components/game/BuyAmountSelector';
import ManagersPanel from '@/components/game/ManagersPanel';
import UpgradesPanel from '@/components/game/UpgradesPanel';
import PrestigePanel from '@/components/game/PrestigePanel';
import AchievementsPanel from '@/components/game/AchievementsPanel';
import AchievementToast from '@/components/game/AchievementToast';
import OfflineEarningsModal from '@/components/game/OfflineEarningsModal';
import NewsTicker from '@/components/game/NewsTicker';
import StatsBar from '@/components/game/StatsBar';
import ParticleCanvas, { triggerParticles } from '@/components/game/ParticleCanvas';
import DailyQuests from '@/components/game/DailyQuests';
import LeaderboardPanel from '@/components/game/LeaderboardPanel';
import BuffDisplay from '@/components/game/BuffDisplay';
import { BUFFS } from '@/lib/questData';
import ThemeSelector from '@/components/game/ThemeSelector';
import AnalyticsPanel from '@/components/game/AnalyticsPanel';
import { THEMES, loadTheme, saveTheme, applyTheme } from '@/lib/themes';
import IntroModal from '@/components/game/IntroModal';

// Generator accent colors for particles
const GEN_COLORS = {
  asteroid_mine: '#a8a29e',
  solar_farm: '#f59e0b',
  ice_harvester: '#22d3ee',
  gas_refinery: '#a78bfa',
  colony_hub: '#34d399',
  warp_gate: '#c084fc',
  dyson_sphere: '#f87171',
  quantum_forge: '#38bdf8',
  dimension_rift: '#f472b6',
  cosmic_engine: '#fbbf24',
};

export default function Game() {
  const {
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
    activeBuffs,
    claimQuest,
  } = useGameState();

  const [activeTab, setActiveTab] = useState('generators');
  const [musicOn, setMusicOn] = useState(false);
  const [showOffline, setShowOffline] = useState(!!state.offlineEarnings);
  const [offlineAmount] = useState(state.offlineEarnings || 0);
  const [offlineSeconds] = useState(state.offlineSeconds || 0);
  const [showThemes, setShowThemes] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => loadTheme());

  // Apply theme on mount and changes
  useEffect(() => { applyTheme(currentTheme); }, [currentTheme]);

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    saveTheme(themeId);
    applyTheme(themeId);
    setShowThemes(false);
  };

  // Buff multipliers
  const buffIncomeMultiplier = useMemo(() => {
    return activeBuffs.reduce((m, b) => {
      const def = BUFFS.find(bd => bd.id === b.id);
      return def?.incomeMultiplier ? m * def.incomeMultiplier : m;
    }, 1);
  }, [activeBuffs]);

  // Compute total passive income per second
  const creditsPerSec = useMemo(() => {
    const prestigeMult = getPrestigeMultiplier(state.prestigeStars);
    let globalMult = 1;
    state.upgrades.forEach(uid => {
      const upg = UPGRADES.find(u => u.id === uid);
      if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
    });
    return GENERATORS.reduce((sum, gen) => {
      const gs = state.generators[gen.id];
      if (!gs || gs.count === 0 || !state.managers.includes(gen.id)) return sum;
      const rev = getRevenue(gen, gs, prestigeMult, globalMult);
      const time = getTime(gen, gs);
      return sum + (rev / time) * 1000;
    }, 0);
  }, [state.generators, state.managers, state.upgrades, state.prestigeStars]);

  const handleToggleMusic = () => {
    const isOn = toggleMusic();
    setMusicOn(isOn);
  };

  // Wrap collectGenerator to fire particles
  const handleCollect = useCallback((genId, event) => {
    const gs = state.generators[genId];
    const gen = GENERATORS.find(g => g.id === genId);
    if (gs && gen && gs.running && gs.progress >= getTime(gen, gs)) {
      // Get tap position from the event target or fallback to center
      const el = event?.currentTarget;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        triggerParticles(cx, cy, GEN_COLORS[genId] || '#22d3ee', 22);
      }
    }
    collectGenerator(genId);
  }, [state.generators, collectGenerator]);

  // Auto-dismiss achievement toast after 3 seconds
  useEffect(() => {
    if (newAchievements.length > 0) {
      const timer = setTimeout(dismissAchievement, 3000);
      return () => clearTimeout(timer);
    }
  }, [newAchievements, dismissAchievement]);

  return (
    <div className="game-container min-h-screen bg-background flex flex-col relative">
      <StarField />
      <ParticleCanvas />

      <Header
        credits={state.credits}
        creditsPerSec={creditsPerSec}
        prestigeStars={state.prestigeStars}
        isMusicOn={musicOn}
        onToggleMusic={handleToggleMusic}
        onOpenThemes={() => setShowThemes(true)}
      />

      <NewsTicker state={state} />
      <StatsBar state={state} creditsPerSec={creditsPerSec} />
      <BuffDisplay activeBuffs={activeBuffs} />

      <div className="flex-1 overflow-y-auto relative z-10 pb-2">
        {activeTab === 'generators' && (
          <>
            <BuyAmountSelector
              buyAmount={state.buyAmount}
              onSetBuyAmount={setBuyAmount}
            />
            <GeneratorList
              state={state}
              onBuy={buyGenerator}
              onCollect={handleCollect}
            />
          </>
        )}

        {activeTab === 'managers' && (
          <ManagersPanel state={state} onBuyManager={buyManager} />
        )}

        {activeTab === 'upgrades' && (
          <UpgradesPanel state={state} onBuyUpgrade={buyUpgrade} />
        )}

        {activeTab === 'prestige' && (
          <PrestigePanel state={state} onPrestige={prestige} onBuyPrestigeUpgrade={buyPrestigeUpgrade} />
        )}

        {activeTab === 'quests' && (
          <DailyQuests quests={quests} onClaim={claimQuest} activeBuffs={activeBuffs} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPanel state={state} creditsPerSec={creditsPerSec} />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardPanel state={state} />
        )}

        {activeTab === 'achievements' && (
          <AchievementsPanel state={state} />
        )}
      </div>

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        questAlert={quests?.some(q => !q.claimed && q.progress >= q.target)}
      />

      <AchievementToast
        achievement={newAchievements[0]}
        onDismiss={dismissAchievement}
      />

      {showOffline && (
        <OfflineEarningsModal
          earnings={offlineAmount}
          offlineSeconds={offlineSeconds}
          onDismiss={() => setShowOffline(false)}
        />
      )}

      {showThemes && (
        <ThemeSelector
          currentTheme={currentTheme}
          onSelect={handleSelectTheme}
          onClose={() => setShowThemes(false)}
        />
      )}

      <IntroModal />
    </div>
  );
}