export interface Service {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  durationMin: number;
  priceSar: number;
  category: "Wellness" | "Programs" | "Care" | "Diagnostics";
  icon: string;
}

export const services: Service[] = [
  { id: 1, slug: "nutrition-support", name: "Nutrition Support", tagline: "Personalized meal guidance", description: "One-on-one nutritional assessment and a tailored eating plan built around your lifestyle, culture, and health goals.", durationMin: 45, priceSar: 250, category: "Wellness", icon: "salad" },
  { id: 2, slug: "exercise-support", name: "Exercise Support", tagline: "Move with confidence", description: "A safe, progressive movement plan designed for your fitness level, injuries, and schedule — reviewed live with your provider.", durationMin: 45, priceSar: 250, category: "Wellness", icon: "dumbbell" },
  { id: 3, slug: "sleep-support", name: "Sleep Support", tagline: "Rest that restores", description: "Evidence-based sleep assessment and coaching to resolve insomnia, poor sleep quality, and irregular sleep cycles.", durationMin: 40, priceSar: 220, category: "Wellness", icon: "moon" },
  { id: 4, slug: "stress-management", name: "Stress Management", tagline: "Calm, practical tools", description: "Learn proven techniques to reduce daily stress, build resilience, and protect your long-term health.", durationMin: 40, priceSar: 220, category: "Wellness", icon: "wind" },
  { id: 5, slug: "mental-health-support", name: "Mental Health Support", tagline: "You are not alone", description: "Confidential consultations for anxiety, low mood, and emotional wellbeing, with clear follow-up plans.", durationMin: 50, priceSar: 300, category: "Care", icon: "heart-handshake" },
  { id: 6, slug: "sexual-health-support", name: "Sexual Health Support", tagline: "Private, respectful care", description: "Discreet, judgment-free consultations covering sexual health concerns, screening advice, and treatment guidance.", durationMin: 40, priceSar: 280, category: "Care", icon: "shield-check" },
  { id: 7, slug: "hormonal-health-support", name: "Hormonal Health Support", tagline: "Balance from within", description: "Assessment of hormonal symptoms — fatigue, weight changes, mood — with lab guidance and treatment planning.", durationMin: 45, priceSar: 300, category: "Care", icon: "activity" },
  { id: 8, slug: "weight-loss-program", name: "Weight Loss Program", tagline: "Sustainable results", description: "A structured, medically supervised weight loss program with regular check-ins and measurable milestones.", durationMin: 60, priceSar: 450, category: "Programs", icon: "trending-down" },
  { id: 9, slug: "obesity-management", name: "Obesity Management", tagline: "Long-term medical care", description: "Comprehensive obesity care combining nutrition, movement, medication review, and continuous monitoring.", durationMin: 60, priceSar: 450, category: "Programs", icon: "scale" },
  { id: 10, slug: "diabetes-remission", name: "Diabetes Remission", tagline: "Take control of type 2", description: "An intensive, evidence-based program aimed at type 2 diabetes remission through lifestyle and medical management.", durationMin: 60, priceSar: 500, category: "Programs", icon: "target" },
  { id: 11, slug: "health-coaching-program", name: "Health Coaching Program", tagline: "Your goals, guided", description: "Ongoing one-on-one coaching to build lasting healthy habits, with accountability and structured follow-ups.", durationMin: 45, priceSar: 350, category: "Programs", icon: "compass" },
  { id: 12, slug: "children-healthcare", name: "Children Healthcare Support", tagline: "Gentle care for little ones", description: "Virtual consultations for common childhood concerns, growth, nutrition, and parental guidance.", durationMin: 30, priceSar: 200, category: "Care", icon: "baby" },
  { id: 13, slug: "elderly-healthcare", name: "Elderly Healthcare Support", tagline: "Dignified senior care", description: "Compassionate consultations for older adults — medication reviews, mobility, chronic conditions, and family support.", durationMin: 45, priceSar: 280, category: "Care", icon: "hand-heart" },
  { id: 14, slug: "health-investigations", name: "Health Investigations", tagline: "Answers, not guesses", description: "Review of symptoms and existing results, with guidance on which lab tests and investigations you actually need.", durationMin: 40, priceSar: 260, category: "Diagnostics", icon: "search-check" },
];

