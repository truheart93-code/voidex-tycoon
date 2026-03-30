import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { formatNumber } from '@/lib/gameData';
import { motion } from 'framer-motion';
import { Trophy, Upload, Star, Loader2, AlertCircle } from 'lucide-react';

const BLOCKED_WORDS = [
  'fuck','shit','ass','bitch','cunt','dick','pussy','cock','nigger','nigga',
  'faggot','fag','retard','whore','slut','bastard','damn','hell','piss','crap',
  'twat','wanker','bollocks','asshole','arsehole','motherfucker','idiot','moron',
];

function isNameClean(name) {
  const lower = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return !BLOCKED_WORDS.some(w => lower.includes(w));
}

export default function LeaderboardPanel({ state }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [playerName, setPlayerName] = useState(localStorage.getItem('stellar_player_name') || '');
  const [editingName, setEditingName] = useState(!playerName);
  const [myEntryId, setMyEntryId] = useState(localStorage.getItem('stellar_lb_id') || null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    setLoading(true);
    const data = await base44.entities.LeaderboardEntry.list('-lifetime_earned', 50);
    setEntries(data);
    setLoading(false);
  }

  const [nameError, setNameError] = useState('');

  async function submitScore() {
    if (!playerName.trim()) return;
    if (!isNameClean(playerName)) {
      setNameError('Please choose an appropriate commander name.');
      return;
    }
    setNameError('');
    setSubmitting(true);
    localStorage.setItem('stellar_player_name', playerName.trim());

    const payload = {
      player_name: playerName.trim(),
      lifetime_earned: state.lifetimeEarned,
      prestige_stars: state.prestigeStars,
      total_prestiges: state.totalPrestiges,
      total_generators: Object.values(state.generators).reduce((s, g) => s + (g?.count || 0), 0),
    };

    if (myEntryId) {
      await base44.entities.LeaderboardEntry.update(myEntryId, payload);
    } else {
      const created = await base44.entities.LeaderboardEntry.create(payload);
      setMyEntryId(created.id);
      localStorage.setItem('stellar_lb_id', created.id);
    }

    setSubmitting(false);
    setEditingName(false);
    await loadLeaderboard();
  }

  const myRank = myEntryId ? entries.findIndex(e => e.id === myEntryId) + 1 : null;

  const rankEmoji = (i) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `#${i + 1}`;
  };

  return (
    <div className="px-4 pb-4 space-y-3">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-secondary/20 to-primary/10 border border-secondary/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-accent" />
          <h3 className="font-display text-sm font-bold tracking-wide text-foreground">Galactic Leaderboard</h3>
        </div>
        {myRank && (
          <p className="font-body text-xs text-muted-foreground mb-3">
            Your rank: <span className="text-primary font-bold">#{myRank}</span> of {entries.length} empires
          </p>
        )}

        {/* Submit */}
        {editingName ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                value={playerName}
                onChange={e => { setPlayerName(e.target.value); setNameError(''); }}
                placeholder="Enter commander name..."
                maxLength={20}
                onKeyDown={e => e.key === 'Enter' && submitScore()}
                className={`flex-1 px-3 py-2 rounded-xl bg-muted border text-xs font-body text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-colors ${nameError ? 'border-destructive' : 'border-border'}`}
              />
              <button
                onClick={submitScore}
                disabled={submitting || !playerName.trim()}
                className="px-3 py-2 rounded-xl bg-primary text-primary-foreground font-body text-xs font-bold disabled:opacity-50 active:scale-95 transition-all"
              >
                {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              </button>
            </div>
            {nameError && (
              <div className="flex items-center gap-1.5 text-destructive">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span className="font-body text-[10px]">{nameError}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-muted-foreground">
              Commander: <span className="text-foreground font-semibold">{playerName}</span>
            </span>
            <button
              onClick={() => { submitScore(); }}
              disabled={submitting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/20 text-primary font-body text-xs font-bold active:scale-95 transition-all"
            >
              {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              Update Score
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-8">
          <p className="font-body text-sm text-muted-foreground">No entries yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {entries.map((entry, i) => {
            const isMe = entry.id === myEntryId;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`rounded-xl border px-3 py-2.5 flex items-center gap-3 transition-all
                  ${isMe
                    ? 'border-primary/50 bg-primary/10 shadow-sm shadow-primary/20'
                    : i < 3 ? 'border-accent/20 bg-accent/5' : 'border-border/30 bg-card/60'}`}
              >
                <div className="w-8 text-center font-display text-sm font-black">
                  {typeof rankEmoji(i) === 'string' && rankEmoji(i).startsWith('#')
                    ? <span className="text-muted-foreground text-xs">{rankEmoji(i)}</span>
                    : <span>{rankEmoji(i)}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-display text-xs font-bold truncate ${isMe ? 'text-primary' : 'text-foreground'}`}>
                      {entry.player_name}
                    </span>
                    {isMe && <span className="text-[9px] bg-primary/20 text-primary rounded-full px-1.5 py-0.5 font-body">YOU</span>}
                  </div>
                  <span className="font-body text-[10px] text-muted-foreground">
                    💎{formatNumber(entry.lifetime_earned)} lifetime
                  </span>
                </div>
                <div className="text-right">
                  {entry.prestige_stars > 0 && (
                    <div className="flex items-center gap-0.5 justify-end">
                      <Star className="w-3 h-3 text-secondary fill-secondary" />
                      <span className="font-display text-[10px] text-secondary font-bold">{entry.prestige_stars}</span>
                    </div>
                  )}
                  <span className="font-body text-[10px] text-muted-foreground block">{entry.total_generators || 0} gens</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}