
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Search } from 'lucide-react';
export default function Login() {

    const navigate = useNavigate();


    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <nav className="w-full absolute top-0 left-0">
            <div className="flex justify-between items-center w-full md:px-60 py-4 px-4">
                <div>
                    <span className="md:text-2xl text-md font-bold text-red-600">
                        TrackFlix
                    </span>
                </div>
                <div className="flex md:space-x-10 space-x-4">
                    <button
                        className="lg:text-xl sm:text-md font-bold text-black-500 md:hover:text-red-500"
                        onClick={() => handleNavigation("/")}
                    >
                        Home
                    </button>
                    <button className="md:text-xl text-md font-bold text-black-500 md:hover:text-red-500"
                        onClick={() => handleNavigation("/")}>
                        Watchlist
                    </button>
                </div>
            </div>
        </nav>
    )
}