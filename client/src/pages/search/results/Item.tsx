import { IItem, IKeyword } from "engraved-shared";
import * as moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EnumUtil } from "../../../common/EnumUtil";
import { Keyword } from "../../../common/Keyword";
import { StyleConstants } from "../../../styling/StyleConstants";
import { StyleUtil } from "../../../styling/StyleUtil";

const Root = styled.div`
  border: 1px solid ${StyleConstants.colors.discreet};
  border-radius: ${StyleConstants.borderRadius};
  margin: ${StyleConstants.defaultSpacing} 0;
  padding: ${StyleConstants.defaultSpacing};
  box-shadow: ${StyleConstants.defaultBoxShadow};
`;

const Title = styled.span`
  font-weight: bold;
  font-size: ${StyleConstants.font.large};
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.accent)};
`;

const AdditionalDetailsDiv = styled.div`
  font-size: 0.8rem;
`;

const AuthorInfoSpan = styled.span`
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.accent)};
`;

const Description = styled.p`
  margin: 0.4rem 0;
`;

const Keywords = styled.p`
  margin: 0.4rem 0;
`;

export const Item: React.SFC<IItem> = (item: IItem) => (
  <Root>
    <Title>
      <Link to={`/items/${item._id || ""}`}>{item.title}</Link>
    </Title>
    <Description>{item.description}</Description>
    <AdditionalDetailsDiv>
      {item.keywords &&
        item.keywords.length > 0 && (
          <Keywords>
            {item.keywords.map((k: IKeyword) => <Keyword key={k._id} keyword={k} />)}
          </Keywords>
        )}
      <AuthorInfoSpan>
        {EnumUtil.getItemKindLabel(item.itemKind)}, last{" "}
        <Link to={`/items/${item._id || ""}/edit`}>edit</Link>ed&nbsp;
        {moment(item.editedOn).fromNow()}
      </AuthorInfoSpan>
    </AdditionalDetailsDiv>
  </Root>
);
