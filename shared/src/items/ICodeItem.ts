import {IItem} from "./IItem";

export interface ICodeItem extends IItem {
    code: string;
    codeLanguage: string;
}