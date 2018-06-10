import {IItem, IKeyword, ItemSearchQuery} from "engraved-shared/dist";
import {Db, InsertWriteOpResult, ObjectID} from "mongodb";
import Config from "../Config";

export class DbService {

    public constructor(private db: Db) {
    }

    public insertItem(item: IItem): Promise<IItem> {
        return this.insertItems(item)
                   .then((items: IItem[]) => {
                       return items[0];
                   });
    }

    public getItems(searchQuery: ItemSearchQuery): Promise<IItem[]> {
        let query = DbService.transformQuery(searchQuery);
        console.log(`- executing query: "${JSON.stringify(query)}"`);

        return this.db
                   .collection(Config.db.collections.items)
                   .find(query)
                   .sort("createdOn", -1)
                   .toArray();
    }

    public getItemById(id: string): Promise<IItem> {
        return this.db
                   .collection(Config.db.collections.items)
                   .findOne({_id: new ObjectID(id)});
    }

    private static transformQuery(searchQuery: ItemSearchQuery): any {
        if (!searchQuery.hasConditions) {
            return {};
        }

        const fullText = searchQuery.getFullText();
        const doesFullTextMatch = fullText
                                  ? DbService.createFulltextCondition(fullText, "title", "description")
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

    private static createFulltextCondition(fullText: string, ...fieldNames: string[]): any {
        if (!fieldNames || !fieldNames.length) {
            return null;
        }

        return {$text: {$search: fullText}};

        // const fieldConditions = fieldNames.map(n => {
        //     const conditionObj: any = {};
        //     conditionObj[n] = {$regex: fullText, $options: "i"};
        //     return conditionObj;
        // });
        //
        // return {$or: [{$text: {$search: fullText}}, ...fieldConditions]}
    };

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
            item.createdOn = new Date();

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

    public getKeywords(searchText: any): Promise<IKeyword[]> {
        const query: any = searchText
                           ? {name: {$regex: searchText}}
                           : {};

        console.log(`- executing query: "${JSON.stringify(query)}"`);

        return this.db
                   .collection(Config.db.collections.keywords)
                   .find(query)
                   .toArray();
    }
}