# Fiscal Express Mobile 📱

Aplicație mobilă pentru gestionarea certificatelor fiscale în Timișoara.

## 🚀 Quick Start

### Dezvoltare locală (Windows)

```bash
# Instalare dependențe
npm install

# Pornire dev server
npm run dev
```

Deschide http://localhost:3000 în browser.

### Build pentru iOS (via GitHub Actions)

1. Push codul pe GitHub
2. Mergi la tab-ul **Actions**
3. Click pe **Build iOS App**
4. Click **Run workflow**
5. Așteaptă build-ul (~10 min)
6. Descarcă **FiscalExpress-iOS-Simulator.zip** din Artifacts

### Build pentru Android (via GitHub Actions)

1. Push codul pe GitHub
2. Mergi la **Actions** → **Build Android APK**
3. Descarcă **app-debug.apk** din Artifacts
4. Instalează pe telefon Android

## 📦 Structură Proiect

```
fiscal-express-mobile/
├── src/
│   ├── components/      # Componente React
│   ├── pages/           # Pagini aplicație
│   ├── styles/          # CSS/Tailwind
│   ├── App.tsx          # Router principal
│   └── main.tsx         # Entry point
├── .github/
│   └── workflows/       # GitHub Actions
│       ├── build-ios.yml
│       └── build-android.yml
├── capacitor.config.ts  # Configurare Capacitor
├── package.json
└── vite.config.ts
```

## 🍎 Testare pe iPhone (fără Mac)

### Opțiunea 1: Simulator App (din GitHub Actions)
- Descarcă .zip cu app-ul pentru simulator
- Necesită macOS pentru a rula simulatorul

### Opțiunea 2: TestFlight (necesită Apple Developer $99/an)
1. Creează cont Apple Developer
2. Adaugă certificate în GitHub Secrets
3. Build-ul va genera .ipa semnat
4. Upload în TestFlight
5. Instalează de pe TestFlight pe iPhone

### Opțiunea 3: PWA (GRATIS - Recomandată)
1. Hostează pe Vercel/Netlify
2. Deschide în Safari pe iPhone
3. Tap Share → Add to Home Screen
4. Folosește ca aplicație!

## 🤖 Testare pe Android

1. Descarcă `app-debug.apk` din GitHub Actions
2. Transferă pe telefon
3. Activează "Install from unknown sources"
4. Instalează APK-ul
5. Gata! 🎉

## 🔧 Comenzi Utile

```bash
# Dev server
npm run dev

# Build pentru producție
npm run build

# Preview build
npm run preview

# Sync Capacitor
npm run cap:sync
```

## 📱 Features

- ✅ Dashboard premium
- ✅ Management mașini (CRUD)
- ✅ Acces portaluri: DFMT, Atlas, WebSign
- ✅ Stocare locală persistentă
- ✅ Design modern, animat
- ✅ Suport iOS & Android
- ✅ Safe area support (notch, home indicator)

## 💡 Notă

Aplicația deschide portalurile fiscale în browser-ul nativ al dispozitivului, 
deoarece acestea necesită funcționalități web complete pentru autentificare și semnare.

---

Dezvoltat cu ❤️ pentru Timișoara
