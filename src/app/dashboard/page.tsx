"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");

    if (name) {
      setUserName(name);
    }

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteTask = async (id: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this task?");

  if (!confirmDelete) return;

  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
     
    const handleToggleComplete = async (
  id: string,
  completed: boolean
) => {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      fetchTasks();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      fetchTasks();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
const handleToggleComplete = async (
  id: string,
  completed: boolean
) => {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      fetchTasks();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        userId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      setTitle("");
      setDescription("");

      fetchTasks();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {userName}
      </h1>

      <p className="text-gray-600 mb-8">
        Manage your daily tasks.
      </p>
           <form onSubmit={handleAddTask} className="bg-white p-6 rounded-lg shadow mb-8">

  <input
    type="text"
    placeholder="Task Title"
    className="w-full border p-3 rounded mb-4"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <textarea
    placeholder="Task Description"
    className="w-full border p-3 rounded mb-4"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
  >
    Add Task
  </button>

</form>


      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold">
                {task.title}
              </h2>

              <p className="text-gray-600">
                {task.description}
              </p>

              <p className="mt-2">
                Status:{" "}
                {task.completed ? "✅ Completed" : "❌ Pending"}
              </p>
              <div className="mt-4">
                <button
  onClick={() =>
    handleToggleComplete(task.id, task.completed)
  }
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
>
  {task.completed ? "Undo" : "Complete"}
</button>
  <button
    onClick={() => handleDeleteTask(task.id)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Delete
  </button>
</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}