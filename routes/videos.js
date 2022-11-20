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
  const { title, description, thumbnail } = req.body;
  if (!title || !description || !thumbnail) {
    return res.status(404).json({
      error: "Please provide all the information needed for adding a new video",
    });
  }

  const newVideo = {
    id: getNewId(),
    title,
    channel: "Jaqueline Nacarate",
    image: thumbnail,
    description,
    views: 0,
    likes: 0,
    duration: "2:14",
    video: "",
    timestamp:23072024,
    comments: [],
  };

  // update jason file with new video
  videos.push(newVideo);
  writeJSONFile(videosJSONFile, videos);

  // response to the client
  res.status(201).json(newVideo);
});

// api to crete new comment
router.post("/:id/comments", (req, res) => {
  //  const { comment } = videos.map((video) =>
  // if ()
  const {comment} = req.body
  //    video.id === req.params.id ? { ...video, ...req.body } : video
  //  );
  if (!comment) {
    return res.status(404).json({
      error: "Please add a new comment",
    });
  }

  const newComment = {
    id: getNewId(),
    name: "Mahdi",
    comment,
    likes: 0,
    timestamp:23072022,
  };

  videos.map((video) => {
    if (video.id === req.params.id) {
      // update jason file with new comment
      video.comments.unshift(newComment);
      writeJSONFile(videosJSONFile, videos);

      // response to the client
      res.status(201).json(video);
    }
  });
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
