import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { getMediaDetails } from '../api/tmbd';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import WatchlistSkeleton from '../skeletonPages/watchlistSkeleton';
function Watchlist() {
  const [media, setMediaList] = useState([]);
  const { user, isLoaded } = useUser();
  const handleRemove = async (mediaId) => {
    try {
      console.log("Sending:", user.id, mediaId);
      await axios.delete('https://trackflix-api.vercel.app/watchlist/remove', {
        data: {
          clerkId: user.id,
          mediaId,
        },
      });
      setMediaList((prev) => prev.filter((m) => m.movie.id !== mediaId));
    } catch (err) {
      console.error('Failed to remove from watchlist:', err);
    }
  };


  const handleStatusUpdate = async (mediaId, newStatus) => {
    try {
      await axios.patch('https://trackflix-api.vercel.app/watchlist/update-status', {
        clerkId: user.id,
        mediaId,
        status: newStatus,
      });

      setMediaList((prev) =>
        prev.map((item) =>
          item.movie.id === mediaId
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!isLoaded) return;

      try {
        const clerkId = user.id;
        const res = await axios.get(`https://trackflix-api.vercel.app/watchlist/${clerkId}`);
        const items = res.data;

        const mediaData = await Promise.all(
          items.map(async (item) => {
            const data = await getMediaDetails(item.mediaType, item.mediaId);
            return {
              mediaType: item.mediaType,
              status: item.status,
              movie: data,
            };
          }),
        );

        setMediaList(mediaData);
      } catch (err) {
        console.error('Failed to fetch watchlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [isLoaded, user]);
  const navigate = useNavigate();
  return (
    <div className="py-24">
      {loading ? (
        <WatchlistSkeleton />
      ) : media.length > 0 ? (
        media.map((item, index) => (
          <div className='md:px-20 px-12 opacity-0 animate-fade-in cursor-pointer' style={{ animationDelay: `${index * 300}ms` }}
            onClick={() => navigate(`/${item.mediaType}/${item.movie.id}`)}>
            <div
              key={index}
              className="flex bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mb-4 "
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${item.movie.poster_path}`}
                alt={item.movie.title || item.movie.name}
                className="w-24 md:w-32 object-cover"
              />
              <div className="p-4 flex flex-row flex-1 items-end">
                <div className='text-left'>
                  <h1 className="text-xl font-bold text-red-600 line-clamp-2">
                    {item.movie.title || item.movie.name}
                  </h1>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {item.movie.vote_average ? item.movie.vote_average.toFixed(1) : "N/A"}
                    <StarIcon sx={{ fontSize: 16, marginLeft: '4px' }} className="text-yellow-400" /> | {" "}
                    {item.movie.release_date?.slice(0, 4) || item.movie.first_air_date?.slice(0, 4)}{" "}
                    | {item.movie.original_language?.toUpperCase()}
                  </div>
                  <p className="text-md text-gray-600 dark:text-gray-400 line-clamp-1">
                    {item.movie.overview}
                  </p>
                  <div className="mt-1 flex gap-3 items-center">
                    {item.status === 'plan to watch' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(item.movie.id, 'watching') }}
                        className=" dark:text-white px-3 py-1 rounded hover:bg-red-700 md:text-sm text-xs border-2 border-red-600"
                      >
                        🎬 Start Watching
                      </button>
                    )}
                    {item.status === 'watching' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(item.movie.id, 'completed') }}
                        className="bg-grey-200 dark:text-gray-200 px-3 py-1 rounded hover:bg-green-600 md:text-sm text-xs border-2 border-green-400"
                      >
                        ✅ Mark as Completed
                      </button>
                    )}

                    {item.status === 'completed' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(item.movie.id, 'plan to watch') }}
                        className="bg-grey-200 dark:text-gray-200 px-3 py-1 rounded hover:bg-green-600 text-sm border-2 border-green-400 bg-green-600"
                      >
                        Watched
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemove(item.movie.id) }}
                      className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-gray-200 flex items-center justify-center transition"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg">
          Your watchlist is empty
        </div>
      )}
    </div>
  );

}

export default Watchlist;
