const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");

//const { searchMusic } = require("../controllers/musicController");

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Music Service is running"
  });
});

router.get("/search", musicController.searchMusic);
router.get("/preview/:trackId", musicController.getTrackPreview);
router.post("/trim/:trackId", musicController.trimTrack);
//router.post("/save/:trackId", musicController.saveTrackPreview);
module.exports = router;