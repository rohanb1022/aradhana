import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    content: { type: String, required: true },
    topics:  [String],
    owner:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes:   [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // like list
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
