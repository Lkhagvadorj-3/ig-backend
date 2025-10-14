import { userModel } from "../../schema/user.schema.js";

export const getUser = async (req, res) => {
  const params = req.params;
  const userId = params.userid;
  const users = await userModel.findById(userId);
  res.status(200).json(users);
};
