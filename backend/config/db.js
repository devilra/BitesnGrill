const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to MySQL!"))
  .catch((err) => console.log("❌ Connection failed:", err.message));

module.exports = sequelize;
