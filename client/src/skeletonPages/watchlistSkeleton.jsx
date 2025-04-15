const WatchlistSkeleton = () => {
    return (
      <div className="px-12 md:px-20 space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-24 md:w-32 md:h-[200px] h-[140px] bg-gray-300 dark:bg-gray-700" />
  
            {/* Content */}
            <div className="p-4 flex flex-row flex-1 items-end">
              <div className="w-full space-y-2">
                <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
  
                {/* Buttons */}
                <div className="flex gap-2 mt-2">
                  <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
export default WatchlistSkeleton;
  