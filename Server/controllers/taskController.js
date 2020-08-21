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
  const { page, perPage } = req.query;
  const pageNum = Number(page);
  const perPageNum = Number(perPage);

  if (page !== undefined) {
    if (
      !Number.isInteger(pageNum) ||
      (Number.isInteger(pageNum) && pageNum < 1)
    ) {
      res.status(400).send("page should be greater than 1");
    }
  }
  if (perPage !== undefined) {
    if (
      !Number.isInteger(perPageNum) ||
      (Number.isInteger(perPageNum) && perPageNum < 1)
    ) {
      res.status(400).send("perPage should be grater than 1");
    }
  }
  if (
    (page !== undefined && perPage === undefined) ||
    (page === undefined && perPage !== undefined)
  ) {
    res.status(400).send("page or perPage is missing");
  }

  let aggregationPipeline = [
    { $sort: { createdAt: -1 } },
    {
      $skip: perPageNum * (pageNum - 1),
    },
    {
      $limit: perPageNum,
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        list: { $push: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
  ];

  if (!page && !perPage) {
    aggregationPipeline = [
      ...aggregationPipeline.slice(0, 1),
      ...aggregationPipeline.slice(3),
    ];
  }

  const promise1 = Task.aggregate(aggregationPipeline).sort({ _id: -1 });
  const promise2 = Task.countDocuments()
  Promise.all([promise1, promise2])
  .then(([res1, res2]) => {
    res.send({
      data: res1,
      totalCount: res2

  })}).catch(err => console.log(err))  
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
const toggleTask_iscomplete = async (req, res) => {
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
    res.status(500).send("err");
  }
};

//update is_completed field/ property
const task_update = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("id not found");
  }
  try {
    const task = await Task.findOne({ _id: id });
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).send("Title or description missing");
    }
    task.title = title || task.title;
    task.description = description;
    const result = await task.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const task_per_page = (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;
};
module.exports = {
  task_create_post,
  task_index,
  task_delete,
  toggleTask_iscomplete,
  task_update,
  task_per_page,
};
