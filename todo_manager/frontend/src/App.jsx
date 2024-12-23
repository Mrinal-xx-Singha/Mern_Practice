import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Add tasks to be done
  const addTask = () => {
    if (newTask.trim() === "") {
      toast.error("Task name cannot be empty!");
      return;
    }
    axios
      .post("http://localhost:5000/tasks", { taskName: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
        toast.success("Task added successfully!");
      });
  };

  // Delete a Task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    });
  };

  // Complete task
  const toggleComplete = (id) => {
    const task = tasks.find((task) => task._id === id);
    axios
      .put(`http://localhost:5000/tasks/${id}`, {
        isCompleted: !task.isCompleted,
      })
      .then((response) => {
        setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
        toast.success(
          `Task marked as ${
            response.data.isCompleted ? "complete" : "incomplete"
          }!`
        );
      });
  };
  // Edit a task
  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.taskName);
  };

  // Update the task
  const updateTask = () => {
    if (!currentTask) return;

    if (newTask.trim() === "") {
      toast.error("Task name cannnot be empty");
      return;
    }

    axios
      .put(`http://localhost:5000/tasks/${currentTask._id}`, {
        taskName: newTask,
      })
      .then((response) => {
        setTasks(
          tasks.map((t) => (t._id === currentTask._id ? response.data : t))
        );
        toast.success("Task updated successfully ✔️");
        setNewTask("");
        setIsEditing(false);
        setCurrentTask(null);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        📝 PLAN IT
      </h1>

      {/* Add Task/ Edit Task */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={isEditing ? "Update the task" : "What needs to be done?"}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={isEditing ? updateTask : addTask}
          className={`px-5 py-3
            ${
              isEditing
                ? "bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow transition"
                : "bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
            }`}
        >
          {isEditing ? "Update" : "Add"}
        </button>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setNewTask("");
              setCurrentTask(null);
            }}
            className="px-4 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition gap-4"
          >
            <span
              className={`flex-1 cursor-pointer ${
                task.isCompleted
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
              onClick={() => toggleComplete(task._id)}
            >
              {task.taskName} {task.isCompleted && "🎯"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => editTask(task)}
                className="px-3 py-1 text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-600 rounded-lg transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="px-2 py-1 text-red-600 hover:text-white bg-red-100 hover:bg-red-600 rounded-lg transition"
              >
                Delete
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {tasks.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          No tasks yet. Add a task to get started!
        </p>
      )}
    </div>
  );
};

export default App;
