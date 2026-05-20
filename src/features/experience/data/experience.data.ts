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
      "Developing and maintaining myDishHome — a production Flutter app with 1,000+ commits and 29 active feature branches serving DishHome subscribers across Nepal.",
      "Integrated 4 payment gateways (eSewa, Khalti, FonePay, GetPay) with intent-based flows and in-app WebView checkout for seamless billing experiences.",
      "Built a Technician Ticket Tracking system with real-time horizontal stepper UI allowing subscribers to track field technician visits end-to-end.",
      "Implemented iOS Notification Service Extension for rich push notifications (images) alongside FCM token refresh for zero-drop notification delivery.",
      "Configured Firebase Crashlytics for real-time crash monitoring; reduced crash rate through systematic bug triage across 65+ fix commits.",
      "Collaborated with UI/UX designers to translate Figma designs into pixel-perfect Flutter interfaces adhering to Clean Architecture with GetX.",
    ],
    tags: ["Flutter", "GetX", "Firebase", "Clean Architecture", "Dio", "REST APIs"],
  },
  {
    id: "infocom-junior",
    role: "Junior Software Developer",
    company: "Infocom Solutions Pvt. Ltd.",
    location: "Hattisar, Nepal",
    period: "May 2023 – Dec 2025",
    current: false,
    responsibilities: [
      "Built Bizlevate — a corporate attendance and leave management Flutter app using Riverpod for state management and Hive for offline-first local caching.",
      "Developed SalesMania — a Flutter sales operations tracking app architected on MVVM, delivering pixel-perfect Figma implementations with REST API integration.",
      "Developed HG HUB — a cross-platform React Native corporate attendance app with JWT authentication and Redux state management.",
      "Translated UI/UX Figma designs into visually accurate and performant mobile interfaces for Android and iOS.",
      "Liaised directly with clients to gather requirements and deliver tailored solutions meeting project standards.",
      "Stayed current with Flutter ecosystem updates, proactively adopting new packages and best practices.",
    ],
    tags: ["Flutter", "Riverpod", "Hive", "React Native", "Redux", "JWT", "MVVM"],
  },
  {
    id: "infocom-intern",
    role: "Software Developer Intern",
    company: "Infocom Solutions Pvt. Ltd.",
    location: "Hattisar, Nepal",
    period: "Feb 2023 – May 2023",
    current: false,
    responsibilities: [
      "Gained hands-on experience in mobile and web development on real-world client projects.",
      "Developed skills in advanced ReactJS patterns and introductory React Native fundamentals.",
      "Applied Redux for centralized state management in both React and React Native applications.",
    ],
    tags: ["React", "React Native", "Redux", "JavaScript"],
  },
];
