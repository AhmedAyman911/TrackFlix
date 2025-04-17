export default function HeroSkeleton() {
    return (
        <div className="relative w-full h-[400px] md:h-[450px] bg-gray-300 dark:bg-gray-800 animate-pulse">
            <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 text-left pt-16 animate-fade-in">
                <div className="h-10 md:h-16 bg-gray-400 dark:bg-gray-600 rounded w-64 mb-4"></div>
                <div className="h-4 md:h-6 bg-gray-400 dark:bg-gray-600 rounded w-80 mb-2"></div>
                <div className="h-4 md:h-6 bg-gray-400 dark:bg-gray-600 rounded w-64"></div>
                <div className="mt-4 hidden md:block">
                    <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded-xl w-96"></div>
                </div>
            </div>
        </div>
    );
}
