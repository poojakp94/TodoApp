import React, { useEffect, useState, Fragment } from "react";
import TaskBox from "./components/TaskBox";
import CreateTask from "./components/CreateTask";
import IconButton from "./components/IconButton";
import { getTasks } from "./api";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const getTaskList = () => {
    setLoading(true);
    getTasks()
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
  }, []);
  return (
    <div className="App">
      <header className="App-header">TO DO LIST</header>
      <div className="insert-icon">
        <IconButton type="add" onClick={() => {}}></IconButton>
      </div>
      {/* diplay tasks list */}
      {isLoading
        ? "loading Data..."
        : data.map((tasksGroup) => {
            return (
              <Fragment key={tasksGroup._id}>
                <div className="date">Date: {tasksGroup._id} </div>
                {tasksGroup.list.map((task) => (
                  <TaskBox
                    key={task._id}
                    title={task.title}
                    description={task.description}
                    id={task._id}
                    getTaskList={getTaskList}
                    isCompleted = {task.is_completed}
                  />
                ))}
              </Fragment>
            );
          })}
      <CreateTask getTaskList={getTaskList} />
    </div>
  );
}

export default App;
