import { Router } from "express";
import { getAllBlogs } from "../controllers/getAllBlogs.js";
import { postBlog } from "../controllers/postBlog.js";
import { deleteBlog } from "../controllers/deleteBlog.js";
import upload from "../utils/uploadBlogImage.js";

const router = Router();

router.get("/all-blogs", getAllBlogs);
router.post("/upload-blog", upload.single("thumbnail"), postBlog);
router.delete("/delete-blog/:id", deleteBlog);

export default router;
