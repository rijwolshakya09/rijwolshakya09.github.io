import type { Project, ProjectId } from "../types";

const shots = (id: ProjectId, n: number) => Array.from({ length: n }, (_, i) => `/apps/${id}/shot-${i + 1}.webp`);

export const PROJECTS: Project[] = [
  {
    id: "mydishhome",
    title: "myDishHome",
    subtitle: "Customer self-service app · Flutter",
    category: "Production · Flutter",
    tier: "feature",
    icon: "/apps/mydishhome/icon.webp",
    cardDescription:
      "Production Flutter app for DishHome subscribers to manage TV and broadband: four payment gateways, real-time technician tracking, loyalty rewards and biometric login.",
    cardTags: ["Flutter", "GetX", "Firebase", "FCM"],
    overview:
      "myDishHome is the official self-service app for DishHome, one of Nepal's largest TV and broadband providers. Subscribers use it to view and pay bills, open and track support tickets, follow technician visits live, manage Wi-Fi and connected devices, and redeem loyalty offers. I build and maintain features end to end on a Clean Architecture codebase with GetX.",
    stores: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.shirantech.dishhome" },
      { kind: "appstore", url: "https://apps.apple.com/np/app/mydishhome/id1396471022" },
    ],
    info: [
      { label: "Platform", value: "Android & iOS" },
      { label: "Category", value: "Entertainment · Utilities" },
      { label: "Company", value: "Dish Media Network" },
      { label: "My role", value: "Mobile Application Developer" },
      { label: "Timeline", value: "Dec 2025 – present" },
      { label: "Downloads", value: "1M+ on Google Play" },
      { label: "Latest version", value: "5.14.2" },
      { label: "Minimum OS", value: "iOS 15.0 · Android 5.0+" },
      { label: "App size", value: "126 MB" },
    ],
    features: [
      "Bill history & instant online payment",
      "eSewa, Khalti, FonePay & GetPay checkout",
      "Live technician ticket tracking",
      "Rich push notifications with images",
      "Wi-Fi password & device management",
      "Loyalty & privilege offers",
      "Biometric login",
      "Subscription status for Internet, iTV & DTH",
    ],
    architecture: [
      { label: "Domain layer", description: "Pure Dart entities, repository interfaces and use cases, with zero framework dependencies" },
      { label: "Data layer", description: "Dio API clients, Hive cache adapters and repository implementations" },
      { label: "Presentation layer", description: "GetX controllers with reactive state; stateless widgets consume Obx streams" },
    ],
    // Personal figures from dmn-customer-mobile-app, all refs, merge commits excluded (measured 2026-10-01):
    //   git rev-list --all --no-merges --author='rijwol.shakya@dishhome.com.np' --count
    //   git log --all --no-merges --author='rijwol.shakya@dishhome.com.np' --format=%s | grep -ciE '^feat(\(.*\))?!?:'
    //   (same grep with fix / refactor)
    metrics: [
      { value: "365", label: "my commits" },
      { value: "189", label: "features" },
      { value: "89", label: "fixes" },
      { value: "29", label: "refactors" },
    ],
    contributions: [
      "Integrated four payment gateways with intent-based flows, native SDKs and POST-verified status callbacks",
      "Built the Technician Ticket Tracking stepper showing real-time visit stages",
      "Implemented an iOS Notification Service Extension for rich push, plus FCM token refresh",
      "Built biometric login with session refresh and JWT re-authorisation for zero-logout UX",
      "Set up Firebase Crashlytics and drove crash triage across 89 fix commits",
    ],
    techStack: ["Flutter", "Dart", "GetX", "Dio", "Hive", "Firebase Crashlytics", "FCM", "eSewa SDK", "Khalti"],
    screenshots: shots("mydishhome", 4),
    feature: {
      eyebrow: "Production · Flutter · 1M+ downloads",
      highlights: [
        "eSewa, Khalti, FonePay & GetPay with intent flows and in-app checkout",
        "Technician ticket tracking with a live stepper",
        "iOS Notification Service Extension for rich push + FCM token refresh",
        "Biometric login with session refresh and JWT re-authorisation",
        "Loyalty & privilege offers, Crashlytics monitoring",
      ],
      archShort: [
        { label: "Domain", description: "entities, use cases" },
        { label: "Data", description: "Dio, Hive, repositories" },
        { label: "Presentation", description: "GetX controllers" },
      ],
    },
  },
  {
    id: "bizlevate",
    title: "Bizlevate",
    subtitle: "Corporate attendance & leave management · Flutter",
    category: "Attendance & leave · Flutter",
    tier: "card",
    icon: "/apps/bizlevate/icon.webp",
    cardDescription:
      "Offline-first corporate attendance and leave management, with Riverpod state and Hive caching so check-ins work without a network.",
    cardTags: ["Riverpod", "Hive", "REST"],
    overview:
      "Bizlevate is a corporate HR app that lets employees check in and out, apply for leave, follow approvals and see company holidays from their phone. It's built offline-first: attendance is cached locally with Hive and syncs when the connection returns, so field staff never lose a check-in. Riverpod keeps business logic out of the UI.",
    stores: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.ispl.bizlevate" },
      { kind: "appstore", url: "https://apps.apple.com/np/app/bizlevate/id6760984023" },
    ],
    info: [
      { label: "Platform", value: "Android & iOS" },
      { label: "Category", value: "Business · HR" },
      { label: "Company", value: "Infocom Solutions" },
      { label: "My role", value: "Flutter developer" },
      { label: "Timeline", value: "2023 – 2025" },
      { label: "Latest version", value: "3.0.2" },
      { label: "Minimum OS", value: "iOS 12.1" },
      { label: "App size", value: "64 MB" },
      { label: "Architecture", value: "Feature-driven" },
    ],
    features: [
      "One-tap check-in / check-out",
      "Leave requests & approval tracking",
      "Holiday calendar",
      "Approval notifications with unread filter",
      "Monthly attendance report",
      "Works offline, syncs automatically",
    ],
    architecture: [
      { label: "State management", description: "Riverpod AsyncNotifier for async data, StateNotifier for UI state" },
      { label: "Offline cache", description: "Hive TypeAdapters for structured local storage" },
      { label: "API integration", description: "REST with error boundaries & cache invalidation on sync" },
    ],
    metrics: [
      { value: "Riverpod", label: "state" },
      { value: "Hive DB", label: "offline cache" },
      { value: "2 OS", label: "Android + iOS" },
      { value: "Offline", label: "first" },
    ],
    contributions: [
      "Built the attendance and leave flows end to end, from Figma to store release",
      "Designed the Hive caching layer so check-ins work without connectivity",
      "Separated business logic into Riverpod providers for testability",
      "Integrated REST APIs for leave sync, approvals and notifications",
    ],
    techStack: ["Flutter", "Dart", "Riverpod", "Hive", "REST APIs", "Figma"],
    screenshots: shots("bizlevate", 4),
  },
  {
    id: "salesmania",
    title: "SalesMania",
    subtitle: "Sales operations app · Flutter",
    category: "Sales operations · Flutter",
    tier: "card",
    icon: "/apps/salesmania/icon.webp",
    cardDescription:
      "Sales team tracking app built on MVVM, with Riverpod view models and pixel-perfect Figma implementation, released on both stores.",
    cardTags: ["MVVM", "Riverpod", "Figma"],
    overview:
      "SalesMania (SalesManiaHD on the stores) helps field sales teams manage their day: attendance, requests, approvals and sales activity in one app. It's built on MVVM, with Riverpod as the view-model layer and pixel-perfect screens from the client's Figma designs.",
    stores: [
      { kind: "play", url: "https://play.google.com/store/apps/details?id=com.ispl.ps360flutter" },
      { kind: "appstore", url: "https://apps.apple.com/np/app/salesmaniahd/id6760572812" },
    ],
    info: [
      { label: "Platform", value: "Android & iOS" },
      { label: "Category", value: "Business" },
      { label: "Company", value: "Infocom Solutions" },
      { label: "My role", value: "Flutter developer" },
      { label: "Timeline", value: "2023 – 2025" },
      { label: "Latest version", value: "2.4.7" },
      { label: "Minimum OS", value: "iOS 15.0" },
      { label: "App size", value: "64 MB" },
      { label: "Architecture", value: "MVVM" },
    ],
    features: [
      "Field staff check-in with live status",
      "Leave & request workflows",
      "Approval lists with status filters",
      "Self-service dashboard",
      "Reports & summaries",
      "Pixel-perfect client branding",
    ],
    architecture: [
      { label: "Model", description: "Typed Dart data classes with JSON serialisation for sales and client entities" },
      { label: "ViewModel", description: "Riverpod StateNotifier classes: pure, testable business logic" },
      { label: "View", description: "Stateless widgets consuming view-model state via ConsumerWidget" },
    ],
    metrics: [
      { value: "MVVM", label: "architecture" },
      { value: "Riverpod", label: "state layer" },
      { value: "2 OS", label: "Android + iOS" },
      { value: "Figma", label: "design source" },
    ],
    contributions: [
      "Architected the app on MVVM for a clean UI / logic split",
      "Built Riverpod view models for reactive, testable sales data",
      "Integrated REST APIs for real-time data exchange",
      "Found and fixed stability issues before releases",
    ],
    techStack: ["Flutter", "Dart", "Riverpod", "REST APIs", "MVVM", "Figma"],
    screenshots: shots("salesmania", 4),
  },
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    subtitle: "Personal finance app · Flutter",
    category: "Personal finance · Flutter",
    tier: "card",
    icon: "/apps/finance-tracker/icon.webp",
    cardDescription: "Supabase-backed finance app with receipt OCR, a recurring-rules engine, bill splitting, PDF reports and cross-device sync.",
    cardTags: ["Supabase", "OCR", "36+ tests"],
    overview:
      "A personal finance app I designed and built myself. It tracks income and spending across devices with a Supabase backend and offline-first Hive storage, scans receipts with OCR, automates recurring transactions, splits bills, and exports PDF reports and Google Sheets.",
    stores: [{ kind: "play", url: "https://play.google.com/store/apps/details?id=com.rijwolshakya.financetracker" }],
    info: [
      { label: "Platform", value: "Android" },
      { label: "Category", value: "Finance" },
      { label: "Type", value: "Personal project" },
      { label: "My role", value: "Solo developer & designer" },
      { label: "Backend", value: "Supabase (PostgreSQL + RLS)" },
      { label: "Tests", value: "36+ unit & golden" },
      { label: "Store", value: "Google Play" },
      { label: "Sync", value: "Cross-device" },
      { label: "Architecture", value: "Clean Architecture" },
    ],
    features: [
      "Smart dashboard with your full financial picture",
      "Receipt scanning with Google Cloud Vision OCR",
      "Recurring rules: biweekly, quarterly, yearly",
      "Bill splitting & duplicate detection",
      "Deep analytics & charts",
      "PDF reports and Google Sheets export",
    ],
    architecture: [
      { label: "Remote data", description: "Supabase PostgreSQL with Row Level Security, 6 tables, triggers and batch upsert" },
      { label: "Local cache", description: "Hive for offline-first storage with backward-compatible adapters" },
      { label: "Domain logic", description: "Recurring rules engine, bill split and duplicate detection" },
    ],
    metrics: [
      { value: "6", label: "DB tables (RLS)" },
      { value: "36+", label: "tests" },
      { value: "PDF", label: "+ Sheets export" },
      { value: "OCR", label: "receipts" },
    ],
    contributions: [
      "Designed the product, UI and data model from scratch",
      "Built cross-device sync with batch upsert and conflict resolution",
      "Added OCR receipt scanning that creates transactions automatically",
      "Wrote 36+ unit, integration and golden tests",
    ],
    techStack: ["Flutter", "Dart", "Riverpod", "Supabase", "PostgreSQL", "Hive", "Google Cloud Vision"],
    screenshots: shots("finance-tracker", 3),
  },
  {
    id: "hg-hub",
    title: "HG HUB",
    subtitle: "Corporate attendance app · React Native",
    category: "Attendance · React Native",
    tier: "card",
    monogram: "HG",
    cardDescription: "Cross-platform HR app with JWT authentication and a Redux store for attendance tracking on Android and iOS.",
    cardTags: ["React Native", "Redux", "JWT"],
    overview:
      "A cross-platform HR app for corporate attendance, built with React Native. JWT authentication secures role-based access, and a Redux store keeps user, attendance and UI state predictable across Android and iOS.",
    stores: [],
    statusNote: "Internal release",
    info: [
      { label: "Platform", value: "Android & iOS" },
      { label: "Framework", value: "React Native" },
      { label: "Company", value: "Infocom Solutions" },
      { label: "My role", value: "React Native developer" },
      { label: "Timeline", value: "2023 – 2025" },
      { label: "Status", value: "Internal release" },
    ],
    features: ["Secure JWT login with token refresh", "Role-based access", "Attendance tracking", "Real-time sync with backend"],
    architecture: [
      { label: "Auth layer", description: "JWT access with token storage and refresh for persistent sessions" },
      { label: "Redux store", description: "Slices for user, attendance and UI state" },
      { label: "API layer", description: "REST with auth headers injected by Redux middleware" },
    ],
    metrics: [
      { value: "RN", label: "framework" },
      { value: "JWT", label: "auth" },
      { value: "Redux", label: "state" },
      { value: "2 OS", label: "one codebase" },
    ],
    contributions: [
      "Built the app from a single React Native codebase for both platforms",
      "Implemented JWT auth with refresh logic",
      "Structured state with Redux slices and middleware",
    ],
    techStack: ["React Native", "Redux", "JWT", "REST APIs"],
    screenshots: [],
  },
  {
    id: "rent-n-read",
    title: "Rent-N-Read",
    subtitle: "Book rental platform · React + Node.js",
    category: "Book rental · React + Node.js",
    tier: "card",
    monogram: "RR",
    cardDescription: "Full-stack book rental platform with a React SPA and a Node.js REST API for inventory, users and rentals.",
    cardTags: ["React", "Node.js", "REST"],
    overview:
      "A full-stack book rental platform built with my team in the Ak-tsuki GitHub organisation: a React single-page app for browsing and renting books, and a Node.js REST API for inventory, users and rental transactions.",
    stores: [{ kind: "github", url: "https://github.com/Ak-tsuki" }],
    info: [
      { label: "Type", value: "Full-stack web app" },
      { label: "Frontend", value: "React SPA" },
      { label: "Backend", value: "Node.js REST API" },
      { label: "Team", value: "Ak-tsuki organisation" },
      { label: "Stars", value: "2 on GitHub" },
      { label: "Source", value: "Open on GitHub" },
    ],
    features: ["Browse & search books", "Rent and return flow", "User accounts", "Inventory management"],
    architecture: [
      { label: "Frontend", description: "React SPA with component-based architecture" },
      { label: "Backend", description: "Node.js REST API for auth, inventory and transactions" },
      { label: "Data", description: "Structured data for listings, users and rental history" },
    ],
    metrics: [
      { value: "React", label: "frontend" },
      { value: "Node.js", label: "backend" },
      { value: "REST", label: "API" },
      { value: "Team", label: "collab" },
    ],
    contributions: ["Built frontend features in React", "Contributed to the Node.js API", "Worked in a collaborative Git workflow"],
    techStack: ["React", "Node.js", "JavaScript", "REST APIs"],
    screenshots: [],
  },
];

export function getProject(id: ProjectId): Project {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown project: ${id}`);
  return p;
}

export const FEATURE_PROJECT: Project = getProject("mydishhome");
export const CARD_PROJECTS: Project[] = PROJECTS.filter((p) => p.tier === "card");
