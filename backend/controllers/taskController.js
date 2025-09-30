const Task = require("../models/Task");

// Create new task
exports.createTask = async (req, res) => {
  console.log("Request User:", req.user._id);
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const taskData = {
      title,
      description,
      priority,
      dueDate,
      user: req.user._id, // Ensure this is being passed
    };

    console.log("Task Data to Save:", taskData); // Log the task data

    const task = await Task.create(taskData);

    console.log("Created Task:", task); // Log the created task

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all tasks for logged-in user (with filters + pagination)
exports.getTasks = async (req, res) => {
  
  try {
    const { status, q, page = 1, limit = 2 } = req.query;
    const filter = { user: req.user._id }; // Filter tasks by user ID

    if (status) {
      filter.status = status;
      console.log("Filter by Status:", status); // Log the status filter
    }
    if (q) {
      filter.title = { $regex: q, $options: "i" };
      console.log("Filter by Query:", q); // Log the query filter
    }

    console.log("Filter Object:", filter); // Log the complete filter object

    const skip = (page - 1) * limit;
    console.log("Pagination - Skip:", skip, "Limit:", limit); // Log pagination details

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));    

    const total = await Task.countDocuments(filter);    

    res.json({
      success: true,
      data: tasks,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error Fetching Tasks:", err); // Log any errors
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single task
exports.getTaskById = async (req, res) => {
  
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    if (String(task.user) !== String(req.user._id)) {
     
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

   
    res.json({ success: true, data: task });
  } catch (err) {
   
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
     
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    if (String(task.user) !== String(req.user._id)) {
    
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // Only accept specific fields
    const allowed = ["title", "description", "status", "priority", "dueDate"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) task[field] = req.body[field];
    });

    const updated = await task.save();
    
    res.json({ success: true, data: updated });
  } catch (err) {
   
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
 
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      console.log("Task not found"); // Log if task is not found
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    if (String(task.user) !== String(req.user._id)) {
     
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await task.deleteOne();
    
    res.json({ success: true, message: "Task removed" });
  } catch (err) {
    
    res.status(500).json({ success: false, message: "Server error" });
  }
};
