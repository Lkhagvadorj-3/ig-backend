import { postModel } from "../../schema/post.schema.js";
export const viewUser = async (req, res) => {
  const params = req.params;
  const userId = params.userId;
  const posts = await postModel.find({ user: userId });
  res.status(200).json(posts);
};
