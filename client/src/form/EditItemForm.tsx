import {IItem, ItemKind} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {Redirect, RouteComponentProps} from "react-router";
import {Dialog} from "../common/Dialog";
import {ItemStore} from "../items/ItemStore";
import {MultiLineTextField} from "./fields/MultiLineTextField";
import {ISelectFieldOptions, SelectField} from "./fields/SelectField";
import {TextField} from "./fields/TextField";
import {FormFieldContainer} from "./Form.StyledComponents";

interface IAddItemFormState {
    itemKind: ItemKind;
    title?: string;
    description?: string;
    url?: string;
    note?: string;
    code?: string;
    isClose: boolean;
}

interface IRouterParams {
    itemKind: ItemKind;
    value: string;
}

export class EditItemForm extends React.PureComponent<RouteComponentProps<IRouterParams>, IAddItemFormState> {
    public constructor(props: RouteComponentProps<IRouterParams>) {
        super(props);

        const value = decodeURIComponent(props.match.params.value);
        const itemKind = decodeURIComponent(props.match.params.itemKind) as ItemKind;

        this.state = {
            isClose: false,
            title: itemKind !== ItemKind.Url ? value : undefined,
            url: itemKind === ItemKind.Url ? value : undefined,
            itemKind: itemKind
        };
    }

    public render(): ReactNode {
        if (this.state.isClose) {
            return <Redirect to="/" push={true}/>
        }

        return (
            <Dialog title={"Add Item"} onClose={this.onClose}>
                <FormFieldContainer>
                    <TextField
                        label={"Title"}
                        onValueChange={(value: string) => this.setState({title: value})}
                        value={this.state.title}
                    />
                    <SelectField
                        label={"Item Kind"}
                        onValueChange={(value: ItemKind) => this.setState({itemKind: value})}
                        options={EditItemForm.getOptions()}
                        defaultKey={this.state.itemKind}
                    />
                    <MultiLineTextField
                        label={"Description"}
                        onValueChange={(value: string) => this.setState({description: value})}
                        value={this.state.description}
                    />
                    {this.getKindSpecificFields()}
                </FormFieldContainer>
                <button type="button" onClick={this.addItem}>
                    Add
                </button>
            </Dialog>
        );
    }

    private onClose = (): void => {
        this.setState({isClose: true});
    };

    private addItem = (): void => {
        const item: IItem = {
            title: this.state.title || "",
            description: this.state.description,
            itemKind: this.state.itemKind
        };

        ItemStore.instance
                 .addItem(item)
                 .subscribe(() => {
                     ItemStore.instance.loadItems();
                     this.onClose();
                 });
    };

    private getKindSpecificFields(): ReactNode {
        switch (this.state.itemKind) {
            case ItemKind.Url:
                return (
                    <TextField
                        label={"URL"}
                        onValueChange={(value: string) => this.setState({url: value})}
                        value={this.state.url}
                    />
                );

            case ItemKind.Note:
                return (
                    <MultiLineTextField
                        label={"Note"}
                        onValueChange={(value: string) => this.setState({note: value})}
                        value={this.state.note}
                    />
                );

            case ItemKind.Code:
                return (
                    <MultiLineTextField
                        label={"Code"}
                        onValueChange={(value: string) => this.setState({code: value})}
                        value={this.state.code}
                    />
                );

            default:
                return null;
        }
    }

    private static getOptions(): Array<ISelectFieldOptions<ItemKind>> {
        return Object.keys(ItemKind)
                     .map((k: string) => {
                         return {
                             key: k,
                             label: k,
                             value: ItemKind[k] as ItemKind
                         }
                     });
    }
}