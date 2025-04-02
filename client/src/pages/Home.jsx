import { useState, useEffect } from "react";
import { getTrendingMovies,getTrendingTVShows,getTopRatedTVShows,getTopRatedMovies} from "../api/tmbd";
import MovieRow from "../componants/row";
export default function Home() {
    const [TrendingMovies, setTrendingMovies] = useState([]);
    const [TrendingTvShows, setTrendingTVShows] = useState([]);
    const [TopRatedMovies, setTopRatedMovies] = useState([]);
    const [TopTvShows, setTopTVShows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const trendingMovies = await getTrendingMovies();
            setTrendingMovies(trendingMovies);
            const trendingTV = await getTrendingTVShows();
            setTrendingTVShows(trendingTV);
            const topTV = await getTopRatedTVShows();
            setTopRatedMovies(topTV);
            const topMovies = await getTopRatedMovies();
            setTopTVShows(topMovies);
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col z-10">
            <MovieRow title="Trending Movies" movies={TrendingMovies} />
            <MovieRow title="Trending TV Shows" movies={TrendingTvShows} />
            <MovieRow title="Top Rated Movies" movies={TopTvShows} />
            <MovieRow title="Top Rated TV Shows" movies={TopRatedMovies} />
        </div>
        
    );
}
