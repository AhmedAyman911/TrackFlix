import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from "./card";
export default function MovieRow({ title, movies = [], mediaType }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
        const firstCard = container.querySelector('div');
        const cardWidth = firstCard?.offsetWidth || 200;
        const spacing = 12;
        const peekOffset = 50;

        const fullCardWidth = cardWidth + spacing - peekOffset;

        const nextScrollLeft =
            direction === 'left'
                ? container.scrollLeft - fullCardWidth
                : container.scrollLeft + fullCardWidth;

        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (direction === 'right' && nextScrollLeft >= maxScrollLeft - 5) return;
        if (direction === 'left' && nextScrollLeft <= 5) return;

        container.scrollTo({
            left: nextScrollLeft,
            behavior: 'smooth',
        });
        setTimeout(updateScrollButtons, 300);
    };
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 30);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    };


    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        container.addEventListener('scroll', updateScrollButtons);
        updateScrollButtons();

        return () => container.removeEventListener('scroll', updateScrollButtons);
    }, []);





    return (
        <div className="relative z-10">
            <div className="pt-2 px-2">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-left md:px-8 flex mx-auto justify-center md:justify-normal">{title}</h1>
                <div className="relative group">
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 text-white rounded-full block bg-black w-6 h-8 md:bg-transparent transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <div className="overflow-x-auto scrollbar-hide md:px-6 px-2">
                        <div
                            ref={scrollRef}
                            className="overflow-x-auto scrollbar-hide scroll-smooth py-6 px-6 flex space-x-3 snap-x snap-mandatory pr-[60px]"
                        >
                            {movies.map((movie, index) => (
                                <div
                                    key={movie.id}
                                    className="snap-start flex-shrink-0 md:w-52 md:pl-2 md:px-10 px-2"
                                >
                                    <MovieCard movie={movie} index={index} mediaType={mediaType} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 text-white rounded-full block bg-black w-6 h-8 md:bg-transparent transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none}"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}