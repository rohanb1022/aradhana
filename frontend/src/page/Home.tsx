/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/BlogCard";
import { useBlogStore } from "@/store/useBlogStore";
import { motion } from "framer-motion";

const Home = () => {
  const { getAllBlogs, posts } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <div className="min-h-screen pt-14 px-4 sm:px-8 lg:px-16">
      <h1 className="text-3xl font-bold mb-4 ">Explore Blogs</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <Input
          placeholder="Search by title or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lg:max-w-sm sm:max-w-[80px] rounded-4xl bg-black text-gray-300 mx-auto w-[20vw]"></Input>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">No blogs found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard blog={post} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
