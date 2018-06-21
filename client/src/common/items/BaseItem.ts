import {IItem, IKeyword, ItemKind} from "engraved-shared/dist";
import {IRenderableItem} from "./IRenderableItem";

export abstract class BaseItem implements IRenderableItem {
    public readonly _id: string;
    public readonly title: string;
    public readonly itemKind: ItemKind;
    public readonly editedOn: Date;
    public readonly description: string;
    public readonly keywords: IKeyword[];

    protected constructor(dbItem: IItem) {
        this._id = dbItem._id || "";
        this.title = dbItem.title;
        this.itemKind = dbItem.itemKind;
        this.editedOn = dbItem.editedOn || new Date();
        this.description = dbItem.description || "";
        this.keywords = dbItem.keywords || [];
    }
}