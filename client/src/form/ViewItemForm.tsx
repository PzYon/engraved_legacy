import {IItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
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
                isReadonly={true}
                title={"Item details"}
                item={this.state.item}
                buttons={[
                    {
                        nodeOrLabel: (
                            <Link to={`${this.state.item._id}/edit`} key={this.state.item._id}>
                                {"Edit"}
                            </Link>
                        ),
                        onClick: (item: IItem) => void(0)
                    }
                ]}
            />
        );
    }
}
