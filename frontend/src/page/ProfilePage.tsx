/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useBlogStore } from "@/store/useBlogStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";

const ProfilePage = () => {
  const { authUser, addDetails } = useAuthStore();
  const { posts, getAllBlogs } = useBlogStore();
  const [educationInput, setEducationInput] = useState("");
  const [backgroundInput, setBackgroundInput] = useState("");

  useEffect(() => {
    getAllBlogs();
  }, []);

  const userPosts = posts.filter(post => post.owner._id === authUser?._id);

  const handleUpdate = () => {
    const formData = {
      Education: educationInput,
      background: backgroundInput,
    };
    addDetails(formData);
  };

  if (!authUser) {
    return (
      <div className="text-white text-center mt-10">Loading user data...</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-10 text-white"
    >
      {/* Profile Section */}
      <div className="bg-black rounded-2xl shadow-xl p-6 mb-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/10 rounded-full" /> {/* Placeholder for ProfilePic */}
          <div>
            <h1 className="text-3xl font-bold">@{authUser.username}</h1>
            <p className="text-white/60">
              {authUser.firstname} {authUser.lastname} • {authUser.email}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Education Field */}
          <div>
            <label className="block text-sm text-white/60">Education</label>
            {authUser.Education ? (
              <p className="text-white font-medium">{authUser.Education}</p>
            ) : (
              <div>
                <p className="text-red-500 text-sm">Not Provided</p>
                <input
                  type="text"
                  className="mt-1 w-full bg-white/10 border border-white/20 p-2 rounded-lg text-white focus:outline-none"
                  value={educationInput}
                  onChange={(e) => setEducationInput(e.target.value)}
                  placeholder="Enter your education"
                />
              </div>
            )}
          </div>

          {/* Background Field */}
          <div>
            <label className="block text-sm text-white/60">Background</label>
            {authUser.background ? (
              <p className="text-white font-medium">{authUser.background}</p>
            ) : (
              <div>
                <p className="text-red-500 text-sm">Not Provided</p>
                <input
                  type="text"
                  className="mt-1 w-full bg-white/10 border border-white/20 p-2 rounded-lg text-white focus:outline-none"
                  value={backgroundInput}
                  onChange={(e) => setBackgroundInput(e.target.value)}
                  placeholder="Company, college or school name"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        {(!authUser.Education || !authUser.background) && (
          <div className="mt-6">
            <Button
              onClick={handleUpdate}
              className="bg-white text-black rounded-xl px-6 py-2 hover:bg-gray-200"
            >
              Save Details
            </Button>
          </div>
        )}
      </div>

      {/* User Blogs Section */}
      <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProfilePage;
