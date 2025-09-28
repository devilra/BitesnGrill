const { Sequelize } = require("sequelize");
const Blog = require("../models/Blog");
const User = require("../models/User");

exports.getAnalytics = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admin can access analytics" });
    }

    const totalBlogs = await Blog.count();
    const totalUsers = await User.count();

    // 2. Blogs by admin vs users

    const blogsByAdmin = await Blog.count({
      include: [
        {
          model: User,
          where: {
            isAdmin: true,
          },
        },
      ],
    });

    const blogsByUsers = totalBlogs - blogsByAdmin;

    // 3. Latest 5 blogs
    const latestBlogs = await Blog.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        attributes: ["id", "userName"],
      },
    });

    // 4. Most active authors
    const topAuthors = await Blog.findAll({
      attributes: [
        "authorId",
        [Sequelize.fn("COUNT", Sequelize.col("Blog.id")), "blogCount"],
      ],
      include: {
        model: User,
        attributes: ["id", "userName"],
      },
      group: ["authorId", "User.id"],
      order: [[Sequelize.literal("blogCount"), "DESC"]],
      limit: 5,
    });

    // 5. Monthly blog trend

    const monthlyTrend = await Blog.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"),
          "month",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["month"],
      order: [["month", "ASC"]],
    });

    res.json({
      totalBlogs,
      totalUsers,
      blogsByAdmin,
      blogsByUsers,
      latestBlogs,
      topAuthors,
      monthlyTrend,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
