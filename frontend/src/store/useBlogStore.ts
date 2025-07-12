import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

interface postType {
  _id?: string;
  title: string;
  content: string;
  topics: string[];
  image : string;
  owner: {
    username: string;
    _id: string;
  };
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  topics: string[];
  image?: string; // Optional base64 string
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
  addPost: (post: CreatePostInput) => Promise<void>;
  removePost: (blogId: string) => void;
  getAllBlogs: () => Promise<void>;
  getSinglePost: (blogId: string) => Promise<void>;
  makeLike: (blogId: string) => Promise<void>;
  makeComment: (blogId: string, comment: string) => Promise<void>;
  getCommentsByBlogId: (blogId: string) => Promise<void>;
  updateBlog: (blogId: string, updatedData: Partial<postType>) => Promise<void>;
}

export interface Comment {
  _id: string;
  content: string;
  owner: {
    username: string;
    _id: string;
  };
}

export const useBlogStore = create<BlogStore>((set) => ({
  
  posts: [],
  likes: [],
  post: {
    _id: "",
    title: "",
    content: "",
    topics: [],
    image : "",
    owner: {
      username: "",
      _id: "",
    },
    likes: [],
    comments: [{
      _id: "",
      content: "",
      owner: {
        username: "",
        _id: "",
      },
    }],
    createdAt: "",
    updatedAt: "",
  },
  postLikes: 0,
  isAddingPost: false,
  isDeletingPost: false,
  isFetchingPosts: false,
  isFetchingPost: false,
  isFetchingComments: false,

  /**
   Fetches all posts from the server and updates the state with the posts.
   Shows a toast notification if the request fails.
   */
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

  /**
   Adds a new post to the server and updates the state with the new post.
   Shows a toast notification if the request succeeds or fails.
   */
  addPost: async (post: CreatePostInput) => {
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

  /**
    Removes a post from the server and updates the state with the new posts.
    Shows a toast notification if the request succeeds or fails.
   */
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

/**
  Fetches a single post from the server using the provided blog ID
  and updates the state with the retrieved post data.
  Shows a toast notification if the request fails.
*/
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

  /**
    Likes a post in the store and updates the state with the new
    number of likes and the IDs of the users who liked the post.
   */
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


  /**
    Adds a comment to the post in the store and updates the state
    with the new comment.

    The ID of the blog post to which the comment is being added.
    The content of the comment to be added.
  */
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
  
  /**
    Fetches all comments for a specific blog post by ID from the
    server and updates the state with the comments.
    The ID of the blog post to which the comments belong.
  */
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
  

  /**
    Updates a blog post on the server and updates the state with the new
    version of the post.
    The ID of the blog post to be updated.
    The new version of the blog post. Only the fields specified in this
    object will be updated on the server.
  */
  updateBlog: async (blogId: string, updatedData: Partial<postType>) => {
  try {
    const response = await axiosInstance.put(`/blogs/update/${blogId}`, updatedData);
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === blogId ? response.data : post
      ),
      post: response.data,
    }));
    toast.success("Post updated successfully", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (error) {
    console.error("Failed to update post:", error);
    toast.error("Error updating post", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
},

}));
