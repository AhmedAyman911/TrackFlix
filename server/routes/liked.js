import express from 'express';
import {
  addToLiked,
  getLiked,
  removeFromLiked
} from '../controller/liked.js';

const router = express.Router();

router.post('/add', addToLiked);
router.get('/:clerkId', getLiked);
router.delete('/remove', removeFromLiked);

export default router;
