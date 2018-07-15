import {ICodeItem, IItem, IKeyword, INoteItem, ItemKind, IUrlItem} from "engraved-shared";
import * as React from "react";
import {ReactNode} from "react";
import {Redirect} from "react-router";
import {CodeLanguage} from "./fields/CodeEditor";
import {CodeField} from "./fields/CodeField";
import {KeywordField} from "./fields/KeywordField";
import {MarkdownField} from "./fields/MarkdownField";
import {MultiLineTextField} from "./fields/MultiLineTextField";
import {ISelectFieldOptions, SelectField} from "./fields/SelectField";
import {TextField} from "./fields/TextField";
import {FormButtonContainer, FormContainer, FormFieldContainer} from "./Form.StyledComponents";
import {FormButton} from "./FormButton";
import {IButton} from "./IButton";
import Code = marked.Tokens.Code;

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
            <FormContainer>
                <FormFieldContainer>
                    <SelectField
                        label={"Item Kind"}
                        value={item.itemKind}
                        valueLabel={Form.getItemKindLabel(item.itemKind)}
                        onValueChange={(value: ItemKind) => this.setNewState("itemKind", value)}
                        options={Form.getItemKindOptions()}
                        defaultKey={item.itemKind}
                        isReadOnly={this.props.isReadonly}
                    />
                    <TextField
                        label={"Title"}
                        onValueChange={(value: string) => this.setNewState("title", value)}
                        value={item.title}
                        isReadOnly={this.props.isReadonly}
                    />
                    <MultiLineTextField
                        label={"Description"}
                        onValueChange={(value: string) => this.setNewState("description", value)}
                        value={item.description}
                        isReadOnly={this.props.isReadonly}
                    />
                    {this.getKindSpecificFields(item)}
                    <KeywordField
                        label={"Keywords"}
                        onValueChange={(value: IKeyword[]) => this.setNewState("keywords", value)}
                        value={item.keywords || []}
                        isReadOnly={this.props.isReadonly}
                    />
                </FormFieldContainer>
                <FormButtonContainer>
                    {
                        this.props
                            .buttons
                            .map((b: IButton) => (
                                <FormButton
                                    key={typeof b.nodeOrLabel === "string" ? b.nodeOrLabel : item._id as any}
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
            </FormContainer>
        );
    }

    private getKindSpecificFields(item: IItem): ReactNode {
        if (!item) {
            return null;
        }

        switch (item.itemKind) {
            case ItemKind.Url:
                const urlItem: IUrlItem = item as IUrlItem;
                return (
                    <TextField
                        label={"URL"}
                        onValueChange={(value: string) => this.setNewState("url", value)}
                        value={urlItem.url}
                        isReadOnly={this.props.isReadonly}
                    />
                );

            case ItemKind.Note:
                const noteItem: INoteItem = item as INoteItem;
                return (
                    <MarkdownField
                        label={"Note"}
                        onValueChange={(value: string) => this.setNewState("note", value)}
                        value={noteItem.note}
                        isReadOnly={this.props.isReadonly}
                    />
                );

            case ItemKind.Code:
                const codeItem: ICodeItem = item as ICodeItem;
                return [
                    <SelectField
                        options={Form.getCodeLanguageOptions()}
                        label={"Language"}
                        value={codeItem.codeLanguage}
                        valueLabel={Form.getCodeLanguageLabel(codeItem.codeLanguage)}
                        onValueChange={(value: string) => this.setNewState("codeLanguage", value)}
                        isReadOnly={this.props.isReadonly}
                        defaultKey={codeItem.codeLanguage}
                        key={"language"}
                    />,
                    <CodeField
                        label={"Code"}
                        language={codeItem.codeLanguage as CodeLanguage}
                        onValueChange={(value: string) => this.setNewState("code", value)}
                        value={codeItem.code}
                        isReadOnly={this.props.isReadonly}
                        key={"code"}
                    />
                ];

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

    private static getItemKindOptions(): Array<ISelectFieldOptions<ItemKind>> {
        return Object.keys(ItemKind)
                     .map((itemKind: string) => {
                         const kind: ItemKind = ItemKind[itemKind];
                         return {
                             label: this.getItemKindLabel(kind),
                             value: kind
                         }
                     });
    }

    private static getItemKindLabel(kind: ItemKind | string): string {
        switch (kind) {
            case ItemKind.Code:
                return "Code";
            case ItemKind.Note:
                return "Note";
            case ItemKind.Url:
                return "Url";
            default:
                return kind;
        }
    }

    private static getCodeLanguageOptions(): Array<ISelectFieldOptions<CodeLanguage>> {
        return Object.keys(CodeLanguage)
                     .map((codeLanguage: string) => {
                         const language: CodeLanguage = CodeLanguage[codeLanguage] as CodeLanguage;
                         return {
                             label: this.getCodeLanguageLabel(language),
                             value: language
                         }
                     });
    }

    private static getCodeLanguageLabel(codeLanguage: CodeLanguage | string): string {
        switch (codeLanguage) {
            case CodeLanguage.Json:
                return "JSON";
            case CodeLanguage.CSharp:
                return "C#";
            case CodeLanguage.TypeScript:
                return "TypeScript";
            case CodeLanguage.JavaScript:
                return "JavaScript";
            case CodeLanguage.Markdown:
                return "Markdown";
            default:
                return codeLanguage;
        }
    }
}