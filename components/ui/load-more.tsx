import { Button } from "@/components/ui/button"

interface LoadMoreProps {
  isLoading: boolean
  onLoadMore: () => void
}

export default function LoadMore({ isLoading, onLoadMore }: LoadMoreProps) {
  return (
    <div className="flex justify-center py-4">
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        variant="outline"
      >
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </div>
  )
}