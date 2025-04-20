import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { searchMulti } from "../api/tmbd";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim().length > 1) {
                searchMulti(searchTerm).then(res => {
                    setSuggestions(res.results);
                  });
            } else {
                setSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`, { state: { results: suggestions } });
            setSuggestions([]);
        }
    };

    const handleSelect = (item) => {
        navigate(`/${item.media_type}/${item.id}`);
        setSuggestions([]);
        setSearchTerm("");
    };

    const renderSuggestions = () => (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 mt-1 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
            {suggestions.slice(0, 10).map((item) => (
                <li
                    key={`${item.id}-${item.media_type}`}
                    className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 "
                    onClick={() => handleSelect(item)}
                >
                    {item.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                            alt={item.title || item.name}
                            className="w-10 h-14 object-cover rounded hidden md:block"
                        />
                    ) : (
                        <div className="w-10 h-14 bg-gray-300 dark:bg-gray-700 rounded items-center justify-center text-xs text-gray-500 hidden md:block">
                            N/A
                        </div>
                    )}
                    <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium line-clamp-1">
                            {item.title || item.name}{" "}
                            {item.release_date || item.first_air_date
                                ? `(${(item.release_date || item.first_air_date).slice(0, 4)})`
                                : ""}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                            {item.media_type === "movie" && "🎬 Movie"}
                            {item.media_type === "tv" && "📺 TV Show"}
                            {item.media_type === "person" && "👤 Person"}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );


    return (
        <>
            <div className="relative hidden md:flex w-full max-w-md">
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full w-full"
                >
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search movies or TV..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-white"
                    />
                </form>
                {suggestions.length > 0 && renderSuggestions()}
            </div>

            <div className="md:hidden relative">
                {!showMobileSearch ? (
                    <button
                        onClick={() => setShowMobileSearch(true)}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                ) : (
                    <>
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 md:h-10 h-8 rounded-full w-full"
                        >
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-white"
                            />
                            <button type="button" onClick={() => setShowMobileSearch(false)}>
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </form>
                        {suggestions.length > 0 && renderSuggestions()}
                    </>
                )}
            </div>
        </>
    );
}
