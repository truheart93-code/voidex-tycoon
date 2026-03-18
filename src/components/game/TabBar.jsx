import { Pickaxe, Users, ArrowUp, Star, Trophy, Settings } from 'lucide-react';

const TABS = [
  { id: 'generators', label: 'Empire', icon: Pickaxe },
  { id: 'managers', label: 'Crew', icon: Users },
  { id: 'upgrades', label: 'Upgrades', icon: ArrowUp },
  { id: 'prestige', label: 'Rebirth', icon: Star },
  { id: 'achievements', label: 'Awards', icon: Trophy },
];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="sticky bottom-0 z-30 bg-background/90 backdrop-blur-xl border-t border-border/50">
      <div className="flex items-center justify-around py-1 pb-safe">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all
                ${isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
                }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="font-body text-[10px] font-bold tracking-wide">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}