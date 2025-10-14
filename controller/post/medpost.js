import { postModel } from "../../schema/post.schema.js";

export const medposts = async (req, res) => {
  const user = req.user;
  const params = req.params;
  const { userId } = params;
  const posts = await postModel.find().populate("user");
  res.status(200).json(posts);
};
