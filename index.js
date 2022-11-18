require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("node:path");
const app = express(); //initialize express server
const videoRouter = require("./routes/videos"); //video router
// const logger = require("./middlewares/logger");

// api to serve all the requests to http://localhost:8080/
// app.get("/", (_req, res) => {
// res.send("Hello World!")
// })

// middleware for handling POST request or parsing new information from req.body
// JSON parsing middleware
app.use(express.json());

// middleware for CORS errors
app.use(cors());

// serving the static files (imgs, index.html file) from the public folder
// creating a path to (imgs, index.html file) using path module
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// routes for video resource
app.use("/api/videos", videoRouter); // next()

// middleware to serve static resources(img, HTML, CSS) from public file to client
app.use(express.static(path.join(__dirname, "public")));


//middleware to log all the requests made to the server
// app.use(logger);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(8080, () => {
//   console.log(`Server is running on port 8080!!`);
// });
