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

## UI / UX Design System

> **Every new screen and component must follow these rules.** The design is intentionally minimal and consistent — do not introduce new patterns without updating this section.

### Colours

All colours are imported from `./theme` — never use raw hex values in component files.

| Token | Hex | Usage |
|-------|-----|-------|
| `Colors.background` | `#F8FAFC` | Screen background, scroll view background |
| `Colors.surface` | `#FFFFFF` | Cards, modals, input fields, tab bar |
| `Colors.surfaceAlt` | `#F1F5F9` | Tab bar inactive, icon backgrounds, empty state fills |
| `Colors.success` | `#10B981` | Primary action colour — buttons, active states, online indicator, progress |
| `Colors.successSoft` | `#D1FAE5` | Success pill backgrounds, active card borders |
| `Colors.danger` | `#EF4444` | Destructive actions, decline buttons, offline indicator |
| `Colors.dangerSoft` | `#FEE2E2` | Danger pill backgrounds |
| `Colors.warning` | `#F59E0B` | Star ratings, pending states, special requirement badges |
| `Colors.warningSoft` | `#FEF3C7` | Warning pill backgrounds |
| `Colors.info` | `#3B82F6` | Chat icon, counter-offer, informational badges |
| `Colors.infoSoft` | `#DBEAFE` | Info pill backgrounds |
| `Colors.textPrimary` | `#1E293B` | Headings, primary body text |
| `Colors.textSecondary` | `#64748B` | Supporting text, labels, metadata |
| `Colors.textTertiary` | `#94A3B8` | Hints, timestamps, placeholders, disabled text |
| `Colors.border` | `#E2E8F0` | Card borders, dividers, input borders (default) |
| `Colors.borderStrong` | `#CBD5E1` | Stronger dividers, separator dots |
| `Colors.overlay` | `rgba(15,23,42,0.4)` | Modal/sheet backdrop |

**Rules:**
- The primary interactive colour is always `Colors.success` (green). Use it for CTAs, active toggles, filled progress, and selected states.
- Never use blue as a primary action colour — blue (`Colors.info`) is reserved for secondary/informational elements only.
- Disabled states use `Colors.border` as background and `Colors.textTertiary` as text.
- Unread / alert dots use `Colors.danger`.

---

### Spacing

All spacing values come from `Spacing` in `./theme`. Use the named tokens — never write raw pixel numbers for padding/margin/gap.

| Token | Value | Typical use |
|-------|-------|-------------|
| `Spacing.xxs` | 4 | Icon-to-text gap, tight internal padding |
| `Spacing.xs` | 8 | Gap between list items, small internal padding |
| `Spacing.sm` | 12 | Card internal padding (compact), between card elements |
| `Spacing.md` | 16 | Standard card padding, section gap |
| `Spacing.lg` | 20 | Horizontal screen padding (`paddingHorizontal`) |
| `Spacing.xl` | 24 | Section-to-section gap |
| `Spacing.xxl` | 32 | Large vertical breaks |
| `Spacing.xxxl` | 40 | Empty state vertical padding |

**Rule:** Horizontal screen padding is always `Spacing.lg` (20). Never vary this per screen.

---

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `Radius.sm` | 8 | Small chips, tags, icon boxes, inner elements |
| `Radius.md` | 12 | Buttons, input fields, small cards |
| `Radius.lg` | 16 | Standard cards, main content blocks |
| `Radius.xl` | 20 | Large hero cards |
| `Radius.full` | 999 | Avatars, pill badges, circular buttons, dots |

---

### Typography

All text styles are spread from `Typography` in `./theme`. Never set `fontSize`, `fontWeight`, or `lineHeight` manually — extend the scale in `theme.ts` if a new style is genuinely needed.

