import { useState, useEffect } from 'react';
import useGameState from '@/lib/useGameState';
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

      {/* Achievement Toast */}
      <AchievementToast
        achievement={newAchievements[0]}
        onDismiss={dismissAchievement}
      />

      {/* Offline Earnings Modal */}
      {showOffline && (
        <OfflineEarningsModal
          earnings={offlineAmount}
          onDismiss={() => setShowOffline(false)}
        />
      )}
    </div>
  );
}