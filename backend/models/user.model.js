import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    username:  { type: String, required: true, unique: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    blogs:     [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    profilePic: String,
    background: String,
    Education: String,
    bio: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
