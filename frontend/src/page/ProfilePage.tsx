/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useBlogStore } from "@/store/useBlogStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import { User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, addDetails } = useAuthStore();
  const { posts, getAllBlogs } = useBlogStore();
  const [educationInput, setEducationInput] = useState("");
  const [backgroundInput, setBackgroundInput] = useState("");

  useEffect(() => {
    getAllBlogs();
  }, []);

  const userPosts = posts.filter((post) => {
    const ownerId =
      typeof post.owner === "object" ? post.owner._id : post.owner;
    return ownerId === authUser?._id;
  });

  const [showEditFields, setShowEditFields] = useState(false);

  const handleUpdate = () => {
    const formData = {
      education: educationInput,
      background: backgroundInput,
    };
    addDetails(formData);
    setShowEditFields(false);
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
      className="max-w-5xl mx-auto px-4 py-10 text-white"
    >
      {/* Profile Header */}
      <div className="bg-black rounded-2xl shadow-xl p-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            <User strokeWidth={1.5} className="w-full h-fit"/>
          </div>
          <div>
            <h1 className="text-3xl font-bold">@{authUser.username}</h1>
            <p className="text-white/60 text-[12px] ">• {authUser.email}</p>
          </div>
        </div>

        {/* Education & Background */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-white/60">Education</label>
            <p className="text-white font-medium">
              {authUser.education || "Not Provided"}
            </p>
            {showEditFields && (
              <input
                type="text"
                className="mt-2 w-full bg-white/10 border border-white/20 p-2 rounded-lg text-white focus:outline-none"
                value={educationInput}
                onChange={(e) => setEducationInput(e.target.value)}
                placeholder="Enter your education"
              />
            )}
          </div>

          <div>
            <label className="block text-sm text-white/60">Background</label>
            <p className="text-white font-medium">
              {authUser.background || "Not Provided"}
            </p>
            {showEditFields && (
              <input
                type="text"
                className="mt-2 w-full bg-white/10 border border-white/20 p-2 rounded-lg text-white focus:outline-none"
                value={backgroundInput}
                onChange={(e) => setBackgroundInput(e.target.value)}
                placeholder="Company, college or school name"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            onClick={() => setShowEditFields((prev) => !prev)}
            className="bg-white text-black rounded-xl px-6 py-2 hover:bg-gray-200"
          >
            {showEditFields ? "Cancel" : "Update Details"}
          </Button>

          {showEditFields && (
            <Button
              onClick={handleUpdate}
              className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700"
            >
              Save
            </Button>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
      {userPosts.length === 0 ? (
        <p className="text-white/60">You haven't written any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;
