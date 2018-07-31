import { IItem, IKeyword } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Edited } from "../../../common/Edited";
import { Icon } from "../../../common/Icon";
import { KeywordMargin } from "../../../common/Keyword";
import { Keywords } from "../../../common/Keywords";
import { ItemKindRegistrationManager } from "../../../items/ItemKindRegistrationManager";
import { ItemStore } from "../../../items/ItemStore";
import { StyleConstants } from "../../../styling/StyleConstants";
import { StyleUtil } from "../../../styling/StyleUtil";

const Root = styled.div`
  border: 1px solid ${StyleConstants.colors.discreet};
  border-radius: ${StyleConstants.borderRadius};
  margin: ${StyleConstants.defaultSpacing} 0;
  padding: ${StyleConstants.defaultSpacing};
  box-shadow: ${StyleConstants.defaultBoxShadow};
  display: flex;
  flex-flow: row;
  opacity: 0;
  transition: opacity 0.8s;
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.accent)};
`;

const Paragraph = styled.p`
  margin: 0.4rem 0;

  .ngrvd-keywords {
    margin-left: -${KeywordMargin};
  }
`;

const SpecificPropertiesParagraph = Paragraph.extend`
  font-size: ${StyleConstants.font.small};
`;

const Property = styled.span`
  :not(:last-of-type)::after {
    content: "|";
    margin: 0 0.4rem;
  }
`;

const LeftDiv = styled.div`
  padding-top: 6px;
  width: 1.5rem;
  min-width: 1.5rem;
  font-size: 0.9rem;
  color: ${StyleConstants.colors.accent};
`;

const RightDiv = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: ${StyleConstants.font.large};
`;

export interface IItemProps {
  item: IItem;
}

export class Item extends React.PureComponent<IItemProps> {
  private itemEl: HTMLDivElement;

  public componentDidMount(): void {
    setTimeout(() => (this.itemEl.style.opacity = "1"));
  }

  public render(): ReactNode {
    const item: IItem = this.props.item;

    return (
      <Root innerRef={r => (this.itemEl = r)}>
        <LeftDiv>
          <Icon iconName={ItemKindRegistrationManager.getItemKindIcon(item.itemKind)} />
        </LeftDiv>
        <RightDiv>
          <Title>
            <Link to={`/items/${item._id || ""}`}>{item.title}</Link>
          </Title>
          <Paragraph>{item.description}</Paragraph>
          <Paragraph>
            <Keywords keywords={item.keywords} onClick={Item.toggleSelectedKeyword} />
          </Paragraph>
          <SpecificPropertiesParagraph>
            <Property>
              <Edited {...item} />
            </Property>
            {Item.getSpecificProperties(item)}
          </SpecificPropertiesParagraph>
        </RightDiv>
      </Root>
    );
  }

  private static getSpecificProperties(item: IItem): ReactNode {
    const p = ItemKindRegistrationManager.resolve(item.itemKind).getSpecificProperty(item);

    return p ? <Property>{p}</Property> : null;
  }

  private static toggleSelectedKeyword(k: IKeyword) {
    ItemStore.instance.toggleKeyword(k);
    ItemStore.instance.loadItems();
  }
}
