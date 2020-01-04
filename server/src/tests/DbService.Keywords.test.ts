import { IKeyword } from "engraved-shared";
import Config from "../Config";
import { TestContext } from "./TestContext";

const context = new TestContext();

describe("DbService.Keywords", () => {
  beforeEach(async () => await context.setUp());
  afterEach(async () => await context.tearDown());

  describe("searchKeywords", () => {
    it("returns my keywords", async () => {
      await createKeyword("freddy");

      const keywords = await context.serviceFactory
        .createDbService()
        .searchKeywords("freddy");

      expect(keywords.length).toEqual(1);
    });

    it("doesn't return item from another user", async () => {
      await createKeyword("freddy", context.otherUser._id);

      const keywords = await context.serviceFactory
        .createDbService()
        .searchKeywords("freddy");

      expect(keywords.length).toEqual(0);
    });

    it("keywords created while creating an item are stored in keyword collection", async () => {
      const item = await context.createSampleItem();
      item.keywords.push({
        _id: undefined,
        user_id: context.currentUser._id,
        name: "createdWhileCreate"
      });

      const dbService = context.serviceFactory.createDbService();

      await dbService.insertItem(item);

      const keywords: IKeyword[] = await dbService.searchKeywords(
        "createdWhileCreate"
      );

      expect(keywords.length).toBe(1);
    });

    it.skip("keywords created while updating an item are stored in keyword collection", async () => {
      const item = await context.insertSampleItem();

      item.keywords.push({
        _id: undefined,
        user_id: context.currentUser._id,
        name: "bockmist"
      });

      const dbService = context.serviceFactory.createDbService();

      await dbService.updateItem(item._id, item);

      const keywords: IKeyword[] = await dbService.searchKeywords("bockmist");

      expect(keywords.length).toBe(1);
    });

    it.skip("keywords added while updating an item are scoped to current user", async () => {
      const commonName = "beidi";

      await context.db
        .collection<IKeyword>(Config.db.collections.keywords)
        .insertMany([
          {
            user_id: context.otherUser._id,
            name: "from another"
          },
          {
            user_id: context.otherUser._id,
            name: commonName
          }
        ]);

      expect(
        await context.db
          .collection<IKeyword>(Config.db.collections.keywords)
          .countDocuments()
      ).toBe(2);

      await context.serviceFactory
        .createDbService()
        .insertItem(
          context.createSampleItem("pirmin", context.currentUser._id, [
            commonName
          ])
        );

      expect(
        await context.db
          .collection<IKeyword>(Config.db.collections.keywords)
          .countDocuments()
      ).toBe(3);
    });

    it("keyword search is case insensitive", async () => {
      await context.db
        .collection<IKeyword>(Config.db.collections.keywords)
        .insertOne({
          name: "alphA",
          user_id: context.currentUser._id
        });

      const result = await context.serviceFactory
        .createDbService()
        .searchKeywords("aLpHa");

      expect(result.length).toBe(1);
    });

    it("keywords are stored without adjusting the case", async () => {
      const keywords = ["AnToN", "TonI"];

      const dbService = context.serviceFactory.createDbService();

      await dbService.insertItem(
        context.createSampleItem("ABC", context.currentUser._id, keywords)
      );

      expect(
        await context.db
          .collection<IKeyword>(Config.db.collections.keywords)
          .countDocuments()
      ).toBe(keywords.length);

      const result: IKeyword[] = await dbService.searchKeywords("ton");

      expect(result.filter(k => k.name === keywords[0]).length).toBe(1);
      expect(result.filter(k => k.name === keywords[1]).length).toBe(1);
    });

    it.skip("same keyword with different casing is only stored once", async () => {});
  });
});

async function createKeyword(name: string, userId?: string) {
  await context.db
    .collection<IKeyword>(Config.db.collections.keywords)
    .insertOne({
      user_id: userId || context.currentUser._id,
      name: name
    });
}
