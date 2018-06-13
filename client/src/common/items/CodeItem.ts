import {ICodeItem} from "../../../../shared/dist/index";
import {BaseItem} from "./BaseItem";

export class CodeItem extends BaseItem implements ICodeItem {
    public code: string;

    public constructor(codeItem: ICodeItem) {
        super(codeItem);
    }
}