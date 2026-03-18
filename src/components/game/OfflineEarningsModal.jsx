import { formatNumber } from '@/lib/gameData';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineEarningsModal({ earnings, onDismiss }) {
  if (!earnings || earnings <= 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={onDismiss}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-b from-card to-background rounded-2xl border border-border p-8 text-center max-w-sm w-full shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-5xl mb-4 animate-float">🌙</div>
          <h2 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">
            WELCOME BACK
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Your empire kept working while you were away!
          </p>
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 mb-6">
            <p className="font-body text-xs text-primary mb-1">You earned</p>
            <p className="font-display text-2xl font-black text-primary">
              💎 {formatNumber(earnings)}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold tracking-wide shadow-lg shadow-primary/20 active:scale-95 transition-transform"
          >
            COLLECT
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}