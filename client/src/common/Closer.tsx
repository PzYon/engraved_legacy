import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../styling/StyleConstants";

const Container = styled.span`
  position: absolute;
  right: ${StyleConstants.defaultSpacing};
  cursor: pointer;
  font-size: ${StyleConstants.font.largest};
  font-weight: 300;
  color: ${StyleConstants.colors.accent};
  transition: color 0.3s;
  transform: rotate(45deg);

  &:hover {
    color: ${StyleConstants.colors.font};
  }
`;

export interface ICloserProps {
  onClose: () => void;
  title: string;
}

export const Closer: React.FC<ICloserProps> = (props: ICloserProps) => (
  <Container className={"ngrvd-closer"} onClick={props.onClose}>
    +
  </Container>
);
