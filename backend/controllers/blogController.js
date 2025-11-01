// ✅ Add new blog (only Admin allowed)

const Blog = require("../models/Blog");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2; // Cloudinary-ஐ Delete செய்ய தேவை

// ✅ Add new blog (Cloudinary integration)

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

    let imageDetails = {};

    if (req.file) {
      // Multer-Cloudinary Storage-லிருந்து விவரங்களைப் பெறுகிறது
      imageDetails.image = req.file.path; // Cloudinary URL
      imageDetails.publicId = req.file.filename; // Cloudinary Public ID
    }

    const blog = await Blog.create({
      title,
      content,
      contentHtml, // clean HTML for display
      authorId: userId,
      image: imageDetails.image || null,
      // Public ID-ஐ database-ல் சேமிக்கவும்
      publicId: imageDetails.publicId || null,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    // ஏதேனும் பிழை ஏற்பட்டால், Cloudinary-ல் சேமிக்கப்பட்ட படத்தையும் நீக்க வேண்டும் (விரும்பினால்)

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
      // 1. பழைய படத்தை Cloudinary-ல் இருந்து நீக்கவும்
      if (blog.publicId) {
        await cloudinary.uploader.destroy(blog.publicId);
      }

      // 2. புதிய பட விவரங்களைச் சேர்க்கவும்
      blog.image = req.file.path; // Cloudinary URL
      blog.publicId = req.file.filename; // Cloudinary Public ID
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

    // 1. Cloudinary-லிருந்து படத்தை நீக்கவும்
    if (blog.publicId) {
      await cloudinary.uploader.destroy(blog.publicId);
    }

    // 2. Database-லிருந்து Blog-ஐ நீக்கவும்
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
