import {IItem, ItemKind, IUser} from "engraved-shared/dist";

export const createRandomItems = (count: number, user: IUser): IItem[] => {
    const items: IItem[] = [];

    for (let i = 0; i < count; i++) {
        items.push(
            {
                user_id: user._id,
                description: getLorems(getRandomInt(0, 30)),
                title: getLorems(getRandomInt(2, 10)),
                editedOn: new Date(),
                itemKind: ItemKind.Note,
                keywords: [
                    {name: i + "_1", user_id: user._id},
                    {name: i + "_2", user_id: user._id}
                ]
            }
        );
    }

    return items;
};

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const getLorems = (wordCount: number): string => {
    const result: string[] = [];
    for (let i = 0; i < wordCount; i++) {
        result.push(lorems[getRandomInt(0, lorems.length + 1)])
    }

    return result.join(" ");
};

const lorems: string[] = [
    "donec",
    "lorem",
    "ipsum",
    "ullamcorper",
    "odio",
    "quis",
    "nisl",
    "bibendum",
    "eu",
    "varius",
    "elit",
    "imperdiet",
    "curabitur",
    "risus",
    "nisi",
    "imperdiet",
    "at",
    "hendrerit",
    "sed",
    "placerat",
    "nec",
    "sapien",
    "in",
    "pharetra",
    "commodo",
    "lectus",
    "a",
    "rhoncus",
    "fusce",
    "semper",
    "at",
    "augue",
    "nec",
    "tincidunt",
    "maecenas",
    "sed",
    "dolor",
    "blandit",
    "condimentum",
    "nulla",
    "vel",
    "molestie",
    "odio"
];