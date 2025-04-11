import UserModel from '../models/User.js';

export const saveToken = async (req, res) => {
    const { clerkId, token } = req.body;

    if (!clerkId || !token) {
      return res.status(400).json({ message: "Missing clerkId or token" });
    }
  
    try {
      let user = await UserModel.findOne({ clerkId });
  
      if (user) {
        user.token = token;
        await user.save();
      } else {
        await UserModel.create({ clerkId, token });
      }
  
      res.json({ message: "Token saved" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
};
