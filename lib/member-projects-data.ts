import { Store, MessageSquare, BarChart } from "lucide-react";

export const memberProjectsData = [
  {
    id: 4,
    name: "RationUndo",
    author: "Jithin JZ",
    description: "A free website to easily check stock details in Kerala ration shops using pincode, place name, or shop number.",
    stats: { stars: 0, forks: 0 },
    icon: Store,
    windowColor: "bg-[#FF8C42]", // Orange
    pillColor: "bg-[#42A5F5]", // Blue
    link: "https://rationundo.onrender.com",
    github: "https://github.com/jithin-jz",
    email: "jithinjzx@gmail.com"
  },
  {
    id: 5,
    name: "Parathipetty",
    author: "Muhammed Roshan",
    description: "Kerala's public complaint box, on WhatsApp",
    stats: { stars: 0, forks: 0 },
    icon: MessageSquare,
    windowColor: "bg-[#A18CE5]", // Purple
    pillColor: "bg-[#FFD166]", // Yellow
    link: "https://Parathipetty.com",
    email: "muhammedroshanps@gmail.com"
  },
  {
    id: 6,
    name: "Kerala Polling",
    author: "Rishnu",
    description: "A web-based election opinion poll for Kerala.",
    stats: { stars: 0, forks: 0 },
    icon: BarChart,
    windowColor: "bg-[#4CAF50]", // Green
    pillColor: "bg-[#E91E63]", // Pink
    link: "https://kerala-polling.rishnu.xyz/",
    email: "rishnudev@gmail.com"
  }
];

export type MemberProject = (typeof memberProjectsData)[number];
