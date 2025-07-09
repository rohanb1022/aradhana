import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate("owner", "username");
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getBlogById = async (req  ,res) => {
    const blogId = req.params.id;
    try {
        const blog = await Blog.findById(blogId).populate("owner", "username");
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
} 

export const createBlog = async (req, res) => {
    const { title, content, topics } = req.body;
    const owner = req.user._id;

    try {

        if (!title || !content || !topics || !owner) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findById(owner);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newBlog = new Blog({
            title,
            content,
            topics,
            owner
        });

        await newBlog.save();
        await User.findByIdAndUpdate(owner, { $push: { blogs: newBlog._id } });
        return res.status(201).json(newBlog);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user._id;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.owner.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this blog" });
        }

        await Blog.findByIdAndDelete(blogId);
        await User.findByIdAndUpdate(userId, { $pull: { blogs: blogId } });
        return res.status(200).json({ 
            message: "Blog deleted successfully",
            title : blog.title
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message : "Internal server error"});
    }
}