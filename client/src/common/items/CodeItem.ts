import {ICodeItem} from "engraved-shared/dist";
import {BaseItem} from "./BaseItem";

export class CodeItem extends BaseItem implements ICodeItem {
    public code: string;

    public constructor(codeItem: ICodeItem) {
        super(codeItem);

        this.code = codeItem.code;
    }
}