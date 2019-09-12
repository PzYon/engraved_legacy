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

const Root = styled.div`
  border: 1px solid ${p => p.theme.colors.discreet};
  border-radius: ${p => p.theme.borderRadius};
  margin: 1.5rem 0;
  padding: ${p => p.theme.defaultSpacing};
  box-shadow: ${p => p.theme.defaultBoxShadow};
  opacity: 0;
  transition: opacity 0.5s;
  background-color: ${p => p.theme.colors.pageBackground};
`;

const Paragraph = styled.p`
  margin: 0.5rem 0;

  .ngrvd-keywords {
    margin-left: -${PillMargin};
  }
`;

const DescriptionParagraph = styled(Paragraph)`
  font-weight: ${p => p.theme.font.weight.normal};
`;

const SpecificPropertiesParagraph = styled(Paragraph)`
  font-size: ${p => p.theme.font.size.small};
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
  margin-top: -5px;
  font-weight: ${p => p.theme.font.weight.normal};
  font-size: ${p => p.theme.font.size.large};
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
