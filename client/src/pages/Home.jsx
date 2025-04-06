import { useState, useEffect } from "react";
import { getTrendingMovies, getTrendingTVShows, getTopRatedTVShows, getTopRatedMovies } from "../api/tmbd";
import MovieRow from "../componants/row";
import SkeletonCard from "../componants/skeletonCard";
export default function Home() {
    const [TrendingMovies, setTrendingMovies] = useState([]);
    const [TrendingTvShows, setTrendingTVShows] = useState([]);
    const [TopRatedMovies, setTopRatedMovies] = useState([]);
    const [TopTvShows, setTopTVShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const start = Date.now();

            const [trendingMovies, trendingTV, topTV, topMovies] = await Promise.all([
                getTrendingMovies(),
                getTrendingTVShows(),
                getTopRatedTVShows(),
                getTopRatedMovies(),
            ]);

            setTrendingMovies(trendingMovies);
            setTrendingTVShows(trendingTV);
            setTopRatedMovies(topTV);
            setTopTVShows(topMovies);

            const elapsed = Date.now() - start;
            const delay = Math.max(0, 1000 - elapsed);
            setTimeout(() => setIsLoading(false), delay);
        };

        fetchData();
    }, []);

    if (isLoading) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-20 pt-6 place-items-center">
            {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );


    return (
        <div className="flex flex-col z-10 w-full md:max-w-[1280px] max-w-[380px] md:mx-auto pt-20 md:px-8 mx-auto">
            <MovieRow title="Trending Movies" mediaType="movie" movies={TrendingMovies} />
            <MovieRow title="Trending TV Shows" mediaType="tv" movies={TrendingTvShows} />
            <MovieRow title="Top Rated Movies" mediaType="movie" movies={TopTvShows} />
            <MovieRow title="Top Rated TV Shows" mediaType="tv" movies={TopRatedMovies} />
        </div>

    );
}
