import { commentModel } from "../../schema/comment.schema.js";
export const getcomment = async (req, res) => {
  const postId = req.params.postId;
  const comments = await commentModel.find({
    posts: postId,
  }).populate({path:"posts" , populate:{path:"user" , select:" username profilePicture"}}).populate("user" , "username profilePicture")
  res.status(200).json(comments);
};
//commentoo duusga , profilepicture hii shandcn avatar , otheruseree duusga
