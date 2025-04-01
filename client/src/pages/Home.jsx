import { useState, useEffect } from "react";
import { getTrendingMovies } from "../api/tmbd";
import MovieRow from "../componants/row";
export default function Home() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            const trending = await getTrendingMovies();
            setMovies(trending);
        };
        fetchMovies();
    }, []);

    return (
        <div className="flex flex-col z-10">
            <MovieRow title="Trending Movies" movies={movies} />
            <MovieRow title="Top Movies" movies={movies} />
        </div>
        
    );
}
