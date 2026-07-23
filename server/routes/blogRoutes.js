console.log("BLOG ROUTER LOADED");

import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContentAI,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  rewriteContent,
  togglePublish,
} from "../controllers/blogController.js";

import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const blogRouter = express.Router();

// Blog Routes
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);

// Comment Routes
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

// AI Routes
blogRouter.post("/generate", auth, generateContentAI);
blogRouter.post("/rewrite", auth, rewriteContent);

export default blogRouter;