export default function SkeletonMovieDetail() {
    return (
      <div className="min-h-screen dark:bg-gray-900 bg-white py-10 px-6 md:px-20 space-y-10">

        <div className="flex flex-col md:flex-row gap-6 w-full">

          <div className="w-40 md:w-72 h-[300px] md:h-[420px] bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse" />
  
          <div className="flex-1 space-y-4">
            <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
  

            <div className="flex flex-wrap gap-4 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg animate-pulse">
                  <div className="w-6 h-6 bg-gray-400 rounded" />
                  <div className="h-3 w-16 bg-gray-400 rounded" />
                </div>
              ))}
            </div>
            <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mt-6" />
          </div>
        </div>
        <div>
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse" />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-36 h-44 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse pr-6" />
            ))}
            
          </div>
        </div>
        <div>
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse" />
          <div className="flex gap-4 overflow-x-auto">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[480px] aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  