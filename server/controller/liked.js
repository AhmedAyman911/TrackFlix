import LikeB from "../models/LikedB.js";

export const addToLiked = async (req, res) => {
    const { clerkId, mediaId, mediaType } = req.body;
  
    try {
      const existing = await LikeB.findOne({ clerkId, mediaId });
      if (existing) {
        return res.status(400).json({ message: 'Already in Liked' });
      }
  
      const item = new LikeB({ clerkId, mediaId, mediaType });
      await item.save();
      res.status(201).json({ message: 'Added to Liked', item });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  
  export const getLiked = async (req, res) => {
    const { clerkId } = req.params;
  
    try {
      const list = await LikeB.find({ clerkId });
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  
  export const removeFromLiked = async (req, res) => {
    console.log("Received delete request with body:", req.body);
    const { clerkId, mediaId } = req.body;
  
    try {
      await LikeB.deleteOne({ clerkId, mediaId });
      res.json({ message: 'Removed from Liked' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };