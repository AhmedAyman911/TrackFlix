import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 text-left">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">TrackFlix</h2>
          <p className="text-sm">Track what you love. Watch what matters.</p>
        </div>
        <div>
          <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            <li><Link to="/browse" className="hover:text-red-500">Browse</Link></li>
            <li><Link to="/watchlist" className="hover:text-red-500">Watchlist</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">About</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-red-500">How it works</Link></li>
            <li><Link to="#" className="hover:text-red-500">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-red-500">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Contact</h3>
          <p className="text-sm">support@trackflix.app</p>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 mt-8 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} TrackFlix
      </div>
    </footer>
  );
};

export default Footer;
