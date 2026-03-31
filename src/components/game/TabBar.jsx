import { Pickaxe, Users, ArrowUp, Star, Trophy, CalendarDays, Medal, BarChart2, Zap } from 'lucide-react';

const TABS = [
  { id: 'generators', label: 'Empire', icon: Pickaxe },
  { id: 'managers', label: 'Crew', icon: Users },
  { id: 'upgrades', label: 'Tech', icon: ArrowUp },
  { id: 'prestige', label: 'Rebirth', icon: Star },
  { id: 'quests', label: 'Quests', icon: CalendarDays },
  { id: 'analytics', label: 'Charts', icon: BarChart2 },
  { id: 'rifts', label: 'Rifts', icon: Zap, minPrestiges: 50 },
  { id: 'leaderboard', label: 'Ranks', icon: Medal },
  { id: 'achievements', label: 'Awards', icon: Trophy },
];

export default function TabBar({ activeTab, onTabChange, questAlert, totalPrestiges = 0 }) {
  return (
    <div className="flex-shrink-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border/50 safe-bottom">
      <div className="flex items-center py-1 overflow-x-auto scrollbar-none" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <div className="flex items-center min-w-max px-1 mx-auto gap-0.5">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isLocked = tab.minPrestiges && totalPrestiges < tab.minPrestiges;
          if (isLocked) return null;
          const showAlert = tab.id === 'quests' && questAlert;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-all flex-shrink-0
                ${isActive ? 'text-primary px-3' : 'text-muted-foreground px-2'}`}
            >
              <Icon className={`transition-transform ${isActive ? 'w-4 h-4 scale-110' : 'w-4 h-4'}`} />
              {isActive && (
                <span className="font-body text-[9px] font-bold tracking-wide whitespace-nowrap">
                  {tab.label}
                </span>
              )}
              {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
              {showAlert && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
              )}
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}