import {IItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {ErrorBoundary} from "../../common/ErrorBoundary";
import {Form} from "../../common/form/Form";
import {ItemStore} from "../../common/items/ItemStore";

interface IRouterParams {
    itemId: string;
}

interface IEditItemFormState {
    itemId: string;
    item: IItem | undefined;
}

export class EditItemPage extends React.Component<RouteComponentProps<IRouterParams>, IEditItemFormState> {
    public constructor(props: RouteComponentProps<IRouterParams>) {
        super(props);

        this.state = {
            item: undefined,
            itemId: decodeURIComponent(this.props.match.params.itemId)
        };
    }

    public componentDidMount(): void {
        ItemStore.instance
                 .getLocalItemOrLoad(this.state.itemId)
                 .subscribe(item => this.setState({item: item}),
                            (error: Error) => ErrorBoundary.ensureError(this, error));
    }

    public render(): ReactNode {
        if (!this.state.item) {
            return null;
        }

        return (
            <Form
                isReadonly={false}
                title={"Edit item"}
                item={this.state.item}
                buttons={[
                    {nodeOrLabel: "Update", onClick: this.updateItem, isPrimary: true}
                ]}
            />
        );
    }

    private updateItem = (item: IItem): void => {
        ItemStore.instance
                 .updateItem(item)
                 .subscribe((updatedItem: IItem) => {
                     console.log(updatedItem);
                 });
    };
}
