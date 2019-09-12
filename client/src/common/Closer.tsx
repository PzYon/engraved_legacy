import * as React from "react";
import styled from "styled-components";

const Container = styled.span`
  position: absolute;
  right: ${p => p.theme.defaultSpacing};
  cursor: pointer;
  font-size: ${p => p.theme.font.size.largest};
  font-weight: ${p => p.theme.font.weight.normal};
  color: ${p => p.theme.colors.accent};
  transition: color 0.3s;
  transform: rotate(45deg);

  &:hover {
    color: ${p => p.theme.colors.text};
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
