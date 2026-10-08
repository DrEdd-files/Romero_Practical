const express = require ("express")
const cors = require("cors")
const mongoose = require("mongoose");
const Student = require ("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json())


mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("Connected to MongoDB");

})

.catch((error) =>{
    console.log("MongoDb connection error: ", error);
});


app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    
    res.json(students);
});

// Task 1: 
app.post("/students", async (req, res) =>{
    const newStudent = new Student({
        name: req.body.name,
        course: req.body.course,
        age: req.body.age,
    })

    const saved = await newStudent.save();
    res.json(saved);
})

//Task 3
app.delete("/students/:id", async (req, res) =>{
    await Student.findByIdAndDelete(req.params.id);

    res.json({message: "Student Deleted"});
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});



