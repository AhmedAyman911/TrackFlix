import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import MovieCard from '../componants/card';
import { searchMulti } from '../api/tmbd';

export default function SearchResults() {
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { searchTerm } = useParams();

    useEffect(() => {
        setPage(1);
      }, [searchTerm]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchTerm) return;
            const res = await searchMulti(searchTerm, page);
            setSearchResults(res.results);
            setTotalPages(res.total_pages);
        };

        fetchResults();
    }, [searchTerm, page]);

    const nextPage = () => {
        if (page < totalPages) {
            window.scrollTo(0, 0);
            setPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            window.scrollTo(0, 0);
            setPage(prev => prev - 1);
        }
    };

    return (
        <div className="px-4 md:px-20 py-20">
            <h1 className="text-2xl font-bold mb-6">
                Search Results for: <span className="text-red-600">{searchTerm}</span>
            </h1>

            {searchResults.length === 0 ? (
                <div>No results found.</div>
            ) : (
                <div className="flex flex-wrap justify-center gap-5 md:gap-8">
                    {searchResults.map((item) => (
                        <div key={item.id} className="cursor-pointer hover:scale-105 transform transition">
                            <MovieCard movie={item} mediaType={item.media_type} />
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-center gap-4 my-8">
                <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    Previous
                </button>
                <span className="py-2">
                    {page} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                    Next
                </button>
            </div>

        </div>
    );
}
