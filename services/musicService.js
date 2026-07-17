const fs = require("fs");
const path = require("path");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

console.log("FFmpeg path:", ffmpegPath);

ffmpeg.setFfmpegPath(ffmpegPath);

const deezerService = require("./deezerService");

exports.trimTrack = async (trackId, startTime = 0, duration = 10) => {
  let inputPath;
  let outputPath;

  try {
    //duration = Math.min(Number(duration), 15);

    const track = await deezerService.fetchTrackDetails(trackId);

    if (!track.preview) {
      throw new Error("Preview URL not available.");
    }

    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    inputPath = path.join(tempDir, `${trackId}.mp3`);
    outputPath = path.join(
      tempDir,
      `${trackId}_${Date.now()}_trimmed.mp3`
    );

    // Download preview
    const response = await axios({
      url: track.preview,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(inputPath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // Trim audio
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(duration)
        .audioCodec("libmp3lame")
        .output(outputPath)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    // Delete original preview
    if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
        }

    return {
      filePath: outputPath,
      fileName: `${track.title}.mp3`,
      title: track.title,
      artist: track.artist.name,
      trackId: track.id,
      startTime,
      duration
    };

  } catch (err) {

    if (inputPath && fs.existsSync(inputPath))
      fs.unlinkSync(inputPath);

    if (outputPath && fs.existsSync(outputPath))
      fs.unlinkSync(outputPath);

    throw err;
  }
};