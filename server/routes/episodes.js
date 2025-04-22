import express from 'express';
import {
    addEpisode,
    getWatchedEpisodes,
    removeFromWatchedEpisodes
} from '../controller/episodes.js';

const router = express.Router();

router.post('/add', addEpisode);
router.get('/:clerkId', getWatchedEpisodes);
router.delete('/remove', removeFromWatchedEpisodes);

export default router;
