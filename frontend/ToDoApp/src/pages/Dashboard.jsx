import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import api from "../utils/axios";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    dueDate: "",
  });

  //  Fetch tasks
  const fetchTasks = async (page = 1) => {
    try {
      const res = await api.get(`/tasks?page=${page}`);
      setTasks(res.data.data);
      setMeta({
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    }
  };

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/tasks", form);
      setForm({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: "",
      });
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (id, updates) => {
    try {
      await api.put(`/tasks/${id}`, updates);
      fetchTasks(meta.page);
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks(meta.page);
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
    }
  };

  // Load tasks when logged in
  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  if (!user)
    return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow text-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        You’re not logged in
      </h2>
      <p className="text-gray-500 mb-4">
        Please login to view and manage your tasks. Once logged in, you’ll be
        able to create, update, and track your progress easily.
      </p>
     <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    </div>
    )
    

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Add Task Form */}
      <form
        onSubmit={addTask}
        className="grid gap-4 mb-8 p-6 border rounded-lg bg-white shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-700">
          Create a New Task
        </h2>
        <input
          className="border p-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="border p-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="border p-3 rounded-md focus:ring focus:ring-blue-300"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            className="border p-3 rounded-md focus:ring focus:ring-blue-300"
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            You don’t have any tasks yet. Start by creating one above.
          </p>
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {meta.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => fetchTasks(meta.page - 1)}
            disabled={meta.page === 1}
            className="px-3 py-1 border rounded-md text-sm bg-white shadow hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: meta.pages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => fetchTasks(i + 1)}
              className={`px-3 py-1 border rounded-md text-sm ${
                meta.page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => fetchTasks(meta.page + 1)}
            disabled={meta.page === meta.pages}
            className="px-3 py-1 border rounded-md text-sm bg-white shadow hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Pagination info */}
      <p className="text-sm text-gray-500 mt-4 text-center">
        Showing page {meta.page} of {meta.pages} ({meta.total} tasks)
      </p>
    </div>
  );
}
