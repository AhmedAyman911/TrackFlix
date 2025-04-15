import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { getMediaDetails } from '../api/tmbd';
function AddToWatchlistButton({ mediaId, mediaType }) {
  const { getToken, userId } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [media, setMediaList] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const clerkId = userId;
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
      }
    };

    fetchWatchlist();
  }, []);

  useEffect(() => {
    const found = media.find((item) => item.movie.id === mediaId);
    if (found) setIsInWatchlist(true);
    else setIsInWatchlist(false);
  }, [media, mediaId]);

  const handleRemove = async (mediaId) => {
    try {
      console.log("Sending:", userId, mediaId);
      await axios.delete('https://trackflix-api.vercel.app/watchlist/remove', {
        data: {
          clerkId: userId,
          mediaId,
        },
      });
      setMediaList((prev) => prev.filter((m) => m.movie.id !== mediaId));
    } catch (err) {
      console.error('Failed to remove from watchlist:', err);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      const token = await getToken();
      const res = await axios.post(
        'https://trackflix-api.vercel.app/watchlist/add',
        {
          clerkId: userId,
          mediaId,
          mediaType,
          status: 'plan to watch'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(res.data);
      alert('Added to watchlist!');
    } catch (error) {
      console.error('Error adding to watchlist:', error.response?.data || error.message);
      alert('Failed to add to watchlist');
    }
  };

  return (
    <button
      onClick={isInWatchlist ? () => handleRemove(mediaId) : handleAddToWatchlist}
      className={`px-4 py-2 mt-4 rounded text-white ${isInWatchlist ? 'bg-gray-600 hover:bg-red-700 border-2 border-red-600' : 'bg-red-600 hover:bg-red-700'
        }`}
    >
      {isInWatchlist ? '✕ Remove from Watchlist' : '+ Add to Watchlist'}
    </button>
  );
}

export default AddToWatchlistButton;
