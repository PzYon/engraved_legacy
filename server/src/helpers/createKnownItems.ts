import {ICodeItem, IItem, INoteItem, ItemKind, IUrlItem} from "engraved-shared/dist";

export const createKnownItems = (): IItem[] => {
    return [
        {
            itemKind: ItemKind.Url,
            title: "Google",
            editedOn: new Date(),
            description: "Looking for something on the web? You'll definitely find it here...",
            url: "http://www.google.ch",
            keywords: [
                {
                    name: "web"
                }, {
                    name: "search"
                }
            ]
        } as IUrlItem,
        {
            itemKind: ItemKind.Note,
            title: "Hello world",
            editedOn: new Date(),
            description: "My very first piece of code I wrote",
            code: "alert('hello world!')",
            keywords: [
                {
                    name: "javascript"
                }, {
                    name: "example"
                }
            ]
        } as ICodeItem,
        {
            itemKind: ItemKind.Note,
            title: "My note",
            editedOn: new Date()
        } as INoteItem
    ];
};