import { IItem, Util } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ConfirmableButton } from "../../common/form/buttons/ConfirmableButton";
import { ButtonStyle, FormButton } from "../../common/form/buttons/FormButton";
import { Form } from "../../common/form/Form";
import { ItemStore } from "../../items/ItemStore";
import { NotificationKind } from "../../notifications/INotification";
import { NotificationStore } from "../../notifications/NotificationStore";
import { Page } from "../Page";

interface IRouterParams {
  itemId: string;
}

interface IEditItemFormState {
  itemId: string;
  item: IItem | undefined;
  isSuccess: boolean;
  failedToLoad: boolean;
}

export class EditItemPage extends React.Component<
  RouteComponentProps<IRouterParams>,
  IEditItemFormState
> {
  public readonly state: IEditItemFormState = {
    item: undefined,
    itemId: decodeURIComponent(this.props.match.params.itemId),
    isSuccess: false,
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
    if (this.state.isSuccess) {
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
      <Page browserTitle={item.title + " | edit"} title={"Edit item"}>
        <Form
          isReadonly={false}
          item={item}
          renderButtons={(
            isDirty: boolean,
            isValid: boolean,
            validate: () => boolean,
            updatedItem: IItem
          ) => {
            return (
              <>
                <FormButton
                  key={"Update"}
                  button={{
                    nodeOrLabel: "Update",
                    onClick: () => {
                      if (isDirty && validate()) {
                        this.updateItem(updatedItem);
                      }
                    },
                    buttonStyle: isDirty && isValid ? ButtonStyle.Primary : ButtonStyle.Disabled
                  }}
                />
                <ConfirmableButton
                  key={"Delete"}
                  confirmableButton={{
                    initialButtonNodeOrLabel: "Delete",
                    initialButtonStyle: ButtonStyle.Secondary,
                    confirmationDialogTitle: `Do you really want to delete "${updatedItem.title}"?`,
                    confirmationButtonNodeOrLabel: "Yep, delete it.",
                    confirmationButtonStyle: ButtonStyle.Red,
                    cancelButtonNodeOrLabel: "No, keep it.",
                    onClick: () => this.deleteItem(updatedItem)
                  }}
                />
              </>
            );
          }}
        />
      </Page>
    );
  }

  private updateItem = (item: IItem): void => {
    ItemStore.instance.updateItem(item).subscribe((updatedItem: IItem) => {
      this.setState({ isSuccess: true });
      NotificationStore.instance.addNotification({
        messageOrNode: (
          <span>
            Successfully updated{" "}
            <Link to={`/items/${updatedItem._id}/edit`}>"{updatedItem.title}"</Link>
          </span>
        ),
        id: Util.createGuid(),
        kind: NotificationKind.Success,
        timeToLiveInSeconds: 8
      });
      ItemStore.instance.resetAndLoad();
    });
  };

  private deleteItem = (item: IItem): void => {
    ItemStore.instance.deleteItem(item._id).subscribe(() => {
      this.setState({ isSuccess: true });
      NotificationStore.instance.addNotification({
        id: Util.createGuid(),
        kind: NotificationKind.Success,
        timeToLiveInSeconds: 8,
        messageOrNode: `"${item.title}" has been deleted.`
      });
    });
  };
}
