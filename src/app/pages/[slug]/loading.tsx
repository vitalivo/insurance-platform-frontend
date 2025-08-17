export default function PageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
