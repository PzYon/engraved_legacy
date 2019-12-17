import { FileType, IFile, IItem, ItemKind } from "engraved-shared";
import Config from "../Config";
import { DbTestContext } from "./DbTestContext";

const context = new DbTestContext();

describe("DbService.Files", () => {
  beforeEach(async () => await context.setUp());
  afterEach(async () => await context.tearDown());

  describe("insertFile", () => {
    it("adds file to DB", async () => {
      const url = "https://url.ch/foo.bar";
      const file: IFile = await context.dbService.insertImage({
        url: url,
        type: FileType.Image
      });

      expect(file.url).toBe(url);
      expect(file.type).toBe(FileType.Image);
      expect(file.user_id).toBe(context.currentUser._id);

      const fileCount = await context.dbService.files.countDocuments();
      expect(fileCount).toBe(1);
    });

    it("adding new item ensures file", async () => {
      const url = "https://url.ch/foo.bar";

      const file: IFile = await context.dbService.insertImage({
        url: url,
        type: FileType.Image
      });

      const item: IItem = {
        user_id: context.currentUser._id,
        files: [file],
        title: "item with image",
        itemKind: ItemKind.Note
      };

      const addedItem: IItem = await context.dbService.insertItem(item);

      expect(
        await context.db
          .collection(Config.db.collections.items)
          .countDocuments()
      ).toBe(1);

      const dbItem = await context.db
        .collection<IItem>(Config.db.collections.items)
        .findOne({ _id: addedItem._id });

      expect(dbItem.files).toBeDefined();
      expect(dbItem.files.length).toBe(1);
      expect(dbItem.files[0].url).toBe(url);

      expect(
        await context.db
          .collection(Config.db.collections.files)
          .countDocuments()
      ).toBe(0);
    });
  });
});
