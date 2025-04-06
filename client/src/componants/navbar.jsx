import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from 'lucide-react';
import SearchBar from "../componants/search";
export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white dark:bg-gray-900 shadow z-50">
      <div className="flex justify-between items-center w-full md:px-20 px-4 py-4">
        <span
          className="md:text-2xl text-md font-bold text-red-600 cursor-pointer mr-3"
          onClick={() => handleNavigation('/')}
        >
          TrackFlix
        </span>
        <SearchBar/>
          
        <div className="flex items-center space-x-4">
          <button
            className="font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
            onClick={() => handleNavigation("/browse?type=movie")}
          >
            Movies
          </button>
          <button
            className="font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
            onClick={() => handleNavigation("/browse?type=tv")}
          >
            TV show
          </button>
          <button
            className="font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
            onClick={() => handleNavigation("/watchlist")}
          >
            Watchlist
          </button>
          <button onClick={toggleTheme} className="text-gray-600 dark:text-white">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
