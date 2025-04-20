import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from 'lucide-react';
import SearchBar from "../componants/search";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const clear = () => {
    localStorage.removeItem(`tv-filters`);
    localStorage.removeItem(`movie-filters`);
    handleNavigation('/')
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white dark:bg-gray-900 shadow z-50">
      <div className="flex justify-between items-center w-full md:px-20 px-4 py-4">
        <span
          className="md:text-2xl text-lg font-bold text-red-600 cursor-pointer md:mr-3"
          onClick={() => clear()}
        >
          TrackFlix
        </span>

        <div className="hidden md:flex w-full justify-center pl-20">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
              onClick={() => handleNavigation(`/browse?type=movie&page=1`)}

            >
              Movies
            </button>
            <button
              className="font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
              onClick={() => handleNavigation("/browse?type=tv&page=1")}
            >
              shows
            </button>
            <button
              className="font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
              onClick={() => handleNavigation("/watchlist")}
            >
              Watchlist
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex md:hidden">
              <SearchBar />
            </div>
            <button onClick={toggleTheme} className="text-gray-600 dark:text-white hidden md:flex">
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <Link to="/auth" className="text-sm border md:w-20 px-2 py-1 rounded hover:text-red-500">
                Sign In
              </Link>
            </SignedOut>
            <div className="md:hidden flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="w-7 h-7 text-gray-700 dark:text-white" /> : <Menu className="w-7 h-7 text-gray-700 dark:text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div className="md:hidden fixed top-0 left-0 w-48 h-full bg-white dark:bg-gray-900 shadow-lg p-6 z-50 transition-transform duration-300">
          <div className="flex flex-col space-y-6">
            <span
              className="md:text-2xl text-lg font-bold text-red-600 cursor-pointer text-left"
              onClick={() => clear()}
            >
              TrackFlix
            </span>
            <button
              className="text-left font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
              onClick={() => handleNavigation(`/browse?type=movie&page=1`)}
            >
              Movies
            </button>
            <button
              className="text-left font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
              onClick={() => handleNavigation("/browse?type=tv&page=1")}
            >
              Shows
            </button>
            <button
              className="text-left font-semibold text-gray-700 dark:text-white hover:text-red-500 dark:hover:text-red-500"
              onClick={() => handleNavigation("/watchlist")}
            >
              Watchlist
            </button>
            <button onClick={toggleTheme} className="text-gray-600 dark:text-white md:hidden flex">
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
