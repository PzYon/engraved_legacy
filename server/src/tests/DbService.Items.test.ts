import { IItem, ItemKind, ItemSearchQuery } from "engraved-shared";
import { InsertOneWriteOpResult, ObjectId } from "mongodb";
import { IKeyword } from "../../../shared/src";
import Config from "../Config";
import { DbTestContext } from "./DbTestContext";

const context = new DbTestContext();

describe("DbService.Items", () => {
  beforeEach(async () => await context.setUp());
  afterEach(async () => await context.tearDown());

  describe("insertItem", () => {
    it("adds item to DB", async () => {
      const item = await context.dbService.insertItem(
        context.createSampleItem()
      );

      const count: number = await context.db
        .collection(Config.db.collections.items)
        .countDocuments();
      expect(count).toBe(1);

      const results: IItem[] = await context.db
        .collection(Config.db.collections.items)
        .find()
        .limit(1)
        .toArray();

      expect(results.length).toBe(1);

      const resultItem = results[0];

      expect(resultItem).not.toBe(null);
      expect(resultItem.user_id).toEqual(context.currentUser._id);
      expect(resultItem.title).toEqual(item.title);
    });

    it("keywords created while creating an item are stored in keyword collection", async () => {
      await context.dbService.insertItem(
        context.createSampleItem("A B C", context.currentUser._id, [
          "javascript"
        ])
      );

      const keywords: IKeyword[] = await context.dbService.searchKeywords(
        "javascript"
      );

      expect(keywords.length).toBe(1);
    });
  });

  describe("updateItem", () => {
    it("updates item in DB", async () => {
      const item = await context.insertSampleItem();

      const itemToUpdate: IItem = item;
      itemToUpdate.title = "Freddy New";
      itemToUpdate.editedOn = null;

      const updatedItem = await context.dbService.updateItem(
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
      const item = await context.insertSampleItem();

      expect(() => {
        context.dbService.updateItem(new ObjectId().toHexString(), item);
      }).toThrow();
    });

    it("doesn't update item from another user", async () => {
      const otherItem = await createItemAsAnotherUser();
      otherItem.title = "isch jetzt anderscht.";

      expect(() =>
        context.dbService.updateItem(asStringId(otherItem._id), otherItem)
      ).toThrow();
    });
  });

  describe("deleteItem", () => {
    it("removes item from DB", async () => {
      await context.db
        .collection(Config.db.collections.items)
        .insertMany(createLotsOfSampleItems());
      const countBeforeDelete: number = await context.db
        .collection(Config.db.collections.items)
        .countDocuments();
      const allItems = await context.db
        .collection<IItem>(Config.db.collections.items)
        .find({})
        .toArray();
      const itemToDelete = allItems[0];

      await context.dbService.deleteItem(itemToDelete._id);

      const countAfterDelete: number = await context.db
        .collection(Config.db.collections.items)
        .countDocuments();

      expect(countAfterDelete).toBe(countBeforeDelete - 1);
    });

    it("doesn't remove item from another user", async () => {
      await context.db
        .collection(Config.db.collections.items)
        .insertMany(createLotsOfSampleItems());
      const itemToDelete = await createItemAsAnotherUser();

      const countBeforeDelete: number = await context.db
        .collection(Config.db.collections.items)
        .countDocuments();
      await context.dbService.deleteItem(itemToDelete._id);
      const countAfterDelete: number = await context.db
        .collection(Config.db.collections.items)
        .countDocuments();

      expect(countAfterDelete).toBe(countBeforeDelete);
    });
  });

  describe("getItemById", () => {
    it("retrieves item by ID", async () => {
      const item = await context.insertSampleItem();

      const count: number = await context.db
        .collection(Config.db.collections.items)
        .countDocuments();
      expect(count).toBe(1);

      const resultItem = await context.dbService.getItemById(item._id);

      expect(resultItem).not.toBe(null);
      expect(resultItem._id).toEqual(item._id);
    });

    it("doesn't return item from another user", async () => {
      const item = await createItemAsAnotherUser();

      const resultItem = await context.dbService.getItemById(item._id);

      expect(resultItem).toBe(null);
    });
  });

  describe("getItems", () => {
    it("with page size", async () => {
      await context.db
        .collection(Config.db.collections.items)
        .insertMany(createLotsOfSampleItems());

      const pageSize = 3;

      const items = await context.dbService.getItems(
        new ItemSearchQuery("foo", [], 0, pageSize)
      );

      expect(items.length).toEqual(pageSize);
    });

    it("with one keyword", async () => {
      const title = "Me haZ keyW0rds";

      await ensureItemsIncludingOneWithKeywords(title, "alpha");

      const items = await context.dbService.getItems(
        new ItemSearchQuery(null, ["alpha"], 0, 10)
      );

      expect(items.length).toEqual(1);
      expect(items[0].title).toEqual(title);
    });

    it("with two keywords", async () => {
      const title = "Me haZ keyW0rds";

      await ensureItemsIncludingOneWithKeywords(title, "alpha", "beta");

      const items = await context.dbService.getItems(
        new ItemSearchQuery(null, ["alpha", "beta"], 0, 10)
      );

      expect(items.length).toEqual(1);
      expect(items[0].title).toEqual(title);
    });
  });
});

function createLotsOfSampleItems(): IItem[] {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(context.createSampleItem("Foo " + i));
  }

  return items;
}

async function ensureItemsIncludingOneWithKeywords(
  title: string,
  ...keywords: string[]
) {
  await context.db
    .collection(Config.db.collections.items)
    .insertMany(createLotsOfSampleItems());
  await context.db.collection<IItem>(Config.db.collections.items).insertOne({
    user_id: context.currentUser._id,
    itemKind: ItemKind.Code,
    title: title,
    keywords: (Array.isArray(keywords) ? keywords : [keywords]).map(k => ({
      name: k,
      user_id: context.currentUser._id
    }))
  });
}

async function createItemAsAnotherUser(): Promise<IItem> {
  const sampleItem = context.createSampleItem();
  sampleItem.user_id = context.otherUser._id;

  const result: InsertOneWriteOpResult<any> = await context.db
    .collection(Config.db.collections.items)
    .insertOne(sampleItem);

  return result.ops[0] as IItem;
}

function asStringId(value: string | number | ObjectId) {
  return new ObjectId(value).toHexString();
}
