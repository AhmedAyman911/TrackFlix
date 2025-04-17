import { useState, useEffect } from "react";
import { getTrendingMovies, getTrendingTVShows, getTopRatedTVShows, getTopRatedMovies } from "../api/tmbd";
import MovieRow from "../componants/row";
import SkeletonCard from "../skeletonPages/skeletonCard";
import HeroSkeleton from "../skeletonPages/heroSkeleton";
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import SearchBar from "../componants/search";
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
    <div className="flex flex-col z-10 w-full md:max-w-[1280px] max-w-[400px] md:mx-auto pt-24 md:px-8 mx-auto">
      {/* Render Hero once */}
      <HeroSkeleton />
  
      {/* Render multiple card rows */}
      {[...Array(4)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
  


  return (
    <div>
      <div className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center bg-no-repeat mt-16 animate-fade-in" style={{ backgroundImage: `url("/test.jpg")` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 "></div>
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 text-left pt-8 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-red-600">TrackFlix</span>
          </h1>
          <p className="text-md md:text-lg text-gray-200 max-w-xl">
            Discover, track, and share your favorite movies and TV shows. Dive into trending hits or revisit top-rated classics — all in one place.
          </p>
          <div className="mt-4 hidden md:block ">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="flex flex-col z-10 w-full md:max-w-[1280px] max-w-[400px] md:mx-auto pt-5 md:px-8 mx-auto">
        <MovieRow title="Trending Movies" mediaType="movie" movies={TrendingMovies} />
        <MovieRow title="Trending TV Shows" mediaType="tv" movies={TrendingTvShows} />
        <MovieRow title="Top Rated Movies" mediaType="movie" movies={TopTvShows} />
        <MovieRow title="Top Rated TV Shows" mediaType="tv" movies={TopRatedMovies} />
      </div>
    </div>
  );
}
