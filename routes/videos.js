// file to keep all the end points/ routes for videos
const express = require("express");
const router = express.Router();
const path = require("node:path");
const { getNewId, writeJSONFile } = require("../helper/helper");
const videosJSONFile = path.join(__dirname, "../data/videos.json"); // path to videos.jason
const videos = require(videosJSONFile);

// api to serve all the requests to http://localhost:8080/
// app.get("/", (_req, res) => {
// res.send("Hello World!")
// })

// api to get videos from videos.json
//localhost:8080/api/videos
router.get("/", (_req, res) => {
  try {
    res.status(200).json(videos);
  } catch (error) {
    console.log("Error retrieving the videos", error);
  }
});

// api to get video by ID
router.get("/:id", (req, res) => {
  const found = videos.find((video) => video.id === req.params.id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: `Video with ID ${req.params.id} not found` });
  }
});

// api to crete new video
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(404).json({
      error: "Please provide all the information needed for adding a new video",
    });
  }

  const newVideo = {
    title,
    description,
    id: getNewId(),
  };

  // update jason file with new video
  videos.push(newVideo);
  writeJSONFile(videosJSONFile, videos);

  // response to the client
  res.status(201).json(newVideo);
});

// api to update specific properties of the object
router.patch("/:id", (req, res) => {
  // some() returns boolean value
  const found = videos.some((video) => video.id === req.params.id);
  if (found) {
    const updatedVideos = videos.map((video) =>
      video.id === req.params.id ? { ...video, ...req.body } : video
    );
    writeJSONFile(videosJSONFile, updatedVideos);

    res.json({ msg: "Video Updated", videos: updatedVideos });
  } else {
    res
      .status(404)
      .json({ errorMessage: `Video with ID: ${req.params.id} not found` });
  }
});

// api to delet videos
router.delete("/:id", (req, res) => {
  const found = videos.some((video) => video.id === req.params.id);
  if (found) {
    const videosAfterDeletion = videos.filter(
      (video) => video.id !== req.params.id
    );
    writeJSONFile(videosJSONFile, videosAfterDeletion);
    res.json({
      msg: `Video with ID: ${req.params.id} Deleted`,
      videos: videosAfterDeletion,
    });
  } else {
    res
      .status(404)
      .json({ errorMessage: `Video with ID: ${req.params.id} not found` });
  }
});

module.exports = router;
