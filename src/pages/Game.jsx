import { useState, useEffect, useMemo } from 'react';
import useGameState from '@/lib/useGameState';
import { GENERATORS, UPGRADES, getRevenue, getTime, getPrestigeMultiplier } from '@/lib/gameData';
import { startMusic, stopMusic, toggleMusic, isMusicOn } from '@/lib/audioEngine';
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

export default function Game() {
  const {
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
  } = useGameState();

  const [activeTab, setActiveTab] = useState('generators');
  const [musicOn, setMusicOn] = useState(false);
  const [showOffline, setShowOffline] = useState(!!state.offlineEarnings);
  const [offlineAmount] = useState(state.offlineEarnings || 0);

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
      
      <Header
        credits={state.credits}
        creditsPerSec={creditsPerSec}
        prestigeStars={state.prestigeStars}
        isMusicOn={musicOn}
        onToggleMusic={handleToggleMusic}
      />

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
              onCollect={collectGenerator}
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
          <PrestigePanel state={state} onPrestige={prestige} />
        )}

        {activeTab === 'achievements' && (
          <AchievementsPanel state={state} />
        )}
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <AchievementToast
        achievement={newAchievements[0]}
        onDismiss={dismissAchievement}
      />

      {showOffline && (
        <OfflineEarningsModal
          earnings={offlineAmount}
          onDismiss={() => setShowOffline(false)}
        />
      )}
    </div>
  );
}