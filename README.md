# PCaptine – Driver App

A React Native mobile app for gig delivery drivers. PCaptine lets drivers browse available shipment jobs, track active deliveries, monitor earnings, and manage their profile — all from a clean, custom-built UI with no third-party component library.

> Mock data is Dubai-based (AED currency, real Dubai addresses), making this a solid foundation for a Middle East last-mile delivery platform.

---

## Features

- **Online / Offline toggle** — drivers set their availability from the Home screen
- **Job marketplace** — browse available shipments with pickup/delivery addresses, offered price, sender rating, and vehicle requirements; accept or decline with one tap
- **Active deliveries** — track in-progress jobs with real-time status indicators
- **Earnings dashboard** — view Today / This Week / This Month breakdowns with trip count, online hours, and average per trip; one-tap Cash Out
- **Transaction history** — itemised list of released/held/pending payments
- **Driver profile** — rating, total trips, verification badge, vehicle details, payout method, and app preferences
- **Skeleton loading states** — animated placeholders on the stats card while data loads
- **Pull-to-refresh** — Home screen refreshes with simulated network delay

---

## Screens

| Screen | Description |
|--------|-------------|
| **Home** | Dashboard: online toggle, today's earnings + skeleton loader, performance stats (acceptance/completion rate), recent deliveries list |
| **Tasks** | Two-tab view: Available jobs (accept/decline) and Active deliveries with live status pill |
| **Earnings** | Period selector (Today / Week / Month), earnings card, Cash Out button, recent transactions |
| **Profile** | Driver card with avatar/rating/trips, Account / Preferences / Support menu sections |

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React Native 0.75.4 |
| Language | TypeScript 5.0.4 |
| Navigation | @react-navigation/native + bottom-tabs |
| Touch handling | react-native-gesture-handler 2.21.0 |
| Safe area | react-native-safe-area-context |
| Screen management | react-native-screens |
| Icons | react-native-vector-icons (Feather set) |

All UI is custom-built with React Native primitives — no Expo, no Material UI.

---

## Project Structure

```
PCaptine/
├── App.tsx                    # Root: NavigationContainer + StatusBar
├── index.js                   # Entry point (gesture handler import first)
├── theme.ts                   # Design tokens: Colors, Spacing, Radius, Typography, Shadows
├── types.ts                   # Shared TypeScript interfaces and enums
├── mockData.ts                # Mock driver, jobs, deliveries, earnings, transactions
│
├── BottomTabNavigator.tsx     # Custom tab bar with Feather icons + safe area
├── HomeScreen.tsx             # Dashboard with stats and recent deliveries
├── TasksScreen.tsx            # Available / active job tabs
├── EarningsScreen.tsx         # Earnings by period + transaction list
├── ProfileScreen.tsx          # Driver profile and settings menu
│
├── StatsCard.tsx              # Today's earnings card
├── SkeletonLoader.tsx         # Animated shimmer placeholders
├── OnlineToggleCard.tsx       # Online / offline availability switch
├── TaskCard.tsx               # Job listing card with accept / decline
├── ScreenHeader.tsx           # Reusable title + subtitle header
└── DriverActionButton.tsx     # Button: primary / secondary / danger / ghost variants
```

---

## Design System

- **Colors** — Slate background (`#F8FAFC`), white cards, green (`#10B981`) for active/success, red for danger
- **Spacing** — 4pt grid: `xxs(4) xs(8) sm(12) md(16) lg(20) xl(24) xxl(32) xxxl(40)`
- **Typography** — h1/h2/h3, bodyLarge/body/bodyBold, label/caption/captionBold, button
- **Icons** — Feather icon set throughout (no emoji)
- **Safe area** — every screen uses `useSafeAreaInsets`; tab bar respects `insets.bottom`

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Android Studio with SDK Build Tools 34 and NDK 26.1.10909125
- JDK 17
- A connected Android device or emulator with USB debugging enabled

### Install

```bash
git clone https://github.com/waleedmustafa971/PCaptine.git
cd PCaptine
npm install
```

### Run on Android

Start Metro in one terminal:

```bash
npm start
```

Build and install in another:

```bash
npm run android
```

> **Windows note:** Run the build from PowerShell if you hit `.bat` execution errors in Git Bash.

---

## Android Build Notes

| Setting | Value |
|---------|-------|
| Gradle | 8.8 |
| AGP | 8.5.0 |
| compileSdkVersion | 34 |
| targetSdkVersion | 34 |
| minSdkVersion | 24 |
| NDK | 26.1.10909125 |
| Kotlin | 1.9.24 |
| New Architecture | Disabled |

`androidx.core` is pinned to `1.13.1` in `android/build.gradle` to avoid an AGP 8.5 / androidx.core 1.16 incompatibility. New Architecture is disabled because the project path contains a space which breaks the auto-generated CMake autolinking file.

---

## Roadmap

- [ ] Real backend API (jobs, auth, earnings)
- [ ] Live location tracking with maps
- [ ] Push notifications for incoming jobs
- [ ] In-app driver ↔ sender chat
- [ ] Re-enable New Architecture (move project to a path without spaces)
- [ ] iOS support

---

## License

MIT
