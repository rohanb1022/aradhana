export const addComment = async (req , res) => {
    const { content } = req.body;
    const blogId = req.params.id; // Assuming the blog ID is passed as a URL parameter
    const userId = req.user._id;

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
