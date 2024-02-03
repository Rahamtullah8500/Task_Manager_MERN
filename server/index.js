const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const TodoModel = require("./Models/todos");

// connecting to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/test");

// task adding to db
app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => req.json(result))
    .catch((err) => res.json(err));
});

// getting task api
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// setting checked
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  let prevValue;

  TodoModel.findById({ _id: id })
    .then((result) => {
     let prevValue = result.done;
      TodoModel.findByIdAndUpdate({ _id: id }, { done: !prevValue })
        .then(() => res.json("checked successfully"))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err));
});

// delete api
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(() => res.json("delete successfully"))
    .catch((err) => res.json(err));
});

app.listen(3001, (req, res) => {
  console.log("Server is running on port 3001");
});
