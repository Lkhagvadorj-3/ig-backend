import { userModel } from "../../schema/user.schema.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  const JWT_SECRET = "medkuu shuu";
  const data = req.body;
  console.log(data);
  const currentUser = await userModel.findOne({ username: data.username });

  const hashedPasswords = await hash(data.password, 10);
  if (currentUser) {
    res.json({ message: "User already existed..." });
  } else {
    const createdUser = await userModel.create({
      username: data.username,
      email: data.email,
      password: hashedPasswords,
    });
    const accessToken = jwt.sign(
      {
        data: createdUser,
      },
      JWT_SECRET,
      { expiresIn: "3h" }
    );
    res.json(accessToken);
  }
};
