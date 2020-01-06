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
  top: 8px;
  cursor: pointer;
  font-size: 36px;
  font-weight: ${p => p.theme.font.weight.normal};
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
