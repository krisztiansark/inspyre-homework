import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
export const COLORS = {
  primary: "white",
  primaryHover: "orange",
  secondary: "rgba(223, 150, 48, 1)",
  secondaryHover: "velvet",
  white: "white",
  black: "black",
  border: "rgba(137, 208, 205, 1)",
  background: "rgba(37, 208, 205, 0.8)",
};

const MEDIA = {
  sm: "575.98px",
  md: "576px",
  lg: "768px",
};

const GlobalStyles = createGlobalStyle`

* {
    line-height:1.7;
    letter-spacing: .6px;
    box-sizing: border-box;
    margin:0;
    padding:0;
    color:white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
}`;

export const Container = styled.div`
  /* margin: auto; */
  border: 1px solid red;
`;

export const Button = styled.button`
  transition: all 300ms;
  color: ${COLORS.primary};
  background: rgba(19, 148, 141, 1);
  /* color: ${({ secondary }) => secondary && COLORS.secondary}; */
  color: ${({ color }) => color};
  background: ${({ bckg }) => bckg};
  background: ${({ danger }) => danger && `rgba(206, 85, 85, 1)`};
  background: ${({ special }) => special && `${COLORS.secondary}`};
  ${({ disabled }) => disabled && `background: grey; pointer-events:none;`}
  border: 0;
  margin: auto;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const H1 = styled.h1`
  font-size: ${({ main }) => main && "45px"};
  /* display: inline-block; */
  display: block;
`;
export const H2 = styled.h2`
  font-size: ${({ main }) => main && "45px"};
`;
export const H3 = styled.h3`
  font-size: ${({ main }) => main && "45px"};
`;
export const H4 = styled.h4`
  font-size: ${({ main }) => main && "45px"};
`;
export const P = styled.p`
  font-size: ${({ main }) => main && "45px"};
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
`;

export const Input = styled.input`
  transition: all 300ms;
  border-radius: 10px;
  color: black;
  padding-left: 5px;
  margin-left: auto;
  margin-right: auto;
  border: none;

  @media (max-width: 640px) {
    height: 25px;
    &:focus {
      border-radius: 20px;
    }
    width: 49%;
    height: 25px;
    padding-left: 8px;
    font-size: 0.9rem;
  }

  @media (min-width: 641px) {
    width: 48%;
    height: 45px;

    padding-left: 15px;

    font-size: 1.2rem;
  }

  @media (min-width: 1024px) {
    width: 40%;
    height: 30px;
    margin: 0 0 5% 0;
  }

  background: rgba(255, 259, 250, 0.3);
  border: 1px solid ${COLORS.border};
  color: rgb(80, 80, 80);

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
  border: none;
  font-size: 0.9rem;

  @media (max-width: ${MEDIA.sm}) {
    height: 70px;
    width: 95%;
    &:focus {
    }
    margin-bottom: 15px;
    padding-left: 8px;
    padding-top: 5px;
  }

  @media (min-width: ${MEDIA.md}) {
    height: 80px;

    border-width: 1px;
    width: 100%;
    height: 90px;
    padding-left: 15px;
    font-size: 1.4rem;
  }

  @media (min-width: ${MEDIA.lg}) {
    height: 80px;
    border-width: 1px;
    width: 90%;
    height: 120px;
    padding-left: 15px;
    margin: 0 0 5% 0;
  }

  background: rgba(255, 259, 250, 0.3);
  border: 1px solid ${COLORS.border};
  color: rgb(80, 80, 80);

  &::placeholder {
    color: ${({ dark }) => (!dark ? `rgba(255,255,255,.8)` : `default`)};
  }
`;

export const Form = styled.form`
  /* background: rgba(255, 155, 155, 0.2); */
  border-radius: 10px;
`;

export const DatePickerStyled = styled(DatePicker)`
  transition: all 300ms;
  border-radius: 10px;
  color: black;
  padding-left: 5px;
  margin-left: auto;
  margin-right: auto;
  border: none;

  @media (max-width: ${MEDIA.sm}) {
    height: 25px;
    &:focus {
      border-radius: 20px;
    }
    width: 49%;
    height: 25px;
    padding-left: 8px;
    font-size: 0.9rem;
  }

  @media (min-width: ${MEDIA.md}) {
    width: 48%;
    height: 45px;

    padding-left: 15px;

    font-size: 1.2rem;
  }

  @media (min-width: ${MEDIA.lg}) {
    width: 100%;
    height: 30px;
    margin: 5%;
  }

  background: rgba(255, 259, 250, 0.3);
  border: 1px solid ${COLORS.border};
  color: rgb(80, 80, 80);

  input {
    &::placeholder {
      color: ${({ dark }) => (!dark ? `rgba(255,255,255,.8)` : `default`)};
    }
  }
`;

export const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 5px;
  filter: grayscale(80%);
`;

export const Label = styled.label`
  margin: 5% 0 0 0;
`;

export default GlobalStyles;
