import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { contentApi } from "@/lib/api"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Маппинг slug'ов на читаемые названия
const PAGE_TITLES: Record<string, string> = {
  about: "О компании",
  licenses: "Лицензии",
  partners: "Партнеры",
  vacancies: "Вакансии",
  privacy: "Политика конфиденциальности",
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const title = PAGE_TITLES[slug] || "Страница"

  return {
    title: `${title} | СтрахПлатформа`,
    description: `${title} - СтрахПлатформа`,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params

  // Проверяем, что это валидная страница
  if (!PAGE_TITLES[slug]) {
    notFound()
  }

  const pageContent: any = {}

  try {
    const response = await contentApi.getPageContent(slug)
    // Преобразуем массив в удобный объект
    const contentArray = response.data
    contentArray.forEach((item) => {
      if (!pageContent[item.section_name]) {
        pageContent[item.section_name] = {}
      }
      pageContent[item.section_name][item.content_key] = item.content_value
    })
  } catch (error) {
    console.error("Ошибка загрузки контента:", error)
  }

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: PAGE_TITLES[slug], href: `/pages/${slug}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{PAGE_TITLES[slug]}</h1>

          {/* Основной контент */}
          <div className="prose prose-lg max-w-none">
            {pageContent.main?.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: pageContent.main.content,
                }}
              />
            ) : (
              <div className="text-center py-12">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">Контент в разработке</h2>
                  <p className="text-blue-700 mb-4">Контент для страницы "{PAGE_TITLES[slug]}" пока не добавлен.</p>
                  <p className="text-sm text-blue-600">
                    Администратор может добавить контент через админ-панель в разделе "Page contents".
                  </p>
                  <div className="mt-6 p-4 bg-white rounded border text-left">
                    <p className="text-sm text-gray-600 font-medium mb-2">Для добавления контента:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • page_name: <code className="bg-gray-100 px-1 rounded">{slug}</code>
                      </li>
                      <li>
                        • section_name: <code className="bg-gray-100 px-1 rounded">main</code>
                      </li>
                      <li>
                        • content_key: <code className="bg-gray-100 px-1 rounded">content</code>
                      </li>
                      <li>
                        • content_type: <code className="bg-gray-100 px-1 rounded">html</code>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Дополнительные секции */}
          {Object.entries(pageContent).map(([sectionName, sectionData]: [string, any]) => {
            if (sectionName === "main") return null

            return (
              <div key={sectionName} className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">{sectionName.replace("_", " ")}</h2>
                <div className="prose max-w-none">
                  {Object.entries(sectionData).map(([key, value]: [string, any]) => (
                    <div key={key} className="mb-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-2 capitalize">{key.replace("_", " ")}</h3>
                      <div dangerouslySetInnerHTML={{ __html: value }} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
