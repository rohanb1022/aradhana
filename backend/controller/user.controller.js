import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";

export const likePost = async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the blogId is present in the user's likedPosts
    if (user.likedPosts.includes(blogId)) {
      user.likedPosts = user.likedPosts.filter((id) => id !== blogId);
    } else {
      user.likedPosts.push(blogId);
    }
    await user.save();

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    // Update the likes in the blog
    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter((id) => id !== userId);
    } else {
      blog.likes.push(userId);
    }
    await blog.save(); // Don't forget this
    res.status(200).json({
      message: "Post liked/unliked successfully",
      likes: blog.likes.length,
      likedBy: blog.likes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addDetails = async (req, res) => {
  const userId = req.user._id;
  const { background, Education, bio, profilePic } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.background = background;
    user.Education = Education;
    user.bio = bio;
    user.profilePic = profilePic;
    await user.save();
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
