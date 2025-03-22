const express = require("express");
const uploadRoutes  = express.Router();
const { upload } = require("../middlwares/multerMiddlware");

uploadRoutes .post("/", upload.single("image"), (req, res) => {
    console.log('-----------------------------------')
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // ✅ Return Cloudinary URL
  res.json({ imageUrl: req.file.path });
});

module.exports = uploadRoutes ;
