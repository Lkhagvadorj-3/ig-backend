import { userModel } from "../../schema/user.schema.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const logIn = async (req, res) => {
  const JWT_SECRET = "medkuu shuu";

  const data = req.body;
  const user = await userModel.findOne({ email: data.email });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const comPass = await compare(data.password, user.password);
  if (!comPass) {
    return res.status(400).json({ message: "password is incorrect" });
  }
  const accessToken = jwt.sign(
    {
      data: user,
    },
    JWT_SECRET,
    { expiresIn: "3h" }
  );

  res.status(200).json(accessToken);
};
