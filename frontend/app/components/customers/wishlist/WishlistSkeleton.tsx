export default function WishlistSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-card rounded-2xl shadow-md overflow-hidden"
        >
          <div className="w-full h-56 bg-gray-300 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
