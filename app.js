const express = require("express");
const musicRoutes = require("./routes/musicRoutes");
require('dotenv').config();

const app = express();
app.use(express.json());

app.use("/api/music", musicRoutes);
app.use("/music", express.static("storage/music"));

app.listen(5001, () => {
  console.log("Music Service running on port 5001");
});