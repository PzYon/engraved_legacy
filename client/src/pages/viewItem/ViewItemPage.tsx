import { ICodeItem, IItem, INoteItem, ItemKind, IUrlItem } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "../../common/ErrorBoundary";
import {
  FormButtonContainer,
  FormContainer,
  FormFieldContainer
} from "../../common/form/Form.StyledComponents";
import { FormButton } from "../../common/form/FormButton";
import { Keyword } from "../../common/Keyword";
import { ItemStore } from "../../items/ItemStore";
import { Page } from "../Page";
import { ViewCodeItem } from "./ViewCodeItem";
import { ViewNoteItem } from "./ViewNoteItem";
import { ViewUrlItem } from "./ViewUrlItem";

interface IRouterParams {
  itemId: string;
}

interface IViewItemFormState {
  itemId: string;
  item: IItem | undefined;
  isClose: boolean;
}

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
            {item.keywords && (
              <p>
                {item.keywords.length &&
                  item.keywords.map(k => <Keyword key={k._id} keyword={k} />)}
              </p>
            )}
            {item.description && <p>{item.description}</p>}
            {this.getItemSpecificFields()}
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
            key={"Cancel"}
            onClick={() => this.setState({ isClose: true })}
            nodeOrLabel={"Cancel"}
            isPrimary={false}
          />
        </FormButtonContainer>
      </Page>
    );
  }

  private getItemSpecificFields(): ReactNode {
    switch (this.state.item.itemKind) {
      case ItemKind.Url:
        return <ViewUrlItem item={this.state.item as IUrlItem} />;
      case ItemKind.Code:
        return <ViewCodeItem item={this.state.item as ICodeItem} />;
      case ItemKind.Note:
        return <ViewNoteItem item={this.state.item as INoteItem} />;
      default:
        throw new Error(`ItemKind '${this.state.item.itemKind}' is not supported.`);
    }
  }
}
