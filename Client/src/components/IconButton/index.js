import React from "react";
import styled from "styled-components";
import edit from "../../icons/edit.svg";
import trash from "../../icons/trash.svg";
import checkmark from "../../icons/checkmark.svg";
import refresh from "../../icons/refresh.svg";
import add from "../../icons/insertion.svg";

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background-color: aquamarine;
  &:hover {
    cursor: pointer;
  }
`;

function IconButton({ type, onClick }) {
  const getImgUrl = () => {
    switch (type) {
      case "edit":
        return edit;
      case "trash":
        return trash;
      case "checkmark":
        return checkmark;
      case "refresh":
        return refresh;
      case "add":
        return add;

      default:
        return edit;
    }
  };
  return (
    <Button onClick={onClick}>
      <img src={getImgUrl()} width="25"></img>
    </Button>
  );
}

export default IconButton;
