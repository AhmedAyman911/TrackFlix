import { useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from "./card";
export default function MovieRow({ title, movies = [] }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const scrollAmount = scrollRef.current.offsetWidth;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative z-10">
            <div className="pt-2 px-1 md:px-10">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-left px-8">{title}</h1>
                <div className="relative group">
                    <div className="overflow-x-auto scrollbar-hide px-5">
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full hidden group-hover:block"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div
                            ref={scrollRef}
                            className="overflow-x-auto scrollbar-hide scroll-smooth py-6 px-6 flex space-x-3 snap-x snap-mandatory"
                        >
                            {movies.map((movie, index) => (
                                <div
                                    key={movie.id}
                                    className="snap-start flex-shrink-0 md:w-52 md:px-2 md:pl-2 px-10 w-72"
                                >
                                    <MovieCard movie={movie} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full hidden group-hover:block"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}