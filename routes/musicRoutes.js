const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");

//const { searchMusic } = require("../controllers/musicController");

router.get("/search", musicController.searchMusic);
router.post("/save/:trackId", musicController.saveTrackPreview);

module.exports = router;