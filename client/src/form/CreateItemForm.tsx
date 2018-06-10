import {ItemKind} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {ItemStore} from "../items/ItemStore";
import {Form} from "./Form";

interface ICreateItemFormState {
    title?: string;
    url?: string;
    itemKind: ItemKind;
}

interface IRouterParams {
    itemKind: ItemKind;
    value: string;
}

export class CreateItemForm extends React.PureComponent<RouteComponentProps<IRouterParams>, ICreateItemFormState> {
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
        return (
            <Form
                item={this.state as any}
                buttons={[{onClick: this.addItem, label: "Add"}]}
            />
        );
    }

    private addItem = (item: any): void => {
        ItemStore.instance
                 .addItem(item)
                 .subscribe(() => {
                     ItemStore.instance.loadItems();
                     // this.onClose();
                 });
    };
}