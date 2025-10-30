import { userModel } from "../../schema/user.schema.js";
export const searchUser = async (req, res) => {
  const searchParams = req.params.searchParams;
  const users = await userModel.find({
    username: new RegExp(searchParams, "i"),
  });
  res.status(200).json(users);
};
