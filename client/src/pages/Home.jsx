// src/pages/Home.jsx
import MovieCard from "../componants/card";
import { mockMovies } from "../mockData";
import Background from "../componants/background";
export default function Home() {
    return (
        <div className="relative z-10">
            <Background/>
            {/* Page Content */}
            <div className="min-h-screen w-full pt-28 px-4 md:px-10">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Popular Movies
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mockMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}
