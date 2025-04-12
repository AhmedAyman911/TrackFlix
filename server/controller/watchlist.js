import Watchlist from "../models/Watchlist.js";
// Add item to watchlist
export const addToWatchlist = async (req, res) => {
    const { clerkId, mediaId, mediaType, status } = req.body;
  
    try {
      const existing = await Watchlist.findOne({ clerkId, mediaId });
      if (existing) {
        return res.status(400).json({ message: 'Already in watchlist' });
      }
  
      const item = new Watchlist({ clerkId, mediaId, mediaType, status });
      await item.save();
      res.status(201).json({ message: 'Added to watchlist', item });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Get user's watchlist
  export const getWatchlist = async (req, res) => {
    const { clerkId } = req.params;
  
    try {
      const list = await Watchlist.find({ clerkId });
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Remove from watchlist
  export const removeFromWatchlist = async (req, res) => {
    const { clerkId, mediaId } = req.body;
  
    try {
      await Watchlist.deleteOne({ clerkId, mediaId });
      res.json({ message: 'Removed from watchlist' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Optional: update status
  export const updateStatus = async (req, res) => {
    const { clerkId, mediaId, status } = req.body;
  
    try {
      const updated = await Watchlist.findOneAndUpdate(
        { clerkId, mediaId },
        { status },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };