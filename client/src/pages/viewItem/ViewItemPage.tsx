import { IItem } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Edited } from "../../common/Edited";
import { ErrorBoundary } from "../../common/ErrorBoundary";
import {
  FormButtonContainer,
  FormContainer,
  FormFieldContainer
} from "../../common/form/Form.StyledComponents";
import { FormButton } from "../../common/form/FormButton";
import { Icon } from "../../common/Icon";
import { Keywords } from "../../common/Keywords";
import { ItemKindRegistrationManager } from "../../items/ItemKindRegistrationManager";
import { ItemStore } from "../../items/ItemStore";
import { StyleConstants } from "../../styling/StyleConstants";
import { Page } from "../Page";

interface IRouterParams {
  itemId: string;
}

interface IViewItemFormState {
  itemId: string;
  item: IItem | undefined;
  isClose: boolean;
}

const SectionContainer = styled.div`
  margin: 1rem 0;
`;

const ItemPropertiesContainer = SectionContainer.extend`
  display: flex;
  align-items: stretch;
  font-size: ${StyleConstants.font.small};
`;

const ItemPropertyDiv = styled.div`
  padding: 0.2rem 0.4rem;
  border-left: 1px solid ${StyleConstants.colors.discreet};
  border-top: 1px solid ${StyleConstants.colors.discreet};
  border-bottom: 1px solid ${StyleConstants.colors.discreet};
  display: flex;
  align-items: center;

  &:last-of-type {
    border-right: 1px solid ${StyleConstants.colors.discreet};
  }

  &:empty {
    display: none;
  }
`;

export class ViewItemPage extends React.Component<
  RouteComponentProps<IRouterParams>,
  IViewItemFormState
> {
  public constructor(props: RouteComponentProps<IRouterParams>) {
    super(props);

    this.state = {
      item: undefined,
      itemId: decodeURIComponent(this.props.match.params.itemId),
      isClose: false
    };
  }

  public componentDidMount(): void {
    ItemStore.instance.getLocalItemOrLoad(this.state.itemId).subscribe(
      item => {
        this.setState({ item: item });
      },
      (error: Error) => ErrorBoundary.ensureError(this, error)
    );
  }

  public render(): ReactNode {
    if (this.state.isClose) {
      return <Redirect to="/" push={true} />;
    }

    const item: IItem = this.state.item;
    if (!item) {
      return null;
    }

    return (
      <Page browserTitle={item.title} title={item.title}>
        <FormContainer>
          <FormFieldContainer>
            <ItemPropertiesContainer>
              <ItemPropertyDiv>
                <Icon iconName={ItemKindRegistrationManager.getItemKindIcon(item.itemKind)} />
              </ItemPropertyDiv>
              <ItemPropertyDiv>
                <Edited {...item} />
              </ItemPropertyDiv>
              <ItemPropertyDiv>
                <Keywords keywords={item.keywords} />
              </ItemPropertyDiv>
            </ItemPropertiesContainer>
            {item.description && <SectionContainer>{item.description}</SectionContainer>}
            <SectionContainer>
              {ItemKindRegistrationManager.resolve(item.itemKind).getViewFormFields(item)}
            </SectionContainer>
          </FormFieldContainer>
        </FormContainer>
        <FormButtonContainer>
          <FormButton
            onClick={() => void 0}
            nodeOrLabel={
              <Link to={`/items/${item._id}/edit`} key={item._id}>
                {"Edit"}
              </Link>
            }
            isPrimary={true}
          />
          <FormButton
            key={"Close"}
            onClick={() => this.setState({ isClose: true })}
            nodeOrLabel={"Close"}
            isPrimary={false}
          />
        </FormButtonContainer>
      </Page>
    );
  }
}
