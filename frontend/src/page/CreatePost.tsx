import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/useBlogStore";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState("");

  const { addPost, isAddingPost } = useBlogStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const topicsArray = topics
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    addPost({
      title,
      content,
      topics: topicsArray,
    });

    setTitle("");
    setContent("");
    setTopics("");
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-28 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border space-y-6"
      >
        <h2 className="text-2xl font-bold text-black">Create a New Post</h2>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black" htmlFor="title">
            Title
          </label>
          <Input
            id="title"
            value={title}
            placeholder="Enter blog title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black" htmlFor="content">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            placeholder="Write your blog content..."
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black" htmlFor="topics">
            Topics (comma-separated)
          </label>
          <Input
            id="topics"
            value={topics}
            placeholder="e.g. web, react, blog"
            onChange={(e) => setTopics(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={isAddingPost}
          className="w-full bg-black text-white hover:bg-neutral-800 transition"
        >
          {isAddingPost ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
