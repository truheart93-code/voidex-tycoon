import { useState, useEffect, useRef, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GENERATORS, UPGRADES, getRevenue, getTime, getPrestigeMultiplier, formatNumber } from '@/lib/gameData';
import { TrendingUp, Activity, PieChart } from 'lucide-react';

const SAMPLE_INTERVAL_MS = 60 * 1000; // 1 min samples
const MAX_SAMPLES = 24 * 60; // 24h worth

const BAR_COLORS = [
  '#22d3ee', '#a78bfa', '#f59e0b', '#34d399', '#f87171',
  '#c084fc', '#38bdf8', '#fb923c', '#4ade80', '#e879f9',
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/50 bg-popover/95 backdrop-blur-sm px-3 py-2 text-xs shadow-xl">
      <p className="font-display text-[9px] text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-body font-semibold" style={{ color: p.color }}>
          💎{formatNumber(p.value)}
        </p>
      ))}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-primary" />
      </div>
      <div>
        <p className="font-display text-xs font-bold tracking-wide text-foreground">{title}</p>
        {subtitle && <p className="font-body text-[10px] text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function AnalyticsPanel({ state, creditsPerSec }) {
  const [incomeHistory, setIncomeHistory] = useState(() => {
    // Try to restore from sessionStorage
    try {
      const saved = JSON.parse(sessionStorage.getItem('voidex_income_history') || 'null');
      if (Array.isArray(saved)) return saved.slice(-MAX_SAMPLES);
    } catch {}
    return [];
  });

  const lastCreditsRef = useRef(state.credits);

  // Sample income every minute
  useEffect(() => {
    const record = () => {
      const diff = Math.max(0, state.credits - lastCreditsRef.current);
      lastCreditsRef.current = state.credits;
      const now = new Date();
      const label = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
      setIncomeHistory(prev => {
        const next = [...prev, { time: label, earned: Math.round(diff), rate: Math.round(creditsPerSec) }].slice(-MAX_SAMPLES);
        try { sessionStorage.setItem('voidex_income_history', JSON.stringify(next)); } catch {}
        return next;
      });
    };
    record(); // immediate first
    const id = setInterval(record, SAMPLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []); // eslint-disable-line

  // Also update rate in last point every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setIncomeHistory(prev => {
        if (!prev.length) return prev;
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], rate: Math.round(creditsPerSec) };
        return updated;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [creditsPerSec]);

  // Generator contribution data
  const genContributions = useMemo(() => {
    const prestigeMult = getPrestigeMultiplier(state.prestigeStars, state.prestigeUpgrades || []);
    let globalMult = 1;
    (state.upgrades || []).forEach(uid => {
      const upg = UPGRADES.find(u => u.id === uid);
      if (upg && upg.generatorId === 'all') globalMult *= upg.multiplier;
    });

    const rows = GENERATORS.map(gen => {
      const gs = state.generators[gen.id];
      if (!gs || gs.count === 0) return null;
      const rev = getRevenue(gen, gs, prestigeMult, globalMult);
      const time = getTime(gen, gs, state.prestigeUpgrades || []);
      const perSec = (rev / time) * 1000;
      return { name: gen.name, emoji: gen.emoji, perSec, rev, count: gs.count, managed: state.managers.includes(gen.id) };
    }).filter(Boolean);

    const total = rows.reduce((s, r) => s + r.perSec, 0) || 1;
    return rows
      .sort((a, b) => b.perSec - a.perSec)
      .map(r => ({ ...r, pct: (r.perSec / total) * 100 }));
  }, [state.generators, state.managers, state.upgrades, state.prestigeStars, state.prestigeUpgrades]);

  // Visible income history (last 60 points = last hour)
  const visibleHistory = incomeHistory.slice(-60);

  return (
    <div className="px-4 pb-4 space-y-6">
      {/* Live Rate */}
      <div className="rounded-2xl border border-primary/20 bg-card/70 p-4">
        <SectionHeader icon={Activity} title="LIVE PRODUCTION RATE" subtitle="Credits per second, now" />
        <div className="flex items-end gap-3">
          <div>
            <p className="font-display text-3xl font-black text-primary">{formatNumber(creditsPerSec)}</p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">credits / second</p>
          </div>
          <div className="flex-1">
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visibleHistory.slice(-20)} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="rate" stroke="#22d3ee" strokeWidth={2} fill="url(#rateGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Income History */}
      <div className="rounded-2xl border border-border/30 bg-card/70 p-4">
        <SectionHeader icon={TrendingUp} title="INCOME HISTORY" subtitle={`Last ${visibleHistory.length} samples (1 min each)`} />
        {visibleHistory.length < 2 ? (
          <div className="h-36 flex items-center justify-center">
            <p className="font-body text-xs text-muted-foreground opacity-60">Collecting data... check back soon</p>
          </div>
        ) : (
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visibleHistory} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 8, fill: 'hsl(210 20% 50%)' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="earned" stroke="#a78bfa" strokeWidth={2} fill="url(#earnGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Generator Breakdown */}
      <div className="rounded-2xl border border-border/30 bg-card/70 p-4">
        <SectionHeader icon={PieChart} title="GENERATOR BREAKDOWN" subtitle="Contribution to total output" />

        {genContributions.length === 0 ? (
          <p className="font-body text-xs text-muted-foreground text-center py-6">No active generators yet</p>
        ) : (
          <>
            {/* Bar chart */}
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genContributions.slice(0, 8)} layout="vertical" margin={{ top: 0, right: 8, left: 4, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="emoji" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} width={24} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-border/50 bg-popover/95 backdrop-blur-sm px-3 py-2 text-xs shadow-xl">
                          <p className="font-display text-[9px] text-muted-foreground">{d.name}</p>
                          <p className="font-body font-semibold text-primary">💎{formatNumber(d.perSec)}/s</p>
                          <p className="font-body text-muted-foreground">{d.pct.toFixed(1)}% of output</p>
                          <p className="font-body text-muted-foreground">Count: {d.count}</p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="perSec" radius={[0, 4, 4, 0]}>
                    {genContributions.slice(0, 8).map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed rows */}
            <div className="space-y-2">
              {genContributions.map((g, i) => (
                <div key={g.name} className="flex items-center gap-2.5">
                  <span className="text-sm w-5 text-center">{g.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-body text-[10px] font-semibold text-foreground truncate max-w-[120px]">{g.name}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {g.managed && <span className="font-display text-[8px] bg-primary/20 text-primary rounded px-1">AUTO</span>}
                        <span className="font-display text-[9px] font-bold text-muted-foreground">{g.pct.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${g.pct}%`, background: BAR_COLORS[i % BAR_COLORS.length] }}
                      />
                    </div>
                  </div>
                  <span className="font-display text-[9px] text-muted-foreground w-16 text-right flex-shrink-0">
                    {formatNumber(g.perSec)}/s
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}