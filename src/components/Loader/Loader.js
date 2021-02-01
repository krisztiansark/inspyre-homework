import React from "react";

import styled from "styled-components";
import apple from "../../favicon.ico";
function Loader(props) {
  const { open, color } = props;
  //

  return (
    <ColMin open={open}>
      <LoaderDiv open={open} color={color}>
        <Img src={apple} alt="loading-apple" />
      </LoaderDiv>
    </ColMin>
  );
}

export default Loader;

export const ColMin = styled.div`
  ${({ open }) => (open ? `opacity:1` : `transition:all 500ms; opacity:0`)};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  pointer-events: none;
`;

export const LoaderDiv = styled.div`
  border: 13px solid #f3f3f3;
  border-radius: 50%;
  border-top: 13px solid ${({ color }) => (color ? color : "#00c4ff")};
  top: 45%;
  left: 47%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  position: absolute;

  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`;

export const Img = styled.img`
  margin: 19% auto auto auto;
  display: block;
  position: relative;
  animation: apple 1.5s linear infinite;
  @keyframes apple {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;
