// Stellar Empire - Theme Definitions
// Each theme overrides CSS variables applied to the game root

export const THEMES = [
  {
    id: 'deep_space',
    name: 'Deep Space',
    emoji: '🌌',
    description: 'The classic void',
    preview: ['#1e2a4a', '#22d3ee', '#a855f7'],
    vars: {
      '--background': '230 25% 7%',
      '--foreground': '210 40% 92%',
      '--card': '230 20% 11%',
      '--primary': '185 80% 55%',
      '--secondary': '270 60% 55%',
      '--muted': '230 15% 18%',
      '--muted-foreground': '210 15% 55%',
      '--accent': '45 90% 55%',
      '--border': '230 15% 20%',
    }
  },
  {
    id: 'nebula',
    name: 'Nebula Storm',
    emoji: '🌸',
    description: 'Pink nebula clouds',
    preview: ['#2d1b4e', '#e879f9', '#fb923c'],
    vars: {
      '--background': '280 30% 6%',
      '--foreground': '310 40% 93%',
      '--card': '280 22% 10%',
      '--primary': '300 80% 65%',
      '--secondary': '25 90% 60%',
      '--muted': '280 18% 16%',
      '--muted-foreground': '300 15% 55%',
      '--accent': '45 95% 60%',
      '--border': '280 15% 22%',
    }
  },
  {
    id: 'solar_flare',
    name: 'Solar Flare',
    emoji: '☀️',
    description: 'Blazing star energy',
    preview: ['#1a0a00', '#fb923c', '#facc15'],
    vars: {
      '--background': '20 40% 5%',
      '--foreground': '40 50% 95%',
      '--card': '20 30% 9%',
      '--primary': '25 95% 60%',
      '--secondary': '45 95% 55%',
      '--muted': '20 20% 15%',
      '--muted-foreground': '30 20% 50%',
      '--accent': '350 85% 60%',
      '--border': '20 20% 18%',
    }
  },
  {
    id: 'aqua_void',
    name: 'Aqua Void',
    emoji: '🧊',
    description: 'Arctic deep ocean',
    preview: ['#021020', '#06b6d4', '#34d399'],
    vars: {
      '--background': '200 50% 4%',
      '--foreground': '190 50% 93%',
      '--card': '200 40% 8%',
      '--primary': '190 85% 50%',
      '--secondary': '160 70% 50%',
      '--muted': '200 25% 14%',
      '--muted-foreground': '190 20% 50%',
      '--accent': '45 90% 55%',
      '--border': '200 25% 18%',
    }
  },
  {
    id: 'matrix',
    name: 'Matrix Core',
    emoji: '💚',
    description: 'Digital green rain',
    preview: ['#001a00', '#22c55e', '#86efac'],
    vars: {
      '--background': '120 60% 3%',
      '--foreground': '120 50% 88%',
      '--card': '120 40% 6%',
      '--primary': '130 75% 50%',
      '--secondary': '90 60% 45%',
      '--muted': '120 25% 12%',
      '--muted-foreground': '120 20% 45%',
      '--accent': '60 90% 55%',
      '--border': '120 25% 16%',
    }
  },
  {
    id: 'blood_moon',
    name: 'Blood Moon',
    emoji: '🔴',
    description: 'Crimson cosmic horror',
    preview: ['#1a0404', '#ef4444', '#f97316'],
    vars: {
      '--background': '0 45% 5%',
      '--foreground': '0 30% 92%',
      '--card': '0 35% 9%',
      '--primary': '0 80% 58%',
      '--secondary': '20 85% 55%',
      '--muted': '0 20% 14%',
      '--muted-foreground': '0 15% 50%',
      '--accent': '45 90% 55%',
      '--border': '0 20% 18%',
    }
  },
  {
    id: 'golden_empire',
    name: 'Golden Empire',
    emoji: '👑',
    description: 'Glorious golden wealth',
    preview: ['#120d00', '#f59e0b', '#fde68a'],
    vars: {
      '--background': '40 50% 4%',
      '--foreground': '45 60% 95%',
      '--card': '40 40% 7%',
      '--primary': '43 95% 55%',
      '--secondary': '35 90% 50%',
      '--muted': '40 25% 12%',
      '--muted-foreground': '40 20% 50%',
      '--accent': '180 70% 50%',
      '--border': '40 25% 16%',
    }
  },
  {
    id: 'void_purple',
    name: 'Void Purple',
    emoji: '🟣',
    description: 'Dark matter singularity',
    preview: ['#0d0614', '#8b5cf6', '#c084fc'],
    vars: {
      '--background': '265 40% 5%',
      '--foreground': '270 40% 93%',
      '--card': '265 32% 9%',
      '--primary': '265 75% 65%',
      '--secondary': '290 65% 60%',
      '--muted': '265 22% 14%',
      '--muted-foreground': '265 18% 50%',
      '--accent': '45 90% 60%',
      '--border': '265 22% 19%',
    }
  },
];

const THEME_STORAGE_KEY = 'stellar_theme';

export function loadTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'deep_space';
}

export function saveTheme(id) {
  localStorage.setItem(THEME_STORAGE_KEY, id);
}

export function applyTheme(themeId) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const root = document.documentElement;
  // Apply vars to :root
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  // Also update --card-foreground, --popover, etc. to match foreground
  root.style.setProperty('--card-foreground', theme.vars['--foreground']);
  root.style.setProperty('--popover', theme.vars['--card']);
  root.style.setProperty('--popover-foreground', theme.vars['--foreground']);
  root.style.setProperty('--ring', theme.vars['--primary']);
  root.style.setProperty('--input', theme.vars['--border']);
  root.style.setProperty('--sidebar-background', theme.vars['--card']);
  root.style.setProperty('--sidebar-border', theme.vars['--border']);
  root.style.setProperty('--sidebar-primary', theme.vars['--primary']);
  root.style.setProperty('--sidebar-ring', theme.vars['--primary']);
}