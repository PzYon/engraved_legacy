import {IItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {ItemStore} from "../items/ItemStore";
import {Form} from "./Form";

interface IRouterParams {
    itemId: string;
}

interface IViewItemFormState {
    itemId: string;
    item: IItem | undefined;
}

export class ViewItemForm extends React.Component<RouteComponentProps<IRouterParams>, IViewItemFormState> {
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
                 .subscribe(item => {
                     this.setState({item: item});
                 });
    }

    public render(): ReactNode {
        if (!this.state.item) {
            return null;
        }

        return (
            <Form
                item={this.state.item}
                buttons={[{label: "Foooo", onClick: (item: IItem) => alert(JSON.stringify(item))}]}
            />
        );
    }
}
