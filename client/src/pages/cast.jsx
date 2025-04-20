import { useLocation } from "react-router-dom";
import CastCard from '../componants/castCard'
import { useEffect } from "react";



export default function CastPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    const location = useLocation();
    const cast = location.state?.cast || [];
    const movie = location.state?.movie || [];
    console.log(movie)
    return (
        <div className=" py-24 md:max-w-[1280px] max-w-[400px] mx-auto px-8">
            <div className="flex items-end gap-4 justify-start md:px-3">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-24 md:w-32 object-cover rounded-xl"
                />
                <div className="text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">{movie.title || movie.name}</h1>
                    <p className="text-sm text-yellow-300 mb-1">
                        ⭐ {movie.vote_average?.toFixed(1)} | {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}
                    </p>
                </div>
            </div>
            <h2 className="text-3xl font-bold py-3 dark:text-white text-left md:px-3">Cast:</h2>
            {cast.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-5 md:gap-6">
                    {cast.map((actor) => (
                        <CastCard key={actor.id} actor={actor} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No cast available.</p>
            )}
        </div>
    );
}
