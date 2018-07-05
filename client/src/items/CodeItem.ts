import {ICodeItem} from "engraved-shared/dist";
import {CodeLanguage} from "../common/form/fields/CodeEditor";
import {BaseItem} from "./BaseItem";

export class CodeItem extends BaseItem implements ICodeItem {
    public code: string;
    public codeLanguage: CodeLanguage;

    public constructor(codeItem: ICodeItem) {
        super(codeItem);

        this.code = codeItem.code;
        this.codeLanguage = codeItem.codeLanguage as CodeLanguage;
    }
}