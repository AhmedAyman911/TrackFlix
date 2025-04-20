import { Link } from "react-router-dom";

export default function CastCard({ actor }) {
    const imageUrl = actor.profile_path
      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
      : null;
  
    return (
      <Link to={`/person/${actor.id}`}>
      <div className="flex-shrink-0 w-32 transition-transform duration-300 hover:-translate-y-1 ease-in-out">
        <div className="relative w-full h-36 md:h-44 rounded-lg overflow-hidden shadow-lg bg-gray-800 transition duration-300 ease-in-out">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={actor.name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300 text-xs bg-gray-700">
              No Image
            </div>
          )}
        </div>
  
        <div className="mt-2">
          <h3 className="text-sm font-semibold dark:text-white truncate">{actor.name}</h3>
          <p className="text-xs dark:text-gray-400 truncate">{actor?.character || actor?.roles?.[0]?.character || 'N/A'}</p>
        </div>
      </div>
      </Link>
    );
  }
  