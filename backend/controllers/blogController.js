// ✅ Add new blog (only Admin allowed)

const Blog = require("../models/Blog");
const User = require("../models/User");

exports.addBlog = async (req, res) => {
  //console.log(req.file);
  try {
    const { title, content, contentHtml } = req.body;
    //console.log(title, content, contentHtml);

    const userId = req.user.id; // from auth middleware

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Only admin can create blogs" });
    }

    let imagepath = null;
    if (req.file) {
      imagepath = req.file.path;
    }

    const blog = await Blog.create({
      title,
      content,
      contentHtml, // clean HTML for display
      authorId: userId,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, content, contentHtml } = req.body;

    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Only admin or author can edit
    if (!req.user.isAdmin && req.user.id !== blog.authorId) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this blog" });
    }

    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`; // ✅ consistent clean relative path
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.contentHtml = contentHtml || blog.contentHtml;

    await blog.save();

    res.json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete blog

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Only admin or author can delete
    if (!req.user.isAdmin && req.user.id !== blog.authorId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await Blog.destroy({ where: { id } });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: ["id", "userName", "email"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "userName", "email"],
      },
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
