import React from "react";
import Overlay from "../Overlay";
import styled from "styled-components";
import { keyframes } from "styled-components";

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg)
}
`;

const Rotate = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  animation: ${rotate} 2s linear infinite;
`;

const Loader = ({ isOpen }) => {
  if(!isOpen){
    return <></>
  }
  return (
  <Overlay>
    <Rotate></Rotate>
  </Overlay>
  )
};

export default Loader;
