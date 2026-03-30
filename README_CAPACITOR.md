# VoidEx Tycoon - Capacitor Android App

Space-themed idle tycoon game wrapped for Android with Capacitor.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build and launch in Android Studio
npm run android
```

## 📖 Full Documentation

See **[CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md)** for:
- Complete setup guide
- Google Play Store deployment
- Troubleshooting
- Customization (icons, splash, etc.)

## 🎮 Development

```bash
# Web development (hot reload)
npm run dev

# Build for Android
npm run android

# Sync changes to Android
npm run cap:sync
```

## 🏗️ Tech Stack

- **Web**: React + Vite + Tailwind
- **Mobile**: Capacitor (web → native wrapper)
- **Features**: localStorage, Web Audio, Framer Motion animations
- **Platform**: Android (iOS-ready with `npx cap add ios`)

## 📱 Structure

```
voidex-tycoon/
├── src/              # Web game source
├── android/          # Native Android project
├── dist/             # Built web assets (generated)
└── capacitor.config.ts
```

## ✅ What Works

- ✅ All game features (themes, audio, saves, animations)
- ✅ localStorage persistence
- ✅ Web Audio API procedural sounds
- ✅ Framer Motion animations
- ✅ Touch controls
- ✅ Offline mode

## 🎯 Next Steps

1. Run `npm install`
2. Run `npm run android`
3. Test in emulator or device
4. See CAPACITOR_SETUP.md for Play Store deployment

---

**Created by**: Three Lantern Studios  
**Platform**: Android (Native)  
**Framework**: Capacitor 6.x
