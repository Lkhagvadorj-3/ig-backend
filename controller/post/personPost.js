import { postModel } from "../../schema/post.schema.js";
export const personpost = async (req, res) => {
  const userId = req.user._id;
  const posts = await postModel.find({ user: userId });
  res.status(200).json(posts);
};
