import {IItem, IKeyword, ItemKind} from "../../../../shared/dist/index";
import {IRenderableItem} from "./IRenderableItem";

export abstract class BaseItem implements IRenderableItem {
    public readonly _id: string;
    public readonly title: string;
    public readonly itemKind: ItemKind;
    public readonly createdOn: Date;
    public readonly description: string;
    public readonly keywords: IKeyword[];

    protected constructor(dbItem: IItem) {
        this._id = dbItem._id || "";
        this.title = dbItem.title;
        this.itemKind = dbItem.itemKind;
        this.createdOn = dbItem.createdOn || new Date();
        this.description = dbItem.description || "";
        this.keywords = dbItem.keywords || [];
    }
}