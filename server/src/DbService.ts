import {
  IItem,
  IKeyword,
  IUserStats,
  ItemSearchQuery,
  IUser,
  SortDirection
} from "engraved-shared";
import {
  Collection,
  Db,
  InsertOneWriteOpResult,
  InsertWriteOpResult,
  ObjectID,
  UpdateWriteOpResult
} from "mongodb";
import Config from "./Config";

export class DbService {
  public get keywords(): Collection<IKeyword> {
    return this.db.collection(Config.db.collections.keywords);
  }

  public get users(): Collection<IUser> {
    return this.db.collection(Config.db.collections.users);
  }

  public get items(): Collection<IItem> {
    return this.db.collection(Config.db.collections.items);
  }

  public constructor(private db: Db, private currentUser: IUser) {}

  public async ensureUser(user: IUser): Promise<IUser> {
    let existingUser: IUser = await this.users.findOne({ mail: user.mail });

    if (existingUser) {
      delete user.memberSince;
      existingUser = { ...existingUser, ...user };
      return this.users
        .updateOne(DbService.getDocumentByIdFilter(existingUser._id), {
          $set: existingUser
        })
        .then((r: UpdateWriteOpResult) => existingUser);
    } else {
      user.memberSince = new Date();
      return this.users
        .insertOne(user)
        .then(
          (writeUserResult: InsertOneWriteOpResult<IUser>) =>
            writeUserResult.ops[0]
        );
    }
  }

  public getUserById(id: string): Promise<IUser> {
    return this.users.findOne(DbService.getDocumentByIdFilter(id));
  }

  public getMyStats(): Promise<IUserStats> {
    return Promise.all([
      this.keywords.countDocuments(this.ensureCurrentUserId({}), {}),
      this.items.countDocuments(this.ensureCurrentUserId({}), {})
    ]).then(values => {
      return {
        keywordCount: values[0],
        itemCount: values[1]
      };
    });
  }

  public getTotalNumberOfUsers(): Promise<number> {
    return this.users.countDocuments();
  }

  public getTotalNumberOfItems(): Promise<number> {
    return this.items.countDocuments();
  }

  public searchKeywords(searchText: any): Promise<IKeyword[]> {
    let query: any = searchText
      ? { name: { $regex: searchText, $options: "-i" } }
      : {};

    query = this.ensureCurrentUserId(query);

    return this.keywords.find(query).toArray();
  }

  public insertItem(item: IItem): Promise<IItem> {
    return this.insertItems(item).then((items: IItem[]) => {
      return items[0];
    });
  }

  public updateItem(id: string, item: IItem): Promise<IItem> {
    if (item._id && item._id !== id) {
      throw new Error("ID mismatch!");
    }

    delete item._id;

    if (item.user_id.toString() !== this.currentUser._id.toString()) {
      throw new Error("This is not your item.");
    }

    delete item.user_id;
    item.editedOn = new Date();

    return this.items
      .updateOne(this.getItemByIdFilter(id), { $set: item })
      .then(() => this.getItemById(id));
  }

  public getItems(searchQuery: ItemSearchQuery): Promise<IItem[]> {
    const query = this.ensureCurrentUserId(
      DbService.transformQuery(searchQuery)
    );

    let cursor = this.items.find(query).collation({ locale: "en" });

    if (searchQuery.sorting) {
      cursor = cursor.sort({
        [searchQuery.sorting.propName]:
          searchQuery.sorting.direction === SortDirection.Descending ? -1 : 1
      });
    }

    if (searchQuery.take > 0) {
      cursor = cursor.skip(searchQuery.skip).limit(searchQuery.take);
    }

    return cursor.toArray();
  }

  public deleteItem(id: string): Promise<any> {
    return this.items.deleteOne(this.getItemByIdFilter(id));
  }

  public getItemById(id: string): Promise<IItem> {
    return this.items.findOne(this.getItemByIdFilter(id));
  }

