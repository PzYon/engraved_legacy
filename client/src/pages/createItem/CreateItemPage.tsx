import {ItemKind} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {ErrorBoundary} from "../../common/ErrorBoundary";
import {Form} from "../../common/form/Form";
import {ItemStore} from "../../common/items/ItemStore";
import {Page} from "../Page";

interface ICreateItemFormState {
    title?: string;
    url?: string;
    itemKind: ItemKind;
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
            title: itemKind !== ItemKind.Url ? value : undefined,
            url: itemKind === ItemKind.Url ? value : undefined,
            itemKind: itemKind
        };
    }

    public render(): ReactNode {
        // todo: this.state should not be the whole item

        return (
            <Page browserTitle={"create"}>
                <Form
                    isReadonly={false}
                    item={this.state as any}
                    buttons={[
                        {onClick: this.addItem, nodeOrLabel: "Add", isPrimary: true}
                    ]}
                />
            </Page>
        );
    }

    private addItem = (item: any): void => {
        ItemStore.instance
                 .addItem(item)
                 .subscribe(() => {
                     ItemStore.instance.loadItems();
                 }, (error: Error) => ErrorBoundary.ensureError(this, error));
    };
}