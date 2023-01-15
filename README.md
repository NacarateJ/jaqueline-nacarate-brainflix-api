# BrainFlix
BrainFlix is a fullstack app for a fictional mock video streaming platform. Creative mock ups and design specs were used to create a fully functional and responsive live site respecting a mobile-first design approach.

## General Functionalities
* An REST API service was built to manage the videos data. It had the following end-points:
  * GET /videos that responds with an array of videos;
  * GET /videos/:id that responds with an object containing the details of the video with an id of :id;
  * POST /videos that will add a new video to the video list with a unique id  generated for each video added;
* A JSON file was used for data persistence (writing to it, and reading from it)

## Tech Stack
* HTML, SASS, JavaScript, React, React Router, Node, Express, API's , Postman and Axios, Upload.io

## Installation:
1. To install and run the project you will need to clone or dowload the Front-end file - [jaqueline-nacarate-brainflix](https://github.com/NacarateJ/jaqueline-nacarate-brainflix), and the Back-end file - [jaqueline-nacarate-brainflix-api](https://github.com/NacarateJ/jaqueline-nacarate-brainflix-api);
2. Run ```nmp i``` to install all the required packages for the app;
3. To start the Front-end run the command ```npm start```;
4. To start the Back-end run the command ```npm run server```;
5. Add .env file with your preferred port number: ```PORT=YOUR PORT NUMBETR```


## Demo

<div align="center">

https://user-images.githubusercontent.com/114256348/212264176-d5d9a1a6-b7a8-4ab6-a9c8-3c5d0a948509.mp4

  </div>
