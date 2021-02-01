import styled from "styled-components";
import { Container } from "../../utils/globalStyles";
import { MEDIA, COLORS } from "../../utils/styleConstants";

export const ContainerItem = styled(Container)`
  transition: all 300ms;
  background: ${COLORS.background};
  max-width: 500px;
  border-radius: 8px;
  position: relative;
  border: 1px solid rgba(137, 208, 205, 1);
  height: auto;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.5);
  }
  transition: all 300ms;

  display: ${({ deleted }) => (deleted ? "none" : "block")};
`;
export const Content = styled.div`
  ${({ confirm }) =>
    !confirm
      ? `
        transition: all 100ms;
    opacity:1;
    pointer-events:default; `
      : `
        transition: all 400ms;
      opacity:0;
 pointer-events:none; `};
`;

// export const TitleDiv = styled.div`
//   /* border: 1px solid black; */
// `;

// export const DueDiv = styled.div`
//   /* border: 1px solid black; */
// `;

export const DeleteDiv = styled.div`
  /* border: 1px solid black; */
`;

export const DueSignal = styled.div`
  display: inline-block;

  ${({ due }) =>
    due
      ? `
      color:rgba(206, 85, 85, 1);
    animation: due 3s linear infinite;
    @keyframes due {
  0% {
    opacity:0.4;
    transform: translateX(-10px) scale(0.9);
  }
50% {
    opacity:1;
transform: translateX(0px) scale(1);
}
  100% {
 opacity:0.4;
 transform: translateX(-10px) scale(0.9);
  }
}
`
      : `
      color:blue;
      opacity:0;`}
`;

export const ConfirmationDiv = styled.div`
  position: absolute;
  width: 100%;

  text-align: center;
  /* background: red; */

  box-sizing: border-box;
  text-align: center;
  ${({ confirm }) =>
    confirm
      ? `
        transition: all 300ms;
    opacity:1;
    pointer-events:default; `
      : `
        transition: all 200ms;
      opacity:0;
 pointer-events:none; `}
`;
