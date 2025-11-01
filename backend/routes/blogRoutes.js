const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const {
  addBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/blogController");
const Cloudinaryupload = require("../middleware/cloudinaryMulter");

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  Cloudinaryupload.single("image"),
  addBlog
);

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.put(
  "/edit/:id",
  authMiddleware,
  adminMiddleware,
  Cloudinaryupload.single("image"),
  editBlog
);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBlog);

module.exports = router;
