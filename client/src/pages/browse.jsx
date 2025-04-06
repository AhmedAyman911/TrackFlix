import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { discover, getGenres } from "../api/tmbd";
import MovieCard from "../componants/card";
const Browse = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages] = useState([
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "ar", name: "Arabic" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "ca", name: "Catalan" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
  ]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [tempSelectedGenres, setTempSelectedGenres] = useState([]);
  const [tempSortBy, setTempSortBy] = useState("");
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const genreString = selectedGenres.join(",");
      const res = await discover(type, {
        page,
        with_genres: genreString,
        sort_by: sortBy,
        with_original_language: selectedLanguage,
      });
      setItems(res.results);
      setTotalPages(res.total_pages);
    };
    fetchItems();
  }, [type, page, selectedGenres, sortBy, selectedLanguage]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await getGenres(type);
      setGenres(res.genres || res.data.genres);
    };
    fetchGenres();
  }, [type]);

  const handleGenreChange = (id) => {
    setTempSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const applyFilters = () => {
    setSelectedGenres(tempSelectedGenres);
    setSortBy(tempSortBy);
    setSelectedLanguage(tempSelectedLanguage);
    setPage(1);
  };

  const clearFilters = () => {
    setTempSelectedGenres([]);
    setTempSortBy("");
    setTempSelectedLanguage("");
    setSelectedGenres([]);
    setSortBy("");
    setSelectedLanguage("");
    setPage(1);
  };

  return (
    <div className="p-20 pt-28">
      

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-md h-fit md:w-72">
          <h2 className="text-lg font-semibold mb-4 text-left">Filters</h2>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-left">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGenreChange(g.id)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    tempSelectedGenres.includes(g.id)
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-left">Language</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() =>
                    setTempSelectedLanguage((prev) =>
                      prev === lang.code ? "" : lang.code
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    tempSelectedLanguage === lang.code
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-left">Sort By</label>
            <select
              className="w-full px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
              value={tempSortBy}
              onChange={(e) => setTempSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="popularity.desc">Most Popular</option>
              <option value="vote_average.desc">Top Rated</option>
              <option value="release_date.desc">Newest</option>
              <option value="release_date.asc">Oldest</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="text-sm text-gray-500 hover:underline"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {items.map((item) => (
              <MovieCard key={item.id} movie={item} mediaType={type} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-10 dark:text-white">
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Prev
            </button>
            <span className="px-4 py-2">
              {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