| Token | Size / Weight | Usage |
|-------|--------------|-------|
| `Typography.h1` | 28 / 700 | Page-level hero numbers (earnings total) |
| `Typography.h2` | 22 / 700 | Screen titles, section headings |
| `Typography.h3` | 18 / 600 | Card titles, modal headers |
| `Typography.bodyLarge` | 16 / 500 | Primary names (sender, driver), key values |
| `Typography.body` | 14 / 400 | Standard descriptive text |
| `Typography.bodyBold` | 14 / 600 | Emphasised body text, menu labels |
| `Typography.label` | 13 / 500 | Form field labels |
| `Typography.caption` | 12 / 400 | Metadata, timestamps, secondary info |
| `Typography.captionBold` | 12 / 600 | Section headers (uppercased), badge text |
| `Typography.button` | 16 / 600 | Button labels only |

**Rules:**
- Section headers inside cards are always `Typography.captionBold` + `textTransform: 'uppercase'` + `letterSpacing: 0.5`.
- Monetary amounts use `Typography.h1` or `Typography.h2` coloured `Colors.success`.
- Never use inline `fontWeight` or `fontSize` — spread the Typography token and override only `color` if needed.

---

### Shadows

| Token | Elevation | Usage |
|-------|-----------|-------|
| `Shadows.sm` | 1 | Subtle lift on small elements |
| `Shadows.md` | 3 | Cards in lists |
| `Shadows.lg` | 6 | Floating action bars, modals |

Most cards use a `borderWidth: 1, borderColor: Colors.border` instead of a shadow — prefer the border approach for flat consistency. Use shadows only when an element genuinely floats above the page (sticky bars, FABs).

---

### Cards

The standard card pattern used throughout the app:

```tsx
<View style={{
  backgroundColor: Colors.surface,
  borderRadius: Radius.lg,
  padding: Spacing.md,
  borderWidth: 1,
  borderColor: Colors.border,
  marginBottom: Spacing.sm,
}}>
```

Variants:
- **Active / selected card** — swap `borderColor` to `Colors.success`, optionally set `backgroundColor` to a very light tint.
- **Danger card** — swap `borderColor` to `Colors.danger`.
- **Info card** — swap `borderColor` to `Colors.info`, `backgroundColor` to `Colors.infoSoft`.

---

### Buttons

Use `DriverActionButton` for all primary actions. Four variants:

| Variant | Background | Text | Use |
|---------|-----------|------|-----|
| `primary` | `Colors.success` | White | Main CTA — Accept, Submit, Verify, Continue |
| `secondary` | `Colors.surfaceAlt` | `textPrimary` | Neutral — Decline, Cancel, Back |
| `danger` | `Colors.danger` | White | Destructive — Delete, Remove |
| `ghost` | Transparent | `textPrimary` | Low-emphasis — Skip, See all |

Sizes: `sm` (40 h) · `md` (48 h) · `lg` (56 h). Default is `md`.

For inline icon+text buttons (not full-width), build them as `Pressable` rows directly — the `DriverActionButton` is for full-width or block-level actions.

**Press feedback:** always include either `android_ripple` or `opacity 0.85 + scale 0.98` on `pressed` state — never leave a Pressable with no visual feedback.

---

### Icons

- Icon set: **Feather** only (`react-native-vector-icons/Feather`). Never mix icon sets.
- Standard sizes: `12` (inline caption), `14–16` (body row icons), `18–20` (card icons), `22` (tab bar), `28–32` (empty states / hero icons).
- Icon colour follows context: `Colors.textSecondary` for neutral, `Colors.success` for active, `Colors.danger` for destructive, `Colors.textTertiary` for disabled/placeholder.
- Wrap icons in a coloured circle/square when used as a visual anchor (e.g. notification type icon, menu row icon). Size the box at 36–44 px, `Radius.sm` or `Radius.full`, background from the `*Soft` palette.

---

### Status Pills & Badges

Pattern for inline status indicators:

```tsx
<View style={{
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: Colors.successSoft,   // or dangerSoft, warningSoft, infoSoft
  paddingHorizontal: Spacing.sm,
  paddingVertical: 4,
  borderRadius: Radius.full,
  gap: 6,
}}>
  <View style={{ width: 6, height: 6, borderRadius: Radius.full, backgroundColor: Colors.success }} />
  <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.success, letterSpacing: 0.5 }}>
    LABEL
  </Text>
</View>
```

