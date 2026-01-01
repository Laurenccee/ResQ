export interface Slide {
  id: string;
  title: string;
  description: string;
}

export const slides: Slide[] = [
  {
    id: "1",
    title: "Always Ready in an Emergency",
    description:
      "A simple safety alert system designed to protect children anytime, anywhere. One action is all it takes to ask for help.",
  },
  {
    id: "2",
    title: "Instant Alerts to Parents",
    description:
      "Automatically send SMS and phone calls to parents and guardians the moment an emergency is triggered—no delays, no confusion.",
  },
  {
    id: "3",
    title: "Real-Time Location Tracking",
    description:
      "Parents can track the child’s location through GPS, giving peace of mind and faster response when it matters most.",
  },
  {
    id: "4",
    title: "Shake to Call for Help",
    description:
      "In danger? Just shake the phone. The app instantly activates emergency alerts even when it’s hard to tap or speak.",
  },
];
