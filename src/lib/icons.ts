import {
  Car,
  Shield,
  Home,
  Heart,
  Building,
  Bug,
  Activity,
  AlertTriangle,
  Cross,
  UserCheck,
  Zap,
  Umbrella,
  Plane,
  Users,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  // Существующие
  car: Car,
  shield: Shield,
  home: Home,
  "heart-pulse": Heart,
  building: Building,
  bug: Bug,

  // Новые для страхования
  activity: Activity, // пульс/активность
  "alert-triangle": AlertTriangle, // предупреждение
  cross: Cross, // медицинский крест
  "user-check": UserCheck, // проверенный пользователь
  zap: Zap, // молния (быстро)
  umbrella: Umbrella, // зонт (защита)
  plane: Plane, // самолет (путешествия)
  users: Users, // люди (семья)
}

export function getProductIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Shield
}
