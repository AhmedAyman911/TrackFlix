import express from 'express';
import { saveToken } from '../controller/user.js';

const router = express.Router();
router.post('/save-clerkId', saveToken);

export default router;
