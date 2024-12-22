const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
  taskName: String,
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// API Endpoints
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

//Create a task
app.get("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
