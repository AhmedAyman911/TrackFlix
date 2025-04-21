import { useLocation } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { useEffect } from "react";

const SeasonPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    const { state } = useLocation();
    const season = state?.season;
    if (!season) return <div>Loading...</div>;
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-24">
            <div className="flex flex-col sm:flex-row items-center sm:items-end pb-10 gap-4">
                <img
                    src={season.poster_path
                        ? `https://image.tmdb.org/t/p/w200${season.poster_path}`
                        : '/no-image.png'}
                    alt={season.name}
                    className="w-32 h-auto object-cover rounded-md"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-red-500 text-center sm:text-left">
                    {season.name}
                </h1>
            </div>
            {season.episodes?.length > 0 ? (
                season.episodes.map((episode, index) => (
                    <div
                        key={episode.id}
                        className="opacity-0 animate-fade-in"
                        style={{ animationDelay: `${index * 300}ms` }}
                    >
                        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mb-6">
                            <img
                                src={episode.still_path
                                    ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                                    : '/no-image.jpg'}
                                alt={episode.name}
                                className="w-full md:w-60 h-40 md:h-36 object-cover"
                            />
                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div className="text-left">
                                    <h1 className="text-lg font-bold text-red-600 line-clamp-2">
                                        {episode.episode_number}. {episode.name}
                                    </h1>

                                    <div className="flex flex-wrap items-center text-sm text-gray-700 dark:text-gray-300 mt-1 gap-2">
                                        {episode.vote_average ? episode.vote_average.toFixed(1) : "N/A"}
                                        <StarIcon sx={{ fontSize: 16 }} className="text-yellow-400" />
                                        {episode.air_date && <>| {episode.air_date}</>}
                                        {episode.runtime && <>| ⏱ {episode.runtime} min</>}
                                    </div>

                                    <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 flex-1">
                                            {episode.overview || 'No overview available.'}
                                        </p>

                                        <button
                                            onClick={() => window.open()}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-400">No episodes found.</p>
            )}
        </div>
    );
};

export default SeasonPage;
