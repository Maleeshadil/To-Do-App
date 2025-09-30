export default function TaskCard({ task, onUpdate, onDelete }) {
  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const statusColors =
    task.status === "completed"
      ? "bg-green-200 text-green-800"
      : "bg-yellow-200 text-yellow-800";

  return (
    <div className="bg-white border rounded-lg shadow p-4 flex flex-col md:flex-row justify-between md:items-center gap-3">
      {/* Task Info */}
      <div className="flex-1">
        <h3
          className={`font-semibold text-lg ${
            task.status === "completed" ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-2">
          {/* Status */}
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors}`}
          >
            {task.status}
          </span>
          {/* Priority */}
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority} priority
          </span>
          {/* Due Date */}
          <span className="text-xs text-gray-500">
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() =>
            onUpdate(task._id, {
              status: task.status === "pending" ? "completed" : "pending",
            })
          }
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {task.status === "pending" ? "Mark Done" : "Mark Pending"}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
