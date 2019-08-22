import { IItem } from "engraved-shared";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormatDate } from "./FormatDate";

const ContainerSpan = styled.span`
  white-space: nowrap;
`;

export const Edited: React.FC<IItem> = (props: IItem) => (
  <ContainerSpan>
    <Link to={`/items/${props._id || ""}/edit`}>edit</Link>
    ed <FormatDate value={props.editedOn} />
  </ContainerSpan>
);
