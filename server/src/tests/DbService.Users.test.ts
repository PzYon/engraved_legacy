import { IUser } from "engraved-shared";
import { TestContext } from "./TestContext";

const context = new TestContext();

describe("DbService.Users", () => {
  beforeEach(async () => await context.setUp());
  afterEach(async () => await context.tearDown());

  describe("saveUserSetting", () => {
    it("saves new string value", async () => {
      const dbService = context.serviceFactory.createDbService();

      await dbService.saveUserSetting("mySetting", "foo");

      const user: IUser = await dbService.getUserById(context.currentUser._id);

      expect(user.settings.mySetting).toBe("foo");
    });

    it("saves new object value", async () => {
      const dbService = context.serviceFactory.createDbService();

      await dbService.saveUserSetting("mySetting", { a: "b" });

      const user: IUser = await dbService.getUserById(context.currentUser._id);

      expect(user.settings.mySetting).toEqual({ a: "b" });
    });

    it("updates existing string value", async () => {
      const dbService = context.serviceFactory.createDbService();

      await dbService.saveUserSetting("mySetting", "foo");
      await dbService.saveUserSetting("mySetting", "bar");
      await dbService.saveUserSetting("mySetting", "final");

      const user: IUser = await dbService.getUserById(context.currentUser._id);

      expect(user.settings.mySetting).toBe("final");
    });
  });
});
