import { useState, useEffect } from "react";
import { getTrendingMovies, getTrendingTVShows, getTopRatedTVShows, getTopRatedMovies } from "../api/tmbd";
import MovieRow from "../componants/row";
import SkeletonCard from "../skeletonPages/skeletonCard";
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
export default function Home() {
    const [TrendingMovies, setTrendingMovies] = useState([]);
    const [TrendingTvShows, setTrendingTVShows] = useState([]);
    const [TopRatedMovies, setTopRatedMovies] = useState([]);
    const [TopTvShows, setTopTVShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getToken, userId, isSignedIn } = useAuth();
  
    useEffect(() => {
      const fetchAndSaveToken = async () => {
        try {
          const token = await getToken();
          console.log("Fetched token:", token);
          await axios.post('https://trackflix-api.vercel.app/users/save-clerkId', {
            clerkId: userId
          });
          console.log("clerkId saved to DB successfully");
        } catch (error) {
          console.error("Error saving clerkId:", error);
        }
      };
  
      if (isSignedIn) {
        fetchAndSaveToken();
      }
    }, [getToken, userId, isSignedIn]);

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
        <div className="flex flex-col z-10 w-full md:max-w-[1280px] max-w-[400px] md:mx-auto pt-20 md:px-8 mx-auto">
          {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
        </div>
    );


    return (
        <div className="flex flex-col z-10 w-full md:max-w-[1280px] max-w-[400px] md:mx-auto pt-20 md:px-8 mx-auto">
            <MovieRow title="Trending Movies" mediaType="movie" movies={TrendingMovies} />
            <MovieRow title="Trending TV Shows" mediaType="tv" movies={TrendingTvShows} />
            <MovieRow title="Top Rated Movies" mediaType="movie" movies={TopTvShows} />
            <MovieRow title="Top Rated TV Shows" mediaType="tv" movies={TopRatedMovies} />
        </div>

    );
}
