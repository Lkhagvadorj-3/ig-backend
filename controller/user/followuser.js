import { userModel } from "../../schema/user.schema.js";

export const followUser = async (req, res) => {
  const followedUserId = req.params.followeduserid;
  const followingUserId = req.user._id;
  const followingUser = await userModel.findById(followingUserId);
  const followedUser = await userModel.findById(followedUserId);

  if (followedUserId === followingUserId) {
    res.status(400).json({ message: "araicde bro >:O" });
    return;
  }
  const test = followedUser.followers;
  const isFollowed = test.includes(followingUserId);

  if (isFollowed) {
    await userModel.findByIdAndUpdate(followingUserId, {
      following: followingUser.following.filter(
        (item) => item.toString() !== followedUserId
      ),
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      followers: followedUser.followers.filter(
        (item) => item.toString() !== followingUserId
      ),
    });
    res.status(200).json({ message: "success" });
  } else {
    await userModel.findByIdAndUpdate(followingUserId, {
      following: [...followingUser.following, followedUserId],
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      followers: [...followedUser.followers, followingUserId],
    });
    res.status(200).json({ message: "success" });
  }

  res.status(200).json({ message: "success" });
};
