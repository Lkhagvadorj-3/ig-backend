import { postModel } from "../../schema/post.schema.js";

export const togglePostLike = async (req, res) => {
  const user = req.user;
  const params = req.params;
  const postId = params.postId;
  const post = await postModel.findById(postId);
  console.log(post, "post");
  const postlikes = post.likes;
  console.log(postlikes, "like");

  const isLiked = postlikes.includes(user._id);
  console.log(isLiked, "isliked");

  if (isLiked) {
    await postModel.findByIdAndUpdate(postId, {
      likes: postlikes.filter((likes) => likes.toString() !== user._id),
    });
  } else {
    await postModel.findByIdAndUpdate(postId, {
      likes: [...postlikes, user._id],
    });
  }
  res.status(200).json({ message: "success" });
};
