/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

interface BlogPost {
  _id?: string; // Optional, as it may not be present when creating a new post
  title: string;
  content: string;
  topics: string[];
}

interface BlogStore {
  posts: BlogPost[];
  isAddingPost: boolean;
  isDeletingPost: boolean;
  addPost: (post: BlogPost) => Promise<void>;
  removePost: (title: string) => void;
  updatePost: (title: string, updatedPost: BlogPost) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  isAddingPost: false,
  isDeletingPost: false,

  addPost: async (post: BlogPost) => {
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

  removePost: async (blogId : string) => {
    set({isDeletingPost : true});
    try {
        const response  = await axiosInstance.delete(`/blogs/delete/${blogId}`);
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
        console.log(error)
        toast.error("Failed to delete post", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
    }finally{
        set({isDeletingPost : false})
    }
  },

  updatePost: (title: string, updatedPost: BlogPost) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.title === title ? updatedPost : post
      ),
    }));
  },
}));
