import express from 'express';
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  updateStatus
} from '../controller/watchlist.js';

const router = express.Router();

router.post('/add', addToWatchlist);
router.get('/:clerkId', getWatchlist);
router.delete('/remove', removeFromWatchlist);
router.patch('/update-status', updateStatus);

export default router;
