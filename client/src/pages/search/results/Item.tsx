import { IItem, IKeyword } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Edited } from "../../../common/Edited";
import { ItemKindIcon } from "../../../common/ItemKindIcon";
import { Keywords } from "../../../common/Keywords";
import { PillMargin } from "../../../common/Pill";
import { ItemKindRegistrationManager } from "../../../items/ItemKindRegistrationManager";
import { ItemStore } from "../../../items/ItemStore";
import { StyleConstants } from "../../../styling/StyleConstants";

const Root = styled.div`
  border: 1px solid ${StyleConstants.colors.discreet};
  border-radius: ${StyleConstants.borderRadius};
  margin: 1.5rem 0;
  padding: ${StyleConstants.defaultSpacing};
  box-shadow: ${StyleConstants.defaultBoxShadow};
  opacity: 0;
  transition: opacity 0.5s;
  background-color: ${StyleConstants.colors.pageBackground};
`;

const Paragraph = styled.p`
  margin: 0.5rem 0;

  .ngrvd-keywords {
    margin-left: -${PillMargin};
  }
`;

const DescriptionParagraph = styled(Paragraph)`
  font-weight: 300;
`;

const SpecificPropertiesParagraph = styled(Paragraph)`
  font-size: ${StyleConstants.font.small};
  margin-bottom: 0;
`;

const Property = styled.span`
  word-break: break-word;

  :not(:last-of-type)::after {
    content: "\\00B7";
    margin: 0 0.4rem;
  }

  .ngrvd-icon {
    position: relative;
  }
`;

const Title = styled.div`
  font-weight: 300;
  font-size: ${StyleConstants.font.large};
  line-height: 20px;
`;

export interface IItemProps {
  item: IItem;
}

export class Item extends React.PureComponent<IItemProps> {
  private itemEl = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    setTimeout(() => {
      if (this.itemEl.current) {
        this.itemEl.current.style.opacity = "1";
      }
    });
  }

  public render(): ReactNode {
    const item: IItem = this.props.item;

    return (
      <Root ref={this.itemEl}>
        <Title>
          <Link to={`/items/${item._id || ""}`}>{item.title}</Link>
        </Title>
        {item.description && <DescriptionParagraph>{item.description}</DescriptionParagraph>}
        <Paragraph>
          <Keywords
            keywords={item.keywords}
            onClick={Item.toggleSelectedKeyword}
            orderAlphabetically={true}
          />
        </Paragraph>
        <SpecificPropertiesParagraph>
          <Property>
            <ItemKindIcon itemKind={item.itemKind} />
          </Property>
          <Property>
            <Edited {...item} />
          </Property>
          {Item.getSpecificProperties(item)}
        </SpecificPropertiesParagraph>
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
