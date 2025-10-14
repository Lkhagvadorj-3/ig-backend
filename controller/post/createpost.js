import { postModel } from "../../schema/post.schema.js";

export const createpost = async (req, res) => {
  const data = req.body;
  const user = req.user;
  const { userId, caption, images } = data;
  const createdPost = await postModel.create({
    user: user._id,
    images,
    caption,
  });
  res.status(200).json(createdPost);
};
