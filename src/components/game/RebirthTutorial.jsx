import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const REBIRTH_KEY = 'voidex_rebirth_tutorial_seen';
// Trigger when player has earned enough to prestige (1M lifetime) and hasn't yet
const PRESTIGE_THRESHOLD = 1_000_000;

const SLIDES = [
  {
    icon: '🌀',
    title: 'A Stranger Appears',
    text: `A hooded figure materializes beside your control panel. They smell faintly of stardust and regret.\n\n"I've been watching your operation, Commander. Impressive. Reckless, but impressive.\n\nYou're on the verge of something most operators never discover: the Cosmic Rebirth."\n\nThey pause dramatically. You wait. They wait. Someone has to break first.\n\n"...Would you like to hear about it?"`,
  },
  {
    icon: '♻️',
    title: 'The Big Reset',
    text: `"Here's the deal: you reset everything. Credits, generators, the works. Start from scratch.\n\nIn exchange? Prestige Stars. Permanent multipliers that stick around FOREVER.\n\nYour next run starts the same but ends... bigger. Exponentially bigger. Numbers so large they'll make mathematicians weep.\n\nYou don't have to do it now. But you'll want to. Eventually. They always do."`,
  },
  {
    icon: '⭐',
    title: 'When to Pull the Trigger',
    text: `"A word of wisdom: more lifetime earnings = more Prestige Stars.\n\nDon't rush it. Squeeze every credit you can first. Max out a few more generators. Hire the managers. Get some upgrades.\n\nThen — and only then — visit the REBIRTH tab and make your choice.\n\nThe void rewards patience. And also impatience, honestly. It's a vibe-based decision."\n\nThe stranger vanishes. A business card floats down. It just says 'Good luck.'`,
  },
];

export default function RebirthTutorial({ state, onNavigatePrestige }) {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem(REBIRTH_KEY);
    if (!seen && (state.lifetimeEarned || 0) >= PRESTIGE_THRESHOLD && !state.totalPrestiges) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, [state.lifetimeEarned, state.totalPrestiges]);

  const handleNext = () => {
    if (slide < SLIDES.length - 1) {
      setSlide(s => s + 1);
    } else {
      localStorage.setItem(REBIRTH_KEY, '1');
      setVisible(false);
      onNavigatePrestige?.();
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(REBIRTH_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[65] flex items-end justify-center px-4 pb-24"
        style={{ background: 'radial-gradient(ellipse at center, rgba(88,28,135,0.6) 0%, rgba(0,0,0,0.7) 100%)', backdropFilter: 'blur(3px)' }}
      >
        <motion.div
          initial={{ scale: 0.92, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-sm rounded-3xl border border-secondary/50 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(270 25% 10%))' }}
        >
          <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--secondary)), transparent)' }} />
          <div className="p-5">
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-4">
              {SLIDES.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i === slide ? 'w-5 h-1.5 bg-secondary' : i < slide ? 'w-1.5 h-1.5 bg-secondary/50' : 'w-1.5 h-1.5 bg-muted/50'}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/20 border border-secondary/40 flex items-center justify-center text-3xl">
                    {SLIDES[slide].icon}
                  </div>
                </div>

                <h2 className="font-display text-sm font-black tracking-widest text-center text-foreground mb-3">
                  {SLIDES[slide].title}
                </h2>

                <div className="rounded-2xl bg-secondary/10 border border-secondary/25 p-4 mb-4">
                  <p className="font-body text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                    {SLIDES[slide].text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3">
              <button
                onClick={handleDismiss}
                className="px-4 py-2.5 rounded-2xl font-body text-xs font-semibold text-muted-foreground bg-muted/30 border border-border/20 active:scale-95 transition-all"
              >
                Later
              </button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleNext}
                className="flex-1 py-2.5 rounded-2xl font-display text-xs font-black tracking-widest flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, hsl(270 60% 55%), hsl(270 50% 42%))', color: 'white' }}
              >
                <Star className="w-3.5 h-3.5" />
                {slide < SLIDES.length - 1 ? 'TELL ME MORE' : 'SHOW ME REBIRTH'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}