import React from "react";
import styled from "styled-components";
import edit from "../../icons/edit.svg";
import trash from "../../icons/trash.svg";
import checkmark from "../../icons/checkmark.svg";
import refresh from "../../icons/refresh.svg";
import add from "../../icons/insertion.svg";

const Button = styled.button`
  position: relative;
  display: inline-block;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background: #555;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
  ${Button}:hover & {
    visibility: visible;
    opacity: 1;
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
        return "";
    }
  };

  const getToolTipText = () => {
    switch (type) {
      case "edit":
        return "edit";
      case "trash":
        return "trash";
      case "checkmark":
        return "completed";
      case "refresh":
        return "refresh";
      case "add":
        return "add";

      default:
        return "";
    }
  };

  return (
    <Button onClick={onClick}>
      <img src={getImgUrl()} width="25"></img>
      <Tooltip>{getToolTipText()}</Tooltip>
    </Button>
  );
}

export default IconButton;
