import { Car, Shield, Home, Heart, Building, Bug, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  car: Car,
  shield: Shield,
  home: Home,
  "heart-pulse": Heart,
  building: Building,
  bug: Bug,
}

export function getProductIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Shield
}
