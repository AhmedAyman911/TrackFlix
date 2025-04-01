import { useNavigate } from 'react-router-dom';
export default function MovieCard({ movie }) {
    const navigate = useNavigate();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-red-500 animate-fade-in"
        onClick={() => navigate(`/movie/${movie.id}`)}
        >
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-72 object-fill transition duration-300 ease-in-out "
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-red-600 mb-1">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ⭐ {movie.vote_average} | {movie.release_date}
          </p>
        </div>
      </div>
    );
  }
  