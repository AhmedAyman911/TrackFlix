import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export default function Welcome() {
  const { getToken, userId, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fetchPrivateData = async () => {
      try {
        const token = await getToken();
        console.log("Token:", token);

        await axios.get("https://trackflix-api.vercel.app/private", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        await axios.post("https://trackflix-api.vercel.app/users/save-token", {
          clerkId: userId,
          token,
        });
        console.log("Token saved to DB ✅");
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Error saving token:", error.response?.data || error.message);
      }
    };

    fetchPrivateData();
  }, [getToken, userId, isSignedIn, isLoaded]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome 👋</h1>
      <p>Setting things up for you...</p>
    </div>
  );
}
