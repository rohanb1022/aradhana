/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBlogStore } from "@/store/useBlogStore";
import { motion } from "framer-motion";
import { CalendarDays, User , Heart } from "lucide-react";

const PostDetails = () => {
  const { getSinglePost, post , makeLike , postLikes } = useBlogStore();
  const location = useLocation();
  const blogId = location.pathname.split("/")[2];
  const [likeToggler , setLikeToggler] = useState(false);


  useEffect(() => {
    getSinglePost(blogId);
  }, []);

  const handleClick = () => {
    makeLike(blogId);
    getSinglePost(blogId)
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Loading post...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-10 bg-black rounded-4xl shadow-lg "
    >
      {/* Image */}
      <div className="w-full h-64 overflow-hidden rounded-2xl shadow-lg mb-6">
        <img
          src="https://images.unsplash.com/photo-1659600558336-0ec6e8f58388?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Post Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
        <div className="flex items-center gap-1">
          <User className="w-6 h-6" />
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

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.topics.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Comments */}
      <div className="flex justify-center items-center gap-1 mt-6 w-fit" >
        <div>
          <Heart 
            className={`w-10 h-10 ${likeToggler ? "fill-red-500" : "fill-white"}`} 
            onClick={() => (handleClick() , setLikeToggler(!likeToggler))}
          />
          <p className="text-white">{postLikes}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetails;
