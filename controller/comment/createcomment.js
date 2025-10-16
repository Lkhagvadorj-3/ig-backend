import { commentModel } from "../../schema/comment.schema.js";
export const createcomment = async (req, res) => {
  const userId = req.user._id;
  const { postId, comment } = req.body;
  const createdcomment = await commentModel.create({
    user: userId,
    posts: postId,
    comment,
  });
  res.status(200).json(createdcomment);
};
