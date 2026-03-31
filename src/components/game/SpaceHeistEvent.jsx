import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '@/lib/gameData';

const HEIST_KEY = 'voidex_heist_seen';

const HEIST = {
  id: 'interrogation',
  trigger: (state) => (state.lifetimeEarned || 0) >= 500 && !localStorage.getItem(HEIST_KEY),
  title: 'Galactic Security Checkpoint',
  icon: '🚔',
  intro: `Two GalactiCops materialize outside your mining station. One is holding a clipboard. The other is holding a very large sandwich and seems uninterested in the proceedings.\n\n"Routine inquiry," says Clipboard. "We're investigating the Great Asteroid Caper of last Tuesday. You match the description: 'has a spaceship, wants money.'\n\nWe have a few questions."`,
  questions: [
    {
      id: 'q1',
      question: 'Where were you last Tuesday between 14:00 and 16:00 galactic standard time?',
      options: [
        { text: '"Mining asteroids, officer. Very legally."', outcome: 'good', flavor: 'The officer nods approvingly. "A model citizen." Clipboard writes something positive. Maybe.' },
        { text: '"I plead the 5th Amendment of the Galactic Constitution."', outcome: 'neutral', flavor: '"That only applies in Sector 5," Clipboard says. "This is Sector 7." He squints.' },
        { text: '"Time is a social construct, officer."', outcome: 'bad', penaltyPct: 0.15, flavor: 'The officer stares at you for a long moment. He writes something down. It takes a while. He has very neat handwriting. You lose 15% of your credits to "administrative processing fees."' },
      ],
    },
    {
      id: 'q2',
      question: 'Do you have a permit for all this... *(gestures at your entire empire)*... activity?',
      options: [
        { text: '"Yes, filed under Permit #GX-7749-ALPHA."', outcome: 'good', flavor: '"Checking..." The officer checks. There is no such permit. He cannot find evidence of this. He lets it go. Bureaucracy is a beautiful thing.' },
        { text: '"I didn\'t know I needed one."', outcome: 'neutral', flavor: '"Ignorance of intergalactic mining law is no excuse," Clipboard intones. He seems to enjoy saying this. He says it again.' },
        { text: '"What permit? This is all Uncle Orion\'s stuff."', outcome: 'bad', penaltyPct: 0.2, flavor: '"Uncle Orion owed us 3 outstanding citations." The officer produces a comically thick folder. You pay 20% of your credits in "inherited violations."' },
      ],
    },
    {
      id: 'q3',
      question: 'Final question. The suspect had "an aura of entrepreneurial desperation." Do you have such an aura?',
      options: [
        { text: '"I have an aura of GALACTIC AMBITION, thank you."', outcome: 'good', flavor: '"Fair enough." Clipboard closes his folder. "You\'re free to go. Carry on... ambitiously." The sandwich officer waves without looking up.' },
        { text: '"Only on Mondays."', outcome: 'neutral', flavor: 'A long pause. "Today is Monday." Another long pause. "Move along."' },
        { text: '"...Yes. Desperately so."', outcome: 'good', flavor: '"Honesty. Rare out here." The officer seems genuinely moved. He gives you a thumbs up and leaves. The sandwich officer finishes his sandwich. A good outcome for everyone.' },
      ],
    },
  ],
};

