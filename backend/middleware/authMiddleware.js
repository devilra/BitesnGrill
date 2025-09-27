const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, isAdmin }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  console.log(req.user);
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Admin only route" });
  }
  next();
};
