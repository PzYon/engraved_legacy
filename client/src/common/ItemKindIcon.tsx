import * as React from "react";
import styled from "styled-components";
import { ItemKind } from "../../../shared/src";
import { ItemKindRegistrationManager } from "../items/ItemKindRegistrationManager";

interface IIconProps {
  itemKind: ItemKind;
}

const IconSpan = styled.span``;

export const ItemKindIcon: React.SFC<IIconProps> = (props: IIconProps) => {
  return (
    <IconSpan className={"ngrvd-icon"}>
      {ItemKindRegistrationManager.getItemKindLabel(props.itemKind)}
    </IconSpan>
  );
};