const path = require("path");
const fs = require("fs");
const { searchTracks } = require("../services/deezerService");
const { fetchTrackDetails } = require("../services/deezerService");
const PREVIEW_DIR = path.join(__dirname, "../storage/music");
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

exports.saveTrackPreview = async (req, res) => {
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
};