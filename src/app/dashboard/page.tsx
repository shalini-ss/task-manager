"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");
const [search, setSearch] = useState("");
const [filter, setFilter] =useState("all");
const [sortBy, setSortBy] = useState("newest");

const router = useRouter();
const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");

  router.push("/login");
};

  useEffect(() => {
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");

  if (!userId) {
    router.push("/login");
    return;
  }

  if (name) {
    setUserName(name);
  }

  fetchTasks();
}, [router]);

const fetchTasks = async () => {
  try {
    const response = await fetch("/api/tasks");
    const data = await response.json();

    if (response.ok) {
      setTasks(data.tasks);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleSaveTask = async () => {
  try {
    const response = await fetch(`/api/tasks/${editingTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      setEditingTaskId(null);
      fetchTasks();
    } else {
      alert(data.message);
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

const handleEditTask = (task: Task) => {
  setEditingTaskId(task.id);
  setEditTitle(task.title);
  setEditDescription(task.description || "");
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
     
     <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Welcome, {userName}
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Logout
  </button>
</div>

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
  <input
  type="text"
  placeholder="Search tasks..."
  className="w-full border p-3 rounded mb-6"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="flex gap-3 mb-6">
  <button
    onClick={() => setFilter("all")}
    className="bg-gray-600 text-white px-4 py-2 rounded"
  >
    All
  </button>

  <button
    onClick={() => setFilter("completed")}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Completed
  </button>

  <button
    onClick={() => setFilter("pending")}
    className="bg-yellow-500 text-white px-4 py-2 rounded"
  >
    Pending
  </button>
</div>

</form>
<div className="grid grid-cols-3 gap-4 mb-6">
  <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
    <h2 className="text-lg font-semibold">Total</h2>
    <p className="text-2xl font-bold">{tasks.length}</p>
  </div>

  <div className="bg-green-500 text-white p-4 rounded-lg text-center">
    <h2 className="text-lg font-semibold">Completed</h2>
    <p className="text-2xl font-bold">
      {tasks.filter(task => task.completed).length}
    </p>
  </div>

  <div className="bg-yellow-500 text-white p-4 rounded-lg text-center">
    <h2 className="text-lg font-semibold">Pending</h2>
    <p className="text-2xl font-bold">
      {tasks.filter(task => !task.completed).length}
    </p>
  </div>
</div>

      <div className="space-y-4">
        <input
  type="text"
  placeholder="Search tasks..."
  className="w-full border p-3 rounded mb-6"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
    tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  })
  .sort((a, b) => {
    if (sortBy === "az") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "za") {
      return b.title.localeCompare(a.title);
    }

    if (sortBy === "oldest") {
      return (
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
      );
    }

    // newest
    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  })
  .map((task) => (
          
            <div
              key={task.id}
              className="bg-white p-5 rounded-lg shadow"
            >
              {editingTaskId === task.id ? (
  <>
    <input
      type="text"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      className="w-full border p-2 rounded mb-3"
    />

    <textarea
      value={editDescription}
      onChange={(e) => setEditDescription(e.target.value)}
      className="w-full border p-2 rounded"
    />
  </>
) : (
  <>
    <h2 className="text-xl font-semibold">
      {task.title}
    </h2>

    <p className="text-gray-600">
      {task.description}
    </p>
  </>
)}
              <p className="mt-2">
                Status:{" "}
                {task.completed ? "✅ Completed" : "❌ Pending"}
              </p>
        <div className="mt-4 flex gap-2">
  {editingTaskId === task.id ? (
    <>
      <button
        onClick={handleSaveTask}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>

      <button
        onClick={() => setEditingTaskId(null)}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Cancel
      </button>
      
    </>
  ) : (
    <>
      <button
        onClick={() =>
          handleToggleComplete(task.id, task.completed)
        }
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {task.completed ? "Undo" : "Complete"}
      </button>

      <button
        onClick={() => handleEditTask(task)}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Edit
      </button>

      <button
        onClick={() => handleDeleteTask(task.id)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </>
  )}
</div>
</div>
          
          ))
        )}
      </div>
    </div>
  );
}
