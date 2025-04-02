import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Search, X } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm, handleSearch }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white dark:bg-gray-900 shadow z-50">
      <div className="flex justify-between items-center w-full md:px-20 px-4 py-4">
        <span
          className="md:text-2xl text-md font-bold text-red-600 cursor-pointer mr-3"
          onClick={() => handleNavigation('/')}
        >
          TrackFlix
        </span>
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full w-full max-w-md"
          >
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-white placeholder:text-gray-400"
            />
          </form>
          
        <div className="flex items-center space-x-4">
          <div className="md:hidden relative">
            {!showMobileSearch ? (
              <button
                onClick={toggleMobileSearch}
                className="flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
              >
                <Search className="w-3 h-3" />
              </button>
            ) : (
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 h-7 rounded-full w-full "
              >
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-white"
                />
                <button type="button" onClick={toggleMobileSearch}>
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </form>
            )}
          </div>
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
