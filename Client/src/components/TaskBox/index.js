import React from "react";
import styled from "styled-components";
import IconButton from "../IconButton";


const TaskBoxContainer = styled.div`
  background-color: #fff;
  margin: 20px;
  border: 2px solid #fff;
  border-radius: 12px;
`;

const Task = styled.p`
text-align: left;
padding: 10px 0 10px 10px;
`

const TaskContent = styled.div `
text-align: left;
padding: 10px;
`
const IconContainer = styled.div `
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 50px 50px 50px;
  justify-content:flex-end;
  padding: 20px;
`
function TaskBox() {
  return (
    <TaskBoxContainer>
      <Task> Tasks</Task>
      <TaskContent>Fetched data</TaskContent>
      <IconContainer>
        <IconButton type="edit" onClick={() => {}} />
        <IconButton type="trash" onClick={() => {}} />
        <IconButton type="checkmark" onClick={() => {}} />
      </IconContainer>
    </TaskBoxContainer>
  );
}

export default TaskBox;
