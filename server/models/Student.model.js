<<<<<<< HEAD
const mongoose = require("mongoose")
=======
const mongoose = require("mongoose");
>>>>>>> d921fa8eaf8bbc7579e50b841147a2cc66f7d46f

const Schema = mongoose.Schema;

const studentSchema = new Schema({
<<<<<<< HEAD
    firstName: String, //name and type of property
=======
    firstName: String,
>>>>>>> d921fa8eaf8bbc7579e50b841147a2cc66f7d46f
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    projects: [String],
    cohort: Schema.Types.ObjectId
<<<<<<< HEAD
})

const Student = mongoose.model("Student", studentSchema) //2 arguments: name of the new document and the schema created above

module.export = Student;
=======
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
>>>>>>> d921fa8eaf8bbc7579e50b841147a2cc66f7d46f
