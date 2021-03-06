// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3300;
const server = app.listen(port, listening);
function listening() {
  console.log(`server running on port: ${port}`);
}

//GET function
app.get("/all", getData);
function getData(req, res) {
  res.send(projectData);
  projectData = {};
}

//POST Route
app.post("/add", postData);
function postData(req, res) {
  const newData = req.body;
  projectData = newData;
}
