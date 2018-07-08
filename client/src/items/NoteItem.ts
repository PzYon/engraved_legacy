import {INoteItem} from "engraved-shared";
import {BaseItem} from "./BaseItem";

export class NoteItem extends BaseItem implements INoteItem {
    public note: string;

    public constructor(noteItem: INoteItem) {
        super(noteItem);

        this.note = noteItem.note;
    }
}

