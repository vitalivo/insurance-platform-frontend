"use client"

import { useQuery } from "@tanstack/react-query"
import { contentApi } from "@/lib/api"
import { PageContent } from "@/lib/api" // Импортируем тип PageContent

/**
 * Хук для получения контента страницы из админки.
 * @param pageName Название страницы (например, 'footer', 'home', 'products').
 * @returns Объект запроса React Query с данными PageContent[].
 */
export function usePageContent(pageName: string) {
  return useQuery<PageContent[], Error>({
    queryKey: ["pageContent", pageName],
    queryFn: async () => {
      const response = await contentApi.getPageContent(pageName)
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    // Добавляем select для преобразования массива в удобный объект
    // Это позволит легко получать контент по section_name и content_key
    select: (data) => {
      const contentMap: Record<string, Record<string, string>> = {}
      data.forEach(item => {
        if (!contentMap[item.section_name]) {
          contentMap[item.section_name] = {}
        }
        contentMap[item.section_name][item.content_key] = item.content_value
      })
      return contentMap as any // Приводим к any, так как точный тип будет динамическим
    },
  })
}
