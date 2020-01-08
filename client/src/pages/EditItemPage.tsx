import { IItem, Util } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Subscription } from "rxjs";
import { ButtonStyle } from "../common/form/buttons/FormButton";
import { Form } from "../common/form/Form";
import { DateFormat, formatDate } from "../common/FormatDate";
import { ItemStore } from "../items/ItemStore";
import { NotificationKind } from "../notifications/INotification";
import { NotificationStore } from "../notifications/NotificationStore";
import { EditablePageTitle } from "./EditablePageTitle";
import { Page } from "./Page";

export enum RedirectTarget {
  None,
  Home,
  View
}

interface IRouterParams {
  itemId: string;
}

interface IEditItemFormState {
  itemId: string;
  currentTitle: string;
  item: IItem | undefined;
  target: RedirectTarget;
  failedToLoad: boolean;
}

export class EditItemPage extends React.Component<
  RouteComponentProps<IRouterParams>,
  IEditItemFormState
> {
  public readonly state: IEditItemFormState = {
    item: undefined,
    currentTitle: undefined,
    itemId: decodeURIComponent(this.props.match.params.itemId),
    target: RedirectTarget.None,
    failedToLoad: false
  };

  private itemSub: Subscription;
  private updateItemSub: Subscription;
  private formRef: React.RefObject<Form> = React.createRef<Form>();

  public componentDidMount(): void {
    this.itemSub = ItemStore.instance
      .getLocalItemOrLoad(this.state.itemId)
      .subscribe(
        item =>
          this.setState({
            item: item,
            currentTitle: item ? item.title : undefined
          }),
        () => this.setState({ failedToLoad: true })
      );
  }

  public componentWillUnmount(): void {
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }

    if (this.updateItemSub) {
      this.updateItemSub.unsubscribe();
    }
  }

  public render(): ReactNode {
    if (this.state.target === RedirectTarget.Home) {
      return <Redirect to="/" push={true} />;
    }

    if (this.state.target === RedirectTarget.View) {
      return <Redirect to={"/items/" + this.state.itemId} push={true} />;
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

    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
    const reactKey = formatDate(item.editedOn || new Date(), DateFormat.ticks);

    return (
      <Page
        browserTitle={item.title + " - edit"}
        title={
          <EditablePageTitle
            placeholder={"Enter your title"}
            value={this.state.currentTitle}
            onChange={(value: string) => {
              this.setState({ currentTitle: value });
              this.formRef.current.onValueChange("title", value);
            }}
          />
        }
      >
        <Form
          ref={this.formRef}
          key={reactKey}
          isReadonly={false}
          item={item}
          createButtons={(
            isDirty: boolean,
            isValid: boolean,
            validate: () => boolean,
            updatedItem: IItem
          ) => [
            {
              label: "Save",
              onClick: () => {
                if (isDirty && validate()) {
                  this.updateItem(updatedItem, RedirectTarget.None);
                }
              },
              buttonStyle:
                isDirty && isValid ? ButtonStyle.Primary : ButtonStyle.Disabled,
              isContextualAction: true
            },
            {
              label: "Save & Close",
              onClick: () => {
                if (isDirty && validate()) {
                  this.updateItem(updatedItem, RedirectTarget.Home);
                }
              },
              buttonStyle:
                isDirty && isValid ? ButtonStyle.Primary : ButtonStyle.Disabled,
              isContextualAction: true
            },
            {
              label: "Save & View",
              onClick: () => {
                if (isDirty && validate()) {
                  this.updateItem(updatedItem, RedirectTarget.View);
                }
              },
              buttonStyle:
                isDirty && isValid ? ButtonStyle.Primary : ButtonStyle.Disabled,
              isContextualAction: true
            },
            {
              label: "Delete",
              buttonStyle: ButtonStyle.Secondary,
              onClick: () => this.deleteItem(updatedItem),
              confirmationDialogTitle: `Do you really want to delete "${updatedItem.title}"?`,
              confirmationButtonLabel: "Yep, delete it.",
              confirmationButtonStyle: ButtonStyle.Red,
              cancelButtonLabel: "No, keep it."
            }
          ]}
        />
      </Page>
    );
  }

  private updateItem = (item: IItem, target: RedirectTarget): void => {
    this.updateItemSub = ItemStore.instance
      .updateItem(item)
      .subscribe((updatedItem: IItem) => {
        NotificationStore.instance.addNotification({
          messageOrNode: (
            <span>
              Successfully updated{" "}
              <Link to={`/items/${updatedItem._id}/edit`}>
                "{updatedItem.title}"
              </Link>
            </span>
          ),
          id: Util.createGuid(),
          kind: NotificationKind.Success,
          timeToLiveInSeconds: 8
        });

        this.setState({ item: updatedItem, target: target });
      });
  };

  private deleteItem = (item: IItem): void => {
    ItemStore.instance.deleteItem(item._id).subscribe(() => {
      this.setState({ target: RedirectTarget.Home });
      NotificationStore.instance.addNotification({
        id: Util.createGuid(),
        kind: NotificationKind.Success,
        timeToLiveInSeconds: 8,
        messageOrNode: `"${item.title}" has been deleted.`
      });
    });
  };
}
