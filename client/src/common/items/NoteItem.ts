import {INoteItem} from "engraved-shared/dist";
import {BaseItem} from "./BaseItem";

export class NoteItem extends BaseItem implements INoteItem {
    public note: string;

    public constructor(noteItem: INoteItem) {
        super(noteItem);
    }
}

