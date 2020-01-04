import { FileType, IFile, IItem, ItemKind } from "engraved-shared";
import { TestContext } from "./TestContext";
import { asStringId } from "./testHelpers";

const context = new TestContext();

describe("FileService", () => {
  beforeEach(async () => await context.setUp());
  afterEach(async () => await context.tearDown());

  describe("uploadFile", () => {
    it("stores file in files table", async () => {
      const file: IFile = await context.serviceFactory
        .createFileService()
        .uploadFile({
          path: "foo",
          filename: "freddy.jpg",
          originalname: "freddy.jpg"
        } as any);

      expect(file.label).toBe("freddy.jpg");
      expect(file.cloudFile_id).not.toBeNull();

      const dbService = context.serviceFactory.createDbService();

      const cloudFile = await dbService.getFile(file.cloudFile_id);
      expect(cloudFile).not.toBeNull();
      expect(cloudFile.user_id).toEqual(dbService.currentUser._id);
    });
  });

  describe("synchronizeFiles", () => {
    it("removes files", async () => {
      const previousFiles: IFile[] = [
        await createFile("foo", true),
        await createFile("bar", true)
      ];

      const dbService = context.serviceFactory.createDbService();

      expect(await dbService.files.countDocuments()).toBe(2);

      await context.serviceFactory
        .createFileService()
        .synchronizeFiles(previousFiles, []);

      expect(context.cloudinaryMock.deletedPublicIds.length).toBe(2);
      expect(context.cloudinaryMock.uploadedUrls.length).toBe(0);

      expect(await dbService.files.countDocuments()).toBe(0);
    });

    it("does nothing if not required", async () => {
      const previousFiles: IFile[] = [
        await createFile("foo", true),
        await createFile("bar", true)
      ];

      const dbService = context.serviceFactory.createDbService();

      expect(await dbService.files.countDocuments()).toBe(2);

      await context.serviceFactory
        .createFileService()
        .synchronizeFiles(previousFiles, previousFiles);

      expect(context.cloudinaryMock.deletedPublicIds.length).toBe(0);
      expect(context.cloudinaryMock.uploadedUrls.length).toBe(0);
      expect(await dbService.files.countDocuments()).toBe(2);
    });

    it("throws if file to add isn't uploaded yet", async () => {
      const previousFiles: IFile[] = [await createFile("foo", true)];
      expect(
        await context.serviceFactory.createDbService().files.countDocuments()
      ).toBe(1);

      await expect(
        context.serviceFactory
          .createFileService()
          .synchronizeFiles(previousFiles, [await createFile("bar")])
      ).rejects.toThrowError();
    });
  });
});

describe("DbService", () => {
  beforeEach(async () => await context.setUp());
  afterEach(async () => await context.tearDown());

  describe("insertItem", () => {
    it.skip("only accepts file that are already stored in DB", async () => {});
  });

  describe("updateItem", () => {
    it("happy path", async () => {
      const item: IItem = await insertItemWithFiles();

      const addedFile = await context.serviceFactory
        .createFileService()
        .uploadFile({
          path: "newlyAddedFile",
          filename: "file.jpg",
          originalname: "file.jpg"
        } as any);

      item.files.push(addedFile);

      const updatedItem: IItem = await context.serviceFactory
        .createDbService()
        .updateItem(item._id, item);

      expect(updatedItem.files.length).toBe(3);
      expect(context.cloudinaryMock.deletedPublicIds.length).toBe(0);
      expect(context.cloudinaryMock.uploadedUrls.length).toBe(1);
    });

    it("throws when adding an item that's not yet uploaded", async () => {
      const item: IItem = await insertItemWithFiles();

      item.files.push({
        url: "foo",
        label: "foo",
        type: FileType.Image,
        cloudFile_id: asStringId()
      });

      await expect(
        context.serviceFactory.createDbService().updateItem(item._id, item)
      ).rejects.toThrowError();
    });

    it("deletes removed files", async () => {
      const item: IItem = await insertItemWithFiles();

      item.files.pop();

      const dbService = context.serviceFactory.createDbService();

      const updatedItem: IItem = await dbService.updateItem(item._id, item);

      expect(updatedItem.files.length).toBe(1);
      expect(context.cloudinaryMock.deletedPublicIds.length).toBe(1);
      expect(context.cloudinaryMock.uploadedUrls.length).toBe(0);
      expect(await dbService.files.countDocuments()).toBe(1);
    });
  });

  describe("deleteItem", () => {
    it("deletes all related files from source and DB", async () => {
      const item: IItem = await insertItemWithFiles();

      const dbService = context.serviceFactory.createDbService();

      await dbService.deleteItem(item._id);

      expect(context.cloudinaryMock.deletedPublicIds.length).toBe(2);
      expect(await dbService.files.countDocuments()).toBe(0);
    });
  });
});

async function insertItemWithFiles(): Promise<IItem> {
  const allFiles = [
    {
      path: "foo2",
      filename: "freddy.jpg",
      originalname: "freddy.jpg"
    } as any,
    {
      path: "foo2",
      filename: "mani.jpg",
      originalname: "mani.jpg"
    } as any
  ];

  const fs = context.serviceFactory.createFileService();
  const cm = context.cloudinaryMock;
  const dbService = context.serviceFactory.createDbService();

  expect(await dbService.files.countDocuments()).toBe(0);
  const file1 = await fs.uploadFile(allFiles[0]);
  const file2 = await fs.uploadFile(allFiles[1]);
  expect(await dbService.files.countDocuments()).toBe(2);

  expect(cm.uploadedUrls[0]).toBe(file1.url);
  expect(cm.uploadedUrls[1]).toBe(file2.url);

  // we reset here in order to be sure we count correctly afterwards
  cm.uploadedUrls = [];

  return dbService.insertItem({
    _id: undefined,
    files: [file1, file2],
    itemKind: ItemKind.Url,
    title: "Item With Files",
    description: "..."
  });
}

async function createFile(label: string, storeInDb?: boolean): Promise<IFile> {
  const file = {
    label: label,
    type: FileType.Image,
    url: "http://url/" + label,
    cloudFile_id: null
  };

  if (storeInDb) {
    const cloudFile = await context.serviceFactory
      .createDbService()
      .insertFile({
        _id: undefined,
        user_id: context.serviceFactory.createDbService().currentUser._id,
        publicId: label,
        url: file.url
      });

    file.cloudFile_id = cloudFile._id;
  } else {
    file.cloudFile_id = asStringId();
  }

  return file;
}
