import { formatNumber } from '@/lib/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Zap, Clock } from 'lucide-react';

export default function OfflineEarningsModal({ earnings, offlineSeconds, onDismiss }) {
  if (!earnings || earnings <= 0) return null;

  const hours = Math.floor((offlineSeconds || 0) / 3600);
  const minutes = Math.floor(((offlineSeconds || 0) % 3600) / 60);
  const timeAway = hours > 0 ? `${hours}h ${minutes}m` : minutes > 0 ? `${minutes}m` : 'a moment';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.95) 100%)' }}
        onClick={onDismiss}
      >
        {/* Starfield effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-white"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.75, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-primary/30 shadow-2xl"
          style={{ background: 'linear-gradient(160deg, hsl(230 20% 13%) 0%, hsl(230 25% 8%) 100%)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Top glow strip */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Ambient glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative p-8 text-center">
            {/* Icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5 text-4xl"
              style={{ background: 'linear-gradient(135deg, hsl(185 80% 55% / 0.15), hsl(270 60% 55% / 0.15))', border: '1px solid hsl(185 80% 55% / 0.2)' }}
            >
              🌙
            </motion.div>

            <h2 className="font-display text-xl font-black tracking-widest text-foreground mb-1">
              WELCOME BACK
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Your empire kept running while you were away
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-2xl p-3 border border-border/30" style={{ background: 'hsl(230 20% 10%)' }}>
                <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wide">Time Away</p>
                <p className="font-display text-sm font-bold text-foreground mt-0.5">{timeAway}</p>
              </div>
              <div className="rounded-2xl p-3 border border-border/30" style={{ background: 'hsl(230 20% 10%)' }}>
                <Zap className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wide">Efficiency</p>
                <p className="font-display text-sm font-bold text-accent mt-0.5">50%</p>
              </div>
            </div>

            {/* Earnings highlight */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="rounded-2xl p-5 mb-6 border border-primary/25 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(185 80% 55% / 0.12), hsl(270 60% 55% / 0.08))' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <p className="font-body text-xs text-primary/70 uppercase tracking-widest mb-2">Credits Earned</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">💎</span>
                <motion.span
                  className="font-display text-3xl font-black text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', damping: 15 }}
                >
                  {formatNumber(earnings)}
                </motion.span>
              </div>
            </motion.div>

            {/* Claim button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onDismiss}
              className="w-full py-4 rounded-2xl font-display text-sm font-black tracking-widest shadow-lg relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, hsl(185 80% 55%), hsl(185 70% 45%))', color: 'hsl(230 25% 7%)' }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
              ⚡ COLLECT EARNINGS
            </motion.button>

            <p className="font-body text-[10px] text-muted-foreground/50 mt-3">
              Tap anywhere to dismiss
            </p>
          </div>

          {/* Bottom glow strip */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}