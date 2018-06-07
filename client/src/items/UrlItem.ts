import {IUrlItem} from "engraved-shared/dist";
import {BaseItem} from "./BaseItem";

export class UrlItem extends BaseItem {
    public readonly url: string;

    public constructor(urlItem: IUrlItem) {
        super(urlItem);

        this.url = urlItem.url;
    }
}

