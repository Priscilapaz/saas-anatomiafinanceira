import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoriasLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex h-16 items-center gap-2 border-b px-3">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-4 w-px" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Stats Card Skeleton */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </CardContent>
      </Card>

      {/* Filters Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>

      {/* Categories List Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
