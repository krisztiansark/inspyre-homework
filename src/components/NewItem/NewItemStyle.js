import styled from "styled-components";
import { MEDIA } from "../../utils/styleConstants";
export const ButtonDiv = styled.div`
  margin: 2.5% 0 2.5% 0;
`;

export const ProfileCard = styled.div`
  border: ${({ selected }) =>
    selected ? "1px solid rgba(37, 208, 205, 0.8)" : "1px solid transparent"};
  margin: 2%;
  padding: 2%;
  cursor: pointer;
  transition: all 300ms;
  border-radius: 10px;
  background: rgba(37, 208, 205, 0.8);
  background: ${({ selected }) =>
    selected ? "rgba(57, 168, 185, 1)" : "rgba(37, 208, 205, 0.8)"};
  transform: ${({ selected }) => (selected ? " scale(1.02)" : "scale(1)")};
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.5);
  }

  @media (min-width: ${MEDIA.md}) {
    width: 200px !important;
  }
`;
export const ProfileDiv = styled.div`
  padding: 2.5% 0 0 0;
  border-radius: 10px;
`;

export const ButtonRow = styled.div`
  position: relative;
  left: 0;
  right: 0;

  margin-left: auto;
  margin-right: auto;
  bottom: 0;
`;
