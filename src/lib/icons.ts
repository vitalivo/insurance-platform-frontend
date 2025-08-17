import {
  Car,
  Truck,
  Bike,
  Plane,
  Ship,
  Home,
  Building,
  Building2,
  Warehouse,
  Heart,
  Activity,
  Cross,
  Stethoscope,
  Pill,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Umbrella,
  User,
  Users,
  UserCheck,
  Baby,
  Briefcase,
  DollarSign,
  CreditCard,
  TrendingUp,
  Calculator,
  MapPin,
  Compass,
  Camera,
  Luggage,
  AlertTriangle,
  AlertCircle,
  Zap,
  Flame,
  TreePine,
  Flower,
  Dog,
  Star,
  Check,
  CheckCircle,
  Plus,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  // === ТРАНСПОРТ ===
  car: Car, // 🚗 ОСАГО, КАСКО
  truck: Truck, // 🚛 Грузовой транспорт
  bike: Bike, // 🚲 Велосипеды, мотоциклы
  plane: Plane, // ✈️ Авиация
  ship: Ship, // 🚢 Водный транспорт

  // === НЕДВИЖИМОСТЬ ===
  home: Home, // 🏠 Квартиры, дома
  building: Building, // 🏢 Коммерческая недвижимость
  building2: Building2, // 🏬 Офисы, магазины
  warehouse: Warehouse, // 🏭 Склады, производство

  // === ЗДОРОВЬЕ ===
  heart: Heart, // ❤️ Жизнь и здоровье
  "heart-pulse": Activity, // 💓 Несчастный случай
  cross: Cross, // ⛑️ Медицинское страхование
  stethoscope: Stethoscope, // 🩺 ДМС
  pill: Pill, // 💊 Лекарственное страхование

  // === ЗАЩИТА ===
  shield: Shield, // 🛡️ Общая защита
  "shield-check": ShieldCheck, // ✅ Гарантированная защита
  "shield-alert": ShieldAlert, // ⚠️ Критические риски
  lock: Lock, // 🔒 Безопасность
  umbrella: Umbrella, // ☂️ Комплексная защита

  // === ЛЮДИ ===
  user: User, // 👤 Личное страхование
  users: Users, // 👥 Семейное страхование
  "user-check": UserCheck, // ✅ Проверенный клиент
  baby: Baby, // 👶 Детское страхование

  // === БИЗНЕС ===
  briefcase: Briefcase, // 💼 Бизнес-страхование
  "dollar-sign": DollarSign, // 💰 Финансовые риски
  "credit-card": CreditCard, // 💳 Банковское страхование
  "trending-up": TrendingUp, // 📈 Инвестиционное страхование
  calculator: Calculator, // 🧮 Расчет премий

  // === ПУТЕШЕСТВИЯ ===
  "map-pin": MapPin, // 📍 Туристическое страхование
  compass: Compass, // 🧭 Путешествия
  camera: Camera, // 📷 Страхование техники
  luggage: Luggage, // 🧳 Багаж

  // === РИСКИ ===
  "alert-triangle": AlertTriangle, // ⚠️ Высокие риски
  "alert-circle": AlertCircle, // 🔴 Критические случаи
  zap: Zap, // ⚡ Стихийные бедствия
  flame: Flame, // 🔥 Пожарное страхование

  // === ПРИРОДА ===
  "tree-pine": TreePine, // 🌲 Экологическое страхование
  flower: Flower, // 🌸 Сельхозстрахование
  dog: Dog, // 🐕 Страхование животных

  // === ОБЩИЕ ===
  star: Star, // ⭐ Премиум продукты
  check: Check, // ✅ Одобрено
  "check-circle": CheckCircle, // ✅ Подтверждено
  plus: Plus, // ➕ Дополнительные услуги

  // === УСТАРЕВШИЕ (для совместимости) ===
  bug: Shield, // Заменяем на shield
}

export function getProductIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Shield
}
