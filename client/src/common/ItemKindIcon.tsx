import { ItemKind } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { ItemKindRegistrationManager } from "../items/ItemKindRegistrationManager";

interface IIconProps {
  itemKind: ItemKind;
}

const IconSpan = styled.span``;

export const ItemKindIcon: React.FC<IIconProps> = (props: IIconProps) => {
  return (
    <IconSpan className={"ngrvd-icon"}>
      {ItemKindRegistrationManager.getItemKindLabel(props.itemKind)}
    </IconSpan>
  );
};
