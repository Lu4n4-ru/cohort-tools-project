const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5005;

const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(error => console.log("error connecting to database", error))


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// const cohorts = require("./cohorts.json")
// const students = require("./students.json")


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// app.get("/api/cohorts", (req, res, next) => {
//   res.json(cohorts)
// })
app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
  .then((cohorts) => {
    res.json(cohorts)
  })
  .catch(error => console.log(error))
})

app.get("/api/students", (req, res, next) => {
  Student.find({})
  .then((students) => {
    res.json(students)
  })
  .catch(error => console.log(error))
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});