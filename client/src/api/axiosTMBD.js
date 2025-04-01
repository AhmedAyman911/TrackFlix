import axios from "axios";
const axiosTMDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
        Accept: 'application/json',
    },
});
export default axiosTMDB;