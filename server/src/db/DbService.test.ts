import { IItem, ItemKind, ItemSearchQuery, IUser } from "engraved-shared";
import { Db, InsertOneWriteOpResult, MongoClient, ObjectId } from "mongodb";
import Config from "../Config";
import { DbService } from "./DbService";

let connection: MongoClient;
let db: Db;
let dbService: DbService;
let currentUser: IUser;
let anotherUser: IUser;

async function dropTable(name: string) {
  try {
    await db.collection(name).drop();
  } catch (err) {}
}

async function setUp() {
  connection = await MongoClient.connect((global as any)["__MONGO_URI__"], {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db = await connection.db((global as any)["__MONGO_DB_NAME__"]);

  await db.collection(Config.db.collections.items).createIndex({ "$**": "text" });

  let service = new DbService(db, null);

  currentUser = await service.ensureUser({
    displayName: "Mar Dog",
    image: null,
    mail: "mar.dog@dogmar.io",
    memberSince: new Date()
  });

  anotherUser = await service.ensureUser({
    displayName: "Another User",
    image: null,
    mail: "not.me@dogmar.io",
    memberSince: new Date()
  });

  dbService = new DbService(db, currentUser);
}

async function tearDown() {
  await dropTable(Config.db.collections.items);
  await dropTable(Config.db.collections.keywords);
  await dropTable(Config.db.collections.users);
  await connection.close();
}

describe("DbService", () => {
  beforeEach(async () => await setUp());
  afterEach(async () => await tearDown());

  describe("insertItem", () => {
    it("adds item to DB", async () => {
      const item = await dbService.insertItem(createSampleItem());

      const count: number = await db.collection(Config.db.collections.items).countDocuments();
      expect(count).toBe(1);

      const results: IItem[] = await db
        .collection(Config.db.collections.items)
        .find()
        .limit(1)
        .toArray();

      expect(results.length).toBe(1);

      const resultItem = results[0];

      expect(resultItem).not.toBe(null);
      expect(resultItem.user_id).toEqual(currentUser._id);
      expect(resultItem.title).toEqual(item.title);
    });
  });

  describe("updateItem", () => {
    it("updates item in DB", async () => {
      const item = await insertSampleItem();

      const itemToUpdate: IItem = item;
      itemToUpdate.title = "Freddy New";
      itemToUpdate.editedOn = null;

      const updatedItem = await dbService.updateItem(
        asStringId(item._id),
        JSON.parse(JSON.stringify(itemToUpdate))
      );

      expect(updatedItem.editedOn).not.toBe(null);
      expect(updatedItem._id).toEqual(itemToUpdate._id);

      delete updatedItem.editedOn;
      delete itemToUpdate.editedOn;

      expect(updatedItem).toEqual(itemToUpdate);
    });

    it("throws on ID mismatch", async () => {
      const item = await insertSampleItem();

      expect(() => {
        dbService.updateItem(new ObjectId().toHexString(), item);
      }).toThrow();
    });

    it("doesn't update item from another user", async () => {
      const otherItem = await createItemAsAnotherUser();
      otherItem.title = "isch jetzt anderscht.";

      expect(() => dbService.updateItem(asStringId(otherItem._id), otherItem)).toThrow();
    });
  });

  describe("deleteItem", () => {
    it("removes item from DB", async () => {
      await db.collection(Config.db.collections.items).insertMany(createLotsOfSampleItems());
      const countBeforeDelete: number = await db
        .collection(Config.db.collections.items)
        .countDocuments();
      const allItems = await db
        .collection<IItem>(Config.db.collections.items)
        .find({})
        .toArray();
      const itemToDelete = allItems[0];

      await dbService.deleteItem(itemToDelete._id);

      const countAfterDelete: number = await db
        .collection(Config.db.collections.items)
        .countDocuments();

      expect(countAfterDelete).toBe(countBeforeDelete - 1);
    });

    it("doesn't remove item from another user", async () => {
      await db.collection(Config.db.collections.items).insertMany(createLotsOfSampleItems());
      const itemToDelete = await createItemAsAnotherUser();

      const countBeforeDelete: number = await db
        .collection(Config.db.collections.items)
        .countDocuments();
      await dbService.deleteItem(itemToDelete._id);
      const countAfterDelete: number = await db
        .collection(Config.db.collections.items)
        .countDocuments();

      expect(countAfterDelete).toBe(countBeforeDelete);
    });
  });

  describe("getItemById", () => {
    it("retrieves item by ID", async () => {
      const item = await insertSampleItem();

      const count: number = await db.collection(Config.db.collections.items).countDocuments();
      expect(count).toBe(1);

      const resultItem = await dbService.getItemById(item._id);

      expect(resultItem).not.toBe(null);
      expect(resultItem._id).toEqual(item._id);
    });

    it("doesn't return item from another user", async () => {
      const item = await createItemAsAnotherUser();

      const resultItem = await dbService.getItemById(item._id);

      expect(resultItem).toBe(null);
    });
  });

  describe("getItems", () => {
    it("with page size", async () => {
      await db.collection(Config.db.collections.items).insertMany(createLotsOfSampleItems());

      const pageSize = 3;

      const items = await dbService.getItems(new ItemSearchQuery("foo", [], 0, pageSize));

      expect(items.length).toEqual(pageSize);
    });

    it("with one keyword", async () => {
      const title = "Me haZ keyW0rds";

      await ensureItemsIncludingOneWithKeywords(title, "alpha");

      const items = await dbService.getItems(new ItemSearchQuery(null, ["alpha"], 0, 10));

      expect(items.length).toEqual(1);
      expect(items[0].title).toEqual(title);
    });

    it("with two keywords", async () => {
      const title = "Me haZ keyW0rds";

      await ensureItemsIncludingOneWithKeywords(title, "alpha", "beta");

      const items = await dbService.getItems(new ItemSearchQuery(null, ["alpha", "beta"], 0, 10));

      expect(items.length).toEqual(1);
      expect(items[0].title).toEqual(title);
    });
  });
});

function createSampleItem(title: string = "Foo", userId?: string): IItem {
  return {
    keywords: [],
    title: title,
    editedOn: new Date(),
    itemKind: ItemKind.Code,
    description: null,
    user_id: userId || currentUser._id
  };
}

function createLotsOfSampleItems(): IItem[] {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(createSampleItem("Foo " + i));
  }

  return items;
}

async function ensureItemsIncludingOneWithKeywords(title: string, ...keywords: string[]) {
  await db.collection(Config.db.collections.items).insertMany(createLotsOfSampleItems());
  await db.collection<IItem>(Config.db.collections.items).insertOne({
    user_id: currentUser._id,
    itemKind: ItemKind.Code,
    title: title,
    keywords: (Array.isArray(keywords) ? keywords : [keywords]).map(k => ({
      name: k,
      user_id: currentUser._id
    }))
  });
}

async function createItemAsAnotherUser(): Promise<IItem> {
  const sampleItem = createSampleItem();
  sampleItem.user_id = anotherUser._id;

  const result: InsertOneWriteOpResult<any> = await db
    .collection(Config.db.collections.items)
    .insertOne(sampleItem);

  return result.ops[0] as IItem;
}

async function insertSampleItem(title?: string, userId?: string) {
  const result: InsertOneWriteOpResult<any> = await db
    .collection(Config.db.collections.items)
    .insertOne(createSampleItem(title, userId));

  return result.ops[0];
}

function asStringId(value: string | number | ObjectId) {
  return new ObjectId(value).toHexString();
}
