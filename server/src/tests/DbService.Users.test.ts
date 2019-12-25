import { IUser } from "engraved-shared";
import { TestContext } from "./TestContext";

const context = new TestContext();

describe("DbService.Users", () => {
  beforeEach(async () => await context.setUp());
  afterEach(async () => await context.tearDown());

  describe("saveUserSetting", () => {
    it("saves new string value", async () => {
      await context.dbService.saveUserSetting("mySetting", "foo");

      const user: IUser = await context.dbService.getUserById(
        context.currentUser._id
      );

      expect(user.settings.mySetting).toBe("foo");
    });

    it("saves new object value", async () => {
      await context.dbService.saveUserSetting("mySetting", { a: "b" });

      const user: IUser = await context.dbService.getUserById(
        context.currentUser._id
      );

      expect(user.settings.mySetting).toEqual({ a: "b" });
    });

    it("updates existing string value", async () => {
      await context.dbService.saveUserSetting("mySetting", "foo");
      await context.dbService.saveUserSetting("mySetting", "bar");
      await context.dbService.saveUserSetting("mySetting", "final");

      const user: IUser = await context.dbService.getUserById(
        context.currentUser._id
      );

      expect(user.settings.mySetting).toBe("final");
    });
  });
});
