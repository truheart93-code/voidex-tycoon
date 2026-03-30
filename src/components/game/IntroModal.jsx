import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_KEY = 'voidex_intro_seen';

const STORY_SLIDES = [
  {
    icon: '📜',
    title: 'A Letter Arrives...',
    text: `"My dearest niece/nephew,\n\nIf you're reading this, I'm already among the stars — quite literally. I spent forty years building trade routes across the outer voids, and now it's your turn.\n\nI'm leaving you my old asteroid mining claim and 25 credits to get started. It's not much, but every empire begins with a single mine."\n\n— Uncle Orion`,
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
  },
  {
    icon: '🪐',
    title: 'Your Inheritance',
    text: `Uncle Orion was the most eccentric void-trader in the galaxy. They said he once bartered a black hole's event horizon for a sandwich.\n\nNow his entire estate — one asteroid mining claim, slightly dented — belongs to you.\n\nThe void awaits, Commander. Build the empire he always dreamed of.`,
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
  },
  {
    icon: '⚡',
    title: 'How to Play',
    text: `• TAP your generator to start production\n• When it glows gold — tap to COLLECT credits\n• Buy more generators to earn faster\n• Hire MANAGERS to automate production\n• Buy UPGRADES for massive multipliers\n• PRESTIGE to reset for permanent star bonuses`,
    color: 'from-primary/20 to-secondary/10',
    border: 'border-primary/30',
    isTutorial: true,
  },
  {
    icon: '🚀',
    title: "Uncle Orion's Last Words",
    text: `"One more thing — don't trust anyone selling 'guaranteed warp routes'. And never, ever skip buying a Dyson Sphere if you get the chance.\n\nThe galaxy is yours. Make me proud.\n\nP.S. — The asteroid has a name. I called her Bertha. She bites, but she's loyal."\n\n— Uncle Orion`,
    color: 'from-secondary/20 to-purple-500/10',
    border: 'border-secondary/30',
  },
];

export default function IntroModal({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(INTRO_KEY);
    if (!seen) setVisible(true);
  }, []);

  const handleNext = () => {
    if (slide < STORY_SLIDES.length - 1) {
      setSlide(s => s + 1);
    } else {
      localStorage.setItem(INTRO_KEY, '1');
      setVisible(false);
      onComplete?.();
    }
  };

  const handleSkip = () => {
    localStorage.setItem(INTRO_KEY, '1');
    setVisible(false);
    onComplete?.();
  };

  if (!visible) return null;

  const current = STORY_SLIDES[slide];
  const isLast = slide === STORY_SLIDES.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-6"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.98) 100%)' }}
      >
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() > 0.8 ? 2 : 1,
                height: Math.random() > 0.8 ? 2 : 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-sm">
          {/* Slide counter dots */}
          <div className="flex justify-center gap-2 mb-4">
            {STORY_SLIDES.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${i === slide ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-muted'}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className={`rounded-3xl border ${current.border} overflow-hidden`}
              style={{ background: `linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))` }}
            >
              {/* Top accent */}
              <div className={`h-1 w-full bg-gradient-to-r ${current.color.replace('/20', '').replace('/10', '')}`} style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }} />

              <div className="p-7">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl bg-gradient-to-br ${current.color} border ${current.border}`}
                >
                  {current.icon}
                </motion.div>

                <h2 className="font-display text-base font-black tracking-widest text-center text-foreground mb-4">
                  {current.title}
                </h2>

                <div className={`rounded-2xl p-4 bg-gradient-to-br ${current.color} border ${current.border}`}>
                  {current.isTutorial ? (
                    <div className="space-y-2">
                      {current.text.split('\n').filter(Boolean).map((line, i) => (
                        <p key={i} className="font-body text-sm text-foreground/90 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="font-body text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                      {current.text}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            {!isLast && (
              <button
                onClick={handleSkip}
                className="flex-1 py-3 rounded-2xl font-body text-sm font-semibold text-muted-foreground bg-muted/30 border border-border/20 active:scale-95 transition-all"
              >
                Skip Intro
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleNext}
              className="flex-1 py-3 rounded-2xl font-display text-sm font-black tracking-widest shadow-lg active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, hsl(185 80% 55%), hsl(185 70% 42%))', color: 'hsl(230 25% 7%)' }}
            >
              {isLast ? '🚀 BEGIN JOURNEY' : 'CONTINUE →'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}