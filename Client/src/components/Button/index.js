import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background-color: #f4ebc1;
  &:hover {
    cursor: pointer;
  }
`;

const PButton = ({text, ...props})=> {
  return (
  <Button {...props}>{text}</Button>
  )
}

export default PButton;