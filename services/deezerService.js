const axios = require("axios");

const RAPID_API_KEY = "c927c33f02msh5fb261340ddba68p1bcb72jsnc5f149750eed";
const RAPID_API_HOST = "deezerdevs-deezer.p.rapidapi.com";

exports.searchTracks = async (query) => {
  try {
    const response = await axios.get(
      "https://deezerdevs-deezer.p.rapidapi.com/search",
      {
        params: { q: query },
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": RAPID_API_HOST
        }
      }
    );

    return response.data.data.map(track => ({
      trackId: track.id,
      title: track.title,
      artist: track.artist.name,
      previewUrl: track.preview
    }));

  } catch (err) {
    console.error("RapidAPI error:", err.message);
    return [];
  }
};

exports.getTrackPreview = async (trackId) => {
  try {
    const response = await axios.get(
      `https://deezerdevs-deezer.p.rapidapi.com/track/${trackId}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": RAPID_API_HOST
        }
      }
    );

    return response.data.preview;

  } catch (err) {
    console.error("Preview error:", err.message);
    throw err;
  }
};