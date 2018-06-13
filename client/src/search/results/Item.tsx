import * as moment from "moment";
import * as React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {IItem, IKeyword} from "../../../../shared/dist/index";
import {StyleConstants} from "../../common/StyleConstants";

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
  margin: 0.4rem 0;
`;

const Keywords = styled.p`
  margin: 0.4rem 0;
`;

const Actions = styled.p`
  margin: 0.4rem 0 0 0;
  font-size: 0.8rem;
`;

export const Item: React.SFC<IItem> = (item: IItem) => (
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
                <Keywords>
                    {item.keywords.map((k: IKeyword) => k.name).join(", ")}
                </Keywords>
            )
        }
        <Actions>
            <Link to={`/${item._id || ""}`}>view</Link> | <Link to={`/${item._id || ""}/edit`}>edit</Link>
        </Actions>
    </Root>
);
