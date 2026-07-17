const path = require("path");
const fs = require("fs");
const { searchTracks } = require("../services/deezerService");
const { fetchTrackDetails } = require("../services/deezerService");
const { getTrackPreview } = require("../services/deezerService");
const musicService = require("../services/musicService");
//const PREVIEW_DIR = path.join(__dirname, "../storage/music");
const axios = require("axios");

exports.searchMusic = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query required" });

    const results = await searchTracks(q);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Music search failed" });
  }
};

exports.getTrackPreview = async (req, res) => {
  try {
    const { trackId } = req.params;

    if (!trackId) {
      return res.status(400).json({
        error: "Track ID is required"
      });
    }

    const previewUrl = await getTrackPreview(trackId);

    return res.status(200).json({
      success: true,
      trackId,
      previewUrl
    });

  } catch (err) {
    console.error("Error fetching track preview:", err.message);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch track preview"
    });
  }
};

exports.trimTrack = async (req, res) => {
  try {
    const { trackId } = req.params;
    const { startTime = 0, duration = 10 } = req.body;

    const result = await musicService.trimTrack(
      trackId,
      Number(startTime),
      Number(duration)
    );

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${result.fileName}"`
    );

    const stream = fs.createReadStream(result.filePath);

    stream.pipe(res);

    stream.on("close", () => {
      if (fs.existsSync(result.filePath)) {
        fs.unlinkSync(result.filePath);
      }
    });

  } catch (err) {
    console.error("Trim track error:", err);

    res.status(500).json({
      success: false,
      error: "Failed to trim track"
    });
  }
};

/*exports.saveTrackPreview = async (req, res) => {
  try {
    const { trackId } = req.params;

    const track = await fetchTrackDetails(trackId);

    const previewUrl = track.preview;

    const filePath = path.join(PREVIEW_DIR, `${trackId}.mp3`);

    const writer = fs.createWriteStream(filePath);

    const audioResponse = await axios({
      url: previewUrl,
      method: "GET",
      responseType: "stream"
    });

    audioResponse.data.pipe(writer);

    writer.on("finish", () => {
      res.json({
        trackId,
        url: `/music/${trackId}.mp3`,
        title: track.title,
        artist: track.artist.name
      });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/