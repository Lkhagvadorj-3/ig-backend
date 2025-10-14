import mongoose, { Schema } from "mongoose";
import express from "express";
import cors from "cors";
import { userModel } from "./schema/user.schema.js";
import { postModel } from "./schema/post.schema.js";
import { compare, hash } from "bcrypt";
import userrouter from "./router/user/user.route.js";
import postrouter from "./router/post/post.route.js";
import jwt from "jsonwebtoken";

const port = 5555;
const connectToMongoDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Lkhagvadorj3:Ush08321018@lkhagvadorj.gfvxldo.mongodb.net/"
  );
};
connectToMongoDB();
const app = express();
app.use(express.json()); //hamgin hergtei
app.use(cors());

app.use("/", userrouter);

app.use("/posts", postrouter);
app.get("/", async (_req, res) => {
  const user = await userModel.find();
  const JWT_SECRET = "medkuu shuu";
  const accessToken = jwt.sign(
    {
      data: user,
    },
    JWT_SECRET,
    { expiresIn: "3h" }
  );
  res.json(accessToken);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
