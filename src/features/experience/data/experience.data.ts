import type { ExperienceEntry } from "../types";

export const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    id: "dish-media",
    version: "v3.0",
    role: "Mobile Application Developer",
    company: "Dish Media Network Ltd.",
    location: "Karyabinayak, Nepal",
    period: "Dec 2025 – Present",
    current: true,
    responsibilities: [
      "Building and maintaining myDishHome, a production Flutter app serving DishHome subscribers across Nepal, where I've authored 365 commits — 189 features and 89 fixes.",
      "Integrated four payment gateways — eSewa, Khalti, FonePay and GetPay — with intent-based flows and in-app checkout.",
      "Built technician ticket tracking with a live stepper so subscribers can follow a field visit end to end.",
      "Added rich push via an iOS Notification Service Extension with FCM token refresh, and set up Firebase Crashlytics for production monitoring.",
    ],
    tags: ["Flutter", "GetX", "Firebase", "Clean Architecture", "Dio", "REST APIs"],
  },
  {
    id: "infocom-junior",
    version: "v2.0",
    role: "Junior Software Developer",
    company: "Infocom Solutions Pvt. Ltd.",
    location: "Hattisar, Nepal",
    period: "May 2023 – Dec 2025",
    current: false,
    responsibilities: [
      "Built Bizlevate, a Flutter attendance and leave app using Riverpod and Hive for offline-first caching.",
      "Developed SalesMania, a Flutter sales-operations app on MVVM with REST API integration.",
      "Developed HG HUB, a React Native attendance app with JWT authentication and Redux.",
      "Worked directly with clients to gather requirements and turn Figma designs into Android and iOS interfaces.",
    ],
    tags: ["Flutter", "Riverpod", "Hive", "React Native", "Redux", "JWT", "MVVM"],
  },
  {
    id: "infocom-intern",
    version: "v1.0",
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
