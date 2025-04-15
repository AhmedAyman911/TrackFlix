import UserModel from '../models/User.js';

export const saveToken = async (req, res) => {
    const { clerkId } = req.body;

    if (!clerkId ) {
      return res.status(400).json({ message: "Missing clerkId" });
    }
  
    try {
      let user = await UserModel.findOne({ clerkId });
  
      if (user) {
        await user.save();
      } else {
        await UserModel.create({ clerkId});
      }
  
      res.json({ message: "clerkId saved" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
};
