import express from 'express';
import { saveToken } from '../controller/user.js';

const router = express.Router();
router.post('/save-token', saveToken);

export default router;