export interface Slot {
  id: number;
  date: string; // e.g. "Mon, Oct 19"
  time: string; // e.g. "09:00"
  booked: boolean;
}

export const slots: Slot[] = [
  { id: 1, date: "Mon, Oct 19", time: "09:00", booked: false },
  { id: 2, date: "Mon, Oct 19", time: "10:30", booked: true },
  { id: 3, date: "Mon, Oct 19", time: "13:00", booked: false },
  { id: 4, date: "Tue, Oct 20", time: "09:30", booked: false },
  { id: 5, date: "Tue, Oct 20", time: "11:00", booked: false },
  { id: 6, date: "Tue, Oct 20", time: "16:00", booked: true },
  { id: 7, date: "Wed, Oct 21", time: "10:00", booked: false },
  { id: 8, date: "Wed, Oct 21", time: "12:30", booked: false },
  { id: 9, date: "Thu, Oct 22", time: "09:00", booked: false },
  { id: 10, date: "Thu, Oct 22", time: "14:00", booked: false },
  { id: 11, date: "Sat, Oct 24", time: "11:00", booked: false },
  { id: 12, date: "Sun, Oct 25", time: "10:00", booked: false },
];

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id: number;
  patient: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  priceSar: number;
  meetingUrl?: string;
}

export const bookings: Booking[] = [
  { id: 1042, patient: "Sara Al-Otaibi", service: "Nutrition Support", date: "Wed, Oct 14", time: "18:00", status: "CONFIRMED", priceSar: 250, meetingUrl: "https://meet.example.com/abc-1042" },
  { id: 1041, patient: "Mohammed Al-Harbi", service: "Diabetes Remission", date: "Wed, Oct 14", time: "16:30", status: "CONFIRMED", priceSar: 500, meetingUrl: "https://meet.example.com/abc-1041" },
  { id: 1040, patient: "Noura Al-Qahtani", service: "Sleep Support", date: "Tue, Oct 13", time: "20:00", status: "COMPLETED", priceSar: 220 },
  { id: 1039, patient: "Khalid Al-Shehri", service: "Weight Loss Program", date: "Tue, Oct 13", time: "17:00", status: "COMPLETED", priceSar: 450 },
  { id: 1038, patient: "Lina Al-Dossari", service: "Mental Health Support", date: "Mon, Oct 12", time: "19:30", status: "COMPLETED", priceSar: 300 },
  { id: 1037, patient: "Fahad Al-Mutairi", service: "Health Investigations", date: "Mon, Oct 12", time: "12:00", status: "CANCELLED", priceSar: 260 },
  { id: 1036, patient: "Reem Al-Anzi", service: "Children Healthcare Support", date: "Sun, Oct 11", time: "18:30", status: "COMPLETED", priceSar: 200 },
  { id: 1035, patient: "Abdullah Al-Rashid", service: "Stress Management", date: "Sun, Oct 11", time: "10:00", status: "COMPLETED", priceSar: 220 },
];

export const patientBookings: Booking[] = [
  { id: 1042, patient: "You", service: "Nutrition Support", date: "Wed, Oct 14", time: "18:00", status: "CONFIRMED", priceSar: 250, meetingUrl: "https://meet.example.com/abc-1042" },
  { id: 1033, patient: "You", service: "Health Coaching Program", date: "Thu, Oct 8", time: "19:00", status: "COMPLETED", priceSar: 350 },
  { id: 1028, patient: "You", service: "Sleep Support", date: "Tue, Sep 29", time: "20:30", status: "COMPLETED", priceSar: 220 },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function formatSar(n: number) {
  return `${n.toLocaleString("en-US")} SAR`;
}
