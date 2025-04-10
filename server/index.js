import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { ClerkExpressWithAuth, ClerkExpressRequireAuth  } from '@clerk/clerk-sdk-node';

const clerkMiddleware = ClerkExpressWithAuth({
  secretkey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware);
const allowedOrigins = [
  "http://localhost:5173", // Dev
  "https://trackflix.vercel.app", // Production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.get('/private', ClerkExpressRequireAuth (), (req, res) => {
  res.json({ message: `Hello, ${req.auth.userId}! This is a protected route.` });
});

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY);
});
export default app