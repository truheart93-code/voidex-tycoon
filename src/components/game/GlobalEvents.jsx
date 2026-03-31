import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '@/lib/gameData';

const EVENTS_KEY = 'voidex_events_seen';

// Utility
const getSeen = () => {
  try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]'); } catch { return []; }
};
const markSeen = (id) => {
  const s = getSeen();
  if (!s.includes(id)) localStorage.setItem(EVENTS_KEY, JSON.stringify([...s, id]));
};

// ─────────────────────────────────────────────
// ALL GLOBAL EVENTS
// ─────────────────────────────────────────────
const ALL_EVENTS = [

  // ── HEIST ─────────────────────────────────
  {
    id: 'galacticops_interrogation',
    icon: '🚔',
    theme: 'amber',
    title: 'Galactic Security Checkpoint',
    trigger: (s) => (s.lifetimeEarned || 0) >= 500,
    intro: `Two GalactiCops materialise outside your mining station. One holds a clipboard. The other holds a very large sandwich and seems deeply uninterested.\n\n"Routine inquiry," says Clipboard. "We're investigating the Great Asteroid Caper of last Tuesday. You match the description: 'has a spaceship, wants money.'\n\nWe have questions."`,
    questions: [
      {
        q: 'Where were you last Tuesday between 14:00 and 16:00 galactic standard time?',
        options: [
          { text: '"Mining asteroids, officer. Very legally."', outcome: 'good', flavor: 'The officer nods approvingly. "A model citizen." Clipboard writes something nice.' },
          { text: '"I plead the 5th of the Galactic Constitution."', outcome: 'neutral', flavor: '"That only applies in Sector 5. This is Sector 7." He squints.' },
          { text: '"Time is a social construct, officer."', outcome: 'bad', penaltyPct: 0.15, flavor: 'He writes something down. It takes a while. Very neat handwriting. You lose 15% in "administrative processing fees."' },
        ],
      },
      {
        q: 'Do you have a permit for all this... *(gestures at your entire empire)*... activity?',
        options: [
          { text: '"Yes, filed under Permit #GX-7749-ALPHA."', outcome: 'good', flavor: '"Checking..." He cannot find evidence this permit exists. He lets it go. Bureaucracy is a beautiful thing.' },
          { text: '"I didn\'t know I needed one."', outcome: 'neutral', flavor: '"Ignorance of intergalactic mining law is no excuse." He seems to enjoy saying this. He says it again.' },
          { text: '"What permit? It\'s all Uncle Orion\'s stuff."', outcome: 'bad', penaltyPct: 0.2, flavor: '"Uncle Orion owed us 3 citations." He produces a comically thick folder. You pay 20% in inherited violations.' },
        ],
      },
      {
        q: 'The suspect had "an aura of entrepreneurial desperation." Do you have such an aura?',
        options: [
          { text: '"I have an aura of GALACTIC AMBITION, thank you."', outcome: 'good', flavor: '"Fair enough." Clipboard closes his folder. "Carry on... ambitiously." The sandwich officer waves without looking up.' },
          { text: '"Only on Mondays."', outcome: 'neutral', flavor: '"Today is Monday." A long pause. "Move along."' },
          { text: '"...Yes. Desperately so."', outcome: 'good', flavor: 'He seems genuinely moved. Gives you a thumbs up. The sandwich officer finishes his sandwich. A good outcome for everyone.' },
        ],
      },
    ],
  },

  // ── TRADER ────────────────────────────────
  {
    id: 'shady_trader',
    icon: '🧥',
    theme: 'violet',
    title: 'The Wandering Merchant',
    trigger: (s) => Object.values(s.generators || {}).reduce((a, g) => a + (g?.count || 0), 0) >= 5,
    intro: `A cloaked figure drifts alongside your station on a suspiciously unmarked shuttle. They lean out the window.\n\n"Pssst. Hey. You. The one with the asteroid mine."\n\nThey crack open a trenchcoat revealing 47 inner pockets of unknown goods.\n\n"I've got merchandise. Legal-ish. Mostly. What are you interested in?"`,
    questions: [
      {
        q: '"I\'ve got three offers. Choose wisely — I\'ve got a quota to meet before the warp toll resets."',
        options: [
          { text: '"I\'ll take the mystery crate." (500 credits)', outcome: 'mystery', costFlat: 500, flavor: 'You open the crate. Inside: a photo of a dog, 3 bags of freeze-dried nutrient paste labelled "ATTITUDE", and a note: "Better luck next crate."' },
          { text: '"The income booster sounds good." (1,000 credits)', outcome: 'good', costFlat: 1000, bonusPct: 0.5, flavor: 'He slaps a glowing sticker on your control panel. "+50% Income (next 60s)" it reads. It works. You choose not to ask questions.' },
          { text: '"I\'m not interested, stranger."', outcome: 'neutral', flavor: 'He shrugs. "More for the next guy." He drifts away on his illegal little shuttle. You feel vaguely smarter for it.' },
        ],
      },
    ],
  },

  // ── SPACE PIRATE ──────────────────────────
  {
    id: 'pirate_standoff',
    icon: '☠️',
    theme: 'red',
    title: 'Pirates Off the Port Side',
    trigger: (s) => (s.lifetimeEarned || 0) >= 5000,
    intro: `An alarm you forgot you had starts screaming.\n\nA skull-and-crossbones flag flickers onto your comms screen. A pirate captain with one cybernetic eye and three very real ones squints at you.\n\n"We've been watching your operation, Commander. Impressive margins. We want a cut. Choose your response carefully. Petrov here gets twitchy."`,
    questions: [
      {
        q: '"What\'s it gonna be, space cowboy?"',
        options: [
          { text: '"Fine. Take 10% and go."', outcome: 'bad', penaltyPct: 0.10, flavor: '"Pleasure doing business." They take the credits and leave. Petrov waves. He seems friendly now. Unsettling.' },
          { text: '"I\'m calling the GalactiCops."', outcome: 'good', flavor: 'You bluff. It works. Turns out they have outstanding warrants. They flee. You didn\'t even dial. Incredible.' },
          { text: '"I challenge your captain to a maths duel."', outcome: 'neutral', flavor: 'Silence. Then: "...what?" You describe compound interest at length. They hang up. Nobody wins.', },
        ],
      },
      {
        q: 'Petrov comes back. Alone. He looks sheepish.',
        options: [
          { text: '"Petrov, buddy, what do you need?"', outcome: 'good', flavor: '"I just want job. Real job. Good benefits." You consider it. You do not hire him. But you give him a granola bar. He seems touched.' },
          { text: 'Fire a warning shot.', outcome: 'bad', penaltyPct: 0.05, flavor: 'You miss. You hit your own solar panel. Repair cost: 5% of current credits. Petrov looks embarrassed for you.' },
          { text: 'Offer him a management position.', outcome: 'good', flavor: 'Petrov joins your empire as "Head of External Relations." He is enthusiastic. Suspiciously good at his job.' },
        ],
      },
    ],
  },

  // ── SPACE JOURNALIST ──────────────────────
  {
    id: 'journalist_interview',
    icon: '🎙️',
    theme: 'cyan',
    title: 'The Galactic Tribune Wants a Word',
    trigger: (s) => (s.managers || []).length >= 2,
    intro: `A journalist from the Galactic Tribune hails your station. She has perfect hair and a microphone the size of a moon buggy.\n\n"Commander! The Tribune is running a piece: 'Rags to Rockets — The New Space Tycoons.' You've been nominated for Most Interesting Empire. Comment?"\n\nA camera drone materialises two inches from your face.`,
    questions: [
      {
        q: '"First question: How did you build all this so fast?"',
        options: [
          { text: '"Hard work, vision, and extremely reasonable sleeping hours."', outcome: 'good', flavor: '"Inspiring!" The drone zooms in. You look great. Probably. The Tribune publishes a flattering profile. Your reputation ticks up.' },
          { text: '"Honestly? My uncle died and left me stuff."', outcome: 'neutral', flavor: 'A brief pause. "That\'s... surprisingly relatable." The article is titled: \'Dead Uncle Fuels Space Boom.\' Hits top of the charts.' },
          { text: '"No comment." *closes blast shutters*', outcome: 'bad', penaltyPct: 0.05, flavor: 'The Tribune runs: "Mysterious Tycoon HIDES something?" Your rivals sense weakness. You lose 5% to spooked contractors.' },
        ],
      },
      {
        q: '"Second: What\'s your philosophy on managing people?"',
        options: [
          { text: '"Treat every crew member like a sentient being with hopes and dreams."', outcome: 'good', flavor: '"Beautiful." She\'s tearing up. The camera drone is also somehow tearing up. You receive a "Galactic Employer of the Year" badge.' },
          { text: '"Pay them. Don\'t yell. Coffee optional."', outcome: 'neutral', flavor: '"Remarkably practical." She nods. The article quotes you three times. "Coffee optional" becomes a viral slogan.' },
          { text: '"What people? It\'s mostly automated."', outcome: 'bad', penaltyPct: 0.08, flavor: 'The Automation Workers Union files a complaint. There is no Automation Workers Union. They formed one specifically to complain about you.' },
        ],
      },
      {
        q: '"Last one: What\'s next for your empire?"',
        options: [
          { text: '"Galaxy domination. Politely."', outcome: 'good', flavor: 'The camera drone plays a little fanfare. The article closes: "A force to be reckoned with." You feel 12% more powerful.' },
          { text: '"More numbers. Bigger numbers."', outcome: 'neutral', flavor: '"That\'s the spirit, I suppose." She leaves. The article title: \'Local Commander Just Wants Big Numbers.\' 47 million shares.' },
          { text: '"I need to think about that." *stares into distance for 40 seconds*', outcome: 'neutral', flavor: 'She waits the full 40 seconds. The resulting profile piece, titled "The Thinker," wins a journalism award.' },
        ],
      },
    ],
  },

  // ── SPACE INSPECTOR ───────────────────────
  {
    id: 'health_safety_inspector',
    icon: '📋',
    theme: 'green',
    title: 'Intergalactic Health & Safety Inspection',
    trigger: (s) => Object.values(s.generators || {}).reduce((a, g) => a + (g?.count || 0), 0) >= 15,
    intro: `A bored-looking inspector in a neon yellow vest arrives. He has a clipboard so large it might be structurally load-bearing.\n\n"Commander. I'm Inspector Gruble, Intergalactic Health & Safety Division. We received... several complaints." He reads from his list without emotion:\n\n"Excessive void energy, unlicensed warp signatures, and one report of 'suspicious numbers going up too fast.' I'll need to look around."`,
    questions: [
      {
        q: 'He points at your asteroid mining operation. "This area has zero safety rails."',
        options: [
          { text: 'Install rails immediately (200 credits)', outcome: 'good', costFlat: 200, flavor: '"Compliant." He ticks a box. Something about his satisfaction is deeply infectious.' },
          { text: '"The asteroids keep each other in check."', outcome: 'neutral', flavor: 'He stares at you. He writes something. It takes a very long time. "Noted," he says. The note fills two pages.' },
          { text: '"My crew are very good at dodging."', outcome: 'bad', penaltyPct: 0.12, flavor: '"That is not a recognised safety protocol." Fine issued. 12% of current credits. Gruble does not smile.' },
        ],
      },
      {
        q: '"Your emergency exit signs point into deep space."',
        options: [
          { text: '"That IS the emergency exit."', outcome: 'good', flavor: '"...Technically compliant." He ticks a reluctant box. You can see it hurts him.' },
          { text: 'Replace all signs (150 credits)', outcome: 'good', costFlat: 150, flavor: '"Exemplary." Gruble awards you the coveted Safety Star sticker. You put it on the control panel.' },
          { text: '"We prefer scenic emergency exits."', outcome: 'bad', penaltyPct: 0.08, flavor: '"This is not a hotel." Fine. 8%. Gruble has seen things.' },
        ],
      },
      {
        q: 'Final assessment: "Overall your operation is... functional. Have you considered the wellbeing of your asteroids?"',
        options: [
          { text: '"The asteroids seem fine with it."', outcome: 'neutral', flavor: 'He notes this. "Anecdotal." He leaves on a craft labelled GRUBLE-1. You think you see him smile. Maybe.' },
          { text: '"We run mindfulness sessions for the rocks."', outcome: 'good', flavor: 'He blinks once. "I will recommend a full pass." Gruble is gone. The rocks seem unbothered.' },
          { text: '"They\'re rocks."', outcome: 'bad', penaltyPct: 0.05, flavor: '"So was Mount Everest before the incident." Fine. 5%. He leaves. You google \'the incident\'. Nothing comes up.' },
        ],
      },
    ],
  },

  // ── COMPETITOR ────────────────────────────
  {
    id: 'rival_tycoon',
    icon: '🤵',
    theme: 'amber',
    title: 'A Rival Makes Contact',
    trigger: (s) => (s.prestigeStars || 0) === 0 && (s.lifetimeEarned || 0) >= 10000,
    intro: `An impossibly well-groomed face appears on your comms screen. He is wearing a suit that costs more than your entire operation.\n\n"Ah. So you're the upstart everyone's talking about. I'm Maximilian Thorne. Thorne Galactic Industries. You may have heard of us."\n\nHis jaw is too perfect. His teeth are too bright. His confidence is borderline a health hazard.\n\n"I'm reaching out to offer you... options."`,
    questions: [
      {
        q: '"Option one: Sell your operation to me now. I\'ll offer fair market value. Plus 10%. Very generous."',
        options: [
          { text: '"Absolutely not."', outcome: 'good', flavor: '"Expected that." He doesn\'t look disappointed. He looks like a man who expected to be told no and finds it entertaining.' },
          { text: '"How much are we talking?"', outcome: 'neutral', flavor: 'He names a number. It\'s actually very good. You still say no. He nods. "Respect." He didn\'t expect respect to happen.' },
          { text: '"...What\'s the catch?"', outcome: 'good', flavor: '"Smart." He closes the folder. "There is no catch. But the fact that you asked means you shouldn\'t sell." He seems genuinely impressed.' },
        ],
      },
      {
        q: '"Option two: A partnership. My distribution network, your production. 60/40. My favour, naturally."',
        options: [
          { text: '"I work alone."', outcome: 'good', flavor: '"Fascinating." He makes a note. "Classic Orion energy. He said that too." He knew Uncle Orion. This just got complicated.' },
          { text: '"50/50 or nothing."', outcome: 'good', flavor: 'He pauses. "You negotiate." He actually seems to respect it. "I\'ll be in touch." He is not in touch. But you feel good about it.' },
          { text: '"Fine, 60/40."', outcome: 'bad', penaltyPct: 0.10, flavor: '"Wonderful." He transfers the first "partnership fee" immediately. You realise you don\'t know what you agreed to. 10% gone.' },
        ],
      },
    ],
  },

  // ── SPACE SCIENTIST ───────────────────────
  {
    id: 'rogue_scientist',
    icon: '🧪',
    theme: 'violet',
    title: 'A Scientist Has Requests',
    trigger: (s) => (s.upgrades || []).length >= 3,
    intro: `A frantic holo-message from Dr. Vex, a scientist of dubious institutional affiliation.\n\n"Commander! Incredible timing. I've been watching your operation — the energy signatures are PERFECT for my research. I just need a small favour. Well, medium. The paperwork calls it 'high-risk' but that label is very subjective."`,
    questions: [
      {
        q: '"I need to borrow your Dyson array for 10 minutes to test a Quantum Compression Beam. Totally harmless. Probably."',
        options: [
          { text: '"Sure, what\'s the worst that could happen?"', outcome: 'bad', penaltyPct: 0.20, flavor: 'The beam works perfectly. It also briefly compresses 20% of your credit reserve. "Side effect," Vex says. "We call that a learning outcome." ' },
          { text: '"Define \'probably\'."', outcome: 'neutral', flavor: '"Statistically, 78% non-catastrophic." A pause. "The other 22% are very interesting though." You decide not to decide.' },
          { text: '"Hard no, doctor."', outcome: 'good', flavor: '"Reasonable! I\'ll ask Thorne." You feel immediately better about your life choices.' },
        ],
      },
      {
        q: '"Alternative offer: I share my research data — 25% income boost for 2 minutes — you let me run ONE small test."',
        options: [
          { text: '"Deal." (accept the boost, accept the test)', outcome: 'bad', penaltyPct: 0.10, bonusPct: 0.25, flavor: 'The boost works great. The test turns your cargo bay temporarily into a sentient fog. It asks questions you can\'t answer. 10% credits: gone.' },
          { text: '"Just give me the boost. No test."', outcome: 'good', flavor: '"...Fine." Vex grumbles. You get the 25% boost anyway. Turns out she was bluffing. Scientists.' },
          { text: '"I\'m calling your university."', outcome: 'good', flavor: '"I\'m between institutions." She vanishes. You feel 100% better about this outcome.' },
        ],
      },
    ],
  },

  // ── STOWAWAY ──────────────────────────────
  {
    id: 'stowaway',
    icon: '👤',
    theme: 'cyan',
    title: 'Stowaway Detected',
    trigger: (s) => (s.managers || []).length >= 3,
    intro: `Your security system pings. Motion detected in cargo bay 4.\n\nYou find a teenager eating your emergency rations and reading a battered copy of "Space Tycoons: The Unofficial Guide."\n\nThey look up, unbothered.\n\n"Oh. Hey. I'm Zara. I've been here for, like, 11 days. Your rations are terrible, by the way."`,
    questions: [
      {
        q: '"Zara, why are you on my station?"',
        options: [
          { text: '"Where are you from? Are you okay?"', outcome: 'good', flavor: '"I\'m from Sector 9. I\'m fine. I\'m actually great. Your Wi-Fi is excellent." She shows you her spreadsheet of your entire operation. It\'s better than yours.' },
          { text: '"How did you even get in here?"', outcome: 'neutral', flavor: '"Your docking bay security is set to \'medium\'. Should probably be \'high\'." She marks it on a clipboard. Your clipboard. She\'s been busy.' },
          { text: '"Security! Remove this intruder!"', outcome: 'bad', penaltyPct: 0.05, flavor: 'In the ensuing chaos she accidentally disconnects two generators. 5% of your credits gone. She waves apologetically from the airlock.' },
        ],
      },
      {
        q: '"Zara has produced a 47-slide deck called: \'Your Empire Could Be Better.\' What do you do?"',
        options: [
          { text: 'Watch all 47 slides.', outcome: 'good', flavor: 'Three good tips, two mind-blowing ones, and one slide that\'s just a drawing of a space whale. You implement four of them. Production ticks up.' },
          { text: 'Hire her on the spot.', outcome: 'good', flavor: 'She negotiates her own salary before you finish the sentence. It\'s fair. She starts immediately. She brings her own desk.' },
          { text: 'Tell her she missed a comma on slide 12.', outcome: 'neutral', flavor: '"I know." She already fixed it. She is three steps ahead of you at all times. This will continue.' },
        ],
      },
    ],
  },

  // ── GALAXY SUMMIT ─────────────────────────
  {
    id: 'galaxy_summit',
    icon: '🌐',
    theme: 'cyan',
    title: 'The Galactic Economic Summit',
    trigger: (s) => (s.lifetimeEarned || 0) >= 50000,
    intro: `You've been invited to the Galactic Economic Summit — an annual gathering of the most powerful empire operators in the known universe.\n\nThe venue is a luxury space station that rotates for "aesthetic reasons." The dress code is "Business Cosmic." You have 45 minutes to prepare.\n\nAs you arrive, three separate factions immediately corner you.`,
    questions: [
      {
        q: 'The Asteroid Miners Guild wants your public endorsement. "Say we\'re the best. One sentence. We pay well."',
        options: [
          { text: 'Endorse them publicly.', outcome: 'good', bonusPct: 0.3, flavor: 'You get the endorsement fee. Also a commemorative pickaxe. It\'s actually a great pickaxe. +30% income for a bit.' },
          { text: 'Decline politely.', outcome: 'neutral', flavor: 'They nod. "Respectable." They endorse themselves. Their slogan: "Endorsed by no one notable." It does very well.' },
          { text: 'Counter-pitch them on your empire.', outcome: 'good', flavor: 'They\'re too impressed to be offended. Three Guild members ask for jobs. You say maybe. Maybe is enough.' },
        ],
      },
      {
        q: 'The Warp Fuel Consortium offers you a "preferential pricing agreement." (Costs 2,000 credits upfront.)',
        options: [
          { text: 'Sign up. (Pay 2,000)', outcome: 'good', costFlat: 2000, bonusPct: 0.4, flavor: 'It\'s legitimate. Fuel costs drop. Revenue up 40% short-term. This rarely happens. Enjoy it.' },
          { text: 'Read the fine print first.', outcome: 'good', flavor: '"Fine print": perpetual exclusivity, your firstborn warp drive, and arbitration in Sector 99. You decline. Wisely.' },
          { text: '"I\'ll have my lawyers review this."', outcome: 'neutral', flavor: '"You have lawyers?" "...I will have lawyers by Monday." They respect the energy.' },
        ],
      },
      {
        q: 'The Summit MC asks if you\'d like to give a keynote address. Unplanned. Right now. 500 people watching.',
        options: [
          { text: 'Wing it completely.', outcome: 'neutral', flavor: 'It\'s either brilliant or unhinged — hard to tell. Twelve people are inspired. Twelve people are confused. One person claps out of pity. It trends.' },
          { text: '"I\'ll keep it short: buy low, sell high, hire good people."', outcome: 'good', flavor: 'A standing ovation. The best speeches are the ones that end. Yours ended well. You sign three autographs.' },
          { text: '"Hard pass."', outcome: 'bad', penaltyPct: 0.05, flavor: 'The Summit MC is personally offended. He knows everyone. You lose 5% to a very passive-aggressive "networking surcharge."' },
        ],
      },
    ],
  },

  // ── BLACK MARKET ──────────────────────────
  {
    id: 'black_market',
    icon: '🕶️',
    theme: 'violet',
    title: 'Unscheduled Transmission',
    trigger: (s) => (s.totalPrestiges || 0) >= 1,
    intro: `A scrambled signal cuts through your usual channels at 2am galactic time. No caller ID. No return address.\n\n"Commander. We know who you are. We know your yield rates. We know you take your asteroid rocks medium-rare.\n\nWe represent an organisation that doesn't officially exist. We have an offer that was never made.\n\nInterested?"`,
    questions: [
      {
        q: '"We can double your generator output for 24 hours. No questions asked. Standard rate: 15% of current credits."',
        options: [
          { text: 'Accept the deal.', outcome: 'bad', penaltyPct: 0.15, bonusPct: 0.5, flavor: 'The boost is real. The 15% is also real. The organisation doesn\'t officially exist but they definitely took your money.' },
          { text: 'Decline and report the signal.', outcome: 'good', flavor: 'You file a report. GalactiCops arrive. Clipboard is thrilled. You get a Civic Responsibility Medal. It does nothing but you frame it.' },
          { text: '"Who ARE you people?"', outcome: 'neutral', flavor: '"We told you. We don\'t exist." They hang up. A crate appears at your dock containing 500 credits and no explanation.' },
        ],
      },
      {
        q: '"Second offer: We can make a rival empire disappear from the leaderboards. Temporarily. Relatively. Price: 25% of credits."',
        options: [
          { text: '"Tempting. But no."', outcome: 'good', flavor: '"Integrity. Rare." They sign off. You somehow feel more powerful for refusing.' },
          { text: '"Accepted."', outcome: 'bad', penaltyPct: 0.25, flavor: 'It works. For about 6 hours. Then it doesn\'t. You\'ve also now officially become the kind of person who does this. 25%: gone.' },
          { text: '"Can you just make my OWN score go up?"', outcome: 'neutral', flavor: '"...That\'s not how leaderboards work." A long pause. "Huh. We\'ve never been asked that before." They hang up respectfully.' },
        ],
      },
    ],
  },

  // ── ALIEN DIPLOMAT ────────────────────────
  {
    id: 'alien_diplomat',
    icon: '👽',
    theme: 'green',
    title: 'First Contact (Sort Of)',
    trigger: (s) => (s.lifetimeEarned || 0) >= 25000,
    intro: `A vessel of entirely unknown configuration docks without warning. The airlock opens and a being of indeterminate shape enters your station. It is wearing a small name tag that reads: GRRBLX.\n\nA translator box crackles.\n\n"Greetings. We have observed your resource extraction operations. We have QUESTIONS."`,
    questions: [
      {
        q: 'GRRBLX asks about a substance called coffee. They want all of it. In exchange: advanced technology.',
        options: [
          { text: '"Deal. Take the coffee."', outcome: 'good', flavor: '"Excellent." They hand you a small glowing cube. It attaches to your console. Your processing speed improves. Coffee was a fair trade.' },
          { text: '"The coffee is non-negotiable."', outcome: 'neutral', flavor: '"We respect this boundary." GRRBLX makes a note. Boundary noted. Resource: coffee. Status: cherished. They write a dissertation on this later.' },
          { text: 'Offer them decaf instead.', outcome: 'bad', penaltyPct: 0.10, flavor: '"This is NOT coffee." Diplomatic incident. Minor sanctions. 10% of credits as intergalactic insult reparations.' },
        ],
      },
      {
        q: 'GRRBLX has watched 347 years of human media and has questions about The Office.',
        options: [
          { text: 'Answer their questions thoroughly.', outcome: 'good', flavor: '"Michael Scott represents the fundamental contradiction of aspirational mediocrity." They award you an honorary doctorate. It counts in 14 star systems.' },
          { text: '"Which version?"', outcome: 'good', flavor: '"There are VERSIONS?" GRRBLX collapses in joyful disbelief. You have given them months of new material. Relations: excellent.' },
          { text: '"I am more of a Parks & Rec person."', outcome: 'neutral', flavor: '"We will need to acquire this." They leave to obtain 9 seasons. You watch them go. This went well.' },
        ],
      },
    ],
  },

];

