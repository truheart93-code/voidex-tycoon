import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '@/lib/gameData';
import { Zap, X } from 'lucide-react';

const MIN_INTERVAL = 3 * 60 * 1000; // 3 min
const MAX_INTERVAL = 8 * 60 * 1000; // 8 min

function randomBetween(a, b) {
  return a + Math.floor(Math.random() * (b - a));
}

function buildEvents(state) {
  const base = Math.max(state.totalEarned || 1, 100);
  const bonus = Math.floor(base * (0.02 + Math.random() * 0.05));
  const bigBonus = Math.floor(base * (0.08 + Math.random() * 0.1));

  return [
    {
      id: 'asteroid_bonanza',
      icon: '☄️',
      title: 'Asteroid Bonanza',
      flavor: 'A rogue asteroid cluster rich in rare minerals drifts into your mining zone.',
      effect: `+${formatNumber(bonus)} credits deposited`,
      color: 'border-amber-500/40 bg-amber-500/10',
      accent: '#f59e0b',
      action: 'MINE IT',
      apply: (onAddCredits) => onAddCredits(bonus),
    },
    {
      id: 'solar_flare',
      icon: '🌞',
      title: 'Solar Flare Surge',
      flavor: 'A massive solar flare supercharges your solar collectors and power grids.',
      effect: 'All production x3 for 45 seconds',
      color: 'border-orange-500/40 bg-orange-500/10',
      accent: '#fb923c',
      action: 'HARNESS IT',
      buff: { id: 'buff_rush', duration: 45000, incomeMultiplier: 3 },
      apply: (onAddCredits, onAddBuff) => onAddBuff({ id: 'buff_rush', instanceId: Date.now(), expiresAt: Date.now() + 45000 }),
    },
    {
      id: 'void_rift',
      icon: '🌌',
      title: 'Void Rift Discovery',
      flavor: 'Your scanners detect an unstable rift leaking exotic matter and raw energy.',
      effect: `+${formatNumber(bigBonus)} credits from exotic matter`,
      color: 'border-purple-500/40 bg-purple-500/10',
      accent: '#a78bfa',
      action: 'EXTRACT',
      apply: (onAddCredits) => onAddCredits(bigBonus),
    },
    {
      id: 'trade_convoy',
      icon: '🚀',
      title: 'Trade Convoy Passes',
      flavor: 'A mega-convoy requests emergency docking. They pay handsomely for the privilege.',
      effect: `+${formatNumber(bonus * 2)} credits docking fees`,
      color: 'border-cyan-500/40 bg-cyan-500/10',
      accent: '#22d3ee',
      action: 'ALLOW DOCKING',
      apply: (onAddCredits) => onAddCredits(bonus * 2),
    },
    {
      id: 'quantum_spike',
      icon: '⚛️',
      title: 'Quantum Resonance Spike',
      flavor: 'Quantum fluctuations briefly synchronize all your generators into perfect harmony.',
      effect: 'Production x5 for 20 seconds',
      color: 'border-sky-500/40 bg-sky-500/10',
      accent: '#38bdf8',
      action: 'SYNCHRONIZE',
      apply: (onAddCredits, onAddBuff) => onAddBuff({ id: 'buff_fever', instanceId: Date.now(), expiresAt: Date.now() + 20000 }),
    },
    {
      id: 'market_boom',
      icon: '📈',
      title: 'Galactic Market Boom',
      flavor: 'Credit futures skyrocket across all sectors. Sell now before it crashes.',
      effect: `+${formatNumber(bigBonus * 1.5)} credits market windfall`,
      color: 'border-green-500/40 bg-green-500/10',
      accent: '#4ade80',
      action: 'SELL HIGH',
      apply: (onAddCredits) => onAddCredits(Math.floor(bigBonus * 1.5)),
    },
    {
      id: 'supernova_shockwave',
      icon: '💥',
      title: 'Supernova Shockwave',
      flavor: 'A nearby star goes supernova. The shockwave carries tremendous energy your way.',
      effect: 'Overdrive: x2 speed for 90 seconds',
      color: 'border-rose-500/40 bg-rose-500/10',
      accent: '#f87171',
      action: 'RIDE THE WAVE',
      apply: (onAddCredits, onAddBuff) => onAddBuff({ id: 'buff_overdrive', instanceId: Date.now(), expiresAt: Date.now() + 90000 }),
    },
    {
      id: 'pirate_tribute',
      icon: '🏴‍☠️',
      title: 'Pirates Pay Tribute',
      flavor: 'A local pirate faction, impressed by your empire, sends tribute to avoid conflict.',
      effect: `+${formatNumber(bonus * 3)} credits tribute payment`,
      color: 'border-yellow-500/40 bg-yellow-500/10',
      accent: '#facc15',
      action: 'ACCEPT TRIBUTE',
      apply: (onAddCredits) => onAddCredits(bonus * 3),
    },
  ];
}

export default function GalaxyEvents({ state, onAddCredits, onAddBuff }) {
  const [event, setEvent] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const scheduleNext = useCallback(() => {
    const delay = randomBetween(MIN_INTERVAL, MAX_INTERVAL);
    const id = setTimeout(() => {
      const events = buildEvents(state);
      const picked = events[Math.floor(Math.random() * events.length)];
      setEvent(picked);
    }, delay);
    setTimeoutId(id);
  }, [state]);

  useEffect(() => {
    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []); // eslint-disable-line

  const handleAccept = () => {
    if (event?.apply) event.apply(onAddCredits, onAddBuff);
    setEvent(null);
    scheduleNext();
  };

  const handleDismiss = () => {
    setEvent(null);
    scheduleNext();
  };

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 18 }}
            className={`w-full max-w-sm rounded-3xl border ${event.color} overflow-hidden shadow-2xl`}
            style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))' }}
          >
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${event.accent}, transparent)` }} />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{event.icon}</div>
                  <div>
                    <p className="font-display text-[9px] font-bold tracking-widest" style={{ color: event.accent }}>GALAXY EVENT</p>
                    <h2 className="font-display text-base font-black tracking-wide text-foreground">{event.title}</h2>
                  </div>
                </div>
                <button onClick={handleDismiss} className="p-1 rounded-lg bg-muted/30 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Flavor */}
              <div className={`rounded-2xl p-4 ${event.color} border mb-4`}>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{event.flavor}</p>
              </div>

              {/* Effect */}
              <div className="flex items-center gap-2 mb-5 px-1">
                <Zap className="w-4 h-4 flex-shrink-0" style={{ color: event.accent }} />
                <p className="font-display text-xs font-bold" style={{ color: event.accent }}>{event.effect}</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDismiss}
                  className="flex-1 py-3 rounded-2xl font-body text-sm font-semibold text-muted-foreground bg-muted/30 border border-border/20 active:scale-95 transition-all"
                >
                  Ignore
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="flex-1 py-3 rounded-2xl font-display text-sm font-black tracking-widest shadow-lg active:scale-95 transition-all"
                  style={{ background: `linear-gradient(135deg, ${event.accent}, ${event.accent}bb)`, color: 'hsl(230 25% 7%)' }}
                >
                  {event.action}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}