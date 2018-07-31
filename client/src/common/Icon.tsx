import * as React from "react";
import styled from "styled-components";

export enum IconName {
  Text = "copywriting",
  Code = "code",
  Url = "link-intact"
}

interface IIconProps {
  iconName: IconName;
}

const IconSpan = styled.span``;

export const Icon: React.SFC<IIconProps> = (props: IIconProps) => {
  return <IconSpan className="ngrvd-icon oi" data-glyph={props.iconName} aria-hidden="true" />;
};
