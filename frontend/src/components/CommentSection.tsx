/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import { LoaderCircle, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const CommentSection = ({ blogId }: { blogId: string }) => {
  const { getCommentsByBlogId, post, isFetchingComments } = useBlogStore();

  useEffect(() => {
    getCommentsByBlogId(blogId);
  }, [blogId]);

  if (isFetchingComments) {
    return (
      <div className="flex justify-center items-center py-6">
        <LoaderCircle className="h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="mt-8 bg-[#1A1A1A] border border-white/10 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white">Comments</h2>

      {post.comments.length === 0 ? (
        <p className="text-sm text-white/60">No comments yet. Be the first to start the conversation.</p>
      ) : (
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-4 bg-[#222] p-4 rounded-lg border border-white/10"
            >
              {/* Profile Picture or Icon */}
              <div className="flex-shrink-0">
                <UserCircle2 className="h-10 w-10 text-white/40" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium text-sm">
                    {comment.owner?.username ?? "Unknown user"}
                  </p>
                  <p className="text-xs text-white/40">
                    {new Date().toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="mt-1 text-white/70 text-sm leading-relaxed text-left whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
