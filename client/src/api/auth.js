import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

function Dashboard() {
  const { getToken } = useAuth();

  const fetchPrivateData = async () => {
    const token = await getToken();
    console.log("Token:", token);
    const res = await axios.get('https://trackflix-api.vercel.app/private', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(res.data);
  };

  return (
    <button onClick={fetchPrivateData}>Get Private Data</button>
  );
}
