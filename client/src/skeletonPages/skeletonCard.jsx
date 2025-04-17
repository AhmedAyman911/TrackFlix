export default function SkeletonCard({ count = 6 }) {
  return (
    <div className="px-6 py-6">
      <div className="h-4 md:h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-48 mb-4 animate-pulse opacity-0"></div>
      <div className="overflow-x-auto scrollbar-hide scroll-smooth flex space-x-3 snap-x snap-mandatory">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="snap-start opacity-0 animate-fade-in pr-[15px]">
            <div className="bg-white w-32 md:w-48 md:h-[365px] h-[265px] dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="md:h-72 h-48 w-32 md:w-48 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 md:h-5 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2 animate-pulse"></div>
                <div className="h-3 md:h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
