import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 секунд таймаут
})

// Добавляем интерсептор для логирования запросов
api.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers,
    })
    return config
  },
  (error) => {
    console.error("❌ API Request Error:", error)
    return Promise.reject(error)
  },
)

// Добавляем интерсептор для логирования ответов
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      status: response.status,
      data: response.data,
      url: response.config.url,
    })
    return response
  },
  (error) => {
    console.error("❌ API Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    })
    return Promise.reject(error)
  },
)

// Types
export interface Product {
  id: number
  name: string
  slug: string
  product_type: string
  description: string
  short_description: string
  icon: string
  is_featured: boolean
  fields?: ProductField[]

  // Новые поля для управления отображением
  button_text?: string
  card_background_color?: string
  icon_background_color?: string

  // Дополнительная информация
  benefits?: string[] | string | null // Изменено для поддержки разных типов
  price_range?: string
  processing_time?: string

  // SEO поля
  meta_title?: string
  meta_description?: string
}

export interface ProductField {
  id: number
  name: string
  field_type: "text" | "email" | "phone" | "number" | "date" | "select" | "checkbox" | "textarea"
  label: string
  placeholder: string
  is_required: boolean
  validation_rules: Record<string, any>
  options: string[]
  sort_order: number
}

export interface ApplicationStatus {
  id: number
  name: string
  color: string
  description: string
}

export interface Application {
  id: number
  application_number: string
  product: Product
  status: ApplicationStatus
  full_name: string
  phone: string
  email: string
  form_data: Record<string, any>
  admin_comment: string
  created_at: string
  processed_at: string | null
}

export interface CreateApplicationData {
  product: number
  full_name: string
  phone: string
  email: string
  form_data: Record<string, any>
}

// Новые интерфейсы для управления контентом
export interface PageContent {
  id: number
  page_name: string
  section_name: string
  content_key: string
  content_value: string
  content_type: "text" | "html" | "number" | "boolean"
}

export interface SiteSettings {
  id: number
  products_per_row_desktop: number
  products_per_row_tablet: number
  products_per_row_mobile: number
  products_sort_by: "sort_order" | "name" | "created_at"
  show_featured_first: boolean
}

// Интерфейс для пагинированного ответа Django
interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// API functions
export const productsApi = {
  // Все продукты (с сортировкой по настройкам)
  getAll: async () => {
    const response = await api.get<PaginatedResponse<Product>>("/products/")
    return { ...response, data: response.data.results }
  },

  // Детальная информация о продукте
  getBySlug: (slug: string) => api.get<Product>(`/products/${slug}/`),

  // Продукты для карточек на главной странице
  getCards: async () => {
    const response = await api.get<PaginatedResponse<Product>>("/products-cards/")
    return { ...response, data: response.data.results }
  },

  // Только рекомендуемые продукты
  getFeatured: async () => {
    const response = await api.get<Product[]>("/featured-products/")
    return response
  },

  // SEO данные продукта
  getSEO: (slug: string) =>
    api.get<Pick<Product, "meta_title" | "meta_description" | "name" | "description">>(`/products/${slug}/seo/`),
}

export const applicationsApi = {
  create: async (data: CreateApplicationData) => {
    console.log("📝 Создание заявки:", data)
    try {
      const response = await api.post<Application>("/applications/", data)
      console.log("✅ Заявка создана:", response.data)
      return response
    } catch (error: any) {
      console.error("❌ Ошибка создания заявки:", error)
      throw error
    }
  },
  getByNumber: (number: string) => api.get<Application>(`/applications/${number}/`),
}

export const statusesApi = {
  getAll: async () => {
    const response = await api.get<PaginatedResponse<ApplicationStatus>>("/statuses/")
    return { ...response, data: response.data.results }
  },
}

// Новые API для управления контентом
export const contentApi = {
  // Получить контент страницы
  getPageContent: (pageName?: string) => {
    const url = pageName ? `/page-content/?page=${pageName}` : "/page-content/"
    return api.get<PageContent[]>(url)
  },

  // Получить настройки сайта
  getSiteSettings: () => api.get<SiteSettings>("/site-settings/"),
}
