import axiosTMDB from './axiosTMBD';

export const getTrendingMovies = async () => {
  try {
    const res = await axiosTMDB.get('/trending/movie/week');
    //console.log(res.data.results)
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    return [];
  }
};

export const getTrendingTVShows = async () => {
  try {
    const res = await axiosTMDB.get('/trending/tv/week');
    //console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch trending TV shows:', error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const res = await axiosTMDB.get('movie/top_rated');
    //console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch Top Rated movies:', error);
    return [];
  }
};

export const getTopRatedTVShows = async () => {
  try {
    const res = await axiosTMDB.get('tv/top_rated');
    //console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error('Failed to fetch Top Rated TV shows:', error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await axiosTMDB.get(`/movie/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch movie details:', err);
    return null;
  }
};

export const getMovieVideos = async (id) => {
  try {
    const res = await axiosTMDB.get(`/movie/${id}/videos`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch movie videos:', err);
    return null;
  }
};

export const getMovieProviders = async (id) => {
  try {
    const res = await axiosTMDB.get(`/movie/${id}/watch/providers`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch movie Providers:', err);
    return null;
  }
};

export const getMovieCredits = async (id) => {
  try {
    const res = await axiosTMDB.get(`/movie/${id}/credits`);
    console.log("credits: "+res);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch movie credits:', err);
    return null;
  }
};