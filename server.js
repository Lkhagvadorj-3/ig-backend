import mongoose, { Schema } from "mongoose";
import express from "express";
import cors from "cors";
import { userModel } from "./schema/user.schema.js";
import { postModel } from "./schema/post.schema.js";
import { compare, hash } from "bcrypt";
import userrouter from "./router/user/user.route.js";
import postrouter from "./router/post/post.route.js";
import jwt from "jsonwebtoken";
import commentrouter from "./router/comment/comment.route.js";
import dotenv from "dotenv";

dotenv.config();
const port = 5555;
const mongoId = process.env.mongoDBid;
const connectToMongoDB = async () => {
  await mongoose.connect(mongoId);
};
connectToMongoDB();
const app = express();
app.use(express.json()); //hamgin hergtei
app.use(cors());

app.use("/", userrouter);

app.use("/posts", postrouter);

app.use("/comment", commentrouter);
app.get("/", async (_req, res) => {
  const user = await userModel.find();
  const JWT_SECRET = process.env.JWT_SECRET;
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
