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
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addBlog
);

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.put(
  "/edit/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  editBlog
);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBlog);

module.exports = router;
