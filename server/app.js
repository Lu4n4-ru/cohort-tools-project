const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5005;

const Student = require("./models/Student.model.js");
const Cohort = require("./models/Cohort.model.js");


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

// STUDENT RESOURCE ROUTES
// POST /api/students
app.post("/api/students", (req, res, next) => {

  const newStudent = req.body;

  Student.create(newStudent)
    .then((studentFromDb) => {
      res.status(201).json(studentFromDb)
    })
    .catch((error) => {
      console.log("Error creating a new student in the DB...")
            console.log(error);
            res.status(500).json({ error: "Failed to create a new student" })
    })
})

app.get("/api/students", (req, res, next) => {
  Student.find({})
  .then((studentsFromDb) => {
    res.status(200).json(studentsFromDb)
  })
  .catch((error) => {
    console.log("Error getting all students from the DB...")
    console.log(error);
    res.status(500).json({ error: "Failed to get all students" })
  })
})

app.get("/api/students/:studentId", (req, res, next) => {

  const { studentId } = req.params;

  Student.findById(studentId)
    .populate("Cohort")
    .then((studentFromDb) => {
      res.status(200).json(studentFromDb)
    })
    .catch((error) => {
      console.log("Error getting a student from the DB...")
      console.log(error);
      res.status(500).json({ error: "Failed to get a student" })
    })
})

app.put("/api/students/:studentId", (req, res, next) => {

  const { studentId } = req.params;

  const newStudentDetails = req.body;

  Student.findByIdAndUpdate(studentId, newStudentDetails, { new: true })
    .then((studentFromDb) => {
      res.status(200).json(studentFromDb)
    })
    .catch((error) => {
      console.log("Error updating a student in the DB...")
      console.log(error);
      res.status(500).json({ error: "Failed to update a cohort" })
    })
})

app.delete("/api/students/:studentId", (req, res, next) => {
  
  const { studentId } = req.params;

  Student.findByIdAndDelete(studentId)
    .then((response) => {
      res.status(204).json(response)
    })
    .catch((error) => {
      console.log("Error deleting a student from the database")
      console.log(error)
      res.status(500).json({ error: "Failed to delete a student" })
  })
})



// COHORT RESOURCE ROUTES
// POST /api/cohorts
app.post("/api/cohorts", (req, res, next) => {

  const newCohort = req.body;

  Cohort.create(newCohort)
    .then((cohortFromDb) => {
      res.status(201).json(cohortFromDb)
    })
    .catch((error) => {
      console.log("Error creating a new cohort in the DB...")
      console.log(error);
      res.status(500).json({ error: "Failed to create a new cohort" })
    })
})

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
  .then((cohortsFromDb) => {
    res.status(200).json(cohortsFromDb)
  })
  .catch((error) => {
    console.log("Error getting all cohorts from the DB...")
    console.log(error);
    res.status(500).json({ error: "Failed to get all cohorts" })
  })
})

app.get("/api/cohort/:cohortId", (req, res, next) => {

  const { cohortId } = req.params;

  Cohort.findById(cohortId)
    .then((cohortFromDb) => {
      res.status(200).json(cohortFromDb)
    })
    .catch((error) => {
      console.log("Error getting a cohort from the DB...")
      console.log(error);
      res.status(500).json({ error: "Failed to get a cohort" })
    })
})

app.put("/api/cohorts/:cohortId", (req, res, next) => {

  const { cohortId } = req.params;

  const newCohortDetails = req.body;

  Cohort.findByIdAndUpdate(cohortId, newCohortDetails, { new: true })
    .then((cohortFromDb) => {
      res.status(200).json(cohortFromDb)
    })
    .catch((error) => {
      console.log("Error updating a cohort in the DB...")
      console.log(error);
      res.status(500).json({ error: "Failed to update a cohort" })
    })
})

app.delete("/api/cohort/:cohortId", (req, res, next) => {
  
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then((response) => {
      res.status(204).json(response)
    })
    .catch((error) => {
      console.log("Error deleting a cohort from the database")
      console.log(error)
      res.status(500).json({ error: "Failed to delete a cohort" })
    })
})

// get all students of a specific cohort only
app.get("/api/students/cohort/:cohortId", (req, res, next) => {

  const { cohortId } = req.params;

  let filter = {};

  if (cohortId !== undefined) {
    filter = { cohort: cohortId }
  }

  Student.find(filter)
    .then((students) => {
      res.json(students)
    })
    .catch((error) => {
      console.log("Failed to get all students from specific cohort from the database")
      console.log(error)
      res.status(500).json({ error: "Failed to get all students from specific cohort" })
    })

})



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});