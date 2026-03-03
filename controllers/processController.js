const path = require("path");
const fs = require("fs");
const { getTrackPreview } = require("../services/deezerService");
const { trimPreviewAudio } = require("../services/ffmpegService");

exports.trimMusic = async (req, res) => {
  try {
    const { trackId, startTime = 0, duration = 10 } = req.body;

    if (!trackId)
      return res.status(400).json({ error: "trackId required" });

    const previewUrl = await getTrackPreview(trackId);

    const outputPath = await trimPreviewAudio(
      previewUrl,
      startTime,
      duration
    );

    return res.sendFile(path.resolve(outputPath));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Audio trimming failed" });
  }
};