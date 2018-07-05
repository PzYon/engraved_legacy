import {IItem, Util} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {Redirect, RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {ErrorBoundary} from "../../common/ErrorBoundary";
import {Form} from "../../common/form/Form";
import {ItemStore} from "../../items/ItemStore";
import {NotificationStore} from "../../notifications/NotificationStore";
import {Page} from "../Page";

interface IRouterParams {
    itemId: string;
}

interface IEditItemFormState {
    itemId: string;
    item: IItem | undefined;
    isSuccess: boolean;
}

export class EditItemPage extends React.Component<RouteComponentProps<IRouterParams>, IEditItemFormState> {
    public constructor(props: RouteComponentProps<IRouterParams>) {
        super(props);

        this.state = {
            item: undefined,
            itemId: decodeURIComponent(this.props.match.params.itemId),
            isSuccess: false
        };
    }

    public componentDidMount(): void {
        ItemStore.instance
                 .getLocalItemOrLoad(this.state.itemId)
                 .subscribe(item => this.setState({item: item}),
                            (error: Error) => ErrorBoundary.ensureError(this, error));
    }

    public render(): ReactNode {
        if (this.state.isSuccess) {
            return <Redirect to="/" push={true}/>;
        }

        if (!this.state.item) {
            return null;
        }

        return (
            <Page browserTitle={this.state.item.title + " | edit"} title={"Edit item"}>
                <Form
                    isReadonly={false}
                    item={this.state.item}
                    buttons={[
                        {nodeOrLabel: "Update", onClick: this.updateItem, isPrimary: true}
                    ]}
                />
            </Page>
        );
    }

    private updateItem = (item: IItem): void => {
        ItemStore.instance
                 .updateItem(item)
                 .subscribe((updatedItem: IItem) => {
                     this.setState({isSuccess: true});
                     NotificationStore.instance.addNotification(
                         {
                             messageOrNode: (
                                 <span>
                                    Successfully updated item
                                     &nbsp;
                                     <Link to={`/${updatedItem._id}/edit`}>
                                        {updatedItem.title}
                                    </Link>
                                 </span>
                             ),
                             id: Util.createGuid()
                         });
                     ItemStore.instance.resetAndLoad();
                 });
    };
}
