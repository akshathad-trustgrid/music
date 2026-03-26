const axios = require("axios");

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;

exports.searchTracks = async (query) => {
  try {
    const response = await axios.get(
      "https://deezerdevs-deezer.p.rapidapi.com/search",
      {
        params: { q: query },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST
        }
      }
    );

    return response.data.data.map(track => ({
      trackId: track.id,
      title: track.title,
      artist: track.artist.name,
      previewUrl: track.preview,
      cover: track.album.cover_medium,
      duration: track.duration,
      
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
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST
        }
      }
    );

    return response.data.preview;// Always fetch fresh preview URL to ensure it's valid

  } catch (err) {
    console.error("Preview error:", err.message);
    throw err;
  }
};

exports.fetchTrackDetails = async (trackId) => {
  const response = await axios.get(
    `https://deezerdevs-deezer.p.rapidapi.com/track/${trackId}`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST
      }
    }
  );

  return response.data;
};