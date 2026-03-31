import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_KEY = 'voidex_intro_seen';

const STORY_SLIDES = [
  {
    icon: '📜',
    title: 'A Letter Arrives...',
    text: `"My dearest niece/nephew,\n\nIf you're reading this, I'm already among the stars. Quite literally. I spent forty years building trade routes across the outer voids, and now it's your turn.\n\nI'm leaving you my old asteroid mining claim and 25 credits to get started. It's not much, but every empire begins with a single mine."\n\n- Uncle Orion`,
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
  },
  {
    icon: '🪐',
    title: 'Your Inheritance',
    text: `Uncle Orion was the most eccentric void-trader in the galaxy. They said he once bartered a black hole's event horizon for a sandwich.\n\nNow his entire estate -- one asteroid mining claim, slightly dented -- belongs to you.\n\nThe void awaits, Commander. Build the empire he always dreamed of.`,
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
  },
];

// Each step checks current state directly (no prev/curr comparison)
const TUTORIAL_STEPS = [
  {
    id: 'buy_first',
    icon: '🪨',
    title: 'Buy Your First Generator',
    text: 'Tap the BUY button on the Asteroid Mine to purchase your first generator. You have 25 credits -- more than enough!',
    arrowDir: 'down',
    check: (state) => Object.values(state.generators).some(g => g?.count > 0),
  },
  {
    id: 'tap_start',
    icon: '⚡',
    title: 'Start Production',
    text: 'Tap anywhere on the Asteroid Mine card to start production. Watch the progress bar fill up!',
    arrowDir: 'down',
    check: (state) => Object.values(state.generators).some(g => g?.running),
  },
  {
    id: 'collect',
    icon: '💎',
    title: 'Collect Your Credits',
    text: 'When the bar fills and the card glows gold, tap it to collect your earnings!',
    arrowDir: 'down',
    check: (state, baseline) => state.totalEarned > baseline,
  },
  {
    id: 'buy_more',
    icon: '🏗️',
    title: 'Expand Your Empire',
    text: 'Great! Keep buying generators to earn more credits. Buy a manager to automate production so you earn even while away.',
    arrowDir: 'none',
    autoAdvance: 3500,
  },
];

export default function IntroModal({ state, blocked = false }) {
  const [phase, setPhase] = useState('story');
  const [slide, setSlide] = useState(0);
  const [tutStep, setTutStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const baselineEarned = useRef(0);

  useEffect(() => {
    const seen = localStorage.getItem(INTRO_KEY);
    if (!seen) setVisible(true);
  }, []);

  // Check tutorial step completion by inspecting current state directly
  useEffect(() => {
    if (phase !== 'tutorial' || !visible) return;
    const step = TUTORIAL_STEPS[tutStep];
    if (!step || step.autoAdvance || !step.check) return;
    if (step.check(state, baselineEarned.current)) {
      setTimeout(() => setTutStep(s => s + 1), 400);
    }
  }, [state, phase, tutStep, visible]);

  // Auto-advance last step
  useEffect(() => {
    if (phase !== 'tutorial') return;
    const step = TUTORIAL_STEPS[tutStep];
    if (step?.autoAdvance) {
      const t = setTimeout(() => {
        localStorage.setItem(INTRO_KEY, '1');
        setVisible(false);
      }, step.autoAdvance);
      return () => clearTimeout(t);
    }
  }, [tutStep, phase]);

  const handleStoryNext = () => {
    if (slide < STORY_SLIDES.length - 1) {
      setSlide(s => s + 1);
    } else {
      // Capture current earned as baseline for the collect step
      baselineEarned.current = state.totalEarned;
      setPhase('tutorial');
    }
  };

  const handleSkip = () => {
    localStorage.setItem(INTRO_KEY, '1');
    setVisible(false);
  };

  if (!visible || blocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end justify-center pb-40 px-4"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 100%)', backdropFilter: 'blur(2px)' }}
      >
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white"
              style={{ width: 1, height: 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-sm pointer-events-auto">
          {phase === 'story' && (
            <>
              <div className="flex justify-center gap-2 mb-3">
                {[...STORY_SLIDES, ...TUTORIAL_STEPS].map((_, i) => (
                  <div key={i} className={`rounded-full transition-all duration-300 ${i === slide ? 'w-5 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-muted/60'}`} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-3xl border ${STORY_SLIDES[slide].border} overflow-hidden`}
                  style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))' }}
                >
                  <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }} />
                  <div className="p-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring' }}
                      className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl bg-gradient-to-br ${STORY_SLIDES[slide].color} border ${STORY_SLIDES[slide].border}`}>
                      {STORY_SLIDES[slide].icon}
                    </motion.div>
                    <h2 className="font-display text-sm font-black tracking-widest text-center text-foreground mb-3">
                      {STORY_SLIDES[slide].title}
                    </h2>
                    <div className={`rounded-2xl p-4 bg-gradient-to-br ${STORY_SLIDES[slide].color} border ${STORY_SLIDES[slide].border}`}>
                      <p className="font-body text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                        {STORY_SLIDES[slide].text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-3 mt-3">
                <button onClick={handleSkip}
                  className="flex-1 py-2.5 rounded-2xl font-body text-sm font-semibold text-muted-foreground bg-muted/30 border border-border/20 active:scale-95 transition-all">
                  Skip
                </button>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleStoryNext}
                  className="flex-1 py-2.5 rounded-2xl font-display text-sm font-black tracking-widest shadow-lg active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, hsl(185 80% 55%), hsl(185 70% 42%))', color: 'hsl(230 25% 7%)' }}>
                  {slide < STORY_SLIDES.length - 1 ? 'CONTINUE' : 'LETS GO'}
                </motion.button>
              </div>
            </>
          )}

          {phase === 'tutorial' && tutStep < TUTORIAL_STEPS.length && (
            <>
              <div className="flex justify-center gap-2 mb-3">
                {TUTORIAL_STEPS.map((_, i) => (
                  <div key={i} className={`rounded-full transition-all duration-300 ${i === tutStep ? 'w-5 h-1.5 bg-accent' : i < tutStep ? 'w-1.5 h-1.5 bg-primary/60' : 'w-1.5 h-1.5 bg-muted/60'}`} />
                ))}
              </div>

              {/* Bouncing arrow pointing up at game */}
              {TUTORIAL_STEPS[tutStep].arrowDir === 'down' && (
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="text-center text-3xl mb-1 select-none"
                >
                  👆
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={tutStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-accent/40 overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))' }}
                >
                  <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)' }} />
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-xl flex-shrink-0">
                        {TUTORIAL_STEPS[tutStep].icon}
                      </div>
                      <div>
                        <p className="font-display text-[9px] font-bold tracking-widest text-accent">STEP {tutStep + 1} OF {TUTORIAL_STEPS.length}</p>
                        <h2 className="font-display text-sm font-black tracking-wide text-foreground">
                          {TUTORIAL_STEPS[tutStep].title}
                        </h2>
                      </div>
                    </div>
                    <div className="rounded-xl p-3 bg-accent/8 border border-accent/20">
                      <p className="font-body text-sm text-foreground/85 leading-relaxed">
                        {TUTORIAL_STEPS[tutStep].text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-3">
                <button onClick={handleSkip}
                  className="px-5 py-2.5 rounded-2xl font-body text-xs font-semibold text-muted-foreground bg-muted/30 border border-border/20 active:scale-95 transition-all">
                  Skip
                </button>
                <div className="flex-1 py-2.5 rounded-2xl bg-muted/20 border border-border/10 flex items-center justify-center gap-2">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-display text-[10px] text-muted-foreground tracking-widest">WAITING FOR ACTION</span>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}