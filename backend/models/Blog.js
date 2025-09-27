const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/User");

const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false, // Quill.js produce  HTML string store here
  },
  contentHtml: {
    type: DataTypes.TEXT("long"), // rendered html
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Image file path or URL
    allowNull: true, // optional
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

Blog.belongsTo(User, { foreignKey: "authorId" });
// Blog.hasMany(Blog, { foreignKey: "authorId" });

module.exports = Blog;
