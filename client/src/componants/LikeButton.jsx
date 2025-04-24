import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { getMediaDetails } from '../api/tmbd';
import { Heart, HeartOff } from 'lucide-react';
function LikeButton({ mediaId, mediaType }) {
    const { getToken, userId } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [media, setMediaList] = useState([]);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    useEffect(() => {
        const fetchLiked = async () => {
            try {
                const clerkId = userId;
                const res = await axios.get(`https://trackflix-api.vercel.app/liked/${clerkId}`);
                const items = res.data;

                const mediaData = await Promise.all(
                    items.map(async (item) => {
                        const data = await getMediaDetails(item.mediaType, item.mediaId);
                        return {
                            mediaType: item.mediaType,
                            movie: data,
                        };
                    }),
                );

                setMediaList(mediaData);
            } catch (err) {
                console.error('Failed to fetch Liked:', err);
            }
        };

        fetchLiked();
    }, []);

    useEffect(() => {
        const found = media.find((item) => item.movie.id === mediaId);
        if (found) setIsLiked(true);
        else setIsLiked(false);
    }, [media, mediaId]);

    const handleRemove = async (mediaId) => {
        try {
            console.log("Sending:", userId, mediaId);
            await axios.delete('https://trackflix-api.vercel.app/liked/remove', {
                data: {
                    clerkId: userId,
                    mediaId,
                },
            });
            setMediaList((prev) => prev.filter((m) => m.movie.id !== mediaId));
        } catch (err) {
            console.error('Failed to remove from Liked:', err);
        }
    };

    const handleAddToLiked = async () => {
        try {
            const token = await getToken();
            const res = await axios.post(
                'http://localhost:5000/liked/add',
                {
                    clerkId: userId,
                    mediaId,
                    mediaType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);
            setMediaList((prev) => [
                ...prev,
                {
                    mediaType,
                    movie: { id: mediaId },
                },
            ]);
        } catch (error) {
            console.error('Error adding to Liked:', error.response?.data || error.message);
            setSnackbarVisible(true);
            setTimeout(() => setSnackbarVisible(false), 3000);
        }
    };

    return (
        <div>
            {snackbarVisible && (
                <div
                    className="fixed ml-48 mt-4 justify-center bg-red-500 text-white py-2 px-4 rounded shadow-md animate-fade-in-out"
                >
                    Please SignIn!
                </div>
            )}
            <button
                onClick={isLiked ? () => handleRemove(mediaId) : handleAddToLiked}
                className={`px-4 py-2 mt-4 rounded text-white ${isLiked ? 'bg-gray-600 hover:bg-red-700 border-2 border-red-600' : 'bg-red-600 hover:bg-red-700'}`}
            >
                {isLiked ? (
                    <>
                        <div className='flex'>
                            <Heart className="text-red-500 fill-red-500 mr-2 w-5" />
                            <span className='text-md'>Liked</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex'>
                            <Heart className="text-gray-500 mr-2 w-5" />
                            <span className='text-md'>Like</span>
                        </div>
                    </>
                )}

            </button></div>
    );
}

export default LikeButton;
