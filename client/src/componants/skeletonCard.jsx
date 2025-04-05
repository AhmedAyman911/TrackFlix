export default function SkeletonCard() {
    return (
      <div className="w-28 md:w-32 flex flex-col items-center animate-fade-in animate-pulse pt-10">
        <div className="w-full h-36 md:h-44 bg-gray-900 rounded-lg mb-2" />
        <div className="h-4 bg-gray-900 rounded w-3/4 mb-1" />
        <div className="h-3 bg-gray-900 rounded w-1/2" />
      </div>
    );
  }
  