import axiosTMDB from './axiosTMBD';

export const getTrendingMovies = async () => {
  try {
    const res = await axiosTMDB.get('/trending/movie/week');
    console.log(res.data.results)
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    return [];
  }
};

export const getTrendingTVShows = async () => {
  try {
    const res = await axiosTMDB.get('/trending/tv/week');
    console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch trending TV shows:', error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const res = await axiosTMDB.get('movie/top_rated');
    console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch Top Rated movies:', error);
    return [];
  }
};

export const getTopRatedTVShows = async () => {
  try {
    const res = await axiosTMDB.get('tv/top_rated');
    console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch Top Rated TV shows:', error);
    return [];
  }
};