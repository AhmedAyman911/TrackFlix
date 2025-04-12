import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

function AddToWatchlistButton({ mediaId, mediaType }) {
  const { getToken, userId } = useAuth();

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
      className="px-4 py-2 mt-4 bg-red-600 text-white rounded hover:bg-blue-700"
      onClick={handleAddToWatchlist}
    >
      + Add to Watchlist
    </button>
  );
}

export default AddToWatchlistButton;
