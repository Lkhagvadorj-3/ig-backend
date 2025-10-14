import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  caption: { type: String, required: true },
  images: { type: [{ type: String, required: true }], required: true },
  likes: [{ type: Schema.Types.ObjectId, required: true }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
export const postModel = mongoose.model("posts", postSchema);
