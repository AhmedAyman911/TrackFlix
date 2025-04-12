import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import MovieCard from '../componants/card';
import { getMediaDetails } from '../api/tmbd';
function Watchlist() {
    const [mediaList, setMediaList] = useState([]);
  const { user, isLoaded } = useUser();

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
              movie: data,
            };
          })
        );

        setMediaList(mediaData);
      } catch (err) {
        console.error('Failed to fetch watchlist:', err);
      }
    };

    fetchWatchlist();
  }, [isLoaded, user]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 pt-20">
      {mediaList.map((item, index) => (
        <MovieCard
          key={item.movie.id}
          movie={item.movie}
          mediaType={item.mediaType}
          index={index}
        />
      ))}
    </div>
  );
}

export default Watchlist;
