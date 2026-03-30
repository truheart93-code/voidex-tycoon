import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Check } from 'lucide-react';
import { THEMES } from '@/lib/themes';

export default function ThemeSelector({ currentTheme, onSelect, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full bg-card border-t border-border rounded-t-3xl p-5 pb-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              <h2 className="font-display text-sm font-bold tracking-wide text-foreground">VISUAL THEMES</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-muted/60 text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme grid */}
          <div className="grid grid-cols-2 gap-2.5 max-h-80 overflow-y-auto">
            {THEMES.map(theme => {
              const isActive = currentTheme === theme.id;
              return (
                <motion.button
                  key={theme.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelect(theme.id)}
                  className={`relative rounded-2xl p-3 border text-left transition-all
                    ${isActive
                      ? 'border-primary shadow-lg shadow-primary/20 bg-primary/10'
                      : 'border-border/50 bg-muted/30 hover:border-border'}`}
                >
                  {/* Color swatches */}
                  <div className="flex gap-1 mb-2">
                    {theme.preview.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-6 rounded-lg"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{theme.emoji}</span>
                        <span className="font-display text-[11px] font-bold text-foreground">{theme.name}</span>
                      </div>
                      <p className="font-body text-[10px] text-muted-foreground mt-0.5">{theme.description}</p>
                    </div>
                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}