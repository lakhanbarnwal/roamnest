
const cloudinary = require("cloudinary").v2;
const CloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: { v2: cloudinary },
  params: {
    folder: "Wonderlust_DEV",
    allowedFormats: ["png", "jpeg", "jpg"],
  },
});
module.exports = {
  cloudinary: cloudinary.v2,
  storage
};
