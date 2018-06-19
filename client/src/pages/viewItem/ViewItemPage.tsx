import {IItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {ErrorBoundary} from "../../common/ErrorBoundary";
import {Form} from "../../common/form/Form";
import {ItemStore} from "../../common/items/ItemStore";
import {Page} from "../Page";

interface IRouterParams {
    itemId: string;
}

interface IViewItemFormState {
    itemId: string;
    item: IItem | undefined;
}

export class ViewItemPage extends React.Component<RouteComponentProps<IRouterParams>, IViewItemFormState> {
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
                 }, (error: Error) => ErrorBoundary.ensureError(this, error));
    }

    public render(): ReactNode {
        if (!this.state.item) {
            return null;
        }

        return (
            <Page browserTitle={this.state.item.title} title={"Item details"}>
                <Form
                    isReadonly={true}
                    item={this.state.item}
                    cancelButtonLabel={"Close"}
                    buttons={[
                        {
                            nodeOrLabel: (
                                <Link to={`${this.state.item._id}/edit`} key={this.state.item._id}>
                                    {"Edit"}
                                </Link>
                            ),
                            onClick: (item: IItem) => void(0),
                            isPrimary: true
                        }
                    ]}
                />
            </Page>
        );
    }
}
