import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },          
  mediaId: { type: String, required: true },           
  mediaType: { type: String, enum: ['movie', 'tv'], required: true },
  status: { 
    type: String,
    enum: ['watching', 'completed', 'plan to watch'],
    default: 'plan to watch'
  },
  addedAt: { type: Date, default: Date.now },
});


const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
export default Watchlist;
