import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CastCard from '../componants/castCard';
import SkeletonMovieDetail from '../skeletonPages/detailsSkeleton';
import { getMediaDetails, getMediaVideos, getMediaProviders, getMediaCredits, getSeasonDetails } from '../api/tmbd';
import AddToWatchlistButton from '../componants/watchlistbutton';
import { CircleArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { FastAverageColor } from 'fast-average-color';

export default function MovieDetails() {
    const navigate = useNavigate();
    const { id, type } = useParams();
    const [movie, setMovie] = useState(null);
    const [videos, setVideos] = useState([]);
    const [providers, setProvider] = useState([]);
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [seasons, setSeasons] = useState([]);

    const [bgColor, setBgColor] = useState('#1f2937');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchAll = async () => {
            const start = Date.now();

            const [details, videos, providers, credits] = await Promise.all([
                getMediaDetails(type, id),
                getMediaVideos(type, id),
                getMediaProviders(type, id),
                getMediaCredits(type, id),
            ]);

            setMovie(details);

            const trailers = videos?.results?.filter(
                (vid) => vid.type === "Trailer" || vid.type === "Official Trailer"
            ) || [];
            setVideos(trailers);

            const flatrate = providers?.results?.EG?.flatrate || [];
            setProvider(flatrate);

            setCast(credits?.cast || []);

            if (type === "tv") {
                try {
                    const seasonsData = details?.seasons || [];

                    const seasonsWithEpisodes = await Promise.all(
                        seasonsData.map(async (season) => {
                            const seasonDetails = await getSeasonDetails(id, season.season_number);
                            return {
                                ...season,
                                episodes: seasonDetails.episodes || [],
                            };
                        })
                    );
                    console.log(seasonsWithEpisodes)
                    setSeasons(seasonsWithEpisodes);
                } catch (error) {
                    console.error("Failed to fetch seasons and episodes:", error);
                }
            }
            const fac = new FastAverageColor();
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = `https://corsproxy.io/?https://image.tmdb.org/t/p/original${details.backdrop_path}`;

            img.onload = () => {
                fac.getColorAsync(img)
                    .then(color => setBgColor(color.hex), console.log("done"))
                    .catch(err => console.error('Color extraction failed:', err));
            };

            const elapsed = Date.now() - start;
            const delay = Math.max(0, 2000 - elapsed);
            setTimeout(() => setIsLoading(false), delay);
        };
        fetchAll();
    }, [type, id]);




    if (isLoading) return (
        <div className="pt-12">
            <SkeletonMovieDetail />
        </div>
    );


    const SeasonCard = ({ season, index }) => {
        const navigate = useNavigate();

        const handleOpenSeasonPage = () => {
            navigate(`/tv/${season.show_id}/season/${season.season_number}`, { state: { season } });
        };

        return (
            <div
                className="md:px-20 px-6 opacity-0 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 300}ms`, animationFillMode: "forwards" }}
                onClick={handleOpenSeasonPage}
            >
                <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mb-6">


                    {season.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                            alt={season.name}
                            className="w-32 md:w-40 object-cover"
                        />
                    ) : (
                        <div className=" bg-gray-300 dark:bg-gray-700  items-center justify-center text-md text-gray-500 h-auto  rounded-md w-32 md:w-40 object-cover pt-14">
                            N/A
                        </div>
                    )}

                    <div className="p-4 flex flex-col justify-end flex-1">

                        <div className="text-left">
                            <h1 className="text-lg md:text-xl font-bold text-red-600 line-clamp-2">
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
                            {season.air_date?.slice(0, 4) || "Unknown Year"}{" | "}🎞 {season.episode_count} Episodes
                        </div>

                    </div>
                </div>
            </div>
        );
    };



    return (
        <div className="py-16 transition duration-300 animate-fade-in dark:bg-gray-900 min-h-screen flex flex-col ">
            <div className="relative w-full h-auto md:h-[500px] text-white overflow-hidden"
                style={{ backgroundColor: bgColor }}
            >
                <div
                    className="hidden md:block absolute top-0 w-full h-full bg-cover bg-right bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                        backgroundSize: '80%',
                        backgroundPosition: 'right top',
                    }}
                >
                    <div className="w-full h-full bg-black/50 backdrop-blur-sm" />

                </div>
                <div className="relative z-10 flex items-center justify-left h-full">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 px-6 md:px-20 w-full max-w-screen-xl py-10 md:py-0 transition duration-100 animate-fade-in">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-40 md:w-72 rounded-xl shadow-lg object-cover"
                            />
                        </div>
                        <div className="flex-1 text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">{movie.title || movie.name}</h1>
                            <p className="text-sm dark:text-yellow-300 text-yellow-500 mb-1">
                                ⭐ {movie.vote_average?.toFixed(1)} | {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}
                            </p>
                            <p className="text-sm dark:text-blue-300 text-blue-500 mb-2">
                                🎭 {movie.genres?.map((g) => g.name).join(', ')} |
                                {movie.runtime ? (
                                    ` ⏱ ${movie.runtime} min`
                                ) : (
                                    ` 📚 ${movie.number_of_seasons} Season${movie.number_of_seasons > 1 ? 's' : ''} | 🎞 ${movie.number_of_episodes} Episodes`
                                )} | 🌐 {movie.spoken_languages?.[0]?.english_name}
                            </p>

                            <p className="text-md dark:text-gray-200 md:text-gray-200 text-gray-600 italic mb-2">{movie.tagline}</p>
                            <p className="text-md dark:text-gray-300 md:text-gray-300 text-gray-700">{movie.overview}</p>
                            {providers.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-4 justify-start md:justify-start">
                                        {providers.map((p) => (
                                            <div
                                                key={p.provider_id}
                                                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                                                    alt={p.provider_name}
                                                    className="w-6 h-6 object-contain"
                                                />
                                                <span className="text-sm text-gray-700 dark:text-white">
                                                    {p.provider_name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Streaming data provided by JustWatch
                                    </p>
                                </div>
                            )}
                            <AddToWatchlistButton mediaId={movie.id} mediaType={type} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-white text-left px-6 md:px-20">Cast</h2>
                <div className="flex overflow-x-auto gap-5 px-6 py-2 md:px-20">
                    {cast.slice(0, 10).map((actor, index) => (
                        <div
                            key={actor.id}
                            className={`opacity-0 animate-fade-in`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CastCard actor={actor} />
                        </div>
                    ))}
                    <button
                        onClick={() => navigate("/cast", { state: { cast: cast, movie: movie } })}
                        className='flex items-center rounded-lg shadow-lgtransition p-1 whitespace-nowrap hover:text-red-600'>
                        View all<CircleArrowRight className='ml-1 mr-4' />
                    </button>
                </div>

            </div>


            {videos.length > 0 && (
                <div className="mt-10 px-6 md:px-20">
                    <h2 className="text-2xl font-semibold dark:text-white mb-4 text-left">Official Trailers</h2>
                    <div className="flex overflow-x-auto gap-6 pb-4">
                        {videos.slice(0, 3).map((trailer) => (
                            <div key={trailer.id} className="min-w-[320px] md:min-w-[480px] aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={trailer.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {type === 'tv' && seasons.length > 0 && (
                <div className="">
                    <h2 className="text-2xl font-semibold dark:text-white mb-4 text-left mt-10 px-6 md:px-20">
                        Seasons
                    </h2>
                    {seasons.map((season, index) => (
                        <SeasonCard key={season.id} season={{ ...season, show_id: movie.id }} index={index} />
                    ))}
                </div>
            )}

        </div>
    );

}
