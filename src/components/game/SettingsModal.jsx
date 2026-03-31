import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Palette, RotateCcw, AlertTriangle } from 'lucide-react';

const INTRO_KEY = 'voidex_intro_seen';

export default function SettingsModal({ onClose, isMusicOn, onToggleMusic, onOpenThemes, onResetGame }) {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleFullReset = () => {
    localStorage.removeItem(INTRO_KEY);
    onResetGame();
    window.location.reload();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center px-4"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm rounded-3xl border border-border/60 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              <h2 className="font-display text-sm font-black tracking-widest text-foreground">SETTINGS</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-3">
            {/* Music */}
            <button
              onClick={onToggleMusic}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/30 hover:bg-muted/60 transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                {isMusicOn ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />}
                <span className="font-body text-sm font-semibold text-foreground">Music</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors ${isMusicOn ? 'bg-primary' : 'bg-muted'}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow mt-0.5 transition-transform ${isMusicOn ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </button>

            {/* Themes */}
            <button
              onClick={() => { onOpenThemes(); onClose(); }}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border/30 hover:bg-muted/60 transition-all active:scale-98"
            >
              <Palette className="w-4 h-4 text-secondary" />
              <span className="font-body text-sm font-semibold text-foreground">Visual Theme</span>
              <span className="ml-auto font-body text-xs text-muted-foreground">›</span>
            </button>

            {/* Danger Zone */}
            <div className="mt-4 rounded-2xl border border-destructive/30 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-destructive/10">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                <span className="font-display text-[10px] font-black tracking-widest text-destructive">DANGER ZONE</span>
              </div>
              <div className="p-3">
                {!confirmReset ? (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 transition-all active:scale-98"
                  >
                    <RotateCcw className="w-4 h-4 text-destructive" />
                    <div className="text-left">
                      <div className="font-body text-sm font-semibold text-destructive">Reset All Progress</div>
                      <div className="font-body text-[10px] text-muted-foreground">Wipe everything and start fresh</div>
                    </div>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="font-body text-xs text-destructive/90 text-center leading-relaxed">
                      This will erase ALL progress, credits, generators, achievements, and prestige. Are you absolutely sure?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="flex-1 py-2.5 rounded-xl font-body text-sm font-semibold text-muted-foreground bg-muted/40 border border-border/30 transition-all active:scale-95"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleFullReset}
                        className="flex-1 py-2.5 rounded-xl font-display text-xs font-black tracking-wide text-white bg-destructive border border-destructive transition-all active:scale-95"
                      >
                        RESET
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}