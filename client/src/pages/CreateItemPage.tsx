import { IItem, ItemKind, Util } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { ButtonStyle, FormButton } from "../common/form/buttons/FormButton";
import { Form } from "../common/form/Form";
import { ItemKindRegistrationManager } from "../items/ItemKindRegistrationManager";
import { ItemStore } from "../items/ItemStore";
import { NotificationKind } from "../notifications/INotification";
import { NotificationStore } from "../notifications/NotificationStore";
import { EditablePageTitle } from "./EditablePageTitle";
import { Page } from "./Page";

interface ICreateItemFormState {
  item: {
    title?: string;
    url?: string;
    itemKind: ItemKind;
  };
  currentTitle: string;
  isSuccess: boolean;
}

interface IRouterParams {
  itemKind: ItemKind;
  value: string;
}

export class CreateItemPage extends React.PureComponent<
  RouteComponentProps<IRouterParams>,
  ICreateItemFormState
> {
  private formRef: React.RefObject<Form> = React.createRef<Form>();

  public constructor(props: RouteComponentProps<IRouterParams>) {
    super(props);

    const value = decodeURIComponent(props.match.params.value);
    const itemKind = decodeURIComponent(
      props.match.params.itemKind
    ) as ItemKind;

    const item = {
      ...{
        title: itemKind !== ItemKind.Url ? value : undefined,
        url: itemKind === ItemKind.Url ? value : undefined,
        itemKind: itemKind
      },
      ...ItemKindRegistrationManager.resolve(itemKind).getDefaultProperties()
    };

    this.state = {
      isSuccess: false,
      item: item,
      currentTitle: item.title
    };
  }

  public render(): ReactNode {
    if (this.state.isSuccess) {
      return <Redirect to="/" push={true} />;
    }

    return (
      <Page
        browserTitle={"create"}
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
          isReadonly={false}
          item={this.state.item as IItem}
          createButtons={(
            isDirty: boolean,
            isValid: boolean,
            validate: () => boolean,
            item: IItem
          ) => [
            {
              label: "Create",
              onClick: () => {
                if (isDirty && validate()) {
                  this.addItem(item);
                }
              },
              buttonStyle:
                isDirty && isValid ? ButtonStyle.Primary : ButtonStyle.Disabled,
              isContextualAction: true
            }
          ]}
        />
      </Page>
    );
  }

  private addItem = (item: IItem): void => {
    ItemStore.instance.addItem(item).subscribe(
      (i: IItem) => {
        this.setState({ isSuccess: true });
        NotificationStore.instance.addNotification({
          messageOrNode: (
            <span>
              Successfully created{" "}
              <Link to={`/items/${i._id}`}>"{i.title}"</Link>
            </span>
          ),
          kind: NotificationKind.Success,
          id: Util.createGuid(),
          timeToLiveInSeconds: 8
        });
        ItemStore.instance.resetAndLoad();
      },
      (error: Error) => ErrorBoundary.ensureError(this, error)
    );
  };
}
