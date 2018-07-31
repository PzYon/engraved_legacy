import { IItem } from "engraved-shared";
import * as moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyleConstants } from "../styling/StyleConstants";
import { StyleUtil } from "../styling/StyleUtil";

const ContainerSpan = styled.span`
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.accent)};
  white-space: nowrap;
`;

export const Edited: React.SFC<IItem> = (props: IItem) => {
  return (
    <ContainerSpan>
      <Link to={`/items/${props._id || ""}/edit`}>edit</Link>ed{" "}
      <span title={moment(props.editedOn).format("LLL")}>{moment(props.editedOn).fromNow()}</span>
    </ContainerSpan>
  );
};
