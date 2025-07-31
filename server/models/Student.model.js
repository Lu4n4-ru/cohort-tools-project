const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: String, //name and type of property
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    projects: [String],
    cohort:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cohort"
    } 
})

const Student = mongoose.model("Student", studentSchema) //2 arguments: name of the new document and the schema created above

module.exports = Student;
