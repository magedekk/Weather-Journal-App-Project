// Setup packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");
// Setup empty JS object to act as endpoint for all routes
const port = 4000;
let projectData = {};

// Require Express to run server and routes
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
	console.log(`server is running at port ${port}`);
});
// Post request
app.post("/addData", (request, response) => {
	projectData.date = request.body.date;
	projectData.temp = request.body.temp;
	projectData.feelings = request.body.feelings;
	response.send({ message: "post request successful" });
});

// Get request
app.get("/getData", (request, response) => {
	response.send(projectData);
});
