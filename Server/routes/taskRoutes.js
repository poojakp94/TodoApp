const express = require("express");
const taskControllers = require("../controllers/taskController");

const router = express.Router();

router.post("/add-task", taskControllers.task_create_post);
router.get("/tasks", taskControllers.task_index);
router.delete("/tasks/:id", taskControllers.task_delete);
router.put("/toggle-complete/:id", taskControllers.toggleTask_iscomplete);
router.put("/update-tasks/:id", taskControllers.task_update);
module.exports = router;
