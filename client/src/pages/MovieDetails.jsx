import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CastCard from '../componants/castCard';
import { getMovieDetails, getMovieVideos, getMovieProviders, getMovieCredits } from '../api/tmbd';
export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [videos, setVideos] = useState([]);
    const [providers, setProvider] = useState([]);
    const [cast, setCast] = useState([]);
    useEffect(() => {
        const fetchDetails = async () => {
            const data = await getMovieDetails(id);
            setMovie(data);
        };

        const fetchVideos = async () => {
            const data = await getMovieVideos(id);
            const filteredTrailers = data?.results?.filter(
                (vid) =>
                    vid.type === "Trailer" ||
                    vid.type === "Official Trailer"
            ) || [];
            setVideos(filteredTrailers);
        };

        const fetchProviders = async () => {
            const data = await getMovieProviders(id);
            const countryCode = "EG";
            const flatrateProviders = data?.results?.[countryCode]?.flatrate || [];
            setProvider(flatrateProviders);
        };

        const fetchCredits = async () => {
            const data = await getMovieCredits(id);
            if (data) {
                setCast(data.cast);
            }
        };

        fetchDetails();
        fetchVideos();
        fetchProviders();
        fetchCredits();

    }, [id]);

    if (!movie) return <div className="text-center pt-28">Loading...</div>;

    return (
        <div className="pt-8 transition duration-300 animate-fade-in dark:bg-gray-900">
            <div className="relative w-screen h-auto md:h-[500px] text-white overflow-hidden">
                <div
                    className="hidden md:block absolute top-0 w-screen h-full bg-cover bg-right bg-no-repeat"
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
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">{movie.title}</h1>
                            <p className="text-sm text-yellow-300 mb-1">
                                ⭐ {movie.vote_average?.toFixed(1)} | {movie.release_date?.slice(0, 4)}
                            </p>
                            <p className="text-sm text-blue-300 mb-2">
                                🎭 {movie.genres?.map((g) => g.name).join(', ')} | ⏱ {movie.runtime} min | 🌐 {movie.spoken_languages?.[0]?.english_name}
                            </p>
                            <p className="text-md dark:text-gray-200 text-gray-900 italic mb-2">{movie.tagline}</p>
                            <p className="text-md dark:text-gray-300 text-gray-900">{movie.overview}</p>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4 text-whit text-left px-6 md:px-20">Cast</h2>
                <div className="flex overflow-x-auto gap-5 scrollbar-hide px-6 py-2 md:px-20">
                    {cast.slice(0, 12).map((actor) => (
                        <CastCard key={actor.id} actor={actor} />
                    ))}
                </div>


            </div>








            {videos.length > 0 && (
                <div className="mt-10 ml-12 w-48">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-left">Official Trailers</h2>
                    <div className="space-y-4">
                        {videos.map((trailer) => (
                            <div key={trailer.id} className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={trailer.name}
                                    allowFullScreen
                                    className="w-full h-full rounded-lg shadow"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );

}
