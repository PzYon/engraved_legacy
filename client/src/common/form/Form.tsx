import {ICodeItem, IItem, IKeyword, INoteItem, ItemKind, IUrlItem} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {Redirect} from "react-router";
import {KeywordField} from "./fields/KeywordField";
import {MultiLineTextField} from "./fields/MultiLineTextField";
import {ISelectFieldOptions, SelectField} from "./fields/SelectField";
import {TextField} from "./fields/TextField";
import {FormButtonContainer, FormFieldContainer} from "./Form.StyledComponents";
import {FormButton} from "./FormButton";
import {IButton} from "./IButton";

export interface IFormProps {
    item: IItem | undefined;
    buttons: IButton[];
    cancelButtonLabel?: string;
    isReadonly: boolean;
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

        const item: IItem = this.state.item;
        if (!item) {
            return null;
        }

        return (
            <div>
                <FormFieldContainer>
                    <TextField
                        label={"Title"}
                        onValueChange={(value: string) => this.setNewState("title", value)}
                        value={item.title}
                        isReadOnly={this.props.isReadonly}
                    />
                    <SelectField
                        label={"Item Kind"}
                        onValueChange={(value: ItemKind) => this.setNewState("itemKind", value)}
                        options={Form.getOptions()}
                        defaultKey={item.itemKind}
                        isReadOnly={this.props.isReadonly}
                    />
                    <MultiLineTextField
                        label={"Description"}
                        onValueChange={(value: string) => this.setNewState("description", value)}
                        value={item.description}
                        isReadOnly={this.props.isReadonly}
                    />
                    <KeywordField
                        label={"Keywords"}
                        onValueChange={(value: IKeyword[]) => this.setNewState("keywords", value)}
                        value={item.keywords || []}
                        isReadOnly={this.props.isReadonly}
                    />
                    {this.getKindSpecificFields(item)}
                </FormFieldContainer>
                <FormButtonContainer>
                    {
                        this.props
                            .buttons
                            .map((b: IButton) => (
                                <FormButton
                                    key={typeof b.nodeOrLabel === "string" ? b.nodeOrLabel : item._id}
                                    onClick={() => b.onClick(item)}
                                    nodeOrLabel={b.nodeOrLabel}
                                    isPrimary={b.isPrimary}
                                />
                            ))
                    }
                    <FormButton
                        key={"Cancel"}
                        onClick={this.onClose}
                        nodeOrLabel={this.props.cancelButtonLabel || "Cancel"}
                        isPrimary={false}
                    />
                </FormButtonContainer>
            </div>
        );
    }

    private getKindSpecificFields(item: IItem): ReactNode {
        if (!item) {
            return null;
        }

        switch (item.itemKind) {
            case ItemKind.Url:
                return (
                    <TextField
                        label={"URL"}
                        onValueChange={(value: string) => this.setNewState("url", value)}
                        value={(item as IUrlItem).url}
                        isReadOnly={this.props.isReadonly}
                    />
                );

            case ItemKind.Note:
                return (
                    <MultiLineTextField
                        label={"Note"}
                        onValueChange={(value: string) => this.setNewState("note", value)}
                        value={(item as INoteItem).note}
                        isReadOnly={this.props.isReadonly}
                    />
                );

            case ItemKind.Code:
                return (
                    <MultiLineTextField
                        label={"Code"}
                        onValueChange={(value: string) => this.setNewState("code", value)}
                        value={(item as ICodeItem).code}
                        isReadOnly={this.props.isReadonly}
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