import type { Project } from "../types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "mydishhome",
    title: "myDishHome",
    subtitle: "Customer Self-Service Mobile App",
    description:
      "Production-grade Flutter app for DishHome subscribers to manage their TV/broadband services. Features 4 integrated payment gateways, real-time technician tracking, loyalty rewards, and biometric authentication.",
    tags: ["Flutter"],
    techStack: ["Flutter", "GetX", "Dio", "Firebase Crashlytics", "FCM", "Hive", "eSewa SDK", "Khalti"],
    architecture: "Clean Architecture + GetX",
    archLayers: [
      {
        label: "Domain Layer",
        description: "Pure Dart entities, repository interfaces, and use cases — zero framework dependencies.",
      },
      {
        label: "Data Layer",
        description: "Dio-based API clients, Hive local cache adapters, and repository implementations.",
      },
      {
        label: "Presentation Layer",
        description: "GetX controllers managing reactive state, with stateless view widgets consuming Obx streams.",
      },
    ],
    metrics: [
      { label: "Total Commits", value: "1,065+" },
      { label: "Feature Branches", value: "29" },
      { label: "feat: commits", value: "128" },
      { label: "fix: commits", value: "65" },
      { label: "Payment Gateways", value: "4" },
      { label: "Refactor commits", value: "23" },
    ],
    highlights: [
      "Integrated eSewa intent-based payment flow with native SDK and POST-verified status callbacks.",
      "Built iOS Notification Service Extension for rich push notification images (FCM).",
      "Implemented biometric login with session refresh + JWT reauthorization flow for zero-logout UX.",
      "Technician Ticket Tracking with animated horizontal stepper showing real-time visit stages.",
      "Loyalty program and privilege offers with dynamic featured vendor filtering.",
      "Firebase Crashlytics configured for real-time crash monitoring in production.",
    ],
    featured: true,
  },
  {
    id: "bizlevate",
    title: "Bizlevate",
    subtitle: "Corporate Attendance & Leave Management",
    description:
      "A comprehensive Flutter mobile app for managing corporate attendance tracking and leave requests, built offline-first with Hive caching and Riverpod state management.",
    tags: ["Flutter"],
    techStack: ["Flutter", "Riverpod", "Hive", "REST APIs", "Figma"],
    architecture: "Feature-Driven + Riverpod",
    archLayers: [
      {
        label: "State Management",
        description: "Riverpod providers for reactive state — AsyncNotifier for async data, StateNotifier for UI state.",
      },
      {
        label: "Offline Cache",
        description: "Hive TypeAdapters for structured local storage enabling offline-first attendance operations.",
      },
      {
        label: "API Integration",
        description: "REST API integration with error boundary handling and cache-invalidation on sync.",
      },
    ],
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
    featured: true,
  },
  {
    id: "salesmania",
    title: "SalesMania",
    subtitle: "Sales Management Mobile Application",
    description:
      "A Flutter app to track and manage sales operations, built on MVVM architecture with Riverpod as the ViewModel layer. Delivered to client specifications with pixel-perfect Figma implementation.",
    tags: ["Flutter"],
    techStack: ["Flutter", "Riverpod", "REST APIs", "MVVM", "Figma"],
    architecture: "MVVM + Riverpod",
    archLayers: [
      {
        label: "Model",
        description: "Typed Dart data classes with JSON serialization for all sales and client entities.",
      },
      {
        label: "ViewModel",
        description: "Riverpod StateNotifier classes acting as ViewModels — pure business logic, testable.",
      },
      {
        label: "View",
        description: "Stateless Flutter widgets consuming ViewModel state via ConsumerWidget.",
      },
    ],
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
    featured: false,
  },
  {
    id: "hg-hub",
    title: "HG HUB",
    subtitle: "Corporate Attendance App (React Native)",
    description:
      "A cross-platform React Native corporate HR app with secure JWT authentication and Redux-powered state management for attendance tracking across Android and iOS.",
    tags: ["React Native"],
    techStack: ["React Native", "Redux", "JWT", "REST APIs"],
    architecture: "Redux + JWT Auth",
    archLayers: [
      {
        label: "Auth Layer",
        description: "JWT-based secure access with token storage and refresh logic for persistent sessions.",
      },
      {
        label: "Redux Store",
        description: "Centralized Redux store with slices for user, attendance, and UI state management.",
      },
      {
        label: "API Layer",
        description: "REST API integration with auth header injection via Redux middleware.",
      },
    ],
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
    featured: false,
  },
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    subtitle: "Personal Finance App (Open Source)",
    description:
      "A sophisticated personal finance Flutter app with Supabase backend, offline-first Hive storage, PDF reports, receipt OCR, recurring rules engine, bill splitting, and cross-device sync.",
    tags: ["Flutter"],
    techStack: ["Flutter", "Supabase", "PostgreSQL", "Hive", "Google Cloud Vision", "Riverpod"],
    architecture: "Clean Architecture + Supabase",
    archLayers: [
      {
        label: "Remote Data",
        description: "Supabase PostgreSQL with Row Level Security (RLS), 6 tables, triggers, and batch upsert.",
      },
      {
        label: "Local Cache",
        description: "Hive for offline-first storage with backward-compatible TypeAdapters.",
      },
      {
        label: "Domain Logic",
        description: "Recurring rules engine (biweekly/quarterly/yearly), bill split, and duplicate detection.",
      },
    ],
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
    featured: true,
  },
  {
    id: "rent-n-read",
    title: "Rent-N-Read",
    subtitle: "Book Rental Platform (Full-Stack JS)",
    description:
      "A full-stack JavaScript book rental platform built under the Ak-tsuki organization, featuring a React frontend and Node.js backend REST API for managing book listings and rentals.",
    tags: ["React", "Node.js", "JavaScript"],
    techStack: ["React", "Node.js", "JavaScript", "REST APIs"],
    architecture: "Full-Stack MVC",
    archLayers: [
      {
        label: "Frontend",
        description: "React SPA with component-based architecture for book browsing and rental management.",
      },
      {
        label: "Backend",
        description: "Node.js REST API handling authentication, book inventory, and rental transactions.",
      },
      {
        label: "Data",
        description: "Structured data layer for book listings, user accounts, and rental history.",
      },
    ],
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
    featured: false,
    githubUrl: "https://github.com/Ak-tsuki",
  },
];

export const FEATURED_PROJECTS = PROJECTS_DATA.filter((p) => p.featured);
export const ALL_PROJECT_TAGS = [...new Set(PROJECTS_DATA.flatMap((p) => p.tags))];
