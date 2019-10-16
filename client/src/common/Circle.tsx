import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";

export interface ICircleProps {
  children: ReactNode;
  diameter: number;
  onClick?: () => void;
}

export const Circle = (props: ICircleProps) => {
  return <Container {...props}>{props.children}</Container>;
};

const Container = styled.div<ICircleProps>`
  border-radius: 50%;
  font-size: ${p => p.diameter}px;
  height: ${p => p.diameter * 1.5}px;
  width: ${p => p.diameter * 1.5}px;
  text-align: center;
  background-color: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.accentContrast};
  font-weight: ${p => p.theme.font.weight.bold};
  cursor: pointer;
`;
