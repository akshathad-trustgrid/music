const express = require("express");
const router = express.Router();

const { searchMusic } = require("../controllers/musicController");
const { trimMusic } = require("../controllers/processController");

router.get("/search", searchMusic);

// New clean endpoint for trimming audio preview
router.post("/trim", trimMusic);

module.exports = router;