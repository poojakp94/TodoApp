const Task = require("../models/createTask");
const { propfind } = require("../routes/taskRoutes");

//post task on db
const task_create_post = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).send("Title or description missing");
  }
  const task = new Task({
    title,
    description,
  });
  task
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};

// get tasks from db
const task_index = (req, res) => {
  Task.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        list: { $push: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
  ])
    .sort({ _id: -1 })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

// delete tasks from db
const task_delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("id not found");
  }
  Task.findByIdAndDelete(id)
    .then((result) => res.json())
    .catch((err) => {
      console.log(err);
      res.status(500).send("err");
    });
};

//update is_completed field/ property
const task_update = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("id not found");
  }
  try {
    const task = await Task.findOne({ _id: id });
    task.is_completed = !task.is_completed;
    const result = await task.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('err')
  }
};
module.exports = {
  task_create_post,
  task_index,
  task_delete,
  task_update,
};
