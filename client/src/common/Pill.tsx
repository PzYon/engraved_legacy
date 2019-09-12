import * as React from "react";
import styled, { css } from "styled-components";

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
    props.isSecondary ? p => p.theme.colors.discreet : p => p.theme.colors.accent};
  color: ${(props: IContainerSpanProps) =>
    props.isSecondary ? p => p.theme.colors.text : p => p.theme.colors.accentContrast};
  font-size: ${p => p.theme.font.size.small};
  padding: 0 9px;
  margin: ${PillMargin};
  word-wrap: break-word;
  border-radius: ${p => p.theme.borderRadius};
  ${(props: IContainerSpanProps) => {
    return props.hasOnClick
      ? css`
          cursor: pointer;
          box-shadow: ${p => p.theme.discreetBoxShadow};
        `
      : "";
  }};
`;
