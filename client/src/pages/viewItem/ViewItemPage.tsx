import { IItem } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Edited } from "../../common/Edited";
import { ButtonStyle, FormButton } from "../../common/form/buttons/FormButton";
import {
  FormButtonContainer,
  FormContainer,
  FormFieldContainer
} from "../../common/form/Form.StyledComponents";
import { If } from "../../common/If";
import { ItemKindIcon } from "../../common/ItemKindIcon";
import { Keywords } from "../../common/Keywords";
import { ItemKindRegistrationManager } from "../../items/ItemKindRegistrationManager";
import { ItemStore } from "../../items/ItemStore";
import { StyleConstants } from "../../styling/StyleConstants";
import { Page } from "../Page";

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
`;

interface IRouterParams {
  itemId: string;
}

interface IViewItemFormState {
  itemId: string;
  item: IItem | undefined;
  isClose: boolean;
  failedToLoad: boolean;
}

export class ViewItemPage extends React.Component<
  RouteComponentProps<IRouterParams>,
  IViewItemFormState
> {
  public readonly state: IViewItemFormState = {
    item: undefined,
    itemId: decodeURIComponent(this.props.match.params.itemId),
    isClose: false,
    failedToLoad: false
  };

  public componentDidMount(): void {
    ItemStore.instance
      .getLocalItemOrLoad(this.state.itemId)
      .subscribe(
        item => this.setState({ item: item }),
        () => this.setState({ failedToLoad: true })
      );
  }

  public render(): ReactNode {
    if (this.state.isClose) {
      return <Redirect to="/" push={true} />;
    }

    if (this.state.failedToLoad) {
      // todo: we could consider extending the NotFoundPage with
      // to be able to read some stuff from the URL an react accordingly
      return <Redirect to="/item-not-found" />;
    }

    const item: IItem = this.state.item;
    if (!item) {
      return null;
    }

    return (
      <Page browserTitle={item.title} title={item.title}>
        <FormContainer>
          <article>
            <FormFieldContainer>
              <ItemPropertiesContainer>
                <ItemPropertyDiv>
                  <ItemKindIcon itemKind={item.itemKind} />
                </ItemPropertyDiv>
                <ItemPropertyDiv>
                  <Edited {...item} />
                </ItemPropertyDiv>
                <If
                  value={item.keywords}
                  render={() => {
                    return (
                      <ItemPropertyDiv>
                        <Keywords keywords={item.keywords} />
                      </ItemPropertyDiv>
                    );
                  }}
                />
              </ItemPropertiesContainer>
              <If
                value={item.description}
                render={() => <SectionContainer>{item.description}</SectionContainer>}
              />
              <SectionContainer>
                {ItemKindRegistrationManager.resolve(item.itemKind).getViewFormFields(item)}
              </SectionContainer>
            </FormFieldContainer>
          </article>
        </FormContainer>
        <FormButtonContainer>
          <FormButton
            key={"Edit"}
            button={{
              onClick: void 0,
              nodeOrLabel: (
                <Link to={`/items/${item._id}/edit`} key={item._id}>
                  {"Edit"}
                </Link>
              ),
              buttonStyle: ButtonStyle.Primary
            }}
          />
          <FormButton
            key={"Close"}
            button={{
              onClick: () => this.setState({ isClose: true }),
              nodeOrLabel: "Close",
              buttonStyle: ButtonStyle.Secondary
            }}
          />
        </FormButtonContainer>
      </Page>
    );
  }
}
