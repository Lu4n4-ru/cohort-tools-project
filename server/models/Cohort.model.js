const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cohortSchema = new Schema({
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
<<<<<<< HEAD
    startDate: String,
    endDate: String,
    programMnager: String,
=======
    startDate: Date,
    endDate: Date,
    programManager: String,
>>>>>>> d921fa8eaf8bbc7579e50b841147a2cc66f7d46f
    leadTeacher: String,
    totalHours: Number
});

<<<<<<< HEAD
const Cohort = mongoose.model("Cohort", cohortSchema)

module.export = Cohort
=======
const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
>>>>>>> d921fa8eaf8bbc7579e50b841147a2cc66f7d46f
