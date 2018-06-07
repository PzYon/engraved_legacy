import {ICodeItem, IItem, INoteItem, ItemKind, IUrlItem} from "engraved-shared/dist";

export const createKnownItems = (): IItem[] => {
    return [
        {
            itemKind: ItemKind.Url,
            title: "Google",
            createdOn: new Date(),
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
            createdOn: new Date(),
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
            createdOn: new Date()
        } as INoteItem
    ];
};