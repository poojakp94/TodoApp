import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { addTask, updateTask } from "../../api";

const CreateTaskContainer = styled.div`
  padding: 20px 80px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 15px;
`;
const CreateQues = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;
const CreateButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background-color: aquamarine;
  &:hover {
    cursor: pointer;
    background-color: #1245;
    color: #fff;
  }
`;

function CreateTask({ getTaskList, toggleModal, initialValues, setEditTask }) {
  const [formData, setFormData] = useState(initialValues || {});
  const [isLoading, setLoading] = useState(false);

  function handleOnChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function saveTask() {
    setLoading(true);
    addTask(formData)
      .then(() => {
        getTaskList();
        toggleModal();
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }

  function editTask() {
    setLoading(true);
    updateTask(formData)
      .then(() => {
        getTaskList();
        setEditTask(null);
        toggleModal();
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <CreateTaskContainer>
      <CreateQues>What You are Upto?</CreateQues>
      <div>
        <input
          onChange={handleOnChange}
          value={formData.title}
          name="title"
          type="text"
          style={{ height: "30px", width: "min(400px, 100%)", padding: "10px" }}
          placeholder="title...."
        ></input>
        <textarea
          onChange={handleOnChange}
          value={formData.description}
          name="description"
          style={{
            height: "120px",
            width: "min(400px, 100%)",
            padding: "10px",
          }}
          placeholder="content..."
        ></textarea>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CreateButton
            disabled={isLoading}
            onClick={initialValues ? editTask : saveTask}
          >
            {isLoading
              ? "Saving Task"
              : initialValues
              ? "Edit to-do"
              : "Create to-do"}
          </CreateButton>
          <CreateButton onClick={toggleModal}>Cancel</CreateButton>
        </div>
      </div>
    </CreateTaskContainer>
  );
}

export default CreateTask;