export default function SpaceHeistEvent({ state, onPenalty }) {
  const [visible, setVisible] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('question'); // question | result | done
  const [totalPenalty, setTotalPenalty] = useState(0);
  const [penaltyThisQ, setPenaltyThisQ] = useState(0);

  useEffect(() => {
    if (HEIST.trigger(state)) {
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, [state.lifetimeEarned]);

  const handleSelect = (option) => {
    setSelected(option);
    const penalty = option.penaltyPct ? Math.floor((state.credits || 0) * option.penaltyPct) : 0;
    setPenaltyThisQ(penalty);
    setPhase('result');
  };

  const handleNext = () => {
    if (penaltyThisQ > 0) {
      onPenalty(-penaltyThisQ);
      setTotalPenalty(p => p + penaltyThisQ);
    }
    if (qIndex < HEIST.questions.length - 1) {
      setQIndex(i => i + 1);
      setSelected(null);
      setPenaltyThisQ(0);
      setPhase('question');
    } else {
      setPhase('done');
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(HEIST_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  const currentQ = HEIST.questions[qIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center px-4"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)', backdropFilter: 'blur(4px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-sm rounded-3xl border border-amber-500/40 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))' }}
        >
          <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(45 90% 55%), transparent)' }} />
          <div className="p-5">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl flex-shrink-0">
                {HEIST.icon}
              </div>
              <div>
                <p className="font-display text-[9px] font-bold tracking-widest text-amber-400">INCOMING EVENT</p>
                <h2 className="font-display text-sm font-black text-foreground">{HEIST.title}</h2>
              </div>
            </div>

            {/* Intro (first question only) */}
            {qIndex === 0 && phase === 'question' && (
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3 mb-4">
                <p className="font-body text-xs text-foreground/80 leading-relaxed whitespace-pre-line">{HEIST.intro}</p>
              </div>
            )}

            {/* Progress */}
            {phase !== 'done' && (
              <div className="flex gap-1 mb-3">
                {HEIST.questions.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < qIndex ? 'bg-primary' : i === qIndex ? 'bg-accent' : 'bg-muted/40'}`} />
                ))}
              </div>
            )}

            {/* Question phase */}
            {phase === 'question' && (
              <>
                <div className="rounded-xl bg-muted/30 border border-border/30 p-3 mb-3">
                  <p className="font-body text-sm text-foreground font-semibold leading-snug">"{currentQ.question}"</p>
                </div>
                <div className="space-y-2">
                  {currentQ.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(opt)}
                      className="w-full text-left px-3 py-2.5 rounded-xl border border-border/40 bg-card/60 hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      <span className="font-body text-xs text-foreground/85">{opt.text}</span>
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {/* Result phase */}
            {phase === 'result' && selected && (
              <>
                <div className={`rounded-xl border p-3 mb-4 ${selected.outcome === 'bad' ? 'border-destructive/40 bg-destructive/10' : 'border-primary/30 bg-primary/5'}`}>
                  <p className="font-body text-xs text-foreground/85 leading-relaxed">{selected.flavor}</p>
                  {penaltyThisQ > 0 && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-sm">💸</span>
                      <span className="font-display text-xs text-destructive font-bold">-{formatNumber(penaltyThisQ)} credits</span>
                    </div>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNext}
                  className="w-full py-2.5 rounded-2xl font-display text-sm font-black tracking-widest"
                  style={{ background: 'linear-gradient(135deg, hsl(185 80% 55%), hsl(185 70% 42%))', color: 'hsl(230 25% 7%)' }}
                >
                  {qIndex < HEIST.questions.length - 1 ? 'NEXT QUESTION' : 'FINAL ANSWER'}
                </motion.button>
              </>
            )}

            {/* Done phase */}
            {phase === 'done' && (
              <>
                <div className="text-center py-2 mb-4">
                  <div className="text-4xl mb-3">{totalPenalty > 0 ? '😬' : '🎉'}</div>
                  <h3 className="font-display text-sm font-black text-foreground mb-2">
                    {totalPenalty > 0 ? 'You Survived. Barely.' : 'You Passed! Somehow.'}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {totalPenalty > 0
                      ? `The GalactiCops left, seemingly satisfied. You are out ${formatNumber(totalPenalty)} credits in fees. Consider this a learning experience. A very expensive one.`
                      : 'The officers departed with mutual respect and zero paperwork filed. A rare victory against bureaucracy. Uncle Orion would be proud.'}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleDismiss}
                  className="w-full py-2.5 rounded-2xl font-display text-sm font-black tracking-widest"
                  style={{ background: 'linear-gradient(135deg, hsl(185 80% 55%), hsl(185 70% 42%))', color: 'hsl(230 25% 7%)' }}
                >
                  BACK TO WORK
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}