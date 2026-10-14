import {
  Salad, Dumbbell, Moon, Wind, HeartHandshake, ShieldCheck, Activity,
  TrendingDown, Scale, Target, Compass, Baby, HandHeart, SearchCheck,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  salad: Salad,
  dumbbell: Dumbbell,
  moon: Moon,
  wind: Wind,
  "heart-handshake": HeartHandshake,
  "shield-check": ShieldCheck,
  activity: Activity,
  "trending-down": TrendingDown,
  scale: Scale,
  target: Target,
  compass: Compass,
  baby: Baby,
  "hand-heart": HandHeart,
  "search-check": SearchCheck,
};

export function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = map[icon] ?? Activity;
  return <Icon className={className} />;
}
