import * as React from "react";
import styled from "styled-components";

export const CloserInner = () => <Inner>+</Inner>;

export const Closer = (props: { onClose: () => void; title: string }) => (
  <Container className={"ngrvd-closer"} onClick={props.onClose}>
    <CloserInner />
  </Container>
);

const Container = styled.span`
  position: absolute;
  right: ${p => p.theme.defaultSpacing};
  cursor: pointer;
  font-size: ${p => p.theme.font.size.large};
  font-weight: ${p => p.theme.font.weight.bold};
  color: ${p => p.theme.colors.accent};
  transition: color 0.3s;
  user-select: none;

  &:hover {
    color: ${p => p.theme.colors.text};
  }
`;

const Inner = styled.span`
  cursor: pointer;
  transform: rotate(45deg);
  display: inline-block;
`;
