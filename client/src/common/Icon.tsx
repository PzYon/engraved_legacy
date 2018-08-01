import * as React from "react";
import styled from "styled-components";
import { ItemKindRegistrationManager } from "../items/ItemKindRegistrationManager";
import { StyleConstants } from "../styling/StyleConstants";

export enum IconName {
  Text = "txt",
  Code = "{.}",
  Url = "<a>"
}

interface IIconProps {
  iconName: IconName;
}

const IconSpan = styled.span`
  font-family: ${StyleConstants.font.codeFamily};
  font-size: 0.7em;
  font-weight: bold;
  border: 1px solid ${StyleConstants.colors.font};
  color: ${StyleConstants.colors.font};
  border-radius: 50%;
  padding: 0.4em 0.3em 0.5em;
  white-space: nowrap;
  text-align: center;
  cursor: default;
  user-select: none;
`;

export const Icon: React.SFC<IIconProps> = (props: IIconProps) => {
  return <IconSpan className={"ngrvd-icon"}>{props.iconName}</IconSpan>;
};
