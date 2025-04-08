const express = require("express");
const router = express.Router();
const pool = require("../db");

// Wrap async functions to handle errors
function wrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

//INSERT a task
async function insertTask(taskData) {
  const query = `
    INSERT INTO tasks (title, description, priority_level, status, estimate, parent_task_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    taskData.title,
    taskData.description || null,
    taskData.priority_level || null,
    taskData.status || "Unstarted",
    taskData.estimate || null,
    taskData.parent_task_id || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

router.post("/", wrap(async (req, res) => {
  const task = await insertTask(req.body);
  res.json(task);
}));

// Update a task
router.put("/:id", wrap(async (req, res) => {
  const { id } = req.params;
  const taskData = req.body;

  const query = `
    UPDATE tasks 
    SET title = $1, description = $2, priority_level = $3, status = $4, 
        estimate = $5, parent_task_id = $6
    WHERE id = $7 RETURNING *
  `;
  const values = [
    taskData.title,
    taskData.description || null,
    taskData.priority_level || null,
    taskData.status || "Unstarted",
    taskData.estimate || null,
    taskData.parent_task_id || null,
    id,
  ];

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(result.rows[0]);
}));

// DELETE a task
router.delete("/:id", wrap(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({
    message: "Task deleted successfully",
    task: result.rows[0],
  });
}));
//GET all tasks
router.get("/", wrap(async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  res.json(rows);
}));


module.exports = router;
