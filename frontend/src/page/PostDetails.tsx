/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlogStore } from "@/store/useBlogStore";
import { motion } from "framer-motion";
import {
  CalendarDays,
  User,
  Heart,
  MessageCircleMore,
  Loader,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import AddComment from "@/components/AddComment";
import CommentSection from "@/components/CommentSection";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const PostDetails = () => {
  const { getSinglePost, post, makeLike, removePost } = useBlogStore();
  const { authUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const blogId = location.pathname.split("/")[2];

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [openCommentSection, setOpenCommentSection] = useState(false);

  useEffect(() => {
    getSinglePost(blogId);
  }, [blogId]);

  useEffect(() => {
    if (post && authUser?._id) {
      setLiked(post.likes.includes(authUser._id));
      setLikeCount(post.likes.length);
    }
  }, [post, authUser]);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
    await makeLike(blogId);
    getSinglePost(blogId);
  };

  const handleCommentSection = () => {
    setOpenCommentSection((prev) => !prev);
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await removePost(blogId);
      toast.success("Blog deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const defaultimage =
    "https://plus.unsplash.com/premium_photo-1706382043344-4a901b8e1864?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2hub2xvZ2ljYWwlMjBibG9nc3xlbnwwfHwwfHx8MA%3D%3D";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-10 bg-black rounded-4xl shadow-lg"
    >
      {/* Banner Image */}
      <div className="w-full h-64 overflow-hidden rounded-2xl shadow-lg mb-6">
        <img
          src={post.image || defaultimage}
          alt="Post Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
        <div className="flex items-center gap-1">
          <User className="w-5 h-5" />
          <span>@{post.owner?.username}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-white text-lg leading-relaxed mb-8 whitespace-pre-wrap"
      >
        {post.content}
      </motion.div>

      {/* Topics */}
      <div className="flex flex-wrap gap-2 mb-8">
        {post.topics.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Icons */}
      {authUser && (
        <div className="flex items-center gap-4 mt-6">
          {/* Like Icon */}
          <div className="flex items-center">
            <Heart
              className={`w-8 h-8 cursor-pointer transition duration-200 ${
                liked ? "fill-red-500" : "fill-white"
              }`}
              onClick={handleLike}
            />
            <span className="text-white text-sm">{likeCount}</span>
          </div>

          {/* Comment Toggle */}
          <div
            className="cursor-pointer flex items-center"
            onClick={handleCommentSection}
            title={openCommentSection ? "Hide Comments" : "Show Comments"}
          >
            <MessageCircleMore className="fill-white w-7 h-7" />
            <span className="text-white text-md">{post.comments.length}</span>
          </div>

          <div>
            <Button onClick={() => handleSpeak(post.title + post.content)}>
              🔊 Listen to this blog
            </Button>
          </div>

          <div></div>

          {/* Edit & Delete for Owner */}
          {authUser._id === post.owner?._id && (
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => navigate(`/edit/${post._id}`)}
                className="text-sm px-3 py-1 bg-white text-black rounded-md hover:bg-gray-200 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* Comment Section */}
      {openCommentSection && authUser && (
        <div className="mt-6 space-y-4">
          <AddComment />
          <CommentSection blogId={blogId} />
        </div>
      )}
    </motion.div>
  );
};

export default PostDetails;
