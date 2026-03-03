const { searchTracks } = require("../services/deezerService");

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