import { useLocation } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
const SeasonPage = () => {

    const [media, setMediaList] = useState([]);
    const { getToken, userId } = useAuth();

    const handleRemove = async (mediaId) => {
        try {
            console.log("Sending:", userId, mediaId);
            await axios.delete('https://trackflix-api.vercel.app/watchedEpisodes/remove', {
                data: {
                    clerkId: userId,
                    episodeId: mediaId,
                },
            });
            setMediaList((prevMedia) => prevMedia.filter((item) => String(item.episodeId) !== String(mediaId)));
        } catch (err) {
            console.error('Failed to remove from watchlist:', err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchwatchedEpisodes = async () => {
            try {
                const clerkId = userId;
                const res = await axios.get(`https://trackflix-api.vercel.app/watchedEpisodes/${clerkId}`);
                const items = res.data;
                setMediaList(items);
            } catch (err) {
                console.error('Failed to fetch watched Episodes:', err);
            }
        };

        fetchwatchedEpisodes();
    }, [userId]);
    const [snackbarVisible, setSnackbarVisible] = useState(null);
    const handleAddToWatchlist = async (mediaId) => {
        try {
            const token = await getToken();
            const res = await axios.post(
                'https://trackflix-api.vercel.appwatchedEpisodes/add',
                {
                    clerkId: userId,
                    episodeId: mediaId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);
            const responseData = Array.isArray(res.data) ? res.data : [res.data];

            const items = responseData.map(entry => entry.item);
            setMediaList(prevMedia => [...prevMedia, ...items]);
        } catch (error) {
            console.error('Error adding to watchlist:', error.response?.data || error.message);
            setSnackbarVisible(mediaId);
            setTimeout(() => setSnackbarVisible(null), 3000);
        }
    };

    console.log(media)
    const { state } = useLocation();
    const season = state?.season;
    if (!season) return <div>Loading...</div>;
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-24">
            <div className="flex flex-col sm:flex-row items-center sm:items-end pb-10 gap-4">
                {season.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                        alt={season.name}
                        className="w-32 h-auto object-cover rounded-md"
                    />
                ) : (
                    <div className=" bg-gray-300 dark:bg-gray-700  items-center justify-center text-md text-gray-500 w-32 h-auto object-cover rounded-md">
                        N/A
                    </div>
                )}

                <div className="p-4 flex flex-col justify-end flex-1">

                    <div className="text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 text-center sm:text-left">
                            {season.name}
                        </h1>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                            {season.overview || "No overview available."}
                        </p>
                    </div>

                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mt-4">
                        {season.vote_average ? season.vote_average.toFixed(1) : "N/A"}
                        <StarIcon sx={{ fontSize: 16, marginLeft: '4px' }} className="text-yellow-400" />
                        {" | "}
                        {season.air_date?.slice(0, 4) || "Unknown Year"}
                        {" | "}
                        🎞 {season.episode_count} Episodes
                    </div>
                </div>
            </div>
            {season.episodes?.length > 0 ? (
                season.episodes.map((episode, index) => (
                    <div
                        key={episode.id}
                        className="opacity-0 animate-fade-in"
                        style={{ animationDelay: `${index * 300}ms` }}
                    >
                        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mb-6">
                            {episode.still_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                    alt={episode.name}
                                    className="w-full md:w-60 h-40 md:h-36 object-cover"
                                />
                            ) : (
                                <div className="bg-gray-300 dark:bg-gray-700 rounded items-center justify-center text-md text-gray-500 w-full md:w-60 h-40 md:h-36 object-cover mx-auto pt-14">
                                    N/A
                                </div>
                            )}
                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div className="text-left">
                                    <h1 className="text-lg font-bold text-red-600 line-clamp-2">
                                        {episode.episode_number}. {episode.name}
                                    </h1>

                                    <div className="flex flex-wrap items-center text-sm text-gray-700 dark:text-gray-300 mt-1 gap-1">
                                        {episode.vote_average ? episode.vote_average.toFixed(1) : "N/A"}
                                        <StarIcon sx={{ fontSize: 16 }} className="text-yellow-400" />
                                        {" | "}
                                        {episode.air_date || "Unknown Date"}
                                        {" | "}
                                        ⏱ {episode.runtime} min
                                    </div>

                                    <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 flex-1">
                                            {episode.overview || 'No overview available.'}
                                        </p>
                                        {snackbarVisible === episode.id && (
                                            <div
                                                className="fixed items-end justify-center bg-red-500 text-white py-2 px-4 rounded shadow-md animate-fade-in-out"
                                            >
                                                Please SignIn!
                                            </div>
                                        )}
                                        <button
                                            onClick={
                                                media.some((item) => item.episodeId && String(item.episodeId) === String(episode.id))
                                                    ? () => handleRemove(episode.id)
                                                    : () => handleAddToWatchlist(episode.id)
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                                        >
                                            {media.some((item) => item.episodeId && String(item.episodeId) === String(episode.id)) ? '✕' : 'Done'}

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
