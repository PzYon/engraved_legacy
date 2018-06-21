import {IItem, IKeyword, ItemSearchQuery} from "engraved-shared/dist";
import {Db, InsertWriteOpResult, ObjectID, UpdateWriteOpResult} from "mongodb";
import Config from "../Config";

export class DbService {
    public constructor(private db: Db) {
    }

    public searchKeywords(searchText: any): Promise<IKeyword[]> {
        const query: any = searchText
                           ? {name: {$regex: searchText}}
                           : {};

        console.log(`- executing query: "${JSON.stringify(query)}"`);

        return this.db
                   .collection(Config.db.collections.keywords)
                   .find(query)
                   .toArray();
    }

    public insertItem(item: IItem): Promise<IItem> {
        return this.insertItems(item)
                   .then((items: IItem[]) => {
                       return items[0];
                   });
    }

    public updateItem(id: string, item: IItem): Promise<any> {
        if (item._id) {
            if (item._id !== id) {
                throw new Error("ID mismatch!");
            } else {
                delete item._id;
            }
        }

        item.editedOn = new Date();

        return this.db
                   .collection(Config.db.collections.items)
                   .updateOne(DbService.getItemByIdFilter(id), {$set: item})
                   .then((r: UpdateWriteOpResult) => r.result);
    }

    public getItems(searchQuery: ItemSearchQuery): Promise<IItem[]> {
        let query = DbService.transformQuery(searchQuery);
        console.log(`- executing query: "${JSON.stringify(query)}"`);

        return this.db
                   .collection(Config.db.collections.items)
                   .find(query)
                   .sort("editedOn", -1)
                   .toArray();
    }

    public getItemById(id: string): Promise<IItem> {
        return this.db
                   .collection(Config.db.collections.items)
                   .findOne(DbService.getItemByIdFilter(id));
    }

    public async insertItems(...items: IItem[]): Promise<IItem[]> {
        const all: IKeyword[] = items.map(i => i.keywords || [])
                                     .reduce((previousValue, currentValue) => {
                                         previousValue.push(...currentValue);
                                         return previousValue;
                                     }, []);

        if (!all || all.length === 0) {
            return this.saveItems(items);
        }

        const allFromDb = await this.db
                                    .collection(Config.db.collections.keywords)
                                    .find({name: {$in: all.map(k => k.name)}})
                                    .toArray();

        let allFromDbNames = allFromDb.map((f: IKeyword) => f.name);
        const allNotInDb: IKeyword[] = all.filter((k: IKeyword) => allFromDbNames.indexOf(k.name) === -1);

        const allAddedToDb: IKeyword[] = allNotInDb.length
                                         ? (await this.db
                                                      .collection(Config.db.collections.keywords)
                                                      .insertMany(allNotInDb)).ops
                                         : [];

        const idByName: { [name: string]: string } = {};

        // todo: could also use reduce
        allFromDb.concat(allAddedToDb)
                 .forEach((k: IKeyword) => {
                     idByName[k.name] = k._id
                 });

        items.forEach((item: IItem) => {
            item.editedOn = new Date();

            if (item.keywords) {
                item.keywords.forEach((keyword: IKeyword) => {
                    keyword._id = idByName[keyword.name];
                });
            } else {
                item.keywords = [];
            }
        });

        return this.saveItems(items);
    }

    private saveItems(items: IItem[]) {
        return this.db
                   .collection(Config.db.collections.items)
                   .insertMany(items)
                   .then((writeItemsResult: InsertWriteOpResult) => writeItemsResult.ops);
    }

    private static transformQuery(searchQuery: ItemSearchQuery): any {
        if (!searchQuery.hasConditions) {
            return {};
        }

        const fullText = searchQuery.getFullText();
        const doesFullTextMatch = fullText
                                  ? DbService.createFulltextFilter(true, fullText, "title", "description")
                                  : null;

        // todo: make this case insensitive to
        const areKeywordsApplied = searchQuery.getKeywords()
                                              .map((keyword: string) => {
                                                  const keywordsContains: any = {};
                                                  keywordsContains[`${Config.db.collections.keywords}.name`] = keyword;
                                                  return keywordsContains;
                                              });

        const hasKeywords = areKeywordsApplied && areKeywordsApplied.length;
        const hasFullText = !!doesFullTextMatch;

        if (hasKeywords && hasFullText) {
            return {$and: [doesFullTextMatch, ...areKeywordsApplied]};
        }

        if (hasKeywords) {
            return {$and: areKeywordsApplied};
        }

        if (hasFullText) {
            return doesFullTextMatch;
        }

        return {};
    }

    private static createFulltextFilter(useNative: boolean, fullText: string, ...fieldNames: string[]): any {
        if (!fieldNames || !fieldNames.length) {
            return null;
        }

        return useNative
               ? this.createNativeFulltextFilter(fullText)
               : this.createCustomFullTextFilter(fieldNames, fullText);
    };

    private static createCustomFullTextFilter(fieldNames: string[], fullText: string) {
        const fieldConditions = fieldNames.map(n => {
            const conditionObj: any = {};
            conditionObj[n] = {$regex: fullText, $options: "i"};
            return conditionObj;
        });

        return {$or: [{$text: {$search: fullText}}, ...fieldConditions]}
    }

    private static createNativeFulltextFilter(fullText: string): any {
        return {$text: {$search: fullText}};
    }

    private static getItemByIdFilter(id: string): any {
        return {_id: new ObjectID(id)};
    }
}