import {IItem, IKeyword} from "engraved-shared/dist";
import * as moment from "moment";
import * as React from "react";
import styled from "styled-components";
import {StyleConstants} from "../common/StyleConstants";

const Root = styled.div`
  border: 1px solid deepskyblue;
  padding: ${StyleConstants.defaultPadding};
  margin: ${StyleConstants.defaultMargin};
`;

const Title = styled.span`
  font-weight: bold;
  font-size: ${StyleConstants.largeFontSize};
`;

const Date = styled.span`
  float: right;
`;

const Description = styled.p`
  margin-bottom: 0;
`;

export const Item: React.SFC<IItem> = (item: IItem) => {
    return (
        <Root>
            <Title>
                {item.itemKind}: {item.title}
            </Title>
            <Date>
                {moment(item.createdOn).fromNow()}
            </Date>
            <Description>
                {item.description}
            </Description>
            {
                item.keywords
                && item.keywords.length > 0
                && (
                    <div>
                        {item.keywords.map((k: IKeyword) => k.name).join(", ")}
                    </div>
                )
            }
        </Root>
    );
};