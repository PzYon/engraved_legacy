import { ItemSearchQuery } from "./ItemSearchQuery";
import { SortDirection } from "./SortDirection";

describe("ItemSearchQuery", () => {
  describe("fromObject", async () => {
    it("parses all parameters", async () => {
      const sourceQuery = new ItemSearchQuery("abc", ["foo", "bar"], 10, 5, {
        propName: "myProp",
        direction: SortDirection.Descending
      });

      const obj: any = createObjectFromUrl(sourceQuery.toUrl());

      const query = ItemSearchQuery.fromObject(obj);

      expect(query).toMatchObject(sourceQuery);
    });

    it("applies defaults", async () => {
      const query = ItemSearchQuery.fromObject({});

      expect(query.hasConditions).toBe(false);

      expect(Array.isArray(query.keywords)).toBe(true);
      expect(query.keywords.length).toBe(0);
      expect(query.take).toBe(0);
      expect(query.skip).toBe(0);
      expect(query.sorting).toBe(undefined);
    });
  });
});

function createObjectFromUrl(url: string): object {
  return url
    .split("&")
    .map(pair => pair.split("="))
    .reduce((prev, curr) => {
      prev[curr[0]] = curr[1];

      return prev;
    }, {});
}
