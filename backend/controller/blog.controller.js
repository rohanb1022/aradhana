import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

// give all the blogs of all the users
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("owner", "username");
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// give all the blogs of a particular user
export const getBlogById = async (req, res) => {
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
};

// create a blog (only authenticated users)
export const createBlog = async (req, res) => {
  const { title, content, topics } = req.body;
  const owner = req.user._id;

  try {
    if (!title || !content || !topics || !owner) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let imageUrl = "";
    if (req.file && req.file.path) {
      imageUrl = req.file.path; // Cloudinary gives us secure URL
    }

    const newBlog = new Blog({
      title,
      content,
      topics,
      owner,
      image: imageUrl,
    });

    await newBlog.save();
    await User.findByIdAndUpdate(owner, { $push: { blogs: newBlog._id } });

    return res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// delete the blogs (only owner can do)
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user._id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
      message: "Blog deleted successfully",
      title: blog.title,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// update the blog (only owner can do)
export const updateBlog = async (req, res) => {
  try {
    const { title, content, topics, image } = req.body;
    const blogId = req.params.id;
    const userId = req.user._id;

    // Check blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check ownership
    if (blog.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to update" });
    }

    // Optional image upload
    let imageUrl = blog.image;
    if (image && image.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Update the blog
    blog.title = title;
    blog.content = content;
    blog.topics = topics;
    blog.image = imageUrl;

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

