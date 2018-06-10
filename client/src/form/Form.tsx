import {ICodeItem, IItem, INoteItem, ItemKind, IUrlItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {Redirect} from "react-router";
import {Dialog} from "../common/Dialog";
import {MultiLineTextField} from "./fields/MultiLineTextField";
import {ISelectFieldOptions, SelectField} from "./fields/SelectField";
import {TextField} from "./fields/TextField";
import {FormFieldContainer} from "./Form.StyledComponents";
import {IButton} from "./IButton";

export interface IFormProps {
    item: IItem | undefined;
    buttons: IButton[];
}

interface IFormState {
    item: IItem;
    isClose: boolean;
}

export class Form extends React.Component<IFormProps, IFormState> {

    public constructor(props: IFormProps) {
        super(props);

        this.state = {
            item: JSON.parse(JSON.stringify(props.item || {})),
            isClose: false
        };
    }

    public render(): ReactNode {
        if (this.state.isClose) {
            return <Redirect to="/" push={true}/>
        }

        if (!this.props.item) {
            return null;
        }

        return (
            <Dialog title={"Add Item"} onClose={this.onClose}>
                <FormFieldContainer>
                    <TextField
                        label={"Title"}
                        onValueChange={(value: string) => this.setNewState("title", value)}
                        value={this.state.item.title}
                    />
                    <SelectField
                        label={"Item Kind"}
                        onValueChange={(value: ItemKind) => this.setNewState("itemKind", value)}
                        options={Form.getOptions()}
                        defaultKey={this.state.item.itemKind}
                    />
                    <MultiLineTextField
                        label={"Description"}
                        onValueChange={(value: string) => this.setNewState("description", value)}
                        value={this.state.item.description}
                    />
                    {this.getKindSpecificFields()}
                </FormFieldContainer>
                {
                    this.props
                        .buttons
                        .map((b: IButton) => (
                            <button
                                type="button"
                                key={b.label}
                                onClick={() => b.onClick(this.state.item)}
                            >
                                {b.label}
                            </button>
                        ))
                }
            </Dialog>
        );
    }

    private getKindSpecificFields(): ReactNode {
        if (!this.props.item) {
            return null;
        }

        switch (this.props.item.itemKind) {
            case ItemKind.Url:
                return (
                    <TextField
                        label={"URL"}
                        onValueChange={(value: string) => this.setNewState("url", value)}
                        value={(this.state.item as IUrlItem).url}
                    />
                );

            case ItemKind.Note:
                return (
                    <MultiLineTextField
                        label={"Note"}
                        onValueChange={(value: string) => this.setNewState("note", value)}
                        value={(this.state.item as INoteItem).note}
                    />
                );

            case ItemKind.Code:
                return (
                    <MultiLineTextField
                        label={"Code"}
                        onValueChange={(value: string) => this.setNewState("code", value)}
                        value={(this.state.item as ICodeItem).code}
                    />
                );

            default:
                return null;
        }
    }

    private onClose = (): void => {
        this.setState({isClose: true});
    };

    private setNewState = (fieldName: string, value: any): void => {
        this.setState((prevState) => {
            const updateField: any = {};
            updateField[fieldName] = value;

            return {item: {...prevState.item, ...updateField}};
        })
    };

    private static getOptions(): Array<ISelectFieldOptions<ItemKind>> {
        return Object.keys(ItemKind)
                     .map((itemKind: string) => {
                         return {
                             key: itemKind,
                             label: itemKind,
                             value: ItemKind[itemKind] as ItemKind
                         }
                     });
    }
}