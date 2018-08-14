import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../styling/StyleConstants";

const Container = styled.span`
  position: absolute;
  top: 1rem;
  right: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  color: ${StyleConstants.colors.accent};
  transition: color 0.3s;

  &:hover {
    color: ${StyleConstants.colors.font};
  }
`;

export interface ICloserProps {
  onClose: () => void;
  title: string;
}

export const Closer: React.SFC<ICloserProps> = (props: ICloserProps) => {
  return (
    <Container className={"ngrvd-closer"} onClick={props.onClose}>
      x
    </Container>
  );
};
