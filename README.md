# PCaptine – Driver App

A React Native mobile app for gig delivery drivers. PCaptine lets drivers sign up, complete KYC, browse available shipment jobs, track active deliveries, chat with senders, rate completed trips, monitor earnings, and manage their profile — all from a clean, custom-built UI with no third-party component library.

> Mock data is Dubai-based (AED currency, real Dubai addresses), making this a solid foundation for a Middle East last-mile delivery platform.

---

## Features

### Auth & Onboarding
- **Phone login** — UAE number entry with +971 prefix, OTP verification (demo code: `123456`)
- **Smart routing** — known drivers land directly on the Home screen; new numbers go through registration
- **Driver registration** — full name, email, vehicle type picker, licence plate
- **KYC flow** — multi-step document upload (driving licence, vehicle registration, selfie with ID); pending-review state after submission

### Core Driver Features
- **Online / Offline toggle** — drivers set their availability from the Home screen
- **Job marketplace** — browse available shipments with pickup/delivery addresses, offered price, sender rating, and vehicle requirements; accept or decline with one tap
- **Job detail** — full shipment info, map placeholder, counter-offer price input, three-button action bar (Decline / Counter / Accept)
- **Active delivery tracker** — step-by-step progress (Accepted → Arrived → Picked Up → En Route → Delivered) with advance-status button
- **In-app chat** — bubble-style messaging per delivery, send button, empty state
- **Post-delivery rating** — 5-star rating, quick-comment tags, free-text comment, earnings confirmation screen
- **Notifications** — typed list (new job / offer accepted / payment / system), unread dots, mark-all-read

### Dashboard & Finance
- **Earnings dashboard** — view Today / This Week / This Month breakdowns with trip count, online hours, and average per trip; one-tap Cash Out
- **Transaction history** — itemised list of released/held/pending payments
- **Skeleton loading states** — animated placeholders on the stats card while data loads
- **Pull-to-refresh** — Home screen refreshes with simulated network delay

### Profile
- **Driver profile** — rating, total trips, verification badge, vehicle details, payout method, and app preferences
- **Recent ratings** — last 3 sender ratings with stars and comments inline on the Profile screen
- **Sign out** — wired to auth context; returns to the Phone screen

---

## Screens

| Screen | Description |
|--------|-------------|
| **PhoneScreen** | UAE phone number entry, +971 prefix, validation |
| **OTPScreen** | 6-box OTP input, live 30 s resend countdown, existing-vs-new routing |
| **RegisterScreen** | Name, email, vehicle type grid, plate number |
| **KYCScreen** | 3-step document upload with per-doc upload state; submitted confirmation |
| **Home** | Dashboard: online toggle, today's earnings + skeleton loader, performance stats, recent deliveries, notification bell |
| **Tasks** | Two-tab view: Available jobs (tap → detail, accept/decline) and Active deliveries (tap → tracker) |
| **JobDetailScreen** | Full job info, map placeholder, counter-offer input, Decline / Counter / Accept actions |
| **ActiveDeliveryScreen** | Step tracker, map placeholder, Message / Call / Navigate shortcuts, advance-status button |
| **ChatScreen** | Bubble chat, send input, delivery-scoped message list |
| **RatingScreen** | Star rating, quick tags, free comment, earnings strip, skip option |
| **Earnings** | Period selector (Today / Week / Month), earnings card, Cash Out button, recent transactions |
| **NotificationsScreen** | Typed notification list, unread indicators, mark-all-read |
| **Profile** | Driver card with avatar/rating/trips, recent ratings, Account / Preferences / Support menus, Sign Out |

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React Native 0.75.4 |
| Language | TypeScript 5.0.4 |
| Navigation | @react-navigation/native 6 + bottom-tabs 6 + native-stack 6 |
| Touch handling | react-native-gesture-handler 2.21.0 |
| Safe area | react-native-safe-area-context |
| Screen management | react-native-screens |
| Icons | react-native-vector-icons (Feather set) |

All UI is custom-built with React Native primitives — no Expo, no Material UI.

---

## Project Structure

```
PCaptine/
├── App.tsx                    # Root: AppProvider + NavigationContainer + RootNavigator
├── index.js                   # Entry point (gesture handler + enableScreens first)
├── AppContext.tsx              # Auth state machine: 'auth' | 'kyc' | 'main'
├── NavigationTypes.ts         # RootStackParamList type definitions
├── theme.ts                   # Design tokens: Colors, Spacing, Radius, Typography, Shadows
├── types.ts                   # Shared TypeScript interfaces and enums
├── mockData.ts                # Mock driver, jobs, deliveries, earnings, transactions,
│                              #   chat messages, notifications, ratings, KYC status
│
│── Auth flow
├── PhoneScreen.tsx            # UAE phone number entry
├── OTPScreen.tsx              # 6-digit OTP verify, resend countdown, routing logic
├── RegisterScreen.tsx         # Name / vehicle type / plate registration
├── KYCScreen.tsx              # Document upload + submitted state
│
│── Main stack (over tabs)
├── JobDetailScreen.tsx        # Full job view, counter-offer, accept/decline
├── ActiveDeliveryScreen.tsx   # Step tracker, map placeholder, chat shortcut
├── ChatScreen.tsx             # Bubble-style in-delivery chat
├── RatingScreen.tsx           # Post-delivery star rating + earnings confirmation
├── NotificationsScreen.tsx    # Notification list with type icons
│
│── Tab screens
├── BottomTabNavigator.tsx     # Custom tab bar with Feather icons + safe area
├── HomeScreen.tsx             # Dashboard with stats, recent deliveries, notif bell
├── TasksScreen.tsx            # Available / active job tabs with navigation
├── EarningsScreen.tsx         # Earnings by period + transaction list
├── ProfileScreen.tsx          # Driver profile, recent ratings, settings, sign out
│
│── Reusable components
├── StatsCard.tsx              # Today's earnings card
├── SkeletonLoader.tsx         # Animated shimmer placeholders
├── OnlineToggleCard.tsx       # Online / offline availability switch
├── TaskCard.tsx               # Job listing card with accept / decline / tap-to-detail
├── ScreenHeader.tsx           # Reusable title + subtitle header
└── DriverActionButton.tsx     # Button: primary / secondary / danger / ghost variants
```

---

## Navigation Architecture

```
RootNavigator (NativeStack)
 ├── [appState = 'auth']
 │    ├── PhoneScreen
 │    ├── OTPScreen
 │    └── RegisterScreen
 ├── [appState = 'kyc']
 │    └── KYCScreen
 └── [appState = 'main']
      ├── MainTabs (BottomTabNavigator)
      │    ├── Home
      │    ├── Tasks
      │    ├── Earnings
      │    └── Profile
      ├── JobDetailScreen
      ├── ActiveDeliveryScreen
      ├── ChatScreen
      ├── RatingScreen
      └── NotificationsScreen
```

---

## Demo Login

| Scenario | Phone | OTP |
|----------|-------|-----|
| Existing driver (skips registration) | `501234567` | `123456` |
| New driver (goes through Register → KYC) | any other number | `123456` |

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
- [ ] Live location tracking with maps integration
- [ ] Push notifications (FCM) for incoming jobs
- [ ] Re-enable New Architecture (move project to a path without spaces)
- [ ] iOS support

---

## License

MIT
