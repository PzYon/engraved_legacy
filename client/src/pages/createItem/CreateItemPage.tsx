import {IItem, ItemKind, Util} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {Redirect, RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {ErrorBoundary} from "../../common/ErrorBoundary";
import {Form} from "../../common/form/Form";
import {ItemStore} from "../../common/items/ItemStore";
import {NotificationStore} from "../../common/notifications/NotificationStore";
import {Page} from "../Page";

interface ICreateItemFormState {
    item: {
        title?: string;
        url?: string;
        itemKind: ItemKind;
    },
    isSuccess: boolean;
}

interface IRouterParams {
    itemKind: ItemKind;
    value: string;
}

export class CreateItemPage extends React.PureComponent<RouteComponentProps<IRouterParams>, ICreateItemFormState> {
    public constructor(props: RouteComponentProps<IRouterParams>) {
        super(props);

        const value = decodeURIComponent(props.match.params.value);
        const itemKind = decodeURIComponent(props.match.params.itemKind) as ItemKind;

        this.state = {
            isSuccess: false,
            item: {
                title: itemKind !== ItemKind.Url ? value : undefined,
                url: itemKind === ItemKind.Url ? value : undefined,
                itemKind: itemKind
            }
        };
    }

    public render(): ReactNode {
        if (this.state.isSuccess) {
            return <Redirect to="/" push={true}/>;
        }

        return (
            <Page browserTitle={"create"} title={"Create new item"}>
                <Form
                    isReadonly={false}
                    item={this.state.item as IItem}
                    buttons={[
                        {onClick: this.addItem, nodeOrLabel: "Add", isPrimary: true}
                    ]}
                />
            </Page>
        );
    }

    private addItem = (item: IItem): void => {
        ItemStore.instance
                 .addItem(item)
                 .subscribe((i: IItem) => {
                     this.setState({isSuccess: true});
                     NotificationStore.instance.addNotification(
                         {
                             messageOrNode: (
                                 <span>
                                    Successfully created item
                                    &nbsp;
                                    <Link to={`/${i._id}`}>
                                        {i.title}
                                    </Link>
                                 </span>
                             ),
                             id: Util.createGuid()
                         });
                     ItemStore.instance.resetAndLoad();
                 }, (error: Error) => ErrorBoundary.ensureError(this, error));
    };
}