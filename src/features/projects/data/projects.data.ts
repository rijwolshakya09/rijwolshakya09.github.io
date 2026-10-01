import type { Project, ProjectTier } from "../types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "mydishhome",
    title: "myDishHome",
    subtitle: "Customer Self-Service Mobile App",
    description:
      "Production-grade Flutter app for DishHome subscribers to manage their TV/broadband services. Features 4 integrated payment gateways, real-time technician tracking, loyalty rewards, and biometric authentication.",
    techStack: ["Flutter", "GetX", "Dio", "Firebase Crashlytics", "FCM", "Hive", "eSewa SDK", "Khalti"],
    architecture: "Clean Architecture + GetX",
    // Personal figures from dmn-customer-mobile-app, all refs, merge commits excluded (measured 2026-10-01):
    //   git rev-list --all --no-merges --author='rijwol.shakya@dishhome.com.np' --count
    //   git log --all --no-merges --author='rijwol.shakya@dishhome.com.np' --format=%s | grep -ciE '^feat(\(.*\))?!?:'
    //   (same grep with fix / refactor)
    metrics: [
      { label: "Commits", value: "365" },
      { label: "Features", value: "189" },
      { label: "Fixes", value: "89" },
      { label: "Refactors", value: "29" },
      { label: "Payment gateways", value: "4" },
      { label: "Active", value: "Since Jan 2026" },
    ],
    highlights: [
      "Integrated four payment gateways — eSewa, Khalti, FonePay and GetPay — with intent-based flows and in-app checkout.",
      "Built iOS Notification Service Extension for rich push notification images (FCM).",
      "Implemented biometric login with session refresh + JWT reauthorization flow for zero-logout UX.",
      "Technician Ticket Tracking with animated horizontal stepper showing real-time visit stages.",
      "Loyalty program and privilege offers with dynamic featured vendor filtering.",
      "Firebase Crashlytics configured for real-time crash monitoring in production.",
    ],
    tier: "case-study",
  },
  {
    id: "bizlevate",
    title: "Bizlevate",
    subtitle: "Corporate Attendance & Leave Management",
    description:
      "A comprehensive Flutter mobile app for managing corporate attendance tracking and leave requests, built offline-first with Hive caching and Riverpod state management.",
    techStack: ["Flutter", "Riverpod", "Hive", "REST APIs", "Figma"],
    architecture: "Feature-Driven + Riverpod",
    metrics: [
      { label: "State Solution", value: "Riverpod" },
      { label: "Offline Cache", value: "Hive DB" },
      { label: "Platform", value: "Android + iOS" },
      { label: "Data Strategy", value: "Offline-First" },
    ],
    highlights: [
      "Hive Database for efficient offline caching — attendance works without network connectivity.",
      "Flutter Riverpod providers cleanly separate business logic from UI.",
      "Pixel-perfect Figma implementation for corporate HR workflows.",
      "RESTful API integration for backend sync of leave requests and approvals.",
    ],
    tier: "featured",
  },
  {
    id: "salesmania",
    title: "SalesMania",
    subtitle: "Sales Management Mobile Application",
    description:
      "A Flutter app to track and manage sales operations, built on MVVM architecture with Riverpod as the ViewModel layer. Delivered to client specifications with pixel-perfect Figma implementation.",
    techStack: ["Flutter", "Riverpod", "REST APIs", "MVVM", "Figma"],
    architecture: "MVVM + Riverpod",
    metrics: [
      { label: "Architecture", value: "MVVM" },
      { label: "State Layer", value: "Riverpod" },
      { label: "Platform", value: "Android + iOS" },
      { label: "Design Source", value: "Figma" },
    ],
    highlights: [
      "MVVM architecture ensuring clean separation of UI and business logic.",
      "Riverpod providers as ViewModels for testable, reactive sales data.",
      "REST API integration for real-time sales data exchange.",
      "Proactive bug identification and resolution to maintain application stability.",
    ],
    tier: "compact",
  },
  {
    id: "hg-hub",
    title: "HG HUB",
    subtitle: "Corporate Attendance App (React Native)",
    description:
      "A cross-platform React Native corporate HR app with secure JWT authentication and Redux-powered state management for attendance tracking across Android and iOS.",
    techStack: ["React Native", "Redux", "JWT", "REST APIs"],
    architecture: "Redux + JWT Auth",
    metrics: [
      { label: "Framework", value: "React Native" },
      { label: "Auth", value: "JWT" },
      { label: "State", value: "Redux" },
      { label: "Platform", value: "Cross-Platform" },
    ],
    highlights: [
      "JWT authentication for secure, role-based user access across the organization.",
      "React Redux for centralized and predictable state management.",
      "REST API integration for real-time attendance data sync.",
      "Cross-platform delivery for both Android and iOS from a single codebase.",
    ],
    tier: "compact",
  },
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    subtitle: "Personal Finance App (Open Source)",
    description:
      "A sophisticated personal finance Flutter app with Supabase backend, offline-first Hive storage, PDF reports, receipt OCR, recurring rules engine, bill splitting, and cross-device sync.",
    techStack: ["Flutter", "Supabase", "PostgreSQL", "Hive", "Google Cloud Vision", "Riverpod"],
    architecture: "Clean Architecture + Supabase",
    metrics: [
      { label: "DB Tables", value: "6 (RLS)" },
      { label: "Unit Tests", value: "36+" },
      { label: "Commit Depth", value: "50+" },
      { label: "Export Formats", value: "PDF + Sheets" },
    ],
    highlights: [
      "Supabase PostgreSQL with RLS, triggers, and indexed queries for multi-user security.",
      "Google Cloud Vision OCR for automatic receipt scanning and transaction creation.",
      "Recurring rules engine supporting biweekly, quarterly, and yearly schedules.",
      "PDF financial report generation and Google Sheets CSV export.",
      "Cross-device sync via batch upsert with conflict resolution.",
      "36+ unit and integration tests including golden tests for UI components.",
    ],
    tier: "featured",
  },
  {
    id: "rent-n-read",
    title: "Rent-N-Read",
    subtitle: "Book Rental Platform (Full-Stack JS)",
    description:
      "A full-stack JavaScript book rental platform built under the Ak-tsuki organization, featuring a React frontend and Node.js backend REST API for managing book listings and rentals.",
    techStack: ["React", "Node.js", "JavaScript", "REST APIs"],
    architecture: "Full-Stack MVC",
    metrics: [
      { label: "Frontend", value: "React" },
      { label: "Backend", value: "Node.js" },
      { label: "GitHub Stars", value: "2" },
      { label: "Org", value: "Ak-tsuki" },
    ],
    highlights: [
      "Full-stack JavaScript implementation demonstrating breadth beyond mobile development.",
      "React frontend SPA with component-based UI for book discovery and rentals.",
      "Node.js REST API backend for inventory, user management, and transaction handling.",
      "Published under the Ak-tsuki GitHub organization with collaborative workflow.",
    ],
    tier: "compact",
    githubUrl: "https://github.com/Ak-tsuki",
  },
];

export function projectsByTier(tier: ProjectTier): Project[] {
  return PROJECTS_DATA.filter((p) => p.tier === tier);
}
