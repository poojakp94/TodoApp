import React from "react";
import styled from "styled-components";

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
function CreateTask() {
  return (
    <CreateTaskContainer>
      <CreateQues>What You are Upto?</CreateQues>
      <textarea col="10" row="55"></textarea>
      <CreateButton>Create to-do</CreateButton>
    </CreateTaskContainer>
  );
}

export default CreateTask;
