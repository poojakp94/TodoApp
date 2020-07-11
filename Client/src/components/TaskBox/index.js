import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "../IconButton";
import { deleteTask, toggleComplete } from "../../api";

const TaskBoxContainer = styled.div`
  background-color: #fff;
  margin: 20px 0;
  padding:10px;
  border: 2px solid #fff;
  border-radius: 12px;
`;

const Task = styled.p`
  text-align: left;
  padding: 10px;
  border-left: 5px solid  #709FB0;
  text-decoration: ${({ shouldStrike }) =>
    shouldStrike ? "line-through" : "none"};
`;

const TaskContent = styled.div`
  text-align: left;
  padding: 10px;
  border-top: 1px solid  #709FB0;
`;
const IconContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 50px 50px 50px;
  justify-content: flex-end;
  padding: 20px;
`;

function TaskBox({
  title,
  description,
  id,
  isCompleted,
  getTaskList,
  toggleModal,
  setEditTask
}) {
  const toggleTask = () => {
    toggleComplete(id).then((response) => {
      if (response.ok) {
        getTaskList();
      }
    });
  };
  return (
    <TaskBoxContainer>
      <Task shouldStrike={isCompleted}>{title}</Task>
      <TaskContent>{description}</TaskContent>

      <IconContainer>
        <IconButton type="edit" onClick={()=>{
          setEditTask({id, title, description})
          toggleModal()
        }} />
        <IconButton
          type="trash"
          onClick={() => {
            deleteTask(id).then((response) => {
              if (response.ok) {
                getTaskList();
              }
            });
          }}
        ></IconButton>
        {isCompleted ? (
          <IconButton type="refresh" onClick={toggleTask} />
        ) : (
          <IconButton type="checkmark" onClick={toggleTask} />
        )}
      </IconContainer>
    </TaskBoxContainer>
  );
}

export default TaskBox;
