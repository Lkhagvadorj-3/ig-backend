import express from "express";
import { authMiddleware } from "../../authMiddleware/authMiddleware.js";
import { createcomment } from "../../controller/comment/createcomment.js";
import { getcomment } from "../../controller/comment/getcomment.js";
const commentrouter = express.Router();
commentrouter.post("/create", authMiddleware, createcomment);
commentrouter.get("/get/:postId", authMiddleware, getcomment);
export default commentrouter;
