import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

interface CommentType {
  _id: string;
  content: string;
  owner: {
    username: string;
    _id: string;
  };
}

interface postType {
  _id?: string;
  title: string;
  content: string;
  topics: string[];
  owner: {
    username: string;
    _id: string;
  };
  likes: string[];
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
}

interface BlogStore {
  posts: postType[];
  post: postType;
  postLikes: number;
  likes: string[];
  isAddingPost: boolean;
  isDeletingPost: boolean;
  isFetchingPosts: boolean;
  isFetchingPost: boolean;
  isFetchingComments: boolean;
  addPost: (post: postType) => Promise<void>;
  removePost: (blogId: string) => void;
  updatePost: (title: string, updatedPost: postType) => void;
  getAllBlogs: () => Promise<void>;
  getSinglePost: (blogId: string) => Promise<void>;
  makeLike: (blogId: string) => Promise<void>;
  makeComment: (blogId: string, comment: string) => Promise<void>;
  getCommentsByBlogId: (blogId: string) => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  likes: [],
  post: {
    _id: "",
    title: "",
    content: "",
    topics: [],
    owner: {
      username: "",
      _id: "",
    },
    likes: [],
    comments: [],
    createdAt: "",
    updatedAt: "",
  },
  postLikes: 0,
  isAddingPost: false,
  isDeletingPost: false,
  isFetchingPosts: false,
  isFetchingPost: false,
  isFetchingComments: false,

  getAllBlogs: async () => {
    set({ isFetchingPosts: true });
    try {
      const response = await axiosInstance.get("/blogs/getBlogs");
      set({ posts: response.data });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch posts", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      set({ isFetchingPosts: false });
    }
  },

  addPost: async (post: postType) => {
    set({ isAddingPost: true });
    try {
      const response = await axiosInstance.post("/blogs/create", post);
      set((state) => ({
        posts: [...state.posts, response.data],
      }));
      toast.success("Post added successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Failed to add post", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      set({ isAddingPost: false });
    }
  },

  removePost: async (blogId: string) => {
    set({ isDeletingPost: true });
    try {
      const response = await axiosInstance.delete(`/blogs/delete/${blogId}`);
      const blogTitle = response.data.title;
      set((state) => ({
        posts: state.posts.filter((post) => post.title !== blogTitle),
      }));
      toast.success("Post deleted successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      set({ isDeletingPost: false });
    }
  },

  getSinglePost: async (blogId: string) => {
    set({ isFetchingPost: true });
    try {
      const response = await axiosInstance.get(`/blogs/${blogId}`);
      set({ post: response.data });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch post", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },

  updatePost: (title: string, updatedPost: postType) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.title === title ? updatedPost : post
      ),
    }));
  },

  makeLike: async (blogId: string) => {
    try {
      const response = await axiosInstance.put(`/comments/${blogId}`);
      set((state) => ({
        post: {
          ...state.post,
          likes: response.data.likedBy,
        },
        postLikes: response.data.likes,
      }));
    } catch (error) {
      console.error("Failed to like post:", error);
      toast.error("Failed to like post", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },

  makeComment: async (blogId: string, comment: string) => {
    try {
      const response = await axiosInstance.post(`/comments/${blogId}`, { content: comment });
      set((state) => ({
        post: {
          ...state.post,
          comments: [...state.post.comments, response.data],
        },
      }));
      toast.success("Comment added successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },
  
  getCommentsByBlogId: async (blogId: string) => {
    set({ isFetchingComments: true });
    try {
      const response = await axiosInstance.get(`/comments/${blogId}`);
      set((state) => ({
        post: {
          ...state.post,
          comments: response.data,
        },
      }));
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching comments", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      set({ isFetchingComments: false });
    }
  },
}));
