import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import watchlistRoutes from './routes/watchlist.js';
dotenv.config();
import { ClerkExpressWithAuth, ClerkExpressRequireAuth  } from '@clerk/clerk-sdk-node';

const clerkMiddleware = ClerkExpressWithAuth({
  secretkey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
});

const app = express();

const allowedOrigins = [
  "https://trackflix-one.vercel.app",
  "http://localhost:5173"
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use('/users', userRoutes);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use('/watchlist', watchlistRoutes);

app.use(express.json());
const mongoUri = process.env.mongoUri
mongoose.connect(mongoUri)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error:", err));

app.get('/private', ClerkExpressRequireAuth (), (req, res) => {
  res.json({ message: `Hello, ${req.auth.userId}! This is a protected route.` });
});

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app