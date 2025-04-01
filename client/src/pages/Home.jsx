import { useState, useEffect } from "react";
import { getTrendingMovies,getTrendingTVShows } from "../api/tmbd";
import MovieRow from "../componants/row";
export default function Home() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTVShows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const trending = await getTrendingMovies();
            setMovies(trending);
            const trendingTV = await getTrendingTVShows();
            setTVShows(trendingTV);
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col z-10">
            <MovieRow title="Trending Movies" movies={movies} />
            <MovieRow title="Trending TV Shows" movies={tvShows} />
        </div>
        
    );
}
