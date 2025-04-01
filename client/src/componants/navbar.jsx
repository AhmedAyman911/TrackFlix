import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Search } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white dark:bg-gray-900 shadow z-50">
      <div className="flex justify-between items-center w-full md:px-20 px-4 py-4">
        <span
          className="md:text-2xl text-md font-bold text-red-600 cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          TrackFlix
        </span>

        <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm w-32 md:w-60 text-gray-700 dark:text-white"
          />
        </form>

        <div className="flex items-center space-x-4">
          <button
            className="font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
            onClick={() => handleNavigation("/")}
          >
            Home
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
