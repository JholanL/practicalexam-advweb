const express = require("express");
const cors = require ("cors");
const mongoose = require("mongoose");

const Student = require("./models/Student");
require("dotenv").config();

const app = express();

app.use (cors());
app.use(express.json());

    mongoose
        .connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });

let students = [
    {
        id: 1,
        name: "Jholan Ligon",
        course: "BSIT",
        age: 20
    }
]


app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/students", async (req,res) =>{

    const students = await Student.find();
    res.json(students);
});


app.post("/students", async (req, res)=>{
    const student = await new Student(req.body).save();
    res.json(student);
});

app.put("/students/:id", async(req,res)=>{
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "Updated"});
});

app.delete("/students/:id", async(req,res)=>{
    await Student.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});



