import styled from "styled-components";
import { Container } from "../../utils/globalStyles";
import { MEDIA, COLORS } from "../../utils/styleConstants";

export const ContainerItem = styled(Container)`
  transition: all 300ms;
  background: ${COLORS.background};
  max-width: 600px;
  border-radius: 8px;
  position: relative;
  border: 1px solid ${COLORS.border};
  height: auto;
  transition: all 300ms;
  margin: 10% 0 0 0;
`;

export const Description = styled.div`
  min-height: 100px;
  background: ${COLORS.backgroundTwo};
  border: 1px solid ${COLORS.border};
  border-radius: 10px;
  margin: 3% 0 3% 0;
`;

export const ColFancy = styled.div`
  ${({ top }) =>
    top &&
    `
  border-top: 3px solid ${COLORS.border};`}
  ${({ bottom }) =>
    bottom &&
    `
  border-bottom: 3px solid ${COLORS.border};`}
  border-radius: 10px;
`;
