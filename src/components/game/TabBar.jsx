import { useState } from 'react';
import { Pickaxe, ArrowUp, Star, CalendarDays, MoreHorizontal, Users, BarChart2, Zap, Medal, Trophy, X } from 'lucide-react';

const PRIMARY_TABS = [
  { id: 'generators', label: 'Empire', icon: Pickaxe },
  { id: 'upgrades', label: 'Tech', icon: ArrowUp },
  { id: 'prestige', label: 'Rebirth', icon: Star },
  { id: 'quests', label: 'Quests', icon: CalendarDays },
];

const MORE_TABS = [
  { id: 'managers', label: 'Crew', icon: Users },
  { id: 'rifts', label: 'Rifts', icon: Zap, minPrestiges: 50 },
  { id: 'analytics', label: 'Charts', icon: BarChart2 },
  { id: 'leaderboard', label: 'Ranks', icon: Medal },
  { id: 'achievements', label: 'Awards', icon: Trophy },
];

export default function TabBar({ activeTab, onTabChange, questAlert, totalPrestiges = 0 }) {
  const [showMore, setShowMore] = useState(false);

  const handleTabChange = (id) => {
    onTabChange(id);
    setShowMore(false);
  };

  const visibleMore = MORE_TABS.filter(t => !t.minPrestiges || totalPrestiges >= t.minPrestiges);
  const isMoreActive = visibleMore.some(t => t.id === activeTab);

  return (
    <>
      {/* More Menu Overlay */}
      {showMore && (
        <div className="absolute bottom-16 left-0 right-0 z-40 mx-3 mb-1">
          <div className="bg-card/98 backdrop-blur-xl border border-border/60 rounded-xl p-2 shadow-2xl">
            <div className="grid grid-cols-5 gap-1">
              {visibleMore.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg transition-all
                      ${isActive ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-body text-[9px] font-bold tracking-wide whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showMore && (
        <div className="absolute inset-0 z-30" onClick={() => setShowMore(false)} />
      )}

      {/* Tab Bar */}
      <div className="flex-shrink-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/50 safe-bottom">
        <div className="flex items-center justify-around px-2 py-1">
          {PRIMARY_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const showAlert = tab.id === 'quests' && questAlert;
            return (
              <button
                key={tab.id}
                onClick={() => { setShowMore(false); onTabChange(tab.id); }}
                className={`relative flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-all flex-1
                  ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="font-body text-[9px] font-bold tracking-wide whitespace-nowrap">{tab.label}</span>
                )}
                {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
                {showAlert && (
                  <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-accent animate-pulse" />
                )}
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setShowMore(v => !v)}
            className={`relative flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-all flex-1
              ${showMore || isMoreActive ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {showMore ? <X className="w-4 h-4" /> : <MoreHorizontal className="w-4 h-4" />}
            {(showMore || isMoreActive) && (
              <span className="font-body text-[9px] font-bold tracking-wide">More</span>
            )}
            {(showMore || isMoreActive) && <div className="w-1 h-1 rounded-full bg-primary" />}
          </button>
        </div>
      </div>
    </>
  );
}