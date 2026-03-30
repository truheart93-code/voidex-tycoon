import { Pickaxe, Users, ArrowUp, Star, Trophy, CalendarDays, Medal } from 'lucide-react';

const TABS = [
  { id: 'generators', label: 'Empire', icon: Pickaxe },
  { id: 'managers', label: 'Crew', icon: Users },
  { id: 'upgrades', label: 'Tech', icon: ArrowUp },
  { id: 'prestige', label: 'Rebirth', icon: Star },
  { id: 'quests', label: 'Quests', icon: CalendarDays },
  { id: 'leaderboard', label: 'Ranks', icon: Medal },
  { id: 'achievements', label: 'Awards', icon: Trophy },
];

export default function TabBar({ activeTab, onTabChange, questAlert }) {
  return (
    <div className="sticky bottom-0 z-30 bg-background/90 backdrop-blur-xl border-t border-border/50 safe-bottom">
      <div className="flex items-center justify-around py-1 overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const showAlert = tab.id === 'quests' && questAlert;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0
                ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="font-body text-[9px] font-bold tracking-wide whitespace-nowrap">
                {tab.label}
              </span>
              {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
              {showAlert && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}