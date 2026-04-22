# BharatBuddy — India in one tap

> All-in-one India travel super app — hotels, restaurants, transport, budget-based trip planner, and 24/7 SOS. Installable PWA with offline support, 6 languages, and persistent state.

**Live demo:** https://kharetayash.github.io/bharatbuddy/bharatbuddy.html

BharatBuddy is a Progressive Web App built for three kinds of travelers in India — international tourists, domestic explorers, and budget backpackers. It consolidates what is usually six apps (Booking, Zomato, IRCTC, TripAdvisor, Google Maps, emergency dialers) into one fast, installable experience that works even on patchy rural networks.

---

## What it does

**Discover** — Browse curated tourist destinations across India with images, ratings, and cultural context.

**Plan** — Describe your trip in one sentence (budget, days, destination) and Trip Genie generates a day-by-day itinerary you can save and edit.

**Book** — Hotels near your destination, local restaurants by cuisine, and intercity transport (train, flight, bus) — all in-flow, no app switching.

**Stay safe** — One-tap SOS screen with verified India helplines: 112 Police, 1363 Tourist Helpline, 108 Medical, 1091 Women's Helpline.

**Speak your language** — UI localized across 6 languages: English, Hindi, Tamil, Bengali, Marathi, Gujarati.

**Remember everything** — Favorites, bookings, trip plans, and onboarding profile all persist via `localStorage`. Refresh the app, close it, reinstall it — your state survives.

---

## Tech stack

- **Vanilla JavaScript** — zero framework weight, instant first paint on 3G
- **Progressive Web App** — installable on Android and iOS home screens
- **Service Worker** — cache-first strategy, offline-ready after first launch
- **localStorage** — full client-side persistence, no backend dependency
- **Single-page architecture** — 8 screens, state-driven routing, phone-frame responsive design
- **SVG data-URI icons** — no binary assets, entire app is four text files

Total bundle: **~91 KB** uncompressed. No build step. No dependencies.

---

## Install on your phone

**Android (Chrome):** Open the live URL → three-dot menu → **Install app** → confirm. The orange "B" icon lands on your home screen.

**iPhone (Safari):** Open the live URL → Share button → **Add to Home Screen** → Add.

Launches fullscreen like a native app. Works offline after first load.

---

## Run locally

```bash
git clone https://github.com/yashkhareta4/bharatbuddy.git
cd bharatbuddy
python3 -m http.server 8000
```

Then open `http://localhost:8000/bharatbuddy.html`.

> PWA install requires HTTPS in production. GitHub Pages handles this automatically.

---

## Project structure

```
bharatbuddy/
├── bharatbuddy.html        # app shell, all 8 screens, inline CSS
├── bharatbuddy.js          # state, routing, persistence, Trip Genie
├── manifest.webmanifest    # PWA metadata, icons, theme
├── sw.js                   # service worker, offline cache
└── README.md
```

---

## Roadmap

Next on the build list: multi-city itineraries in Trip Genie, a translation layer that works offline, verified-reviews badging for hotels and restaurants, and a lightweight on-device recommendation model trained on traveler persona + season.

---

## Author

Built by **Yash Khareta** — incoming MSc Artificial Intelligence, Brunel University London.

Feedback, forks, and contributions welcome.
