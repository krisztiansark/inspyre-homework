import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { MEDIA, COLORS } from "./styleConstants";

const GlobalStyles = createGlobalStyle`

* {
    line-height:1.7;
    letter-spacing: .9px;
    box-sizing: border-box;
    margin:0;
    padding:0;
    color:white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
}`;

export const Container = styled.div`
  height: auto;
  width: auto;
  min-width: 250px;
  max-width: 1000px;
  margin: auto;
  ${({ open }) =>
    open
      ? `opacity:0; pointer-events:none;`
      : `transition: all 600ms; opacity:1`}
`;

export const Button = styled.button`
  transition: all 300ms;
  color: ${COLORS.primary};
  background: ${COLORS.buttonBckg};
  width: 100%;
  display: inline-block;
  width: fit-content;
  font-size: 1rem;
  background: ${({ bckg }) => bckg};
  background: ${({ danger }) => danger && COLORS.danger};
  background: ${({ special }) => special && `${COLORS.secondary}`};
  ${({ disabled }) => disabled && `background: grey; pointer-events:none;`}
  border: 0;
  margin: auto;
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  cursor: pointer;
  &:hover {
    opacity: ${({ special }) => (special ? "1" : "0.8")};
    transform: ${({ special }) => (special ? `scale(1.05)` : "none")};
  }
`;

export const H1 = styled.h1`
  display: inline-block;

  font-size: ${({ main }) => main && "45px"};
  ${({ main }) =>
    main &&
    `
  border-bottom: 1px solid white;`}

  display: inline-block;
`;
export const H2 = styled.h2`
  display: inline-block;
`;
export const H3 = styled.h3`
  display: inline-block;
  margin: auto 0 auto 0 !important;
`;
export const H4 = styled.h4`
  display: inline-block;
`;
export const H5 = styled.h5`
  margin-bottom: auto;
`;
export const P = styled.p`
  display: inline-block;
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
`;

export const Input = styled.input`
  transition: all 300ms;
  border-radius: 10px;

  padding-left: 5px;
  margin-left: auto;
  margin-right: auto;

  background: rgba(255, 259, 250, 0.3);
  border: 1px solid ${COLORS.border};
  color: rgb(80, 80, 80);
  font-size: 1rem;
  &::placeholder {
    color: ${({ dark }) => (!dark ? `rgba(255,255,255,.8)` : `default`)};
  }
`;

export const Textarea = styled.textarea`
  margin-left: auto;
  margin-right: auto;
  resize: none;
  border-radius: 10px;
  transition: all 300ms;
  transition-timing-function: ease-out;
  border-width: 1px;

  min-height: 100px;
  max-height: 500px;
  max-width: 450px;
  width: 100%;
  padding-left: 5px;
  background: rgba(255, 259, 250, 0.3);
  border: 1px solid ${COLORS.border};
  color: rgb(80, 80, 80);
  font-family: inherit;
  font-size: inherit;
  &::placeholder {
    color: ${({ dark }) => (!dark ? `rgba(255,255,255,.8)` : `default`)};
  }
`;

export const Select = styled.select`
  transition: all 300ms;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  height: 30px;
  option {
    color: red !important;
  }
  background: rgba(255, 259, 250, 0.3);
  border: 1px solid ${COLORS.border};
  color: rgb(80, 80, 80);
`;

export const Form = styled.form`
  background: ${COLORS.backgroundForm};
  /* min-height: 400px; */
  border-radius: 10px;
  margin: 10% 0 0 0;

  @keyframes change {
    0% {
      opacity: 0;
      transform: translateX(-140px);
    }
    50% {
      opacity: 0;
      transform: translateX(-100px);
    }
    98% {
      opacity: 1;
      transform: translateX(0px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @keyframes changee {
    0% {
      opacity: 0;
      transform: translateX(-140px);
    }
    50% {
      opacity: 0;
      transform: translateX(-100px);
    }
    98% {
      opacity: 1;
      transform: translateX(0px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @keyframes changeee {
    0% {
      opacity: 0;
      transform: translateX(-140px);
    }
    50% {
      opacity: 0;
      transform: translateX(-100px);
    }
    98% {
      opacity: 1;
      transform: translateX(0px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  ${({ change }) =>
    (change === 0 && `  animation: change 0.4s ease-in;`) ||
    (change === 1 && `  animation: changee 0.4s ease-in;`) ||
    (change === 2 && `  animation: changeee 0.4s ease-in;`)}

  animation-fill-mode: forwards;
`;

export const DatePickerStyled = styled(DatePicker)`
  transition: all 300ms;
  border-radius: 10px;
  color: black;
  padding-left: 5px;
  margin-left: auto;
  margin-right: auto;
  border: none;
  width: 100%;
  @media (max-width: ${MEDIA.sm}) {
    height: 25px;
    &:focus {
      border-radius: 20px;
    }

    height: 35px;
    padding-left: 8px;
    font-size: 0.9rem;
  }

  @media (min-width: ${MEDIA.md}) {
    height: 35px;
    padding-left: 15px;
    font-size: 1rem;
  }

  background: rgba(255, 259, 250, 0.3);
  border: 1px solid ${COLORS.border};
  color: rgb(80, 80, 80);
`;

export const DatePickerDiv = styled.div`
  margin-top: 10%;
`;

export const Img = styled.img`
  width: 75px;
  height: 75px;
  transform: scale(0.9);
  transition: all 300ms;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid white;
  ${({ sm, lg }) =>
    (sm &&
      `
  width: 60px;
  height: 60px;
  padding:0;
`) ||
    (lg &&
      `    
  width: 90px;
  height: 90px;`)}
  border-radius: 50%;
  margin: auto 0 auto 0;
  filter: ${({ selected }) => (selected ? "grayscale(0%)" : "grayscale(90%)")};
  transform: ${({ selected }) => (selected ? "scale(1)" : "scale(.9)")};
`;

export const Label = styled.label``;

export default GlobalStyles;
