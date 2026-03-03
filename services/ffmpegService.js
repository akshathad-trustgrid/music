const ffmpeg = require("fluent-ffmpeg");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs-extra");
const axios = require("axios");

const TEMP_DIR = path.join(__dirname, "../temp");
const OUTPUT_DIR = path.join(__dirname, "../outputs");

exports.trimPreviewAudio = async (previewUrl, startTime, duration) => {
  await fs.ensureDir(TEMP_DIR);
  await fs.ensureDir(OUTPUT_DIR);

  const id = uuidv4();

  const musicPath = path.join(TEMP_DIR, `${id}-music.mp3`);
  const outputPath = path.join(OUTPUT_DIR, `${id}-trimmed.mp3`);

  // Download preview music
  const musicResponse = await axios({
    url: previewUrl,
    responseType: "stream"
  });

  await new Promise((resolve, reject) => {
    musicResponse.data
      .pipe(fs.createWriteStream(musicPath))
      .on("finish", resolve)
      .on("error", reject);
  });

  // Trim music (FAST MODE using copy codec)
  await new Promise((resolve, reject) => {
    ffmpeg(musicPath)
      .setStartTime(startTime)
      .duration(duration)
      .outputOptions("-c copy")
      .save(outputPath)
      .on("end", resolve)
      .on("error", reject);
  });

  return outputPath;
};