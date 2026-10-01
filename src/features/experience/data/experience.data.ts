import type { ExperienceEntry } from "../types";

export const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    id: "dish-media",
    role: "Mobile Application Developer",
    company: "Dish Media Network Ltd.",
    location: "Karyabinayak, Nepal",
    period: "Dec 2025 – Present",
    current: true,
    responsibilities: [
      "Build and maintain myDishHome, a production Flutter app (1M+ downloads) for DishHome subscribers; 365 commits of my own, including 189 features and 89 fixes.",
      "Integrated 4 payment gateways (eSewa, Khalti, FonePay, GetPay) with intent-based flows and in-app WebView checkout.",
      "Built a Technician Ticket Tracking system with a real-time stepper so subscribers can follow field visits end to end.",
      "Implemented an iOS Notification Service Extension for rich push images, plus FCM token refresh for reliable delivery.",
      "Set up Firebase Crashlytics and drove systematic bug triage across 89 fix commits.",
      "Turned Figma designs into pixel-perfect Flutter UI on Clean Architecture with GetX.",
    ],
    tags: ["Flutter", "GetX", "Firebase", "Clean Architecture", "Dio"],
  },
  {
    id: "infocom-junior",
    role: "Junior Software Developer",
    company: "Infocom Solutions Pvt. Ltd.",
    location: "Hattisar, Nepal",
    period: "May 2023 – Dec 2025",
    current: false,
    responsibilities: [
      "Built Bizlevate, a corporate attendance & leave Flutter app, with Riverpod and offline-first Hive caching.",
      "Developed SalesMania, a sales-operations Flutter app on MVVM with REST integration and pixel-perfect Figma UI.",
      "Developed HG HUB, a React Native attendance app with JWT authentication and Redux.",
      "Translated Figma designs into accurate, performant interfaces for Android and iOS.",
      "Worked directly with clients to gather requirements and deliver tailored solutions.",
      "Kept up with the Flutter ecosystem, adopting new packages and best practices.",
    ],
    tags: ["Flutter", "Riverpod", "Hive", "React Native", "Redux"],
  },
  {
    id: "infocom-intern",
    role: "Software Developer Intern",
    company: "Infocom Solutions Pvt. Ltd.",
    location: "Hattisar, Nepal",
    period: "Feb 2023 – May 2023",
    current: false,
    responsibilities: [
      "Hands-on mobile and web development on real client projects.",
      "Advanced ReactJS patterns and React Native fundamentals.",
      "Redux for centralised state in React and React Native apps.",
    ],
    tags: ["React", "React Native", "Redux"],
  },
];
