/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/useBlogStore";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAddingPost } = useBlogStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file only");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append(
      "topics",
      topics
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t)
        .join(",")
    );
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/blogs/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create blog post");
      }

      toast.success("Blog created successfully!");
      setTitle("");
      setContent("");
      setTopics("");
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-28 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border space-y-6"
      >
        <h2 className="text-2xl font-bold text-black">Create a New Post</h2>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black">Title</label>
          <Input
            value={title}
            placeholder="Enter blog title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black">Content</label>
          <Textarea
            value={content}
            placeholder="Write your blog content..."
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black">Topics (comma-separated)</label>
          <Input
            value={topics}
            placeholder="e.g. react, webdev, ui"
            onChange={(e) => setTopics(e.target.value)}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border"
              />
              <button
                onClick={removeImage}
                type="button"
                className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
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
