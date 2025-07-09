import User from "../models/user.model.js";
import Blog from "../models/blog.model.js"

export const addComment = async (req , res) => {
    const { content } = req.body;
    const blogId = req.params.id; // Assuming the blog ID is passed as a URL parameter
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if(!blog){
      return res.status(404).json({message :" Blog not found"})
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message : "user not found" })
    }

    try {
        const comment = new Comment({
            blog: blogId,
            content,
            user: userId
        });


        await comment.save();
        await comment.populate('user', 'username');

        // Optionally, you can also update the blog to include the new comment
        await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });

        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getCommentsByBlogId = async (req, res) => {
    const blogId = req.params.id;

    try {
        const comments = await Comment.find({ blog: blogId }).populate('user', 'username');
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Allow only the owner of the comment to delete
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    // Remove the comment reference from the blog
    await Blog.findByIdAndUpdate(comment.blog, {
      $pull: { comments: comment._id },
    });

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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