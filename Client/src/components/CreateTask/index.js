import React, { useState } from "react";
import styled from "styled-components";

import { addTask } from "../../api";

const CreateTaskContainer = styled.div`
  padding: 10px 80px;
  display: flex;
  flex-direction: column;
`;
const CreateQues = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
const CreateButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    cursor: pointer;
    background-color: #1245;
    color: #fff;
  }
`;
function CreateTask({getTaskList}) {
  const [formData, setFormData] = useState({});
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
          style={{ height: "120px", width: "min(400px, 100%)", padding: "10px" }}
          placeholder="content..."
        ></textarea>
        <CreateButton disabled={isLoading} onClick={saveTask}>
          {isLoading ? "Saving Task" : "Create to-do"}
        </CreateButton>
      </div>
    </CreateTaskContainer>
  );
}

export default CreateTask;
