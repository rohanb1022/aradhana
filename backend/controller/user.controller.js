import User from "../models/user.model.js";

export const addDetails = async (req, res) => {
  const userId = req.user._id;
  const { background, Education,  profilePic } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.background = background;
    user.Education = Education;
    user.profilePic = profilePic;
    await user.save();
    return res.status(200).json({user});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
