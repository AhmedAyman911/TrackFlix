import app from "../index.js";
import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const app = express();

app.get('/private', ClerkExpressRequireAuth(), (req, res) => {
  res.json({ message: `Hello, ${req.auth.userId}!` });
});


export default app