const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { userName, email, password, isAdmin } = req.body;
    if (!isAdmin) {
      return res.status(403).json({ error: "Only admin can register" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "❌ User already exists with this email" });
    }

    const existingUsername = await User.findOne({ where: { userName } });
    if (existingUsername) {
      return res.status(400).json({ error: "❌ Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    res.json({ message: "✅ Admin registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login (set cookie with JWT)

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour = 3600000 ms
    });

    res.json({ message: "✅ Login success", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "✅ Logged out" });
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"], //password hide
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "✅ User profile", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({
      where: {
        isAdmin: true,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    res.json({ message: "✅ Admin list", admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
