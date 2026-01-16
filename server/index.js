const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const myFeedRoutes = require("./routes/myFeedRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("InfoWave API is alive!");
});

// news route
app.use("/api", newsRoutes);
app.use("/api", userRoutes);
app.use("/api", myFeedRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
