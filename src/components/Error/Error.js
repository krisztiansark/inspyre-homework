import React from "react";
import styled from "styled-components";
function Error(props) {
  const { background, color, open } = props;

  return (
    <Col color={color} open={open} background={background}>
      <H4 open={open}>Whoops, there was some issue with your request.</H4>
      <br />
      <H4 open={open}>Please refresh the page</H4>
      <br />
      <H4 open={open}>Here's a lemon: 🍋</H4>
    </Col>
  );
}

export default Error;

export const Col = styled.div`
  position: fixed;
  color: ${({ color }) => (color ? color : "white")};
  background: ${({ background }) => (background ? background : "red")};
  top: 20px;
  left: 20px;

  border-radius: 10px;
  padding: 10px;
  margin: auto;
  z-index: 99;
  transition: all 400ms;
  opacity: 0;
  ${({ open }) =>
    open
      ? `
   animation: error 10s linear;
    @keyframes error {
    0% {
    transform: translateY(-100px);
      opacity:0;
    }
    5%{
        transform: translateY(0px);
          opacity:1;  
    }
    90% {
      opacity:1;
    transform: translateY(0px);
    }
    100% {
         transform: translateY(-100px);
    opacity:0;
    }
  }
  `
      : `opacity:0, pointer-events:none;`}
`;

export const H4 = styled.h4`
  margin: auto;
  text-align: center;
  display: inline-block;
`;
