import React, { useEffect, useState, Fragment } from "react";
import TaskBox from "./components/TaskBox";
import CreateTask from "./components/CreateTask";
import IconButton from "./components/IconButton";
import { getTasks } from "./api";
import "./App.css";
import { createPortal } from "react-dom";
import moment from "moment";
import Button from "./components/Button";

// 'modal-root' is a sibling to 'root'
const modalRoot = document.getElementById("modal-root");

function Modal({ isOpen, children }) {
  //element to which the modal will be rendered
  const el = document.createElement("div", { height: "100%", width: "100%" });

  useEffect(() => {
    // append to root when the children of Modal are mounted
    modalRoot.appendChild(el);

    // do a cleanup
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return (
    isOpen &&
    createPortal(
      // child elemenet
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          padding: "100px",
          background: "rgb(0,0,0,0.5)",
        }}
      >
        <div>{children}</div>
      </div>,
      // target container
      el
    )
  );
}
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const perPage = 3;
  const [page, setPage] = useState(1);

  // modal
  const [isModalOpen, setModalOpen] = useState(false);
  // const [disableBtn, setDisableBtn] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const toggleModal = () => setModalOpen(!isModalOpen);

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
        <IconButton type="add" onClick={toggleModal} ></IconButton>
      </div>
      {/* diplay tasks list */}
      {isLoading
        ? "loading Data..."
        : data.map((tasksGroup) => {
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
                    toggleModal={toggleModal}
                    setEditTask={setEditTask}
                  />
                ))}
              </Fragment>
            );
          })}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "30%",
          margin: "0 auto",
        }}
      >
        <Button
          text="Back"
          disabled={page === 1}
          onClick={() => {
            setPage((prevPage) => prevPage - 1);
          }}
        ></Button>
        <Button
          text="Next"
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
          }}
        ></Button>
      </div>

      <Modal isOpen={isModalOpen}>
        <CreateTask
          getTaskList={getTaskList}
          toggleModal={toggleModal}
          initialValues={editTask}
          setEditTask={setEditTask}
        />
      </Modal>
    </div>
  );
}

export default App;
