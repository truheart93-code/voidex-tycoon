import { motion, AnimatePresence } from 'framer-motion';
import { BUFFS } from '@/lib/questData';

export default function BuffDisplay({ activeBuffs }) {
  if (!activeBuffs || activeBuffs.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-4 py-1.5 flex-wrap">
      <AnimatePresence>
        {activeBuffs.map(buff => {
          const def = BUFFS.find(b => b.id === buff.id);
          if (!def) return null;
          const remaining = Math.max(0, buff.expiresAt - Date.now());
          const secs = Math.ceil(remaining / 1000);
          const pct = remaining / def.duration;
          return (
            <motion.div
              key={buff.instanceId}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-body font-bold ${def.bg}`}
            >
              <span>{def.emoji}</span>
              <span className={def.color}>{def.name}</span>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1 rounded-full bg-muted/50 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${def.color.replace('text-', 'bg-')}`}
                    animate={{ width: `${pct * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-muted-foreground text-[9px]">{secs}s</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}