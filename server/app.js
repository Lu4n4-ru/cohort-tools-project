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

app.post("/api/students", (req, res) => {
  const newStudent = req.body

  Student.create(newStudent)
    .then(studentFromDB => {
      res.status(201).json(studentFromDB)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error:"impossible adding student"})
    })
})


app.get("/api/students", (req, res, next) => {
  Student.find({})
  .then((studentsFromDB) => {
    res.status(200).json(studentsFromDB)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: "list not found"})
  })
})


app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params

  Student.findById(studentId)
    .populate("Cohort")
    .then(studentFromDB => {
      res.status(200).json(studentFromDB)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({error: "student not found"})
    })
})

app.put("	/api/students/:studentId", (req, res) => {
  const {studentId} = req.params
  const newStudentDetails = req.body

  Student.findByIdAndUpdate(studentId, newStudentDetails, {new: true})
    .then(studentFromDB => {
      res.status(200).json(studentFromDB)
    })
})

app.get("/api/students/cohort/:cohortId", (req, res) =>{

  const {cohort} = req.query

  let filter = {}

  if(cohort !== undefined) {
    filter.cohortId = cohort
  }

  Student.find(filter)
    .exec()
    .then(students => {
      res.json(students)
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    })
})

 

app.delete("/api/students/:studentId", (req, res) => {
  const { studentID } = req.params

  Student.findByIdAndDelete(studentId)
    .then(response => {
      res.json(response)
    })
    .catch((err) => {
            console.log(err)
            res.status(500).json({ error: "Failed to delete the student" })
    })

})




app.post("/api/cohorts", (req, res) => {

  const newChoort = req.body

  Cohort.create(newChoort)
    .then(cohortFromDB => {
      res.status(201).json(cohortFromDB)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "impossible creating cohort"})
    })
})


app.get("/api/cohorts", (req, res, next) => {
  Cohort.find({})
  .then((cohortsFromDB) => {
    res.status(200).json(cohortsFromDB)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: "list not found"})
  })
})

app.get("/api/cohorts/:cohortId", (req, res) => {

  const {cohortId} = req.params

  Cohort.findById(cohortId)
    .then(cohortFromDB => {
      res.status(200).json(cohortFromDB)
    }) 
    .catch(error => {
    console.log(error)
    res.status(500).json({error: "cohort not found"})
  })
})

app.put("/api/cohorts/:cohortId	", (req, res) => {
  const { cohortId } = req.params
  const newCohortDetails = req.body

  Cohort.findByIdAndUpdate(cohortId, newCohortDetails, {new: true})
    .then(cohortFromDB => {
      res.status(200).json(cohortFromDB)
    })
    .catch(error => {
    console.log(error)
    res.status(500).json({error: "cohort not updated"})
  })
})

app.delete("/api/cohorts/:cohortsId", (req, res) => {
  const { cohortId } = req.params

  Cohort.findByIdAndDelete(cohortId)
    .then(response => {
      res.json(response)
    })
    .catch((err) => {
            console.log(err)
            res.status(500).json({ error: "Failed to delete the cohort" })
    })

})





// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})