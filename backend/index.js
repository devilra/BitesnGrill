const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const analyticRoute = require("./routes/analyticsRoutes");
const contactRoute = require("./routes/contactRoutes");
const path = require("path");
const { request } = require("http");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://bitesn-grill.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/analytics", analyticRoute);
app.use("/api", contactRoute);

const PORT = process.env.PORT;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tables synced!");
    app.listen(PORT, () => {
      console.log(`Server Running ${PORT} `);
    });
  })
  .catch((err) => console.log(err.message));
