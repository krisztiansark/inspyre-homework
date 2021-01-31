import styled from "styled-components";

export const ButtonDiv = styled.div`
  margin: 2.5% 0 2.5% 0;
`;

export const ProfileCard = styled.div`
  /* border: 1px solid red; */
  margin: 3%;
  cursor: pointer;
  transition: all 300ms;
  border-radius: 10px;
  background: rgba(37, 208, 205, 0.8);
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.5);
  }
`;
export const ProfileDiv = styled.div`
  /* border: 1px solid red; */
  margin: 5%;
  padding: 2.5% 0 2.5% 0;
  border-radius: 10px;
`;
