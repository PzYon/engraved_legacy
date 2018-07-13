import {IUrlItem} from "engraved-shared";
import {BaseItem} from "./BaseItem";

export class UrlItem extends BaseItem implements IUrlItem {
    public readonly url: string;

    public constructor(urlItem: IUrlItem) {
        super(urlItem);

        this.url = urlItem.url;
    }
}