Unread notification dots: `width: 8, height: 8, borderRadius: Radius.full, backgroundColor: Colors.danger`.

---

### Forms & Inputs

```tsx
// Wrapper
<View style={{
  backgroundColor: Colors.surface,
  borderRadius: Radius.md,
  borderWidth: 1.5,
  borderColor: Colors.border,       // focused: Colors.success
  height: 52,
  paddingHorizontal: Spacing.md,
  justifyContent: 'center',
}}>
  <TextInput
    style={{ ...Typography.body, color: Colors.textPrimary, paddingVertical: 0 }}
    placeholderTextColor={Colors.textTertiary}
  />
</View>
```

- Field labels use `Typography.label`, placed above the input with `marginBottom: Spacing.xs`.
- Active/focused border: `Colors.success` at `1.5` width.
- Error state: border switches to `Colors.danger`; error message is `Typography.caption` + `color: Colors.danger` below the input.
- Disabled inputs: `backgroundColor: Colors.surfaceAlt`, text `Colors.textTertiary`.

---

### Navigation Headers (Stack Screens)

Stack screens (non-tab) use a manual nav bar — `headerShown: false` is set globally. The pattern:

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
               paddingHorizontal: Spacing.lg, paddingTop: insets.top + Spacing.xs, paddingBottom: Spacing.sm }}>
  <Pressable style={backBtnStyle} onPress={() => navigation.goBack()}>
    <Icon name="arrow-left" size={20} color={Colors.textPrimary} />
  </Pressable>
  <Text style={Typography.h3}>{title}</Text>
  <View style={{ width: 40 }} />{/* spacer to centre the title */}
</View>
```

Back button: `40×40`, `Radius.full`, `backgroundColor: Colors.surface`, `borderWidth: 1, borderColor: Colors.border`.

Tab screens use the `ScreenHeader` component instead.

---

### Safe Area

- Every screen reads `const insets = useSafeAreaInsets()`.
- Top inset: applied to the first fixed element (header or container `paddingTop`).
- Bottom inset: applied to sticky action bars and scroll content `paddingBottom`.
- Never hardcode status bar heights.

---

### Empty States

```tsx
<View style={{ alignItems: 'center', paddingVertical: Spacing.xxxl }}>
  <View style={{ width: 64, height: 64, borderRadius: Radius.full,
                 backgroundColor: Colors.surfaceAlt, alignItems: 'center',
                 justifyContent: 'center', marginBottom: Spacing.md }}>
    <Icon name="inbox" size={28} color={Colors.textTertiary} />
  </View>
  <Text style={Typography.h3}>{title}</Text>
  <Text style={[Typography.body, { color: Colors.textSecondary, textAlign: 'center',
                                   paddingHorizontal: Spacing.xl }]}>{subtitle}</Text>
</View>
```

---

### Coding Conventions

- **`StyleSheet.create()`** at the bottom of every component file — no inline style objects except for dynamic values (e.g. computed width, conditional colour).
- **`Pressable`** for all touchable elements — never `TouchableOpacity` or `TouchableHighlight`.
- **`android_ripple`** on every `Pressable` that sits on a white/light surface: `{ color: 'rgba(16,185,129,0.1)', borderless: false }`.
- No third-party UI libraries — every component is built from RN primitives.
- No emoji in UI — Feather icons only.
- File structure: one component per file, named export (not default), filename matches export name.
- New screens go in the root directory alongside existing screens — no `src/` subdirectory.
- Import order: React → RN core → third-party → local (`./theme`, `./types`, `./mockData`, components).

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

### Build a Standalone APK

From CMD:

```cmd
cd android
gradlew assembleRelease
```

Output: `android\app\build\outputs\apk\release\app-release.apk`

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
