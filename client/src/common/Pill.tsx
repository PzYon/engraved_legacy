import * as React from "react";
import styled, { css } from "styled-components";
import { StyleConstants } from "../styling/StyleConstants";

export interface IPillProps<T> {
  onClick?: () => void;
  label: string;
  tooltip?: string;
  className?: string;
  isSecondary?: boolean;
}

export const Pill = (props: IPillProps<any>) => (
  <ContainerSpan
    className={props.className}
    hasOnClick={!!props.onClick}
    onClick={() => (props.onClick ? props.onClick() : void 0)}
    isSecondary={props.isSecondary}
    title={props.tooltip}
  >
    {props.label}
  </ContainerSpan>
);

export const PillMargin: string = "3px";

interface IContainerSpanProps {
  hasOnClick: boolean;
  isSecondary?: boolean;
}

const ContainerSpan = styled.span`
  background-color: ${(props: IContainerSpanProps) =>
    props.isSecondary ? StyleConstants.colors.discreet : StyleConstants.colors.accent};
  color: white;
  font-size: ${StyleConstants.font.size.small};
  padding: 0 9px;
  margin: ${PillMargin};
  word-wrap: break-word;
  border-radius: ${StyleConstants.borderRadius};
  ${(props: IContainerSpanProps) => {
    return props.hasOnClick
      ? css`
          cursor: pointer;
          box-shadow: ${StyleConstants.discreetBoxShadow};
        `
      : "";
  }};
`;
