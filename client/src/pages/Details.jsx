import { useParams } from 'react-router-dom';
import { mockMovies } from '../mockData';
import Background from "../componants/background";
export default function MovieDetails() {
    const { id } = useParams();
    const movie = mockMovies.find((m) => m.id === parseInt(id));

    if (!movie) return <div className="p-10 text-center text-red-500">Movie not found</div>;

    return (
        <div>
            <Background />
            <div className="min-h-screen pt-28 px-6 md:px-20 transition duration-300 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full md:w-80 h-auto rounded-xl shadow-lg object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-red-600 mb-4">{movie.title}</h1>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            ⭐ {movie.vote_average} | {movie.release_date}
                        </p>
                        <p className="text-md text-gray-600 dark:text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. (placeholder for description)
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
