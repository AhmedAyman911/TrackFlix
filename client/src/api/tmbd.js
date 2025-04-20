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

export const getMediaDetails = async (type, id) => {
  const res = await axiosTMDB.get(`/${type}/${id}`);
  return res.data;
};

export const getMediaVideos = async (type, id) => {
  const res = await axiosTMDB.get(`/${type}/${id}/videos`);
  return res.data;
};

export const getMediaProviders = async (type, id) => {
  const res = await axiosTMDB.get(`/${type}/${id}/watch/providers`);
  return res.data;
};

export const getMediaCredits = async (type, id) => {
  try {
    const endpoint = type === 'tv'
      ? `/${type}/${id}/aggregate_credits`
      : `/${type}/${id}/credits`;

    const res = await axiosTMDB.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch credits for ${type} ${id}`, err);
    return null;
  }
};

export const searchMulti = async (query, page) => {
  const res = await axiosTMDB.get(`/search/multi`, {
    params: { query:query, page:page },
  });
  return res.data
};

export const discover = async (type = "movie", params = {}) => {
  const res = await axiosTMDB.get(`/discover/${type}`, { params });
  return res.data;
};


export const getGenres = async (type) => {
  const res = await axiosTMDB.get(`/genre/${type}/list`);
  console.log(res.data)
  return res.data;
};
