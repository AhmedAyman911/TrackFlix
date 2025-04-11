import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const PrivateDataFetcher = () => {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    const fetchPrivateData = async () => {
      const token = await getToken();
      console.log("Token:", token);
      const res = await axios.get('https://trackflix-api.vercel.app/private', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(res.data);
      try {
        await axios.post('https://trackflix-api.vercel.app/users/save-token', {
          clerkId: userId,
          token: token,
        });
        console.log("Token saved to DB");
      } catch (err) {
        console.error("Error saving token:", err);
      }
    };

    fetchPrivateData();
  }, [getToken, userId]);

  return null; // or some loading UI
};

export default PrivateDataFetcher;
