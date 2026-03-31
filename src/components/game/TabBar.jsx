import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pickaxe, ArrowUp, Star, CalendarDays, MoreHorizontal, Users, BarChart2, Zap, Medal, Trophy, X } from 'lucide-react';

const MORE_TABS = [
  { id: 'prestige', label: 'Rebirth', icon: Star },
  { id: 'quests', label: 'Quests', icon: CalendarDays },
  { id: 'rifts', label: 'Rifts', icon: Zap, minPrestiges: 50 },
  { id: 'analytics', label: 'Charts', icon: BarChart2 },
  { id: 'leaderboard', label: 'Ranks', icon: Medal },
  { id: 'achievements', label: 'Awards', icon: Trophy },
];

export default function TabBar({ activeTab, onTabChange, questAlert, totalPrestiges = 0, readyCount = 0 }) {
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
      {/* Backdrop */}
      {showMore && (
        <div className="absolute inset-0 z-30" onClick={() => setShowMore(false)} />
      )}

      {/* More Menu */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-[68px] left-0 right-0 z-40 mx-3 mb-1"
          >
            <div className="bg-card/98 backdrop-blur-xl border border-primary/20 rounded-2xl p-3 shadow-2xl shadow-black/50">
              <div className="grid grid-cols-3 gap-2">
                {visibleMore.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-all
                        ${isActive ? 'bg-primary/20 text-primary ring-1 ring-primary/40' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-body text-[9px] font-bold tracking-wide whitespace-nowrap">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Bar */}
      <div className="flex-shrink-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/40 safe-bottom">
        {/* 3-col grid for side tabs + More, Empire is absolutely centered above */}
        <div className="relative flex items-end px-4 pb-2 pt-1">
          {/* Left: Tech */}
          <div className="flex-1 flex justify-center">
            <SideTab id="upgrades" label="Tech" icon={ArrowUp} isActive={activeTab === 'upgrades'}
              onClick={() => { setShowMore(false); onTabChange('upgrades'); }} />
          </div>

          {/* Center: Empire FAB (raised) */}
          <div className="flex flex-col items-center" style={{ marginBottom: '2px' }}>
            <motion.button
              onClick={() => { setShowMore(false); onTabChange('generators'); }}
              whileTap={{ scale: 0.9 }}
              className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-200
                ${isEmpireActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/80 text-muted-foreground border border-border/60'
                }`}
              style={isEmpireActive ? {
                boxShadow: '0 0 0 3px hsl(185 80% 55% / 0.2), 0 0 25px hsl(185 80% 55% / 0.5), 0 4px 20px rgba(0,0,0,0.4)',
                marginTop: '-22px'
              } : {
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                marginTop: '-22px'
              }}
            >
              <Pickaxe className={`w-6 h-6 ${isEmpireActive ? '' : ''}`} />
              {readyCount > 0 && !isEmpireActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-accent text-accent-foreground text-[10px] font-display font-black flex items-center justify-center px-1 shadow-lg"
                >
                  {readyCount}
                </motion.span>
              )}
            </motion.button>
            <span className={`font-display text-[9px] font-black tracking-widest mt-1.5 ${isEmpireActive ? 'text-primary' : 'text-muted-foreground'}`}>
              EMPIRE
            </span>
          </div>

          {/* Right: Crew */}
          <div className="flex-1 flex justify-center">
            <SideTab id="managers" label="Crew" icon={Users} isActive={activeTab === 'managers'}
              onClick={() => { setShowMore(false); onTabChange('managers'); }} />
          </div>

          {/* Far right: More */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => setShowMore(v => !v)}
              className={`relative flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all
                ${showMore || isMoreActive ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <motion.div animate={{ rotate: showMore ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {showMore ? <X className="w-4 h-4" /> : <MoreHorizontal className="w-4 h-4" />}
              </motion.div>
              <span className={`font-body text-[9px] font-bold tracking-wide ${showMore || isMoreActive ? 'text-primary' : ''}`}>
                {isMoreActive ? visibleMore.find(t => t.id === activeTab)?.label : 'More'}
              </span>
              {(questAlert && !isMoreActive) && (
                <span className="absolute top-0.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SideTab({ id, label, icon: Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all
        ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
    >
      <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
      <span className={`font-body text-[9px] font-bold tracking-wide whitespace-nowrap ${isActive ? '' : 'opacity-70'}`}>
        {isActive ? label : label}
      </span>
      {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
    </button>
  );
}