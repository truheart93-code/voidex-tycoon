import { useState } from 'react';
import { Pickaxe, ArrowUp, Star, CalendarDays, MoreHorizontal, Users, BarChart2, Zap, Medal, Trophy, X } from 'lucide-react';

const MORE_TABS = [
  { id: 'prestige', label: 'Rebirth', icon: Star },
  { id: 'quests', label: 'Quests', icon: CalendarDays },
  { id: 'rifts', label: 'Rifts', icon: Zap, minPrestiges: 50 },
  { id: 'analytics', label: 'Charts', icon: BarChart2 },
  { id: 'leaderboard', label: 'Ranks', icon: Medal },
  { id: 'achievements', label: 'Awards', icon: Trophy },
];

function SideTab({ id, label, icon: Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-all flex-1
        ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
    >
      <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
      {isActive && <span className="font-body text-[9px] font-bold tracking-wide whitespace-nowrap">{label}</span>}
      {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
    </button>
  );
}

export default function TabBar({ activeTab, onTabChange, questAlert, totalPrestiges = 0 }) {
  const [showMore, setShowMore] = useState(false);

  const handleTabChange = (id) => {
    onTabChange(id);
    setShowMore(false);
  };

  const visibleMore = MORE_TABS.filter(t => !t.minPrestiges || totalPrestiges >= t.minPrestiges);
  const isMoreActive = visibleMore.some(t => t.id === activeTab);
  const isEmpireActive = activeTab === 'generators';

  return (
    <>
      {/* More Menu Overlay */}
      {showMore && (
        <div className="absolute bottom-16 left-0 right-0 z-40 mx-3 mb-1">
          <div className="bg-card/98 backdrop-blur-xl border border-border/60 rounded-xl p-2 shadow-2xl">
            <div className="grid grid-cols-3 gap-1">
              {visibleMore.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex flex-col items-center gap-1 py-3 px-1 rounded-lg transition-all
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
        <div className="flex items-end justify-around px-2 pb-1 pt-1">

          {/* Tech - left */}
          <SideTab id="upgrades" label="Tech" icon={ArrowUp} isActive={activeTab === 'upgrades'} onClick={() => { setShowMore(false); onTabChange('upgrades'); }} />

          {/* Empire - center FAB */}
          <div className="flex flex-col items-center" style={{ marginTop: '-18px' }}>
            <button
              onClick={() => { setShowMore(false); onTabChange('generators'); }}
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all
                ${isEmpireActive
                  ? 'bg-primary text-primary-foreground shadow-primary/50 shadow-lg scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
                }`}
              style={isEmpireActive ? { boxShadow: '0 0 20px hsl(185 80% 55% / 0.5)' } : {}}
            >
              <Pickaxe className="w-6 h-6" />
            </button>
            <span className={`font-display text-[9px] font-bold tracking-widest mt-1 ${isEmpireActive ? 'text-primary' : 'text-muted-foreground'}`}>
              EMPIRE
            </span>
          </div>

          {/* Crew - right */}
          <SideTab id="managers" label="Crew" icon={Users} isActive={activeTab === 'managers'} onClick={() => { setShowMore(false); onTabChange('managers'); }} />

          {/* More */}
          <button
            onClick={() => setShowMore(v => !v)}
            className={`relative flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-all flex-1
              ${showMore || isMoreActive ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {showMore ? <X className="w-4 h-4" /> : <MoreHorizontal className="w-4 h-4" />}
            {(showMore || isMoreActive) && <span className="font-body text-[9px] font-bold tracking-wide">More</span>}
            {(showMore || isMoreActive) && <div className="w-1 h-1 rounded-full bg-primary" />}
          </button>

        </div>
      </div>
    </>
  );
}