import React, { useEffect, useState, Fragment } from "react";
import TaskBox from "./components/TaskBox";
import CreateTask from "./components/CreateTask";
import IconButton from "./components/IconButton";
import { getTasks } from "./api";
import "./App.css";
import moment from "moment";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Overlay from "./components/Overlay";

function App() {
  const [data, setData] = useState({data: [], totalCount: 0});
  const [isLoading, setLoading] = useState(false);
  const perPage = 5;
  let totalCount = data.totalCount;
  let totalPages = Math.ceil(totalCount / perPage)
  const [page, setPage] = useState(1);

  // Overlay
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const toggleOverlay = () => setOverlayOpen(!isOverlayOpen);

  const getTaskList = () => {
    setLoading(true);
    getTasks({ page, perPage })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTaskList();
  }, [page]);

  return (
    <div className="App">
      <header className="App-header">TO DO LIST</header>
      <div className="insert-icon">
        <IconButton type="add" onClick={toggleOverlay}></IconButton>
      </div>
      <Loader isOpen={isLoading} />
      <div style={{minHeight: '55vh'}}>
        {data.data.map((tasksGroup) => {
          return (
            <Fragment key={tasksGroup._id}>
              <div className="date">
                Date: {moment(tasksGroup._id).format("DD MMMM YYYY")}{" "}
              </div>
              {tasksGroup.list.map((task) => (
                
                <TaskBox
                  key={task._id}
                  title={task.title}
                  description={task.description}
                  id={task._id}
                  getTaskList={getTaskList}
                  isCompleted={task.is_completed}
                  toggleOverlay={toggleOverlay}
                  setEditTask={setEditTask}
                  editTask={editTask}
                />
              ))}
            </Fragment>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ marginRight: "30px" }}
          text="Back"
          disabled={page === 1}
          onClick={() => {
            setPage((prevPage) => prevPage - 1);
          }}
        ></Button>
        <Button
          disabled={page === totalPages}
          text="Next"
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
          }}
        ></Button>
      </div>
      
      {isOverlayOpen && <Overlay isLoading={isLoading}><CreateTask
        getTaskList={getTaskList}
        toggleOverlay={toggleOverlay}
        initialValues={editTask}
        setEditTask={setEditTask}
      /></Overlay>}
    </div>
  );
}

export default App;
