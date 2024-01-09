const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const route = express.Router();
const dotenv = require("dotenv");
const movieController = require("./../controller/movieController");

dotenv.config();

// Multer setup for uploading to the local disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.PIC_LOCATION); // Set the destination folder for local storage
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

route.use(bodyParser.json());

route.post("/upload", upload.single("poster"), (req, res) => {
  try {
    if (!req.file) {
      // Handle case where no file is uploaded
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const posterPath = req.file.path;
    res.json({ posterPath });
  } catch (error) {
    console.error("Error in file upload:", error.message);
    res.status(500).send({ status: false, message: "Internal server error" });
  }
});

route.post("/addMovie", upload.single("poster"), movieController.addMovie);
route.get("/movies", movieController.loadMovies);
route.put("/updateMovie", upload.single("poster"), movieController.updateMovie);

module.exports = route;
