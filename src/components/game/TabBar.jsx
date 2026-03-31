import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pickaxe, ArrowUp, CalendarDays, MoreHorizontal, Users, BarChart2, Zap, Medal, Trophy, Star, X } from 'lucide-react';

const PRIMARY_TABS = [
  { id: 'upgrades', label: 'Tech', icon: ArrowUp },
  { id: 'managers', label: 'Crew', icon: Users },
];

const MORE_TABS = [
  { id: 'prestige', label: 'Rebirth', icon: Star },
  { id: 'quests', label: 'Quests', icon: CalendarDays },
  { id: 'rifts', label: 'Rifts', icon: Zap, minPrestiges: 50 },
  { id: 'analytics', label: 'Charts', icon: BarChart2 },
  { id: 'leaderboard', label: 'Ranks', icon: Medal },
  { id: 'achievements', label: 'Awards', icon: Trophy },
];

export default function TabBar({ activeTab, onTabChange, questAlert, totalPrestiges = 0, readyCount = 0, highlightTabId = null }) {
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
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.18, type: 'spring', stiffness: 320, damping: 26 }}
            className="absolute bottom-[88px] left-0 right-0 z-40 mx-3 mb-1"
          >
            <div className="bg-card/98 backdrop-blur-xl border border-border/40 rounded-2xl p-2.5 shadow-2xl shadow-black/60">
              <div className="grid grid-cols-2 gap-1.5">
                {visibleMore.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all active:scale-95
                        ${isActive
                          ? 'bg-primary/20 text-primary ring-1 ring-primary/30'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-body text-xs font-semibold">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Bar */}
      <div className="flex-shrink-0 z-40 relative" style={{ background: 'hsl(230 22% 9% / 0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid hsl(230 15% 20% / 0.6)' }}>
        <div className="flex items-end px-2 pb-safe" style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}>

          {/* Left tabs */}
          {PRIMARY_TABS.map(tab => (
            <div key={tab.id} className="flex-1 flex justify-center">
              <NavTab
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                highlight={highlightTabId === tab.id}
                onClick={() => { setShowMore(false); onTabChange(tab.id); }}
              />
            </div>
          ))}

          {/* Center: Empire FAB */}
          <div className="flex flex-col items-center" style={{ marginTop: '-18px', marginBottom: '2px' }}>
            <motion.button
              onClick={() => { setShowMore(false); onTabChange('generators'); }}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.04 }}
              className="relative flex flex-col items-center justify-center w-[62px] h-[62px] rounded-full transition-colors duration-200"
              style={isEmpireActive ? {
                background: 'linear-gradient(145deg, hsl(185 80% 60%), hsl(185 70% 40%))',
                boxShadow: '0 0 0 3px hsl(185 80% 55% / 0.25), 0 0 30px hsl(185 80% 55% / 0.55), 0 6px 24px rgba(0,0,0,0.5)',
              } : {
                background: 'linear-gradient(145deg, hsl(230 20% 18%), hsl(230 20% 13%))',
                boxShadow: '0 0 0 1px hsl(230 15% 25%), 0 6px 20px rgba(0,0,0,0.5)',
              }}
            >
              <Pickaxe className={`w-6 h-6 ${isEmpireActive ? 'text-background' : 'text-muted-foreground'}`} />
              {readyCount > 0 && !isEmpireActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-accent text-accent-foreground text-[10px] font-display font-black flex items-center justify-center px-1 shadow-lg"
                >
                  {readyCount}
                </motion.span>
              )}
            </motion.button>
            <span className={`font-display text-[8px] font-black tracking-widest mt-1.5 ${isEmpireActive ? 'text-primary' : 'text-muted-foreground/60'}`}>
              EMPIRE
            </span>
          </div>

          {/* Right: Quests */}
          <div className="flex-1 flex justify-center">
            <NavTab
              id="quests"
              label="Quests"
              icon={CalendarDays}
              isActive={activeTab === 'quests'}
              highlight={highlightTabId === 'quests'}
              onClick={() => { setShowMore(false); onTabChange('quests'); }}
              alert={questAlert}
            />
          </div>

          {/* Far right: More */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => setShowMore(v => !v)}
              className={`relative flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all active:scale-95
                ${showMore || isMoreActive ? 'text-primary' : 'text-muted-foreground/70'}`}
            >
              <motion.div animate={{ rotate: showMore ? 45 : 0 }} transition={{ duration: 0.18 }}>
                {showMore ? <X className="w-[18px] h-[18px]" /> : <MoreHorizontal className="w-[18px] h-[18px]" />}
              </motion.div>
              <span className="font-body text-[9px] font-bold tracking-wide">
                {isMoreActive ? visibleMore.find(t => t.id === activeTab)?.label : 'More'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function NavTab({ label, icon: Icon, isActive, onClick, alert, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all active:scale-95
        ${highlight ? 'text-accent' : isActive ? 'text-primary' : 'text-muted-foreground/70'}`}
    >
      {highlight && (
        <motion.span
          className="absolute inset-0 rounded-xl border-2 border-accent"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.92, 1.04, 0.92] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div className="relative">
        <Icon className={`w-[18px] h-[18px] transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
        {alert && !isActive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
        )}
      </div>
      <span className="font-body text-[9px] font-bold tracking-wide whitespace-nowrap">{label}</span>
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary"
        />
      )}
    </button>
  );
}