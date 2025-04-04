import { useNavigate } from 'react-router-dom';
export default function MovieCard({ movie, index }) {
  const navigate = useNavigate();

  return (
    <div
      className="opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="bg-white w-48 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition h-[365px] duration-300 transform-gpu hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-red-600"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-72 object-fill transition duration-300 ease-in-out"
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-red-600 mb-1 line-clamp-1">
            {movie.title || movie.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} | {(movie.release_date || movie.first_air_date || '').slice(0, 4)} | {movie.original_language || movie.origin_country}
          </p>
        </div>
      </div>
    </div>
  );
}

