import Episodes from "../models/Episodes.js";

export const addEpisode = async (req, res) => {
    const { clerkId, episodeId } = req.body;
    try {
      const item = new Episodes({ clerkId, episodeId });
      await item.save();
      res.status(201).json({ message: 'ep Added to db', item });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  export const getWatchedEpisodes = async (req, res) => {
    const { clerkId } = req.params;
  
    try {
      const list = await Episodes.find({ clerkId });
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  export const removeFromWatchedEpisodes = async (req, res) => {
    console.log("Received delete request with body:", req.body);
    const { clerkId, episodeId } = req.body;
  
    try {
      await Episodes.deleteOne({ clerkId, episodeId });
      res.json({ message: 'Removed from db' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  