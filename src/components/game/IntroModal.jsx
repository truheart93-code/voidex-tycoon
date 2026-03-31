import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_KEY = 'voidex_intro_seen_v2';

const STORY_SLIDES = [
  {
    icon: '📜',
    title: 'You\'ve Got Mail (Sort Of)',
    text: `A wrinkled holo-scroll materializes in your pocket. It's from Uncle Orion.\n\n"Kid, I'm leaving you everything. The asteroid claim, the dented cargo hauler, and my lucky space boots (left one has a hole, don't ask).\n\nYou've got 25 credits and a galaxy full of rocks. Every empire starts somewhere. Mine started with a pickaxe and a dream.\n\nDon't blow it on space lottery tickets.\n- Uncle Orion 🚀"`,
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
  },
  {
    icon: '🪐',
    title: 'The Galaxy Awaits',
    text: `Uncle Orion was legendary. They say he once convinced a black hole to give him a refund.\n\nHis will lists his assets:\n• 1x Asteroid Mine (slightly used)\n• 1x Reputation: Eccentric but honest\n• ∞x Potential\n\nThe Galactic Trade Authority is watching your empire's first moves. Neighboring warlords are circling. The void doesn't care about your feelings.\n\nTime to get rich.`,
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
  },
  {
    icon: '💸',
    title: 'How Credits Work',
    text: `Credits are the lifeblood of your empire. Everything costs them. Everything earns them.\n\nGenerators are your money machines — buy them, tap them, watch numbers go up. This is the entire game. We're not going to pretend it's more complicated than that.\n\n(It does get more complicated than that.)\n\nYour first generator is the Asteroid Mine. It's humble. It's yours. Treat it well.`,
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
  },
];

const TUTORIAL_STEPS = [
  {
    id: 'buy_first',
    icon: '🪨',
    title: 'Stake Your Claim',
    text: 'Hit BUY on the Asteroid Mine. You have 25 credits. It costs 10. Yes, you can afford it. Go ahead.',
    arrowDir: 'down',
    tab: 'generators',
    check: (state) => Object.values(state.generators).some(g => g?.count > 0),
  },
  {
    id: 'tap_start',
    icon: '⚡',
    title: 'Wake It Up',
    text: 'Now tap the Asteroid Mine card to fire it up. Those rocks aren\'t going to mine themselves. Well, eventually they will, but not yet.',
    arrowDir: 'down',
    tab: 'generators',
    check: (state) => Object.values(state.generators).some(g => g?.running),
  },
  {
    id: 'collect',
    icon: '💎',
    title: 'Payday!',
    text: 'The progress bar is filling. When it glows gold, tap it to collect. First earnings hit different. Savour it.',
    arrowDir: 'down',
    tab: 'generators',
    check: (state, baseline) => (state.lifetimeEarned || 0) > baseline,
  },
  {
    id: 'crew_intro',
    icon: '👥',
    title: 'Meet Your Crew',
    text: 'Nice work, boss. But tapping forever sounds exhausting. Head to the CREW tab — you can hire managers to run generators automatically while you sip space-coffee.',
    arrowDir: 'none',
    tab: 'managers',
    switchTabTo: 'managers',
    check: (state) => state.managers && state.managers.length > 0,
  },
  {
    id: 'tech_intro',
    icon: '🔬',
    title: 'Upgrade Time',
    text: 'Managers hired? Beautiful. Now check the TECH tab — upgrades multiply your generator output. Doubling, tripling, sometimes 10x. Mathematically irresponsible. Financially brilliant.',
    arrowDir: 'none',
    tab: 'upgrades',
    switchTabTo: 'upgrades',
    autoAdvance: 5000,
  },
];

export default function IntroModal({ state, blocked = false, onTabChange }) {
  const [phase, setPhase] = useState('story');
  const [slide, setSlide] = useState(0);
  const [tutStep, setTutStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const baselineEarned = useRef(0);
  const tabSwitched = useRef(false);

  useEffect(() => {
    const seen = localStorage.getItem(INTRO_KEY);
    const hasEmpire = state && Object.values(state.generators || {}).some(g => g?.count > 0);
    if (!seen && !hasEmpire) setVisible(true);
  }, []);

  // Switch tab when tutorial step requires it
  useEffect(() => {
    if (phase !== 'tutorial' || !visible) return;
    const step = TUTORIAL_STEPS[tutStep];
    if (step?.switchTabTo && !tabSwitched.current) {
      tabSwitched.current = true;
      onTabChange?.(step.switchTabTo);
    }
  }, [tutStep, phase, visible]);

  // Check predicates
  useEffect(() => {
    if (phase !== 'tutorial' || !visible) return;
    const step = TUTORIAL_STEPS[tutStep];
    if (!step || step.autoAdvance || !step.check) return;
    if (step.check(state, baselineEarned.current)) {
      setTimeout(() => {
        tabSwitched.current = false;
        setTutStep(s => s + 1);
      }, 500);
    }
  }, [state, phase, tutStep, visible]);

  // Auto-advance steps
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
      baselineEarned.current = state.lifetimeEarned || 0;
      tabSwitched.current = false;
      onTabChange?.('generators');
      setPhase('tutorial');
    }
  };

  const handleSkip = () => {
    localStorage.setItem(INTRO_KEY, '1');
    setVisible(false);
  };

  if (!visible || blocked) return null;

  const isTutorial = phase === 'tutorial';
  const currentStep = TUTORIAL_STEPS[tutStep];

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex px-4 justify-center"
        style={isTutorial
          ? { pointerEvents: 'none', alignItems: 'flex-start', paddingTop: '72px' }
          : { alignItems: 'flex-end', paddingBottom: '160px', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 100%)', backdropFilter: 'blur(3px)' }
        }
      >
        <div className="relative w-full max-w-sm" style={{ pointerEvents: 'auto' }}>

          {/* STORY PHASE */}
          {phase === 'story' && (
            <>
              <div className="flex justify-center gap-1.5 mb-3">
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
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring' }}
                      className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl bg-gradient-to-br ${STORY_SLIDES[slide].color} border ${STORY_SLIDES[slide].border}`}
                    >
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
                  Skip Intro
                </button>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleStoryNext}
                  className="flex-1 py-2.5 rounded-2xl font-display text-sm font-black tracking-widest shadow-lg"
                  style={{ background: 'linear-gradient(135deg, hsl(185 80% 55%), hsl(185 70% 42%))', color: 'hsl(230 25% 7%)' }}>
                  {slide < STORY_SLIDES.length - 1 ? 'CONTINUE' : "LET'S GO"}
                </motion.button>
              </div>
            </>
          )}

          {/* TUTORIAL PHASE */}
          {phase === 'tutorial' && currentStep && (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tutStep}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-2xl border border-accent/40 overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, hsl(230 20% 13% / 0.97), hsl(230 25% 9% / 0.97))' }}
                >
                  <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)' }} />
                  <div className="p-4 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                      {currentStep.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[9px] font-bold tracking-widest text-accent mb-0.5">
                        STEP {tutStep + 1} / {TUTORIAL_STEPS.length}
                      </p>
                      <p className="font-display text-xs font-black text-foreground">{currentStep.title}</p>
                      <p className="font-body text-xs text-foreground/75 leading-snug mt-1">{currentStep.text}</p>
                    </div>
                    <button onClick={handleSkip} className="text-muted-foreground/40 text-xs hover:text-muted-foreground flex-shrink-0 px-1">
                      ✕
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
              {currentStep.arrowDir === 'down' && (
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 0.85, repeat: Infinity }}
                  className="text-center text-2xl mt-1 select-none"
                >
                  👇
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}