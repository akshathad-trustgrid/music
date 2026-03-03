const express = require("express");
const musicRoutes = require("./routes/musicRoutes");

const app = express();
app.use(express.json());

app.use("/api/music", musicRoutes);

app.listen(5001, () => {
  console.log("Music Service running on port 5001");
});