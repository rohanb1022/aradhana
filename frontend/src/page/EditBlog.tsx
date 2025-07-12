/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/useBlogStore";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const EditPost = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const { post, getSinglePost, updateBlog } = useBlogStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (blogId) {
      getSinglePost(blogId);
    }
  }, [blogId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setTopics((post.topics || []).join(", "));
      setImagePreview(post.image || null);
    }
  }, [post]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const topicsArray = topics
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    if (!title || !content || topicsArray.length === 0) {
      toast.error("Please fill all fields.");
      return;
    }

    const updatedData = {
      title,
      content,
      topics: topicsArray,
      image: imagePreview ?? undefined,
    };

    // why ?? undefined ?
    //     The issue is occurring because the image property in the updatedData object is of type string | null, but the image property in the
    // postType
    //  interface (which is used as the type for the updatedData parameter in the
    // updateBlog
    //  function) is of type string | undefined.
    // In TypeScript, null and undefined are two distinct types, and a value of type null is not assignable to a property of type string | undefined.
    // To fix this issue, you can change the type of the image property in the updatedData object to string | undefined by using the ?? operator to provide a default value of undefined when imagePreview is null.


    if (!blogId) return;
    await updateBlog(blogId, updatedData);
    navigate(`/detailedPost/${blogId}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-28 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border space-y-6"
      >
        <h2 className="text-2xl font-bold text-black">Edit Post</h2>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black" htmlFor="title">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit title"
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
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edit content"
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
            onChange={(e) => setTopics(e.target.value)}
            placeholder="e.g. react, ui, hooks"
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium text-black">Blog Image</label>
          {imagePreview ? (
            <div className="relative w-fit">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                onClick={removeImage}
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="text-sm"
            />
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-neutral-800"
        >
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default EditPost;
