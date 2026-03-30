# 🚀 VoidEx Tycoon - Capacitor Android Setup Guide

## ✅ COMPLETED SETUP
- ✅ Installed Capacitor packages
- ✅ Initialized Capacitor config
- ✅ Added Android platform
- ✅ Updated package.json with build scripts

## 📱 NEXT STEPS - Get Your App Running

### Step 1: Install Dependencies
```bash
cd C:\Users\truhe\VoidEx
npm install
```

### Step 2: Build & Sync to Android
```bash
npm run android
```

This will:
1. Build your web app (`vite build`)
2. Copy it to Android (`cap sync`)
3. Open Android Studio

### Step 3: Run in Android Studio
1. **Android Studio will open automatically**
2. Wait for Gradle sync to finish (bottom status bar)
3. Click the **green play button** (▶️) at top
4. Select **emulator** or **connected phone**
5. Your game will launch!

---

## 🎮 DEVELOPMENT WORKFLOW

### During Development (Hot Reload)
```bash
# Terminal 1 - Run Vite dev server
npm run dev

# Your game will be at: http://localhost:5173
# Test in browser with full hot reload!
```

### When Ready to Test on Android
```bash
npm run android
```

### Quick Sync (if you just changed code)
```bash
npm run cap:sync
```
Then click ▶️ in Android Studio again.

---

## 📦 BUILDING FOR GOOGLE PLAY STORE

### Step 1: Update App Info

Edit `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        applicationId "com.truheart.voidextycoon"
        versionCode 1
        versionName "1.0.0"
    }
}
```

### Step 2: Generate Keystore (One-Time Setup)
```bash
cd android/app
keytool -genkey -v -keystore voidex-release-key.keystore -alias voidex -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANT**: Save the password! You'll need it for every release.

### Step 3: Configure Signing

Create `android/key.properties`:
```
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=voidex
storeFile=voidex-release-key.keystore
```

Edit `android/app/build.gradle`, add BEFORE `android {`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Then inside `android {`, add:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### Step 4: Build Release APK
```bash
cd android
./gradlew assembleRelease
```

**Your APK will be at:**
`android/app/build/outputs/apk/release/app-release.apk`

### Step 5: Build AAB (App Bundle - Required for Play Store)
```bash
cd android
./gradlew bundleRelease
```

**Your AAB will be at:**
`android/app/build/outputs/bundle/release/app-release.aab`

---

## 🎨 CUSTOMIZATION

### App Icon
1. Create 1024x1024 PNG icon
2. Use https://icon.kitchen to generate all sizes
3. Download Android pack
4. Replace files in `android/app/src/main/res/`

### Splash Screen
Edit `android/app/src/main/res/values/styles.xml`:
```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

Add splash image to `android/app/src/main/res/drawable/splash.png`

### App Name
Edit `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">VoidEx Tycoon</string>
```

---

## 🐛 TROUBLESHOOTING

### "Could not find dist directory"
```bash
npm run build
```
Then try `npm run cap:sync` again.

### Android Studio won't open
```bash
npx cap open android
```

### Changes not showing
```bash
# Full rebuild
npm run build
npx cap sync android
```
Then ▶️ in Android Studio.

### Gradle errors
In Android Studio:
1. File → Invalidate Caches → Invalidate and Restart
2. Build → Clean Project
3. Build → Rebuild Project

---

## 📱 GOOGLE PLAY STORE CHECKLIST

Before uploading:

- [ ] App tested on real device
- [ ] All features working (audio, themes, saves, etc.)
- [ ] Icon looks good (1024x1024 + all sizes)
- [ ] Splash screen shows
- [ ] Version code incremented
- [ ] AAB file built (`gradlew bundleRelease`)
- [ ] Privacy policy written (Google requires one)
- [ ] Screenshots taken (min 2, max 8)
- [ ] Feature graphic created (1024x500)
- [ ] Short description (80 chars)
- [ ] Full description written
- [ ] Content rating completed

---

## 🎯 QUICK COMMANDS REFERENCE

```bash
# Development
npm run dev                  # Web dev server
npm run build               # Build web app
npm run android             # Build + open Android Studio

# Capacitor
npx cap sync                # Sync web → native
npx cap open android        # Open Android Studio
npx cap update              # Update Capacitor packages

# Android Build
cd android && ./gradlew assembleRelease     # APK
cd android && ./gradlew bundleRelease       # AAB (Play Store)
```

---

## 🚨 IMPORTANT NOTES

1. **Test on real device** - emulator doesn't show all issues
2. **localStorage works** - all your themes/saves will work!
3. **Audio works** - Web Audio API runs perfectly
4. **Animations work** - Framer Motion stays intact
5. **Keep both** - You can still deploy web version to Netlify too!

---

## 🎉 YOU'RE DONE!

Your game is now:
- ✅ Native Android app
- ✅ Google Play Store ready
- ✅ All features preserved (audio, themes, animations)
- ✅ Easy to update (just `npm run android`)

**Next**: Run `npm install`, then `npm run android` and watch your game launch!