  public async insertItems(...items: IItem[]): Promise<IItem[]> {
    const all: IKeyword[] = items
      .map(i => i.keywords || [])
      .reduce((allKeywords: IKeyword[], keywords: IKeyword[]) => {
        keywords.forEach(keyword => {
          if (
            allKeywords.filter(
              k => k.name.toLowerCase() === keyword.name.toLowerCase()
            ).length === 0
          ) {
            allKeywords.push(keyword);
          }
        });

        return allKeywords;
      }, []);

    // TODO: filter terms for current user! -> add unit test!

    const allFromDb = await this.keywords
      .find({ name: { $in: all.map(k => k.name) } })
      .toArray();
    const allFromDbNames = allFromDb.map((f: IKeyword) => f.name.toLowerCase());

    const allNotInDb: IKeyword[] = all
      .filter(
        (k: IKeyword) => allFromDbNames.indexOf(k.name.toLowerCase()) === -1
      )
      .map((k: IKeyword) => {
        k.user_id = new ObjectID(this.currentUser._id) as any;
        return k;
      });

    const allAddedToDb: IKeyword[] = allNotInDb.length
      ? (await this.keywords.insertMany(allNotInDb)).ops
      : [];

    const idByName: { [name: string]: string } = {};

    // todo: could also use reduce
    allFromDb.concat(allAddedToDb).forEach((k: IKeyword) => {
      idByName[k.name] = k._id;
    });

    items.forEach((item: IItem) => {
      item.editedOn = new Date();
      item.user_id = new ObjectID(this.currentUser._id) as any;

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

  // todo: consider returning one item if insertMany has appropriate return value?
  // i.e. return type depends on query type

  private saveItems(items: IItem[]) {
    return this.items
      .insertMany(items)
      .then(
        (writeItemsResult: InsertWriteOpResult<IItem>) => writeItemsResult.ops
      );
  }

  private static transformQuery(searchQuery: ItemSearchQuery): any {
    if (!searchQuery.hasConditions) {
      return {};
    }

    const fullText = searchQuery.getFullText();
    const doesFullTextMatch = fullText
      ? DbService.createFulltextFilter(true, fullText, "title", "description")
      : null;

    // todo: make this case insensitive too
    const areKeywordsApplied = searchQuery.keywords.map((keyword: string) => {
      const keywordsContains: any = {};
      keywordsContains[`${Config.db.collections.keywords}.name`] = keyword;
      return keywordsContains;
    });

    const hasKeywords = areKeywordsApplied && areKeywordsApplied.length;
    const hasFullText = !!doesFullTextMatch;

    if (hasKeywords && hasFullText) {
      return { $and: [doesFullTextMatch, ...areKeywordsApplied] };
    }

    if (hasKeywords) {
      return { $and: areKeywordsApplied };
    }

    if (hasFullText) {
      return doesFullTextMatch;
    }

    return {};
  }

  private static createFulltextFilter(
    useNative: boolean,
    fullText: string,
    ...fieldNames: string[]
  ): any {
    if (!fieldNames || !fieldNames.length) {
      return null;
    }

    return useNative
      ? this.createNativeFullTextFilter(fullText)
      : this.createCustomFullTextFilter(fieldNames, fullText);
  }

  private static createCustomFullTextFilter(
    fieldNames: string[],
    fullText: string
  ) {
    const fieldConditions = fieldNames.map(n => {
      const conditionObj: any = {};
      conditionObj[n] = { $regex: fullText, $options: "i" };
      return conditionObj;
    });

    return { $or: [{ $text: { $search: fullText } }, ...fieldConditions] };
  }

  private static createNativeFullTextFilter(fullText: string): any {
    return { $text: { $search: fullText } };
  }

  private getItemByIdFilter(id: string): any {
    return this.ensureCurrentUserId(DbService.getDocumentByIdFilter(id));
  }

  private ensureCurrentUserId(query: any): any {
    return { ...query, ...{ user_id: new ObjectID(this.currentUser._id) } };
  }

  private static getDocumentByIdFilter(id: string): any {
    return { _id: new ObjectID(id) };
  }
}