const THEME_STYLES = {
  amber: { border: 'border-amber-500/40', accent: 'text-amber-400', bar: 'hsl(45 90% 55%)', bg: 'bg-amber-500/10' },
  violet: { border: 'border-violet-500/40', accent: 'text-violet-400', bar: 'hsl(270 60% 55%)', bg: 'bg-violet-500/10' },
  red: { border: 'border-red-500/40', accent: 'text-red-400', bar: 'hsl(0 75% 55%)', bg: 'bg-red-500/10' },
  cyan: { border: 'border-cyan-500/40', accent: 'text-cyan-400', bar: 'hsl(185 80% 55%)', bg: 'bg-cyan-500/10' },
  green: { border: 'border-green-500/40', accent: 'text-green-400', bar: 'hsl(140 60% 50%)', bg: 'bg-green-500/10' },
};

export default function GlobalEvents({ state, onAddCredits }) {
  const [activeEvent, setActiveEvent] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('intro'); // intro | question | result | done
  const [runningPenalty, setRunningPenalty] = useState(0);
  const [penaltyThisQ, setPenaltyThisQ] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current || activeEvent) return;
    const seen = getSeen();
    const available = ALL_EVENTS.filter(e => !seen.includes(e.id) && e.trigger(state));
    if (available.length > 0) {
      triggered.current = true;
      const ev = available[0];
      setTimeout(() => {
        setActiveEvent(ev);
        setPhase('intro');
        setQIndex(0);
        setSelected(null);
        setRunningPenalty(0);
      }, 2500);
    }
  }, [state.lifetimeEarned, state.generators, state.managers, state.upgrades, state.prestigeStars, state.totalPrestiges]);

  // reset trigger when a new event could appear
  useEffect(() => { triggered.current = false; }, [state.lifetimeEarned]);

  const handleSelect = (option) => {
    const penalty = option.penaltyPct ? Math.floor((state.credits || 0) * option.penaltyPct) : 0;
    const cost = option.costFlat || 0;
    setPenaltyThisQ(penalty + cost);
    setSelected(option);
    setPhase('result');
  };

  const handleNext = () => {
    if (penaltyThisQ > 0) {
      onAddCredits(-penaltyThisQ);
      setRunningPenalty(p => p + penaltyThisQ);
    }
    const qs = activeEvent.questions;
    if (qIndex < qs.length - 1) {
      setQIndex(i => i + 1);
      setSelected(null);
      setPenaltyThisQ(0);
      setPhase('question');
    } else {
      setPhase('done');
    }
  };

  const handleDismiss = () => {
    markSeen(activeEvent.id);
    setActiveEvent(null);
    triggered.current = false;
  };

  if (!activeEvent) return null;

  const ev = activeEvent;
  const theme = THEME_STYLES[ev.theme] || THEME_STYLES.cyan;
  const currentQ = ev.questions[qIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center px-4"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 100%)', backdropFilter: 'blur(4px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className={`w-full max-w-sm rounded-3xl border ${theme.border} overflow-hidden`}
          style={{ background: 'linear-gradient(160deg, hsl(230 20% 12%), hsl(230 25% 8%))' }}
        >
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${theme.bar}, transparent)` }} />
          <div className="p-5 max-h-[80vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center text-2xl flex-shrink-0`}>
                {ev.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-display text-[9px] font-bold tracking-widest ${theme.accent}`}>INCOMING EVENT</p>
                <h2 className="font-display text-sm font-black text-foreground leading-tight">{ev.title}</h2>
              </div>
              <button onClick={handleDismiss} className="text-muted-foreground/40 hover:text-muted-foreground text-xs px-1 flex-shrink-0">✕</button>
            </div>

            {/* Progress bar */}
            {phase !== 'done' && ev.questions.length > 1 && (
              <div className="flex gap-1 mb-3">
                {ev.questions.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < qIndex ? 'bg-primary' : i === qIndex ? theme.accent.replace('text-', 'bg-') : 'bg-muted/40'}`} />
                ))}
              </div>
            )}

            {/* INTRO */}
            {phase === 'intro' && (
              <>
                <div className={`rounded-2xl ${theme.bg} border ${theme.border} p-3 mb-4`}>
                  <p className="font-body text-xs text-foreground/85 leading-relaxed whitespace-pre-line">{ev.intro}</p>
                </div>
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => setPhase('question')}
                  className="w-full py-2.5 rounded-2xl font-display text-sm font-black tracking-widest"
                  style={{ background: `linear-gradient(135deg, ${theme.bar}, ${theme.bar}cc)`, color: 'hsl(230 25% 7%)' }}>
                  ENGAGE
                </motion.button>
              </>
            )}

            {/* QUESTION */}
            {phase === 'question' && (
              <>
                <div className="rounded-xl bg-muted/30 border border-border/30 p-3 mb-3">
                  <p className="font-body text-sm text-foreground font-semibold leading-snug">"{currentQ.q}"</p>
                </div>
                <div className="space-y-2">
                  {currentQ.options.map((opt, i) => (
                    <motion.button key={i} whileTap={{ scale: 0.97 }} onClick={() => handleSelect(opt)}
                      className="w-full text-left px-3 py-2.5 rounded-xl border border-border/40 bg-card/60 hover:border-primary/40 hover:bg-primary/5 transition-all">
                      <span className="font-body text-xs text-foreground/85 leading-snug">{opt.text}</span>
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {/* RESULT */}
            {phase === 'result' && selected && (
              <>
                <div className={`rounded-xl border p-3 mb-4 ${selected.outcome === 'bad' ? 'border-destructive/40 bg-destructive/10' : `${theme.border} ${theme.bg}`}`}>
                  <p className="font-body text-xs text-foreground/85 leading-relaxed">{selected.flavor}</p>
                  {penaltyThisQ > 0 && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-sm">💸</span>
                      <span className="font-display text-xs text-destructive font-bold">-{formatNumber(penaltyThisQ)} credits</span>
                    </div>
                  )}
                </div>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleNext}
                  className="w-full py-2.5 rounded-2xl font-display text-sm font-black tracking-widest"
                  style={{ background: `linear-gradient(135deg, ${theme.bar}, ${theme.bar}cc)`, color: 'hsl(230 25% 7%)' }}>
                  {qIndex < ev.questions.length - 1 ? 'CONTINUE' : 'FINISH'}
                </motion.button>
              </>
            )}

            {/* DONE */}
            {phase === 'done' && (
              <>
                <div className="text-center py-3 mb-4">
                  <div className="text-4xl mb-2">{runningPenalty > 0 ? '😬' : '🎉'}</div>
                  <h3 className="font-display text-sm font-black text-foreground mb-2">
                    {runningPenalty > 0 ? 'Could have gone better.' : 'Handled it.'}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {runningPenalty > 0
                      ? `You lost ${formatNumber(runningPenalty)} credits in this encounter. Consider it a character-building expense.`
                      : 'No credits lost. That barely ever happens out here. Savour it.'}
                  </p>
                </div>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleDismiss}
                  className="w-full py-2.5 rounded-2xl font-display text-sm font-black tracking-widest"
                  style={{ background: `linear-gradient(135deg, ${theme.bar}, ${theme.bar}cc)`, color: 'hsl(230 25% 7%)' }}>
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