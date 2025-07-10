"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/useBlogStore";
import { useLocation } from "react-router-dom";

const AddComment = () => {
  const [commentText, setCommentText] = useState("");
  const { makeComment, getCommentsByBlogId } = useBlogStore();
  const location = useLocation();
  const blogId = location.pathname.split("/")[2];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    await makeComment(blogId, commentText);
    await getCommentsByBlogId(blogId); // refetch after posting
    setCommentText(""); // clear input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-[#1A1A1A] border border-white/10 p-4 rounded-xl mt-8"
    >
      <Input
        type="text"
        placeholder="Write a comment..."
        className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button
        type="submit"
        className="bg-white text-black hover:bg-gray-200 transition"
      >
        Comment
      </Button>
    </form>
  );
};

export default AddComment;
