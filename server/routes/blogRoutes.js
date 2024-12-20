import { Router } from "express";
import { getAllBlogs } from "../controllers/blog controllers/getAllBlogs.js";
import { postBlog } from "../controllers/blog controllers/postBlog.js";
import { deleteBlog } from "../controllers/blog controllers/deleteBlog.js";
import upload from "../utils/uploadBlogImage.js";
import { reactBlog } from "../controllers/blog controllers/reactBlog.js";
import { addComment } from "../controllers/blog controllers/addComment.js";
import { getComments } from "../controllers/blog controllers/getComments.js";
import { getBlogEngagement } from "../controllers/blog controllers/getBlogEngagements.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { checkReaction } from "../controllers/blog controllers/checkReaction.js";

const router = Router();

router.get("/all-blogs", getAllBlogs);
router.post("/upload-blog", upload.single("thumbnail"), postBlog);
router.delete("/delete-blog/:id", deleteBlog);
router.post("/react-blog/:userId/:blogId", reactBlog);
router.post("/add-comment/:userId/:blogId", addComment);
router.get("/get-comments/:blogId", getComments);
router.get("/get-blog-engagements/:blogId", getBlogEngagement);
router.get("/check-reaction/:userId/:postId", checkReaction);

export default router;
