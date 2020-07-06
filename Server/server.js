const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
require('dotenv').config();

const app = express();

//connect to mongodb
const dbURI =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lazdn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

// middleware & static files
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//task routes
app.use('/', taskRoutes);

app.listen(3001);
