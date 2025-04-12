import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CastCard from '../componants/castCard';
import SkeletonCard from '../componants/skeletonCard';
import { getMediaDetails, getMediaVideos, getMediaProviders, getMediaCredits } from '../api/tmbd';
import AddToWatchlistButton from '../componants/addtowatchlistbutton.jsx';

export default function MovieDetails() {
    const { id, type } = useParams();
    const [movie, setMovie] = useState(null);
    const [videos, setVideos] = useState([]);
    const [providers, setProvider] = useState([]);
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
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

            const elapsed = Date.now() - start;
            const delay = Math.max(0, 1000 - elapsed);
            setTimeout(() => setIsLoading(false), delay);
        };

        fetchAll();
    }, [type, id]);



    if (isLoading) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-20 pt-6 place-items-center">
            {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );


    return (
        <div className="py-16 transition duration-300 animate-fade-in dark:bg-gray-900 min-h-screen flex flex-col ">
            <div className="relative w-full h-auto md:h-[500px] text-white overflow-hidden">
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
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">{movie.title || movie.name}</h1>
                            <p className="text-sm text-yellow-300 mb-1">
                                ⭐ {movie.vote_average?.toFixed(1)} | {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}
                            </p>
                            <p className="text-sm text-blue-300 mb-2">
                                🎭 {movie.genres?.map((g) => g.name).join(', ')} |
                                {movie.runtime ? (
                                    ` ⏱ ${movie.runtime} min`
                                ) : (
                                    ` 📚 ${movie.number_of_seasons} Season${movie.number_of_seasons > 1 ? 's' : ''} | 🎞 ${movie.number_of_episodes} Episodes`
                                )} | 🌐 {movie.spoken_languages?.[0]?.english_name}
                            </p>

                            <p className="text-md text-gray-200 italic mb-2">{movie.tagline}</p>
                            <p className="text-md text-gray-300">{movie.overview}</p>
                            {providers.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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
                    {cast.slice(0, 11).map((actor, index) => (
                        <div
                            key={actor.id}
                            className={`opacity-0 animate-fade-in`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CastCard actor={actor} />
                        </div>
                    ))}
                </div>
            </div>


            {videos.length > 0 && (
                <div className="mt-10 px-6 md:px-20">
                    <h2 className="text-2xl font-semibold dark:text-white mb-4 text-left">Official Trailers</h2>
                    <div className="flex overflow-x-auto gap-6 pb-4">
                        {videos.slice(0,3).map((trailer) => (
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

        </div>
    );

}
