const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv").config();

// Cloudinary-ஐ Configuration செய்தல்
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage-ஐ உருவாக்குதல்
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bitesngrill_blogs", // Cloudinary-ல் சேமிக்கும் ஃபோல்டர் பெயர்
    format: async (req, file) => "jpeg", // default image format
    public_id: (req, file) =>
      `blog-${Date.now()}-${file.originalname.split(".")[0]}`,
  },
});

// File filter (படங்களை மட்டும் அனுமதிக்கும்)
const fileFilter = (req, file, cb) => {
  // MIME type-ஐ மட்டும் சரிபார்க்கிறது
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, GIF, etc.) are allowed"), false);
  }
};

const Cloudinaryupload = multer({
  storage: storage, // Cloudinary Storage-ஐ பயன்படுத்துதல்
  fileFilter: fileFilter,
  limits: {
    fieldSize: 1024 * 1024 * 5, // 5MB limit
  },
});

module.exports = Cloudinaryupload;
